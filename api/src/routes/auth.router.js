import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/auth.controller.js";
import { isAuthed } from "../middlewares/is-authed.middleware.js";

const router = express.Router();

router.post("/register", registerUser); // Inscription
router.post("/login", loginUser); // Connexion
router.post("/logout", isAuthed, logoutUser); // Déconnexion (il faut être connecté pour se déconnecter)

export default router;