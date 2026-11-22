import { describe, it } from "node:test";
import assert from "node:assert";
import { Pokemon } from "../src/models/index.js";

const API_URL = `http://localhost:${process.env.PORT}`;

// ---------- Fonctions d'aide pour préparer les données (ARRANGE) ----------

// Inscrit un utilisateur, le connecte et renvoie son token
async function createUserAndGetToken() {
  const user = { email: "alex@example.com", username: "alex", password: "Password123" };

  await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const loginResponse = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: user.email, password: user.password }),
  });
  const body = await loginResponse.json();

  return body.token;
}

// Crée une équipe pour l'utilisateur du token et renvoie l'id de l'équipe
async function createTeam(token) {
  const httpResponse = await fetch(`${API_URL}/teams`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name: "Ma team" }),
  });
  const body = await httpResponse.json();

  return body.id;
}

// Crée "count" Pokémons directement en base et renvoie la liste de leurs id
async function createPokemons(count) {
  const ids = [];

  for (let i = 1; i <= count; i++) {
    const pokemon = await Pokemon.create({
      name: `Pokemon ${i}`,
      hp: 50,
      atk: 50,
      def: 50,
      atk_spe: 50,
      def_spe: 50,
      speed: 50,
    });
    ids.push(pokemon.id);
  }

  return ids;
}

// Envoie la requête "ajouter un Pokémon à l'équipe" et renvoie la réponse
// (sans lire le body : les tests ont seulement besoin du statut)
async function postPokemonToTeam(token, teamId, pokemonId) {
  return fetch(`${API_URL}/teams/${teamId}/pokemons`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ pokemonId }),
  });
}

// ---------- Les tests ----------

describe("[POST] /teams/:id/pokemons", () => {

  it("should return a 400 error when adding a 7th Pokémon to a full team", async () => {
    // ARRANGE : un utilisateur, son équipe, 7 Pokémons, et on remplit l'équipe avec les 6 premiers
    const token = await createUserAndGetToken();
    const teamId = await createTeam(token);
    const pokemonIds = await createPokemons(7);

    for (let i = 0; i < 6; i++) {
      await postPokemonToTeam(token, teamId, pokemonIds[i]);
    }

    // ACT : on essaie d'ajouter le 7e
    const httpResponse = await postPokemonToTeam(token, teamId, pokemonIds[6]);

    // ASSERT
    assert.strictEqual(httpResponse.status, 400);
  });

  it("should return a 409 error when the Pokémon is already in the team", async () => {
    // ARRANGE : un utilisateur, son équipe, 1 Pokémon qu'on ajoute une première fois
    const token = await createUserAndGetToken();
    const teamId = await createTeam(token);
    const pokemonIds = await createPokemons(1);

    await postPokemonToTeam(token, teamId, pokemonIds[0]);

    // ACT : on l'ajoute une 2e fois
    const httpResponse = await postPokemonToTeam(token, teamId, pokemonIds[0]);

    // ASSERT
    assert.strictEqual(httpResponse.status, 409);
  });

  it("should return a 400 error when pokemonId is missing", async () => {
    // ARRANGE : un utilisateur et son équipe (pas besoin de Pokémons)
    const token = await createUserAndGetToken();
    const teamId = await createTeam(token);

    // ACT : on n'envoie pas de pokemonId (undefined disparaît du body : il vaut {})
    const httpResponse = await postPokemonToTeam(token, teamId, undefined);

    // ASSERT
    assert.strictEqual(httpResponse.status, 400);
  });

  it("should return a 400 error when pokemonId is not a number", async () => {
    // ARRANGE
    const token = await createUserAndGetToken();
    const teamId = await createTeam(token);

    // ACT : un texte qui n'est pas un nombre
    const httpResponse = await postPokemonToTeam(token, teamId, "abc");

    // ASSERT
    assert.strictEqual(httpResponse.status, 400);
  });

});