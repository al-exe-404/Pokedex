<script>
  // Un clic molette pose un marqueur ; plus la souris s'écarte de ce point vers le bas
  // ou le haut, plus la page défile vite. Un clic ou Échap l'arrête.
  let active = $state(false);
  let originX = $state(0);
  let originY = $state(0);

  let mouseY = 0;
  let frameId = 0;

  function step() {
    // L'écart entre la souris et le marqueur (positif = vers le bas)
    const distance = mouseY - originY;

    // Zone morte de 12 px : la page ne bouge pas si la souris est proche du marqueur
    if (Math.abs(distance) > 12) {
      // C'est la liste (.scroller) qui défile, pas la fenêtre
      const scroller = document.querySelector(".scroller");
      scroller.scrollBy(0, distance * 0.1);
    }
    
    // requestAnimationFrame rappelle step avant chaque image : la fonction se relance elle-même
    frameId = requestAnimationFrame(step);
  }

  function start(x, y) {
    originX = x;
    originY = y;
    mouseY = y;
    active = true;
    frameId = requestAnimationFrame(step);
  }

  function stop() {
    active = false;
    cancelAnimationFrame(frameId);
  }

  function handleMouseDown(event) {
    if (active) {
      stop();
      return;
    }

    // event.button : 0 = clic gauche, 1 = clic molette, 2 = clic droit
    if (event.button !== 1) {
      return;
    }

    // Pas de défilement automatique dans une modale ou un champ de saisie
    if (event.target.closest("input, textarea, select, .modal") !== null) {
      return;
    }

    // Empêche le comportement habituel du clic molette
    event.preventDefault();
    start(event.clientX, event.clientY);
  }

  function handleMouseMove(event) {
    mouseY = event.clientY;
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      stop();
    }
  }
</script>

<!-- svelte:window écoute les événements de toute la fenêtre -->
<svelte:window onmousedown={handleMouseDown} onmousemove={handleMouseMove} onkeydown={handleKeyDown} />

{#if active}
  <!-- Un calque qui couvre la fenêtre : il change le curseur. Le marqueur est posé au clic -->
  <div class="overlay">
    <div class="marker" style="left: {originX}px; top: {originY}px">
      <svg viewBox="0 0 40 40" width="40" height="40">
        <path d="M2 20 A18 18 0 0 1 38 20 Z" fill="#e3350d"></path>
        <path d="M2 20 A18 18 0 0 0 38 20 Z" fill="#f2f2f2"></path>
        <line x1="2" y1="20" x2="38" y2="20" stroke="#1f1f1f" stroke-width="4"></line>
        <circle cx="20" cy="20" r="6.5" fill="#1f1f1f"></circle>
        <circle cx="20" cy="20" r="4" fill="#f2f2f2"></circle>
        <circle cx="20" cy="20" r="18" fill="none" stroke="#1f1f1f" stroke-width="2"></circle>
      </svg>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    cursor: ns-resize;
  }

  /* translate(-50%, -50%) centre le marqueur sur le point du clic */
  .marker {
    position: absolute;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
</style>