import { describe, it } from "node:test";
import assert from "node:assert";

// Adresse de l'API de test : le port vient de .env.test
const API_URL = `http://localhost:${process.env.PORT}`;

// Le même message pour les deux cas d'échec de connexion
const LOGIN_ERROR_MESSAGE = "Email ou mot de passe incorrect";

describe("[POST] /auth/login", () => {

  it("should return a 401 error if the email does not exist", async () => {
    // ARRANGE : rien à préparer, la base est vide

    // ACT : fetch envoie une vraie requête HTTP à l'API.
    // method, headers et body sont les mêmes que dans les fichiers .http
    const httpResponse = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "inconnu@example.com", password: "Password123" }),
    });
    // .json() lit le body de la réponse (c'est asynchrone : il faut le await)
    const body = await httpResponse.json();

    // ASSERT
    assert.strictEqual(httpResponse.status, 401);
    assert.strictEqual(body.error, LOGIN_ERROR_MESSAGE);
  });

  it("should return the exact same 401 error if the password is wrong", async () => {
    // ARRANGE : on inscrit un utilisateur, pour que l'email existe
    await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "alex@example.com", username: "alex", password: "Password123" }),
    });

    // ACT : on se connecte avec le bon email, mais "password123" en minuscules :
    // le mot de passe est sensible à la casse
    const httpResponse = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "alex@example.com", password: "password123" }),
    });
    const body = await httpResponse.json();

    // ASSERT : le même statut et le même message que si l'email n'existait pas
    assert.strictEqual(httpResponse.status, 401);
    assert.strictEqual(body.error, LOGIN_ERROR_MESSAGE);
  });

});

describe("[POST] /auth/register", () => {

  it("should not return the password when the account is created", async () => {
    // ARRANGE : les données du compte à créer
    const newUser = { email: "alex@example.com", username: "alex", password: "Password123" };

    // ACT
    const httpResponse = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    const body = await httpResponse.json();

    // ASSERT
    assert.strictEqual(httpResponse.status, 201);
    // Pas de champ password dans la réponse
    assert.strictEqual(body.password, undefined);
    // Et le mot de passe en clair n'apparaît nulle part dans ce qui est renvoyé
    assert.ok(!JSON.stringify(body).includes("Password123"));
  });

});