import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING(20), // 20 caractères maximum demandé dans l'énoncé.
      unique: true,  // Logique: deux utilisateurs ne peuvent pas avoir le même pseudo.
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true, // un email = un compte
        allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,  // On y stocke le mot de passe HACHÉ grâce à argon2, jamais en clair
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "app-user", // "user" est un mot réservé en PostgreSQL (voir la charte)
    timestamps: false
  },
);