import Joi from "joi";
// Op : la boîte à outils des opérateurs SQL de Sequelize (Op.or pour "OU", comme Op.iLike pour ILIKE)
import { Op } from "sequelize";
import { Team, Pokemon } from "../models/index.js";
import { StatusCodes } from "http-status-codes";
import { addPokemonToTeam } from "../services/team.service.js";
import { calculateTeamScore } from "../services/team-score.service.js";
import { createTeamSchema, updateTeamSchema } from "../schemas/team.schema.js";

// On inclut les Pokémons de l'équipe (sans la table de liaison team_pokemon)
const includePokemons = { model: Pokemon, as: "pokemons", through: { attributes: [] } };

// On renvoie l'équipe sous forme d'objet avec son score
const addScore = (team) => {
    // toJSON() transforme l'équipe Sequelize en objet.
    // Sans ça, le champ score ajouté serait ignoré quand res.json envoie la réponse
    const teamData = team.toJSON();
    teamData.score = calculateTeamScore(teamData.pokemons);
    return teamData;
};

// Une équipe est visible par tout le monde si elle n'a pas de propriétaire (les équipes du seed),
// sinon seulement par son propriétaire. userId vaut undefined pour un visiteur.
const isVisibleTo = (team, userId) => {
    return team.user_id === null || team.user_id === userId;
};

// La condition SQL des équipes visibles pour cet utilisateur :
// WHERE user_id IS NULL OR user_id = <son id>
const getVisibleTeamsCondition = (userId) => {
    // { user_id: null } est traduit par "user_id IS NULL" : les équipes du seed
    const conditions = [{ user_id: null }];

    // Pour un visiteur, userId est undefined : Sequelize refuse undefined dans un where,
    // on ajoute donc la condition "c'est la mienne" seulement s'il y a un utilisateur
    if (userId !== undefined) {
        conditions.push({ user_id: userId });
    }

    // Op.or : au moins une des conditions de la liste doit être vraie
    return { [Op.or]: conditions };
};


const getAllTeams = async (req, res, next) => {
    try {
        const teams = await Team.findAll({
            where: getVisibleTeamsCondition(req.userId),
            include: [includePokemons],
            order: [["id", "ASC"]],
        });

        // Pour chaque équipe de la liste, on appelle addScore
        const teamsWithScore = teams.map(addScore);

        res.status(StatusCodes.OK).json(teamsWithScore);
    } catch (error) {
        next(error);
    }
};

const createTeam = async (req, res, next) => {
    try {
        // Valide le body (nom de 1 à 50 caractères, obligatoire) : si invalide,
        // Joi lance une erreur et errorHandler répond 400
        const { name, description } = Joi.attempt(req.body, createTeamSchema);

        // user_id = l'utilisateur connecté (req.userId vient du middleware isAuthed)
        const team = await Team.create({ name, description, user_id: req.userId });
        res.status(StatusCodes.CREATED).json(team);
    } catch (error) {
        next(error);
    }
};

const getTeamById = async (req, res, next) => {
    try {
        const team = await Team.findByPk(req.params.id, {
            include: [includePokemons],
        });

        // 404 aussi pour l'équipe de quelqu'un d'autre : on ne révèle pas qu'elle existe
        if (!team || !isVisibleTo(team, req.userId)) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Équipe introuvable" });
        }

        res.status(StatusCodes.OK).json(addScore(team));
    } catch (error) {
        next(error);
    }
};

// Modifie le nom de l'équipe, et sa description si elle est envoyée
const updateTeamById = async (req, res, next) => {
    try {
        const { name, description } = Joi.attempt(req.body, updateTeamSchema);

        const team = await Team.findByPk(req.params.id, {
            include: [includePokemons],
        });

        if (!team) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Équipe introuvable" });
        }

        const changes = { name };

        // undefined = la description n'a pas été envoyée : on n'y touche pas.
        // Sinon (même une chaîne vide), on l'enregistre ; une chaîne vide devient null
        // (pas de description), comme une description absente à la création.
        if (description !== undefined) {
            changes.description = description || null;
        }

        await team.update(changes);

        res.status(StatusCodes.OK).json(addScore(team));
    } catch (error) {
        next(error);
    }
};

const deleteTeamById = async (req, res, next) => {
    try {
        const team = await Team.findByPk(req.params.id);

        if (!team) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Équipe introuvable" });
        }

        await team.destroy();

        // Un 204 ne peut pas contenir de body, donc on utilise un 200 pour renvoyer
        // un message de confirmation
        res.status(StatusCodes.OK).json({ message: "Équipe supprimée avec succès" });
    } catch (error) {
        next(error);
    }
};

// Ajoute un Pokémon à une équipe : les règles (6 max, pas de doublon)
// sont vérifiées dans le service, pas ici.
const addPokemon = async (req, res, next) => {
    try {
        // On récupère le résultat du service (c'est lui qui dit si tout s'est bien passé)
        const result = await addPokemonToTeam(req.params.id, req.body.pokemonId);

        // Le service a refusé : on répond avec le statut et le message qu'il a renvoyés.
        // Sans ce "return", on continuerait et on enverrait un 201 par erreur.
        if (result.error) {
            return res.status(result.status).json({ error: result.error });
        }

        // Tout est bon : on renvoie l'équipe à jour
        const team = await Team.findByPk(req.params.id, {
            include: [includePokemons],
        });

        res.status(StatusCodes.CREATED).json(addScore(team));
    } catch (error) {
        next(error);
    }
};

// Retire un Pokémon d'une équipe
const removePokemon = async (req, res, next) => {
    try {
        const team = await Team.findByPk(req.params.id);

        if (!team) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Équipe introuvable" });
        }

        // L'ID venant de l'URL est une chaîne de caractères (string).
        // On le "transforme" en nombre avant de le donner à Sequelize,
        // parce que l'ID correspondant en base est un nombre.
        const pokemonId = Number(req.params.pokemonId);

        // Le Pokémon doit bien faire partie de l'équipe
        const isInTeam = await team.hasPokemon(pokemonId);
        if (!isInTeam) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: "Ce Pokémon n'est pas dans cette équipe" });
        }

        await team.removePokemon(pokemonId);

        // On renvoie l'équipe à jour
        const updatedTeam = await Team.findByPk(req.params.id, {
            include: [includePokemons],
        });

        res.status(StatusCodes.OK).json(addScore(updatedTeam));
    } catch (error) {
        next(error);
    }
};

export { getAllTeams, createTeam, getTeamById, updateTeamById, deleteTeamById, addPokemon, removePokemon };