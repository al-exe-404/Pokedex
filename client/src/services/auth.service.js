import { apiFetch } from "./api.service.js";
import { saveSession } from "../stores/session.js";

export async function login(email, password) {
  const body = await apiFetch("/auth/login", "POST", { email, password });
  saveSession(body.token, body.user);
}

export async function register(email, username, password) {
  await apiFetch("/auth/register", "POST", { email, username, password });
  // Après l'inscription, on connecte directement l'utilisateur
  await login(email, password);
}