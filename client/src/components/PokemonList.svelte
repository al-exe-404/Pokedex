<script>
  import { onMount } from "svelte";
  import { getPokemons, getPopularPokemons } from "../services/pokemon.service.js";
  import { getFavorites } from "../services/favorite.service.js";
  import { name, selectedTypeIds, types, availableTypeIds, resetFilters } from "../stores/filters.js";
  import PokemonCard from "./PokemonCard.svelte";

  // source : "all", "popular" ou "favorites" (ce que la liste doit afficher)
  let { source, onselect } = $props();

  let pokemons = $state([]);
  let message = $state("");

  // La liste affichée : recalculée toute seule quand pokemons ou les filtres changent
  let visiblePokemons = $derived(
    pokemons.filter(function (pokemon) {
      const nameMatches = pokemon.name.toLowerCase().includes($name.toLowerCase());

      // every : vrai si TOUS les types choisis sont dans la liste du Pokémon
      const typesMatch = $selectedTypeIds.every(function (typeId) {
        return pokemon.types.some(function (type) {
          return type.id === typeId;
        });
      });

      return nameMatches && typesMatch;
    })
  );

  // $effect : s'exécute une première fois, puis à chaque fois que pokemons ou $selectedTypeIds changent.
  // Il recalcule les types et les duos possibles, et les range dans des stores pour que le Header les affiche.
  $effect(function () {
    // Les types, déduits des Pokémons (l'API n'a pas de route "types")
    const typesById = {};

    for (const pokemon of pokemons) {
      for (const type of pokemon.types) {
        typesById[type.id] = type;
      }
    }

    types.set(Object.values(typesById));

    // Avec un seul type choisi : les types qui existent avec lui sur au moins un Pokémon
    if ($selectedTypeIds.length !== 1) {
      availableTypeIds.set(null);
      return;
    }

    const available = new Set();

    for (const pokemon of pokemons) {
      const hasFirstType = pokemon.types.some(function (type) {
        return type.id === $selectedTypeIds[0];
      });

      if (hasFirstType) {
        for (const type of pokemon.types) {
          available.add(type.id);
        }
      }
    }

    availableTypeIds.set(available);
  });

  onMount(async function () {
    // Une nouvelle liste commence sans filtre
    resetFilters();

    try {
      if (source === "popular") {
        pokemons = await getPopularPokemons();
      } else if (source === "favorites") {
        pokemons = await getFavorites();
      } else {
        pokemons = await getPokemons();
      }

      if (pokemons.length === 0) {
        message = "Rien à afficher pour l'instant.";
      }
    } catch (error) {
      message = error.message;
    }
  });
</script>

<p class="has-text-centered">{message}</p>

<section class="pokemon-grid">
  {#each visiblePokemons as pokemon (pokemon.id)}
    <PokemonCard {pokemon} {onselect} showCount={source === "popular"} />
  {/each}
</section>