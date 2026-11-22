<script>
  import { theme } from "../stores/theme.js";
</script>

<!-- Les deux images sont superposées : seule l'opacité change (fondu entre nuit et jour) -->
<div class="background">
  <div class="picture night" class:visible={$theme === "dark"}></div>
  <div class="picture day" class:visible={$theme === "light"}></div>
</div>

<style>
  /* position: fixed : le fond ne bouge pas quand on défile. z-index: -1 : derrière le contenu */
  .background {
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
  }

  /* L'image remplit toute la fenêtre. background-size peut valoir :
     cover (plein écran, un peu rognée), contain (entière, avec des bandes) ou 100% 100% (étirée) */
  .picture {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 0.6s ease;
  }

  .picture.visible {
    opacity: 1;
  }

  .night {
    background-image: url("/bg/night.webp");
  }

  .day {
    background-image: url("/bg/day.webp");
  }
</style>