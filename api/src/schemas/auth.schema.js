import Joi from "joi";

// Regex email standard : du texte, un @, du texte, un point, du texte (sans espace)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registerSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase() // on enregistre les emails en minuscules
    .regex(EMAIL_REGEX)
    .required()
    .messages({ "string.pattern.base": "L'email n'est pas valide" }),

  username: Joi.string()
    .alphanum() // lettres et chiffres uniquement : pas de caractères spéciaux
    .min(3)
    .max(20)
    .required()
    .messages({
      "string.alphanum": "Le nom d'utilisateur ne doit pas contenir de caractères spéciaux",
      "string.min": "Le nom d'utilisateur doit contenir entre 3 et 20 caractères",
      "string.max": "Le nom d'utilisateur doit contenir entre 3 et 20 caractères",
    }),

  // Au moins 8 caractères, avec 1 chiffre, 1 minuscule et 1 majuscule
  password: Joi.string()
    .min(8)
    .regex(/[0-9]/)
    .regex(/[a-z]/)
    .regex(/[A-Z]/)
    .required()
    .messages({
      "string.min": "Le mot de passe doit contenir au moins 8 caractères",
      "string.pattern.base":
        "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre",
    }),
}).required(); // .required() : refuse aussi une requête sans body du tout

export const loginSchema = Joi.object({
  // On met l'email en minuscules comme à l'inscription, pour que
  // "Alex@Example.com" retrouve bien le compte "alex@example.com".
  // Pas de vérification de format ici : un email mal écrit reçoit le même
  // message flou qu'un mauvais mot de passe.
  email: Joi.string().trim().lowercase().required(),
  // Pas besoin de valider plus que ça : le mot de passe est comparé juste après
  password: Joi.string().required(),
}).required();