import { writable } from "svelte/store";

// Le thème enregistré dans le navigateur, sinon "dark"
export const theme = writable(localStorage.getItem("pokedex_theme") || "dark");

// subscribe : appelée tout de suite, puis à chaque changement du store.
// Bulma change ses couleurs selon l'attribut data-theme de <html>
theme.subscribe(function (value) {
  document.documentElement.setAttribute("data-theme", value);
  localStorage.setItem("pokedex_theme", value);
});

export function toggleTheme() {
  theme.update(function (current) {
    return current === "dark" ? "light" : "dark";
  });
}