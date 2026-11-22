import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize.client.js';

export class Team extends Model {}

Team.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT // optionnelle (pas de allowNull: false), true par default
        }
    },
    {
        sequelize,
        modelName: 'Team',
        tableName: 'team',
        timestamps: false
    }
);