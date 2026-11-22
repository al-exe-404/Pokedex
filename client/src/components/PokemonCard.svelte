<script>
  let { pokemon, onselect, showCount = false } = $props();

  // $derived : recalcule ces valeurs toutes seules si pokemon change.
  // Couleur du 1er type et du dernier (le même si le Pokémon n'a qu'un type)
  let color = $derived(pokemon.types.length > 0 ? pokemon.types[0].color : "6b7a99");
  let color2 = $derived(
    pokemon.types.length > 0 ? pokemon.types[pokemon.types.length - 1].color : "6b7a99"
  );
</script>


<button
  class="card pokemon-card"
  style="--type-color: #{color}; --type-color-2: #{color2}"
  onclick={() => onselect(pokemon.id)}
>
  <img src="/img/{pokemon.id}.webp" alt={pokemon.name} />
  <p class="has-text-weight-bold">N°{pokemon.id} {pokemon.name}</p>

  {#if showCount}
    <p>♥ {pokemon.favorites_count}</p>
  {/if}
</button>

<style>
  .pokemon-card {
    width: 100%;
    padding: 1rem;
    cursor: pointer;
    text-align: center;
    border: 2px solid var(--type-color);
    border-radius: 14px;
    background: linear-gradient(
      160deg,
      color-mix(in srgb, var(--type-color) 30%, var(--bulma-scheme-main)),
      color-mix(in srgb, var(--type-color-2) 10%, var(--bulma-scheme-main))
    );
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .pokemon-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 20px var(--type-color);
  }

  .pokemon-card img {
    transition: transform 0.2s ease;
  }

  .pokemon-card:hover img {
    transform: scale(1.1);
  }
</style>