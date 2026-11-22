import { writable } from "svelte/store";

// Durée de vie du token : la même que expiresIn: "1h" dans l'API (en millisecondes)
const DURATION = 60 * 60 * 1000;

// Lit la session gardée dans le navigateur (null si absente ou expirée)
function loadSession() {
  const text = localStorage.getItem("pokedex_session");

  if (text === null) {
    return null;
  }

  // localStorage ne garde que du texte : JSON.parse le retransforme en objet
  const saved = JSON.parse(text);

  // Date.now() donne l'heure actuelle en millisecondes : si elle dépasse expiresAt, le token
  // est expiré, on supprime la session (sinon le menu afficherait "connecté" à tort)
  if (Date.now() > saved.expiresAt) {
    localStorage.removeItem("pokedex_session");
    return null;
  }

  return saved;
}

// Un store : { token, userId, username, expiresAt }, ou null si personne n'est connecté.
// Dans un composant, on le lit avec $session
export const session = writable(loadSession());

export function saveSession(token, user) {
  const data = {
    token: token,
    userId: user.id,
    username: user.username,
    expiresAt: Date.now() + DURATION,
  };

  // JSON.stringify transforme l'objet en texte
  localStorage.setItem("pokedex_session", JSON.stringify(data));
  session.set(data);
}

export function clearSession() {
  localStorage.removeItem("pokedex_session");
  session.set(null);
}