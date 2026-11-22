import Joi from "joi";
import { Pokemon, Type, Favorite } from "../models/index.js";
import { StatusCodes } from "http-status-codes";
import { searchPokemonSchema } from "../schemas/pokemon.schema.js";
import { findPokemonsBySearch } from "../services/pokemon.service.js";

// On inclut les types de chaque Pokémon (sans la table de liaison pokemon_type)
const includeTypes = { model: Type, as: "types", through: { attributes: [] } };


// ------------------ FAVORIS POKEMON----------------------------

// RÔLE : demander à la base "combien de favoris pour chaque Pokémon ?"
// Renvoie un objet, ex: { 25: 2, 6: 1 } = Pikachu (id 25) a 2 favoris, Dracaufeu (id 6) en a 1
const countFavoritesByPokemon = async () => {
  // count avec group : comme GROUP BY en SQL, il regroupe les lignes par pokemon_id
  // et renvoie un tableau : [{ pokemon_id: 25, count: "2" }, { pokemon_id: 6, count: "1" }]
  // Les Pokémons sans aucun favori n'apparaissent pas dans ce tableau.
  const rows = await Favorite.count({ group: ["pokemon_id"] });

  // On transforme le tableau en objet, pour retrouver facilement le compteur d'un Pokémon par son id
  // (PostgreSQL renvoie le nombre en texte, d'où le Number())
  const counts = {};
  for (const row of rows) {
    counts[row.pokemon_id] = Number(row.count);
  }
  return counts;
};

// RÔLE : donner à chaque Pokémon son champ favorites_count
// Elle ne parle pas à la base elle-même : elle utilise le résultat de countFavoritesByPokemon
const addFavoritesCount = async (pokemons) => {
  const counts = await countFavoritesByPokemon();

  return pokemons.map(function (pokemon) {
    // toJSON() transforme le Pokémon Sequelize en objet JavaScript simple,
    // auquel on peut ajouter un champ
    const pokemonData = pokemon.toJSON();

    // Un Pokémon absent de counts n'a aucun favori : counts[id] vaut undefined, donc || 0
    pokemonData.favorites_count = counts[pokemon.id] || 0;
    return pokemonData;
  });
};


// --------------------- GET ALL POKEMON -------------------------

// _req : la requête HTTP — non utilisée ici car on ne lit ni paramètres ni body
const getAllPokemons = async (_req, res, next) => {
  try {
    const pokemons = await Pokemon.findAll({
      include: [includeTypes],
      order: [["id", "ASC"]],
    });

    const pokemonsWithCount = await addFavoritesCount(pokemons);

    res.status(StatusCodes.OK).json(pokemonsWithCount);
  } catch (error) {
    next(error);
  }
};


// --------------------- GET POKEMON BY ID -------------------------

const getPokemonById = async (req, res, next) => {
  try {
    // req.params.id récupère le :id dans l'URL
    const pokemon = await Pokemon.findByPk(req.params.id, {
      include: [includeTypes],
    });

    // Si le Pokémon n'existe pas, on retourne un 404
    if (!pokemon) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Pokémon introuvable" });
    }

    // La fonction attend un tableau : on lui donne un tableau d'un seul Pokémon
    const pokemonsWithCount = await addFavoritesCount([pokemon]);

    res.status(StatusCodes.OK).json(pokemonsWithCount[0]);
  } catch (error) {
    next(error);
  }
};


// ----------------- RECHERCHE POKEMON----------------

const searchPokemon = async (req, res, next) => {
  try {
    // req.query : ce qui suit le "?" dans l'URL (/search?name=pika&type=eau)
    // donne { name: "pika", type: "eau" }, comme req.params pour le ":id"
    const { name, type } = Joi.attempt(req.query, searchPokemonSchema);

    const pokemons = await findPokemonsBySearch(name, type);

    const pokemonsWithCount = await addFavoritesCount(pokemons);

    res.status(StatusCodes.OK).json(pokemonsWithCount);
  } catch (error) {
    next(error);
  }
};


// ----------------- TOP 10 POKEMON ----------------

// Les 10 Pokémons les plus mis en favori, du plus au moins populaire
const getPopularPokemons = async (_req, res, next) => {
  try {
    // La liste est triée par id : à égalité de favoris, le plus petit id passera en premier
    const pokemons = await Pokemon.findAll({
      include: [includeTypes],
      order: [["id", "ASC"]],
    });

    const pokemonsWithCount = await addFavoritesCount(pokemons);

    const popular = pokemonsWithCount
      // On ne garde que les Pokémons qui ont au moins 1 favori
      .filter(function (pokemon) {
        return pokemon.favorites_count > 0;
      })
      // .sort sert à trier un tableau, mais il ne sait pas tout seul ce que « trier » veut dire,
      // il a besoin d'une fonction de comparaison entre 2 Pokémons (a et b) :
      // si elle renvoie un nombre positif, b passe avant a.
      // b - a = tri du plus grand au plus petit (a - b donnerait l'inverse).
      // À égalité (résultat 0), l'ordre de départ (par id) est conservé.
      .sort(function (a, b) {
        return b.favorites_count - a.favorites_count;
      })
      // slice(0, 10) : on ne garde que les 10 premiers (de l'indice 0 à l'indice 9, 10 étant exclu)
      .slice(0, 10);

    res.status(StatusCodes.OK).json(popular);
  } catch (error) {
    next(error);
  }
};

export { getAllPokemons, getPokemonById, searchPokemon, getPopularPokemons };