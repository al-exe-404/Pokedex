import express from 'express';
import cors from 'cors';
import { xss } from "express-xss-sanitizer";
import authRoutes from './src/routes/auth.router.js';
import favoriteRoutes from './src/routes/favorite.router.js';
import pokemonRoutes from './src/routes/pokemon.router.js';
import teamRoutes from './src/routes/team.router.js';
import { errorHandler, notFound } from './src/middlewares/common.middleware.js';

const app = express();

// CORS : ajoute l'en-tête qui autorise le navigateur à appeler l'API depuis une autre adresse.
// À placer avant les routes. Ici toutes les origines sont autorisées (développement).
app.use(cors());

app.use(express.json());

// Body sanitizer anti-XSS
app.use(xss());

app.use("/auth", authRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/pokemons", pokemonRoutes);
app.use("/teams", teamRoutes);

// Route inconnue : 404
app.use(notFound);
// Toujours en dernier : gestion des erreurs
app.use(errorHandler);

// On exporte l'application SANS la démarrer : les tests la lancent eux-mêmes sur leur port
export { app };