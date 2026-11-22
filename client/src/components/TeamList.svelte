<script>
  import { onMount } from "svelte";
  import { session } from "../stores/session.js";
  import {
    getTeams,
    createTeam,
    updateTeam,
    deleteTeam,
    removePokemonFromTeam,
  } from "../services/team.service.js";

  let teams = $state([]);
  let message = $state("");

  // Le formulaire : visible quand showForm est vrai. editedId vaut null pour une création
  let showForm = $state(false);
  let editedId = $state(null);
  let name = $state("");
  let description = $state("");

  async function loadTeams() {
    try {
      teams = await getTeams();
      message = teams.length === 0 ? "Aucune équipe pour l'instant." : "";
    } catch (error) {
      message = error.message;
    }
  }

  onMount(loadTeams);

  // Une équipe est à moi si son user_id est le mien (celles du seed ont user_id null)
  function isMine(team) {
    return $session !== null && team.user_id === $session.userId;
  }

  function openForm(team) {
    editedId = team === null ? null : team.id;
    name = team === null ? "" : team.name;
    description = team === null ? "" : team.description || "";
    showForm = true;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    message = "";

    try {
      if (editedId === null) {
        await createTeam(name.trim(), description.trim());
      } else {
        await updateTeam(editedId, name.trim(), description.trim());
      }

      showForm = false;
      await loadTeams();
    } catch (error) {
      message = error.message;
    }
  }

  async function handleDelete(team) {
    if (!confirm(`Supprimer l'équipe "${team.name}" ?`)) {
      return;
    }

    try {
      await deleteTeam(team.id);
      await loadTeams();
    } catch (error) {
      message = error.message;
    }
  }

  async function handleRemovePokemon(team, pokemon) {
    try {
      await removePokemonFromTeam(team.id, pokemon.id);
      await loadTeams();
    } catch (error) {
      message = error.message;
    }
  }
</script>

{#if $session !== null}
  <button class="button is-primary mb-4" onclick={() => openForm(null)}>Nouvelle équipe</button>
{/if}

{#if showForm}
  <form class="box" onsubmit={handleSubmit}>
    <div class="field">
      <label class="label" for="team-name">Nom</label>
      <input class="input" id="team-name" type="text" bind:value={name} />
    </div>
    <div class="field">
      <label class="label" for="team-description">Description</label>
      <input class="input" id="team-description" type="text" placeholder="Facultatif" bind:value={description} />
    </div>
    <button class="button is-primary" type="submit">Enregistrer</button>
    <button class="button" type="button" onclick={() => (showForm = false)}>Annuler</button>
  </form>
{/if}

<p class="has-text-danger has-text-centered">{message}</p>

{#each teams as team (team.id)}
  <section class="box">
    <h2 class="title">{team.name}</h2>
    <p class="subtitle">{team.description || "Pas de description"}</p>

    <div class="buttons">
      {#each team.pokemons as pokemon (pokemon.id)}
        <span class="tag is-medium">
          <img src="/img/{pokemon.id}.webp" alt={pokemon.name} width="32" />
          {pokemon.name}
          {#if isMine(team)}
            <button class="delete is-small" aria-label="Retirer" onclick={() => handleRemovePokemon(team, pokemon)}></button>
          {/if}
        </span>
      {/each}
    </div>

    <p>
      Score global : {team.score.global.toFixed(1)}
      (offensif {team.score.offensive.toFixed(1)},
      défensif {team.score.defensive.toFixed(1)},
      vitesse {team.score.speed.toFixed(1)})
    </p>

    {#if isMine(team)}
      <div class="buttons mt-3">
        <button class="button is-info" onclick={() => openForm(team)}>Modifier</button>
        <button class="button is-danger" onclick={() => handleDelete(team)}>Supprimer</button>
      </div>
    {/if}
  </section>
{/each}