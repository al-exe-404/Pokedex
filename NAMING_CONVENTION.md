# Charte de nommage

Conventions de nommage suivies dans ce projet (code, fichiers, routes, base de données, Git).

## 1. Le code JavaScript

| Quoi | Style | Exemple |
|---|---|---|
| Variables | camelCase | `teamId`, `pokemonCount` |
| Fonctions | camelCase, avec un verbe | `findAllTeams`, `addPokemonToTeam` |
| Middlewares qui vérifient une condition | camelCase, avec `is` ou un verbe | `isAuthed`, `isTeamOwner`, `validateId` |
| Constantes de valeur fixe (nombre, texte, regex) | MAJUSCULES_AVEC_UNDERSCORES | `MAX_POKEMONS_PER_TEAM`, `EMAIL_REGEX` |
| Objets de configuration (options Sequelize, règles Joi) | camelCase | `includePokemons`, `teamName` |
| Schémas de validation Joi | camelCase, finit par `Schema` | `registerSchema`, `createTeamSchema` |
| Modèles Sequelize | PascalCase, au singulier | `Team`, `Pokemon`, `User` |

camelCase = premier mot en minuscule, puis une majuscule à chaque nouveau mot.
PascalCase = pareil, mais le premier mot a aussi une majuscule.

## 2. Les fichiers

Format : `nom.role.js`, en minuscules, mots séparés par des tirets

- `team.model.js`
- `team.service.js`
- `team.controller.js`
- `team.router.js`
- `team.schema.js` (schémas de validation Joi)
- `team.middleware.js` (middleware propre à une ressource)
- `common.middleware.js` (middlewares communs à toutes les routes)
- `is-authed.middleware.js` (nom composé : mots séparés par des tirets)
- `auth.controller.js`, `auth.router.js`, `auth.schema.js`

Fichiers de test dans `http/` : le nom de la ressource ou du scénario testé
(`teams.http`, `auth.http`, `ownership.http`).<br>
Tests automatiques dans `tests/` : `nom.unit.test.js` (unitaire) et `nom.spec.test.js` (intégration, avec la base de test).

Exceptions : `index.js` (dans `models/`) et `sequelize.client.js`.
Les fichiers de migration sont numérotés : `01.create-tables.js`, `02.seed-tables.js`.

## 3. Les routes de l'API

- Elles commencent toutes par `/`
- Le nom de la ressource est au **pluriel** et en minuscules
- **Aucun verbe** dans l'URL : c'est la méthode HTTP qui dit l'action

Exemples :
- `GET /teams` : lister les équipes
- `POST /teams` : créer une équipe
- `PATCH /teams/1` : modifier l'équipe 1
- `DELETE /teams/1` : supprimer l'équipe 1
- `POST /teams/1/pokemons` : ajouter un Pokémon à l'équipe 1

Exception : les routes d'authentification décrivent des **actions** et non des ressources
(`POST /auth/register`, `POST /auth/login`, `POST /auth/logout`), donc pas de pluriel
et un verbe dans l'URL.

## 4. La base de données

- Tables et colonnes en **snake_case** (minuscules, mots séparés par `_`)
- Noms de tables au **singulier**
- Une clé étrangère s'appelle `nomdelatable_id`
- Une table de liaison (many-to-many) porte le nom des deux tables, séparés par `_`
- Les dates automatiques de Sequelize sont `created_at` et `updated_at`

Exemples :
- tables : `pokemon`, `type`, `team`
- tables de liaison : `pokemon_type`, `team_pokemon`
- colonnes : `atk_spe`, `pokemon_id`, `user_id`

Exception : la table des utilisateurs s'appelle `app-user` et non `user`,
car `user` est un mot réservé par PostgreSQL. La clé étrangère vers cette table
s'appelle quand même `user_id` (colonne `user_id` dans la table `team`).

Dans le code JavaScript, les attributs des modèles Sequelize gardent le nom de la colonne
(`atk_spe`, `user_id`) : on écrit `team.user_id`, pas `team.userId`.

## 5. Git

### Branches

Format : `type/description-courte`

- `feature/mvp`
- `feature/auth`
- `fix/limite-equipe`

### Commits

Format : `type: description en français`

Les types :
- `feat` : une nouvelle fonctionnalité
- `fix` : la correction d'un bug
- `chore` : config, dépendances, mise en place du projet
- `test` : ajout ou modification de tests
- `docs` : documentation
- `refactor` : réécriture du code sans changer son comportement

Exemples :
- `chore: initialisation de l'API et installation des dépendances`
- `feat: ajout du CRUD des équipes`
- `feat: inscription avec validation Joi et mot de passe haché`
- `test: requêtes http avec un 2e utilisateur`
- `docs: mise à jour de la charte de nommage`