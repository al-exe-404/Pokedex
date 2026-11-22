import { apiFetch } from "./api.service.js";

export function getPokemons() {
  return apiFetch("/pokemons");
}

export function getPokemon(id) {
  return apiFetch(`/pokemons/${id}`);
}

export function getPopularPokemons() {
  return apiFetch("/pokemons/popular");
}