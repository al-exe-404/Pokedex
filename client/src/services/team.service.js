import { apiFetch } from "./api.service.js";

export function getTeams() {
  return apiFetch("/teams");
}

export function createTeam(name, description) {
  return apiFetch("/teams", "POST", { name, description });
}

export function updateTeam(id, name, description) {
  return apiFetch(`/teams/${id}`, "PATCH", { name, description });
}

export function deleteTeam(id) {
  return apiFetch(`/teams/${id}`, "DELETE");
}

export function addPokemonToTeam(teamId, pokemonId) {
  return apiFetch(`/teams/${teamId}/pokemons`, "POST", { pokemonId });
}

export function removePokemonFromTeam(teamId, pokemonId) {
  return apiFetch(`/teams/${teamId}/pokemons/${pokemonId}`, "DELETE");
}