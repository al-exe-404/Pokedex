<script>
  import { session, clearSession } from "../stores/session.js";
  import { theme, toggleTheme } from "../stores/theme.js";
  import { name, selectedTypeIds, types, availableTypeIds, resetFilters } from "../stores/filters.js";

  let { view, onchange, onlogin, onregister } = $props();

  function logout() {
    clearSession();
    onchange("pokemons");
  }

  // Un type est caché si un seul type est choisi et qu'aucun Pokémon ne l'a en duo avec lui
  function isHidden(typeId) {
    if ($availableTypeIds === null || $selectedTypeIds.includes(typeId)) {
      return false;
    }

    return !$availableTypeIds.has(typeId);
  }

  function toggleType(typeId) {
    // selectedTypeIds est un store (une variable partagée, voir stores/filters.js).
    // Le $ devant donne accès à son contenu : $selectedTypeIds lit la valeur,
    // et $selectedTypeIds = ... la modifie pour tous les composants qui l'utilisent.
    // Ce n'est pas une rune comme $state.
    if ($selectedTypeIds.includes(typeId)) {
      $selectedTypeIds = $selectedTypeIds.filter(function (id) {
        return id !== typeId;
      });
    } else if ($selectedTypeIds.length < 2) {
      // Un Pokémon a 2 types au maximum
      $selectedTypeIds = [...$selectedTypeIds, typeId];
    }
  }
</script>

<header class="topbar">
  <h1 class="title brand">
    <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
      <path d="M2 20 A18 18 0 0 1 38 20 Z" fill="#e3350d"></path>
      <path d="M2 20 A18 18 0 0 0 38 20 Z" fill="#f2f2f2"></path>
      <line x1="2" y1="20" x2="38" y2="20" stroke="#1f1f1f" stroke-width="4"></line>
      <circle cx="20" cy="20" r="6.5" fill="#1f1f1f"></circle>
      <circle cx="20" cy="20" r="4" fill="#f2f2f2"></circle>
      <circle cx="20" cy="20" r="18" fill="none" stroke="#1f1f1f" stroke-width="2"></circle>
    </svg>
    <span>Pokedex</span>
  </h1>

  <nav class="buttons is-centered">
    <button class="button" class:is-primary={view === "pokemons"} onclick={() => onchange("pokemons")}>Pokémons</button>
    <button class="button" class:is-primary={view === "popular"} onclick={() => onchange("popular")}>Top 10</button>
    <button class="button" class:is-primary={view === "teams"} onclick={() => onchange("teams")}>Teams</button>

    {#if $session !== null}
      <button class="button" class:is-primary={view === "favorites"} onclick={() => onchange("favorites")}>Mes favoris</button>
      <span class="button is-static">Connecté : {$session.username}</span>
      <button class="button" onclick={logout}>Déconnexion</button>
    {:else}
      <button class="button" onclick={onlogin}>Connexion</button>
      <button class="button" onclick={onregister}>Inscription</button>
    {/if}

    <button class="button" aria-label="Changer de thème" onclick={toggleTheme}>
      {$theme === "dark" ? "☀️" : "🌙"}
    </button>
  </nav>

  <!-- Recherche et types : seulement sur la liste complète -->
  {#if view === "pokemons"}
    <div class="search-row">
      <!-- Le <label> entoure la loupe et le champ : un clic sur la loupe active le champ -->
      <label class="search-box">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <circle cx="11" cy="11" r="7"></circle>
          <line x1="16.5" y1="16.5" x2="21" y2="21"></line>
        </svg>
        <input type="text" placeholder="Rechercher un nom..." bind:value={$name} />
      </label>

      <button class="button reset" onclick={resetFilters}>Tout afficher</button>
    </div>

    <div class="types">
      {#each $types as type (type.id)}
        {#if !isHidden(type.id)}
          <button
            class="type-pill"
            class:selected={$selectedTypeIds.includes(type.id)}
            class:dimmed={$selectedTypeIds.length > 0 && !$selectedTypeIds.includes(type.id)}
            style="background-color: #{type.color}"
            onclick={() => toggleType(type.id)}
          >
            {type.name}
          </button>
        {/if}
      {/each}
    </div>
  {/if}
</header>

<style>
  /* La barre reste collée en haut, sans fond : le décor est intact */
  .topbar {
    position: sticky;
    top: 0;
    z-index: 20;
    padding: 0.75rem 1rem 0.5rem;
    background: transparent;
  }

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
    font-size: 2.2rem;
    font-style: italic;
    font-weight: 800;
    letter-spacing: 0.03em;
    color: #ffcb05;
    text-shadow: 0 3px 0 #2a3a9c, 0 0 24px rgba(255, 203, 5, 0.3);
  }

  /* Un trait doré de chaque côté du titre, qui s'estompe vers l'extérieur */
  .brand::before,
  .brand::after {
    content: "";
    width: clamp(40px, 10vw, 160px);
    height: 2px;
  }

  .brand::before {
    background: linear-gradient(90deg, transparent, #ffcb05);
  }

  .brand::after {
    background: linear-gradient(90deg, #ffcb05, transparent);
  }

  /* La ligne de recherche : le champ et le bouton côte à côte, centrés */
  .search-row {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    margin: 0.5rem 0;
  }

  /* Un champ en pastille (border-radius 999px = bords complètement arrondis), largeur limitée */
  .search-box {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 340px;
    max-width: 100%;
    padding: 0 1rem;
    background-color: var(--bulma-scheme-main);
    border: 1px solid var(--bulma-border);
    border-radius: 999px;
  }

  /* :focus-within : vrai quand le champ À L'INTÉRIEUR est en cours de saisie */
  .search-box:focus-within {
    border-color: #3b8eea;
    box-shadow: 0 0 0 0.125em rgba(59, 142, 234, 0.3);
  }

  .search-box input {
    flex: 1;
    min-width: 0;
    padding: 0.6rem 0;
    font-size: 1rem;
    color: var(--bulma-text);
    background: transparent;
    border: none;
    outline: none;
  }

  .reset {
    border-radius: 999px;
  }

  /* Les types : des pastilles arrondies de la couleur du type */
  .types {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }

  .type-pill {
    padding: 0.3rem 1rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
    cursor: pointer;
    border: none;
    border-radius: 999px;
    transition: transform 0.15s ease, opacity 0.15s ease;
  }

  .type-pill:hover {
    transform: translateY(-2px);
  }

  /* Quand un type est choisi, les autres s'estompent : la sélection se voit tout de suite */
  .type-pill.dimmed {
    opacity: 0.55;
  }

  /* Un type choisi : un anneau autour de la pastille */
  .type-pill.selected {
    box-shadow: 0 0 0 2px var(--bulma-text);
  }

  @media (max-width: 480px) {
    .brand {
      font-size: 1.6rem;
    }
  }
</style>