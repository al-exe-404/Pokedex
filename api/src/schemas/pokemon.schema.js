import Joi from "joi";

// Ce que fait ce fichier : il décrit les règles que doivent respecter les paramètres de recherche: 
// au moins un des deux (name ou type) et au moins 3 caractères pour chacun.

// Les paramètres de recherche, ex : /pokemons/search?name=pika&type=eau
export const searchPokemonSchema = Joi.object({
  // Chaque paramètre doit faire au moins 3 caractères (après suppression des espaces)
  name: Joi.string().trim().min(3).messages({
    "string.min": "Le nom recherché doit contenir au moins 3 caractères",
    "string.empty": "Le nom recherché doit contenir au moins 3 caractères",
  }),
  type: Joi.string().trim().min(3).messages({
    "string.min": "Le type recherché doit contenir au moins 3 caractères",
    "string.empty": "Le type recherché doit contenir au moins 3 caractères",
  }),
})
  // Il faut au moins un des deux paramètres
  .or("name", "type")
  .messages({
    "object.missing": "Il faut renseigner au moins un nom ou un type",
  });