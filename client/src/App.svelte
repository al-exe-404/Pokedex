<script>
  import Background from "./components/Background.svelte";
  import AutoScroll from "./components/AutoScroll.svelte";
  import Header from "./components/Header.svelte";
  import PokemonList from "./components/PokemonList.svelte";
  import TeamList from "./components/TeamList.svelte";
  import PokemonModal from "./components/PokemonModal.svelte";
  import AuthModal from "./components/AuthModal.svelte";
  import { session } from "./stores/session.js";

  let view = $state("pokemons");
  let selectedPokemonId = $state(null);
  let authMode = $state(null);
  let version = $state(0);

  // La hauteur de la barre (titre, menu, recherche, types), mesurée par bind:clientHeight
  let headerHeight = $state(0);

  // L'élément <main class="scroller">, rempli par bind:this
  let scroller;

  function closePokemon() {
    selectedPokemonId = null;
  }

  // On ne recharge que Top 10 et Mes favoris
  function handleFavoriteChange() {
    if (view === "popular" || view === "favorites") {
      version += 1;
    }
  }

  // La molette tourne n'importe où sur la page : on fait défiler la liste à la place
  function handleWheel(event) {
    // Si la souris est déjà sur la liste, le navigateur la fait défiler tout seul
    if (scroller.contains(event.target)) {
      return;
    }

    // Dans une modale, la molette garde son comportement normal
    if (event.target.closest(".modal") !== null) {
      return;
    }

    // deltaMode indique l'unité de deltaY : 0 = pixels, 1 = lignes, 2 = pages.
    // Selon le navigateur (Firefox sous Linux notamment), un cran de molette est envoyé en lignes : on le convertit en pixels
    let distance = event.deltaY;

    if (event.deltaMode === 1) {
      distance = distance * 16;
    } else if (event.deltaMode === 2) {
      distance = distance * scroller.clientHeight;
    }

    // Coefficient de vitesse de la molette hors de la liste (1 = brut, 0.5 = deux fois plus lent)
    const SPEED = 0.35;

    scroller.scrollBy(0, distance * SPEED);
  }
</script>

<!-- svelte:window écoute les événements de toute la fenêtre -->
<svelte:window onwheel={handleWheel} />

<Background />
<AutoScroll />

<!-- Le conteneur de la page : exactement la hauteur de la fenêtre, sans défilement de la page -->
<div class="page">
  <!-- bind:clientHeight : Svelte garde headerHeight à jour, même quand les types changent la hauteur -->
  <div bind:clientHeight={headerHeight}>
    <Header
      {view}
      onchange={(name) => (view = name)}
      onlogin={() => (authMode = "login")}
      onregister={() => (authMode = "register")}
    />
  </div>

  <!-- La liste défile ICI : overflow-y: auto coupe les cartes au bord haut du conteneur,
       elles disparaissent à 15 px sous la barre -->
  <main
    bind:this={scroller}
    class="container scroller"
    style="height: calc(100vh - {headerHeight}px - 15px)"
  >
    <!-- {#key} détruit et recrée son contenu quand la valeur change : la liste se recharge
         quand version change (favori modifié) ou quand on se connecte / déconnecte -->
    {#key `${version}-${$session === null}`}
      {#if view === "teams"}
        <TeamList />
      {:else}
        <PokemonList source={view === "pokemons" ? "all" : view} onselect={(id) => (selectedPokemonId = id)} />
      {/if}
    {/key}
  </main>
</div>

{#if selectedPokemonId !== null}
  <PokemonModal id={selectedPokemonId} onclose={closePokemon} onfavoritechange={handleFavoriteChange} />
{/if}

{#if authMode !== null}
  <AuthModal mode={authMode} onclose={() => (authMode = null)} />
{/if}

<style>
  /* La page ne défile plus : c'est .scroller qui défile */
  .page {
    height: 100vh;
    overflow: hidden;
  }

  /* margin-top: 15px : l'écart entre le bas des types et le bord où les cartes disparaissent */
  .scroller {
    margin-top: 15px;
    overflow-y: auto;
  }
</style>