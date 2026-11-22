import express from "express";
import {
  getMyFavorites,
  addFavorite,
  removeFavorite,
} from "../controllers/favorite.controller.js";
import { validateId } from "../middlewares/common.middleware.js";
import { isAuthed } from "../middlewares/is-authed.middleware.js";

const router = express.Router();

// Toutes les routes des favoris sont réservées aux utilisateurs connectés
// Ordre des middlewares : connecté ? -> id valide ? -> controller
router.get("/", isAuthed, getMyFavorites); // Liste de mes favoris
router.post("/:pokemonId", isAuthed, validateId, addFavorite); // Ajout d'un favori
router.delete("/:pokemonId", isAuthed, validateId, removeFavorite); // Retrait d'un favori

export default router;