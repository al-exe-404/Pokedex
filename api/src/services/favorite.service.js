// Ici: la logique des favoris.

import { StatusCodes } from "http-status-codes";
import { User, Pokemon } from "../models/index.js";

// Ajoute un Pokémon aux favoris d'un utilisateur
export async function addPokemonToFavorites(userId, pokemonId) {
    // Le Pokémon doit exister
    const pokemon = await Pokemon.findByPk(pokemonId);
    if (!pokemon) {
        return { error: "Pokémon introuvable", status: StatusCodes.NOT_FOUND };
    }

    const user = await User.findByPk(userId);

    // addFavorite, hasFavorite et removeFavorite sont créées automatiquement par Sequelize
    // à partir de l'alias "favorites" de models/index.js.
    // L'alias est au pluriel, mais les méthodes sont au singulier.

    // On ne peut pas ajouter deux fois le même favori
    const isAlreadyFavorite = await user.hasFavorite(pokemon);
    if (isAlreadyFavorite) {
        return { error: "Ce Pokémon est déjà dans tes favoris", status: StatusCodes.CONFLICT };
    }

    await user.addFavorite(pokemon);

    return { success: true };
}

// Retire un Pokémon des favoris d'un utilisateur
export async function removePokemonFromFavorites(userId, pokemonId) {
    const pokemon = await Pokemon.findByPk(pokemonId);
    if (!pokemon) {
        return { error: "Pokémon introuvable", status: StatusCodes.NOT_FOUND };
    }

    const user = await User.findByPk(userId);

    // Le Pokémon doit bien être dans ses favoris
    const isFavorite = await user.hasFavorite(pokemon);
    if (!isFavorite) {
        return { error: "Ce Pokémon n'est pas dans tes favoris", status: StatusCodes.NOT_FOUND };
    }

    await user.removeFavorite(pokemon);

    return { success: true };
}