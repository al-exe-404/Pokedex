// Depuis la version 6 de Sequelize, il faut importer Op depuis sequelize pour faire des comparaisons
// À noter: Op est un peu la boite à outils des comparateurs
// Op.iLike = "ilike" (équivalent de LIKE mais insensible à la casse)
import { Op } from "sequelize";
import { Pokemon, Type } from "../models/index.js";

// Nombre maximum de résultats renvoyés par une recherche
const MAX_SEARCH_RESULTS = 20;

// Cherche des Pokémons par nom et/ou par type (correspondance partielle, sans tenir compte de la casse)
// name et type sont facultatifs, mais au moins un des deux est fourni (vérifié par Joi avant)
export async function findPokemonsBySearch(name, type) {
  // ÉTAPE 1 : trouver les identifiants des Pokémons qui correspondent

  // Condition sur le nom : "%pika%" = contient "pika", majuscules ou minuscules
  const where = {};
  if (name) {
    where.name = { [Op.iLike]: `%${name}%` };
  }

  // Condition sur le type : on joint la table des types et on filtre dessus
  const include = [];
  if (type) {
    include.push({
      model: Type,
      as: "types",
      attributes: [], // à cette étape, on n'a pas besoin des infos du type (on filtre uniquement)
      through: { attributes: [] },
      where: { name: { [Op.iLike]: `%${type}%` } },
    });
  }

  const matches = await Pokemon.findAll({ attributes: ["id"], where, include });

  // Un Pokémon peut apparaître 2 fois (s'il a 2 types qui correspondent) : on enlève les doublons
  const ids = [];
  for (const pokemon of matches) {
    if (!ids.includes(pokemon.id)) {
      ids.push(pokemon.id);
    }
  }

  // Aucun résultat : inutile de faire la 2e requête
  if (ids.length === 0) {
    return [];
  }

  // ÉTAPE 2 : récupérer les fiches complètes de ces Pokémons, avec TOUS leurs types
  const pokemons = await Pokemon.findAll({
    where: { id: ids },
    include: [{ model: Type, as: "types", through: { attributes: [] } }],
    order: [["id", "ASC"]],
    limit: MAX_SEARCH_RESULTS,
  });

  return pokemons;
}