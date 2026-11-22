import Joi from "joi";

// Nom d'équipe : obligatoire, de 1 à 50 caractères. (sensible à la casse)
const teamName = Joi.string().trim().min(1).max(50).required().messages({
"string.empty": "Le nom d'équipe est obligatoire",
"any.required": "Le nom d'équipe est obligatoire",
"string.max": "Le nom d'équipe doit contenir au maximum {#limit} caractères",
});

// Description d'équipe : facultative (pas de .required(), le champ peut être absent).
// .allow("") autorise en plus la chaîne vide, pour pouvoir effacer une description.
const teamDescription = Joi.string().trim().allow("");

// À la création : le nom, et une description facultative.
export const createTeamSchema = Joi.object({
name: teamName,
description: teamDescription,
}).required();  // Garantit que la requête contient un objet JSON exploitable.

// À la modification : le nom (obligatoire) et la description (facultative).
export const updateTeamSchema = Joi.object({
name: teamName,
description: teamDescription,
}).required();