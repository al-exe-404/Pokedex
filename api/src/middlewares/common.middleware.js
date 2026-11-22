import { StatusCodes } from "http-status-codes";

// Vérifie que les paramètres d'URL "id" et "pokemonId" sont des entiers positifs.
// Sans ça, /teams/abc ferait planter la requête SQL.
const validateId = (req, res, next) => {
  const paramNames = ["id", "pokemonId"];

  for (const name of paramNames) {
    if (req.params[name] !== undefined) {
      const value = Number(req.params[name]);

      if (!Number.isInteger(value) || value <= 0) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: `Le paramètre ${name} doit être un entier positif` });
      }
    }
  }

  next();
};

// Route inconnue
const notFound = (_req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ error: "Route introuvable" });
};

// Middleware d'erreur : Express le reconnaît grâce à ses 4 paramètres
// (même si _next n'est pas utilisé, il doit rester dans la liste sinon Express ne le reconnaît pas).
const errorHandler = (error, _req, res, _next) => {
  // Erreur de validation Joi (lancée par Joi.attempt) : le client a envoyé
  // des données invalides, c'est donc une 400 et pas une erreur du serveur
  if (error.name === "ValidationError") {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }

  // Certaines erreurs portent un "status" (ex : JSON mal formé envoyé par le client : 400).
  // Sinon, c'est une erreur imprévue : on met 500.
  const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;

  // On loggue les vraies erreurs côté serveur, mais on ne les montre pas au client
  if (status === StatusCodes.INTERNAL_SERVER_ERROR) {
    console.error(error);
  }

  const message =
    status === StatusCodes.INTERNAL_SERVER_ERROR
      ? "Erreur interne du serveur"
      : error.message;

  res.status(status).json({ error: message });
};

export { validateId, notFound, errorHandler };