// Le controller lit l'utilisateur connecté (req.userId, posé par isAuthed) et appelle le service.
// Si le service refuse, on répond avec son statut et son message.
// Pour l'ajout et le retrait, on renvoie la liste de favoris à jour.

import { StatusCodes } from "http-status-codes";
import { User, Type } from "../models/index.js";
import { addPokemonToFavorites, removePokemonFromFavorites } from "../services/favorite.service.js";

// On inclut les types de chaque Pokémon (sans la table de liaison pokemon_type)
const includeTypes = { model: Type, as: "types", through: { attributes: [] } };

// Renvoie les Pokémons favoris d'un utilisateur, avec leurs types
const findFavorites = async (userId) => {
    const user = await User.findByPk(userId);

    // getFavorites : créée par Sequelize à partir de l'alias "favorites" (models/index.js)
    return user.getFavorites({
        include: [includeTypes],
        // joinTableAttributes: [] sert à ne pas inclure les colonnes de
        // la table de liaison favorite (user_id, pokemon_id) dans le résultat.
        // On ne veut que les Pokémons, pas les infos de la table de liaison.
        joinTableAttributes: [],
        order: [["id", "ASC"]],
    });
};

// Liste mes Pokémons favoris (req.userId vient du middleware isAuthed)
const getMyFavorites = async (req, res, next) => {
    try {
        const favorites = await findFavorites(req.userId);
        res.status(StatusCodes.OK).json(favorites);
    } catch (error) {
        next(error);
    }
};

// Ajoute un Pokémon à mes favoris : les règles (existe, pas de doublon)
// sont vérifiées dans le service, pas ici.
const addFavorite = async (req, res, next) => {
    try {
        const result = await addPokemonToFavorites(req.userId, req.params.pokemonId);

        // Le service a refusé : on répond avec son statut et son message
        if (result.error) {
            return res.status(result.status).json({ error: result.error });
        }

        // Tout est bon : on renvoie mes favoris à jour
        const favorites = await findFavorites(req.userId);
        res.status(StatusCodes.CREATED).json(favorites);
    } catch (error) {
        next(error);
    }
};

// Retire un Pokémon de mes favoris
const removeFavorite = async (req, res, next) => {
    try {
        const result = await removePokemonFromFavorites(req.userId, req.params.pokemonId);

        if (result.error) {
            return res.status(result.status).json({ error: result.error });
        }

        const favorites = await findFavorites(req.userId);
        res.status(StatusCodes.OK).json(favorites);
    } catch (error) {
        next(error);
    }
};

export { getMyFavorites, addFavorite, removeFavorite };