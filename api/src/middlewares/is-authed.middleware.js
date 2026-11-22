import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";


// Protège la route : le client doit envoyer  Authorization: Bearer <Token>
export function isAuthed(req, res, next) {
  // On récupère le header d'Authorization (ex: "Bearer eyJhbGciOi...")
  const authorizationHeader = req.headers.authorization; 
  if (!authorizationHeader) { 
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Authentification requise" });
    } 

  // On extrait le token en enlevant le préfixe "Bearer "
  const accessToken = authorizationHeader.substring("Bearer ".length);
  if (!accessToken) { 
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Token manquant" });
    }

  try {
    // Vérifie la signature et l'expiration du token, puis le décode
    // Exemple: { userId: 1, username: 'Alice', iat: 1753859516, exp: 1753863116 }
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);

    // On accroche l'id à req pour que les middlewares et controllers suivants
    // sachent quel utilisateur fait la requête.
    req.userId = decodedToken.userId;

    // Le token est décodé, donc il est valide, on peut donc passer au middleware suivant
    next();

  } catch (error) {
    // Si pas valide, ou expiré ==> 401
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Token invalide ou expiré" });
  }
};

// Pour les routes ouvertes à tout le monde, mais dont la réponse dépend de l'utilisateur
// (ici : les équipes visibles). Contrairement à isAuthed, elle ne refuse jamais :
// - pas de token, ou token invalide / expiré : on continue en visiteur (req.userId reste undefined)
// - token valide : req.userId est rempli, comme avec isAuthed
export function setUserIfAuthed(req, _res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return next();
  }

  const accessToken = authorizationHeader.substring("Bearer ".length);

  try {
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;
  } catch (error) {
    // Token invalide ou expiré : on ne répond pas 401 ici, la personne est traitée comme un visiteur
  }

  next();
};