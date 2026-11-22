import { sequelize } from '../models/index.js';

// Crée les tables dans la base de données à partir des modèles définis.
// force: true permet de supprimer les tables existantes (ainsi que les données) avant de les recréer.
await sequelize.sync({ force: true });
console.log("✅ Toutes les tables ont été créées.");

// On oublie pas de fermer la connexion
await sequelize.close();