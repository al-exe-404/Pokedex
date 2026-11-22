import { apiFetch } from "./api.service.js";

export function getFavorites() {
  return apiFetch("/favorites");
}

export function addFavorite(pokemonId) {
  return apiFetch(`/favorites/${pokemonId}`, "POST");
}

export function removeFavorite(pokemonId) {
  return apiFetch(`/favorites/${pokemonId}`, "DELETE");
}