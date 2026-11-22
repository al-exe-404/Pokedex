import { StatusCodes } from "http-status-codes";
import { Team } from "../models/index.js";

// Vérifie que l'équipe de l'URL (/teams/:id) appartient à l'utilisateur connecté.
// À placer APRÈS isAuthed (qui fournit req.userId) et APRÈS validateId.
const isTeamOwner = async (req, res, next) => {
    try {
        const team = await Team.findByPk(req.params.id);

        if (!team) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Équipe introuvable" });
        }

        // 403 : tu es bien connecté (sinon ce serait un 401) mais tu n'as pas les droits.
        // Les équipes du seed n'ont pas de propriétaire (user_id vide) : personne ne peut les modifier.
        if (team.user_id !== req.userId) {
            return res
                .status(StatusCodes.FORBIDDEN)
                .json({ error: "Cette équipe ne vous appartient pas" });
        }

        next();
    } catch (error) {
        next(error);
    }
};

export { isTeamOwner };