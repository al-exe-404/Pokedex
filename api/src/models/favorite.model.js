// Ici on déclare la table "favorite", qui fera le lien entre un utilisateur
// et un Pokémon qu'il mettra en favori.

import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize.client.js';

export class Favorite extends Model {}

// On ne déclare aucune colonne ici (d'où le {} vide) car user_id
// et pokemon_id sont déjà ajoutés par les relations belongsToMany de models/index.js

Favorite.init(
    {},
    {
        sequelize,
        modelName: 'Favorite',
        tableName: 'favorite',
        timestamps: false
    }
);