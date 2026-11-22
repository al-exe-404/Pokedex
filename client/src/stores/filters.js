import { writable } from "svelte/store";

// Les stores sont des variables qui peuvent changer et qui sont partagées entre plusieurs composants.
// Dans un fichier .svelte, on lit et on écrit leur contenu avec un $ devant ($name, $selectedTypeIds).
// Ici le Header écrit les filtres et PokemonList les lit, sans se connaître.

// Les filtres de la liste : le nom recherché et les types choisis
export const name = writable("");
export const selectedTypeIds = writable([]);

// Les types disponibles : remplis par PokemonList une fois les Pokémons chargés
export const types = writable([]);

// Les types qu'on peut encore choisir (null = pas de restriction)
export const availableTypeIds = writable(null);

// Remet les filtres à zéro (quand on change de vue)
export function resetFilters() {
  name.set("");
  selectedTypeIds.set([]);
}