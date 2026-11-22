import { Router } from "express";
import {
  getAllPokemons,
  getPokemonById,
  searchPokemon,
  getPopularPokemons,
} from "../controllers/pokemon.controller.js";
import { validateId } from "../middlewares/common.middleware.js";

const router = Router();

router.get("/", getAllPokemons); // Liste de tous les Pokémons

// "/search" et "/popular" doivent être AVANT "/:id", sinon Express prendrait "search" ou "popular" pour un identifiant
router.get("/search", searchPokemon); // Recherche par nom et/ou type
router.get("/popular", getPopularPokemons); // Top 10 des Pokémons les plus mis en favori

router.get("/:id", validateId, getPokemonById); // Détail d'un Pokémon

export default router;