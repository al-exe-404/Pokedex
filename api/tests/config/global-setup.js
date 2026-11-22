import { before, beforeEach, after } from "node:test";
import { app } from "../../app.js";
import { sequelize } from "../../src/models/index.js";

// Le serveur HTTP de test, démarré dans "before" et arrêté dans "after"
let server;

// Vide toutes les tables de la base de test
async function truncateTables() {
  // Requête SQL : pour chaque table du schéma public, TRUNCATE la vide,
  // RESTART IDENTITY remet les compteurs d'id à 1, CASCADE vide aussi les tables liées.
  // sequelize.query envoie du SQL écrit à la main.
  await sequelize.query(`
    DO $$ DECLARE
      r RECORD;
    BEGIN
      FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'TRUNCATE TABLE "' || r.tablename || '" RESTART IDENTITY CASCADE';
      END LOOP;
    END $$;
  `);
}

before(async () => {
  // Garde-fou : on refuse de continuer si la base n'est pas une base de test
  // Ici on lui indique de prendre la BDD qui se finit par _test pour éviter qu'il se serve de la vraie
  if (!sequelize.config.database.endsWith("_test")) {
    throw new Error(
      `Les tests doivent utiliser une base dont le nom finit par "_test" (base actuelle : ${sequelize.config.database})`
    );
  }

  // Recrée toutes les tables à partir des modèles (la base de test est vidée au passage)
  await sequelize.sync({ force: true });

  // On attend que le serveur écoute vraiment avant de lancer les tests :
  // app.listen appelle le 2e paramètre quand il est prêt, et resolve termine l'attente
  await new Promise(function (resolve) {
    server = app.listen(process.env.PORT, resolve);
  });
});

beforeEach(async () => {
  await truncateTables();
});

after(async () => {
  server.close();
  await sequelize.close();
});