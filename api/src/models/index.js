import { sequelize } from "./sequelize.client.js";
import { Pokemon } from "./pokemon.model.js";
import { Type } from "./type.model.js";
import { Team } from "./team.model.js";
import { User } from "./user.model.js";
import { Favorite } from "./favorite.model.js";

// Pokemon <-> Type : many-to-many (table de liaison pokemon_type)
Pokemon.belongsToMany(Type, {
  through: "pokemon_type",
  as: "types",
  foreignKey: "pokemon_id",
  otherKey: "type_id",
  timestamps: false,
});
Type.belongsToMany(Pokemon, {
  through: "pokemon_type",
  as: "pokemons",
  foreignKey: "type_id",
  otherKey: "pokemon_id",
  timestamps: false,
});

// Team <-> Pokemon : many-to-many (table de liaison team_pokemon)
// La clé primaire de la table de liaison est (team_id, pokemon_id) :
// la BDD empêche donc aussi les doublons dans une équipe.
Team.belongsToMany(Pokemon, {
  through: "team_pokemon",
  as: "pokemons",
  foreignKey: "team_id",
  otherKey: "pokemon_id",
  timestamps: false,
});
Pokemon.belongsToMany(Team, {
  through: "team_pokemon",
  as: "teams",
  foreignKey: "pokemon_id",
  otherKey: "team_id",
  timestamps: false,
});

// User <-> Team : one-to-many
// Un utilisateur a plusieurs équipes, une équipe n'a qu'un seul propriétaire.
// La colonne user_id est ajoutée dans la table team (vide pour les équipes du seed).
User.hasMany(Team, { as: "teams", foreignKey: "user_id" });
Team.belongsTo(User, { as: "user", foreignKey: "user_id" });

// User <-> Pokemon : many-to-many via la table favorite
// Un utilisateur a plusieurs Pokémons favoris, un Pokémon peut être le favori de plusieurs utilisateurs.
// Si un utilisateur ou un Pokémon est supprimé, ses favoris sont supprimés avec lui.
User.belongsToMany(Pokemon, {
  through: Favorite,
  as: "favorites",
  foreignKey: "user_id",
  otherKey: "pokemon_id",
});
Pokemon.belongsToMany(User, {
  through: Favorite,
  as: "fans",
  foreignKey: "pokemon_id",
  otherKey: "user_id",
});

export { sequelize, Pokemon, Type, Team, User, Favorite };