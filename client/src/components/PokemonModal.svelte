<script>
  import { onMount } from "svelte";
  import { session } from "../stores/session.js";
  import { getPokemon } from "../services/pokemon.service.js";
  import { getFavorites, addFavorite, removeFavorite } from "../services/favorite.service.js";
  import { getTeams, addPokemonToTeam } from "../services/team.service.js";

  // onfavoritechange : prévient App quand un favori a été ajouté ou retiré
  let { id, onclose, onfavoritechange } = $props();

  let pokemon = $state(null);
  let isFavorite = $state(false);
  let myTeams = $state([]);
  let teamId = $state("");
  let errorMessage = $state("");
  let successMessage = $state("");

  const stats = [
    { label: "PV", key: "hp" },
    { label: "Attaque", key: "atk" },
    { label: "Défense", key: "def" },
    { label: "Attaque Spé", key: "atk_spe" },
    { label: "Défense Spé", key: "def_spe" },
    { label: "Vitesse", key: "speed" },
  ];

  // onMount : s'exécute une fois, quand la modale s'affiche. On charge le Pokémon,
  // puis, si on est connecté, ses favoris et mes équipes
  onMount(async function () {
    try {
      pokemon = await getPokemon(id);

      if ($session !== null) {
        const favorites = await getFavorites();

        // Ce Pokémon est-il déjà dans mes favoris ? (some : true si un favori a le même id)
        isFavorite = favorites.some(function (favorite) {
          return favorite.id === pokemon.id;
        });

        const teams = await getTeams();

        // L'API renvoie mes équipes et celles du seed : on ne garde que les miennes
        myTeams = teams.filter(function (team) {
          return team.user_id === $session.userId;
        });

        if (myTeams.length > 0) {
          teamId = myTeams[0].id;
        }
      }
    } catch (error) {
      errorMessage = error.message;
    }
  });

  async function toggleFavorite() {
    errorMessage = "";

    try {
      if (isFavorite) {
        await removeFavorite(pokemon.id);
      } else {
        await addFavorite(pokemon.id);
      }

      isFavorite = !isFavorite;
      pokemon = await getPokemon(pokemon.id);
      onfavoritechange();
    } catch (error) {
      errorMessage = error.message;
    }
  }

  async function handleAddToTeam(event) {
    event.preventDefault();
    errorMessage = "";
    successMessage = "";

    try {
      await addPokemonToTeam(teamId, pokemon.id);
      successMessage = `${pokemon.name} a été ajouté à l'équipe.`;
    } catch (error) {
      errorMessage = error.message;
    }
  }

  // Échap ferme la modale
  function handleKeyDown(event) {
    if (event.key === "Escape") {
      onclose();
    }
  }
</script>

<!-- svelte:window écoute les touches sur toute la page -->
<svelte:window onkeydown={handleKeyDown} />

<div class="modal is-active">
  <!-- Clic sur le fond = fermeture. Échap fait déjà le même travail au clavier (handleKeyDown),
       d'où l'avertissement d'accessibilité ignoré ici -->
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div class="modal-background" onclick={onclose}></div>

  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{pokemon === null ? "Chargement..." : pokemon.name}</p>
      <button class="delete" aria-label="Fermer" onclick={onclose}></button>
    </header>

    <section class="modal-card-body">
      {#if pokemon !== null}
        <img src="/img/{pokemon.id}.webp" alt={pokemon.name} width="150" />

        <p>
          Types :
          {#each pokemon.types as type (type.id)}
            <span class="tag" style="background-color: #{type.color}; color: white">{type.name}</span>
          {/each}
        </p>
        <p>Favoris : {pokemon.favorites_count}</p>

        {#each stats as stat (stat.key)}
          <p>{stat.label} : {pokemon[stat.key]}</p>
          <progress class="progress is-danger" value={pokemon[stat.key]} max="255"></progress>
        {/each}

        {#if $session !== null}
          <button class="button is-danger" class:is-light={!isFavorite} onclick={toggleFavorite}>
            {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          </button>

          {#if myTeams.length > 0}
            <form onsubmit={handleAddToTeam} class="mt-4">
              <div class="select">
                <select bind:value={teamId}>
                  {#each myTeams as team (team.id)}
                    <option value={team.id}>{team.name}</option>
                  {/each}
                </select>
              </div>
              <button class="button is-primary" type="submit">Ajouter à l'équipe</button>
            </form>
          {/if}
        {/if}
      {/if}

      <p class="has-text-danger">{errorMessage}</p>
      <p class="has-text-success">{successMessage}</p>
    </section>
  </div>
</div>