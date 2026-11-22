import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize.client.js';

export class Type extends Model {}

Type.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        color: {
            type: DataTypes.STRING(7),
            allowNull: false  // la couleur est obligatoire (ex : 'ff4422') = 7 caractères
        },
    },
    {
        sequelize,
        modelName: 'Type',
        tableName: 'type',
        timestamps: false
    }
);