<script>
  import { login, register } from "../services/auth.service.js";

  // mode : "login" ou "register"
  let { mode, onclose } = $props();

  let email = $state("");
  let username = $state("");
  let password = $state("");
  let errorMessage = $state("");

  async function handleSubmit(event) {
    event.preventDefault();
    errorMessage = "";

    try {
      if (mode === "register") {
        await register(email, username, password);
      } else {
        await login(email, password);
      }

      onclose();
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

<svelte:window onkeydown={handleKeyDown} />

<div class="modal is-active">
  <!-- Clic sur le fond = fermeture. Échap fait déjà le même travail au clavier (handleKeyDown),
  d'où l'avertissement d'accessibilité ignoré ici -->
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div class="modal-background" onclick={onclose}></div>

  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{mode === "register" ? "Inscription" : "Connexion"}</p>
      <button class="delete" aria-label="Fermer" onclick={onclose}></button>
    </header>

    <section class="modal-card-body">
      <form onsubmit={handleSubmit}>
        {#if mode === "register"}
          <div class="field">
            <label class="label" for="auth-username">Nom d'utilisateur</label>
            <input class="input" id="auth-username" type="text" bind:value={username} />
          </div>
        {/if}

        <div class="field">
          <label class="label" for="auth-email">Email</label>
          <input class="input" id="auth-email" type="email" bind:value={email} />
        </div>

        <div class="field">
          <label class="label" for="auth-password">Mot de passe</label>
          <input class="input" id="auth-password" type="password" bind:value={password} />
        </div>

        <p class="has-text-danger">{errorMessage}</p>

        <button class="button is-primary" type="submit">
          {mode === "register" ? "Créer mon compte" : "Se connecter"}
        </button>
      </form>
    </section>
  </div>
</div>