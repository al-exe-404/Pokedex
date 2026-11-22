import { Team, Pokemon } from "../models/index.js";
import { StatusCodes } from "http-status-codes";

// Règle métier : maximum 6 Pokémons par équipe
const MAX_POKEMONS_PER_TEAM = 6;

// Ajoute un Pokémon à une équipe en respectant les règles métier (pas de doublon, 6 maximum).
// Si une règle n'est pas respectée, on renvoie un objet contenant l'erreur et le statut HTTP.
const addPokemonToTeam = async (teamId, pokemonId) => {
    // Le pokemonId vient du body : on vérifie que c'est bien un entier positif
    const pokemonIdNumber = Number(pokemonId);
    if (!Number.isInteger(pokemonIdNumber) || pokemonIdNumber <= 0) {
        return {
            error: "pokemonId est obligatoire (entier positif)",
            status: StatusCodes.BAD_REQUEST,
        };
    }

    const team = await Team.findByPk(teamId);
    if (!team) {
        return {
            error: "Équipe introuvable",
            status: StatusCodes.NOT_FOUND,
        };
    }

    const pokemon = await Pokemon.findByPk(pokemonIdNumber);
    if (!pokemon) {
        return {
            error: "Pokémon introuvable",
            status: StatusCodes.NOT_FOUND,
        };
    }

    // Règle 1 : un Pokémon ne peut apparaître qu'une fois par équipe
    const alreadyInTeam = await team.hasPokemon(pokemon);
    if (alreadyInTeam) {
        return {
            error: "Ce Pokémon est déjà dans cette équipe",
            status: StatusCodes.CONFLICT,
        };
    }

    // Règle 2 : 6 Pokémons maximum
    const pokemonCount = await team.countPokemons();
    if (pokemonCount >= MAX_POKEMONS_PER_TEAM) {
        return {
            error: `Une équipe ne peut pas contenir plus de ${MAX_POKEMONS_PER_TEAM} Pokémons`,
            status: StatusCodes.BAD_REQUEST,
        };
    }

    await team.addPokemon(pokemon);

    return { success: true };
};

export { addPokemonToTeam };