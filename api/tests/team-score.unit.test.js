// Test simple pour m'entrainer

import { describe, it } from "node:test";
import assert from "node:assert";
import { calculateTeamScore } from "../src/services/team-score.service.js";

describe("calculateTeamScore", () => {

  it("should return the 4 averages of a team of 2 Pokémon", () => {
    // ARRANGE : une équipe de 2 Pokémons, avec les moyennes calculées à la main
    const teamPokemon = [
      { hp: 45, atk: 49, def: 49, atk_spe: 65, def_spe: 65, speed: 45 },
      { hp: 39, atk: 52, def: 43, atk_spe: 60, def_spe: 50, speed: 65 },
    ];

    // ACT
    const result = calculateTeamScore(teamPokemon);

    // ASSERT : deepStrictEqual compare le CONTENU d'un objet (comme toEqual dans Jest)
    assert.deepStrictEqual(result, { offensive: 56.5, defensive: 48.5, speed: 55, global: 53.3 });
  });

  it("should return 0 everywhere for an empty team", () => {
    // ARRANGE : une équipe vide est un tableau sans aucun élément
    const teamPokemon = [];

    // ACT
    const result = calculateTeamScore(teamPokemon);

    // ASSERT
    assert.deepStrictEqual(result, { offensive: 0, defensive: 0, speed: 0, global: 0 });
  });

});