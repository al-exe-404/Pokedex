import { get } from "svelte/store";
import { session, clearSession } from "../stores/session.js";

const API_URL = import.meta.env.VITE_API_URL;

// Une seule fonction pour toutes les requêtes.
// Elle renvoie le body de la réponse, ou lance une Error avec le message de l'API.
export async function apiFetch(path, method = "GET", data) {
  const headers = {};
  const options = { method: method, headers: headers };

  if (data !== undefined) {
    headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  // get(session) lit le store en dehors d'un composant
  const currentSession = get(session);

  if (currentSession !== null) {
    headers.Authorization = `Bearer ${currentSession.token}`;
  }

  let response;

  try {
    response = await fetch(`${API_URL}${path}`, options);
  } catch (error) {
    throw new Error("Impossible de joindre l'API. Est-elle lancée ?");
  }

  const body = await response.json();

  // Token refusé : on se déconnecte
  if (response.status === 401 && currentSession !== null) {
    clearSession();
  }

  // response.ok vaut false pour un 400, 404, 500... : on lance l'erreur avec le message de l'API
  if (!response.ok) {
    throw new Error(body.error || "Une erreur est survenue");
  }

  return body;
}