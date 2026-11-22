import Joi from "joi";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/index.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

// Message volontairement flou : on ne dit pas si c'est l'email ou le mot de passe
// qui est faux (sinon on révélerait quels comptes existent)
const LOGIN_ERROR_MESSAGE = "Email ou mot de passe incorrect";

const registerUser = async (req, res, next) => {
    try {
        // Valide le body : si invalide, Joi lance une erreur, le catch la passe
        // à errorHandler qui répond 400
        const { email, username, password } = Joi.attempt(req.body, registerSchema);

        // L'email doit être unique, sinon 409 (Conflict)
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(StatusCodes.CONFLICT).json({ error: "Cet email est déjà utilisé" });
        }

        // Le nom d'utilisateur doit être unique, sinon 409
        const existingUsername = await User.findOne({ where: { username } });
        if (existingUsername) {
            return res
                .status(StatusCodes.CONFLICT)
                .json({ error: "Ce nom d'utilisateur est déjà utilisé" });
        }

        // Hache le mot de passe avec argon2 avant de l'enregistrer car on ne le stock jamais en clair
        const hashedPassword = await argon2.hash(password);

        const createdUser = await User.create({
            email,
            username,
            password: hashedPassword,
        });

        // On renvoie l'utilisateur SANS le mot de passe
        res.status(StatusCodes.CREATED).json({
            id: createdUser.id,
            username: createdUser.username,
            email: createdUser.email,
        });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = Joi.attempt(req.body, loginSchema);

        // Récupère l'utilisateur par son email : s'il n'existe pas, 401 avec le message flou
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: LOGIN_ERROR_MESSAGE });
        }

        // Compare le mot de passe fourni avec le hash stocké (sensible à la casse).
        // Attention à l'ordre : argon2.verify(hash, motDePasse)
        const isMatching = await argon2.verify(user.password, password);
        if (!isMatching) {
            // Exactement le même message que ci-dessus
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: LOGIN_ERROR_MESSAGE });
        }

        // Génère le token JWT : payload { userId, username }, valable 1h,
        // signé avec la clé secrète du .env
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(StatusCodes.OK).json({
            token,
            user: { id: user.id, username: user.username, email: user.email },
        });
    } catch (error) {
        next(error);
    }
};

// Avec un JWT, le serveur ne garde pas de session : la déconnexion consiste
// pour le client à supprimer son token. On renvoie juste une confirmation.
// (isAuthed est placé avant dans le router : il faut être connecté pour se déconnecter)
const logoutUser = (_req, res) => {
    res.status(StatusCodes.OK).json({ message: "Déconnexion réussie" });
};

export { registerUser, loginUser, logoutUser };