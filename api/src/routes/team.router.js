import express from "express";
import {
  getAllTeams,
  createTeam,
  getTeamById,
  updateTeamById,
  deleteTeamById,
  addPokemon,
  removePokemon,
} from "../controllers/team.controller.js";
import { validateId } from "../middlewares/common.middleware.js";
import { isAuthed, setUserIfAuthed } from "../middlewares/is-authed.middleware.js";
import { isTeamOwner } from "../middlewares/team.middleware.js";

const router = express.Router();

// Lecture : ouverte à tout le monde, mais chacun ne voit que les équipes du seed (sans propriétaire)
// et les siennes. setUserIfAuthed identifie l'utilisateur s'il envoie un token, sans jamais refuser.
router.get("/", setUserIfAuthed, getAllTeams); // Liste des équipes visibles
router.get("/:id", validateId, setUserIfAuthed, getTeamById); // Détail d'une équipe visible

// Écriture : réservée aux utilisateurs connectés
// Ordre des middlewares : connecté ? -> id valide ? -> c'est mon équipe ? -> controller
router.post("/", isAuthed, createTeam); // Création d'une équipe
router.patch("/:id", isAuthed, validateId, isTeamOwner, updateTeamById); // Modification du nom et de la description
router.delete("/:id", isAuthed, validateId, isTeamOwner, deleteTeamById); // Suppression

// Gestion des Pokémons d'une équipe (aussi réservée au propriétaire)
router.post("/:id/pokemons", isAuthed, validateId, isTeamOwner, addPokemon);
router.delete("/:id/pokemons/:pokemonId", isAuthed, validateId, isTeamOwner, removePokemon);

export default router;