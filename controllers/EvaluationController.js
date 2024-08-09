import BaseController from './BaseController.js';
import EvaluationService from '../services/EvaluationService.js';
import { sendResponse } from '../utils/response.js';

class EvaluationController extends BaseController {
    constructor() {
        super(EvaluationService);
    }

    // Create a new Evaluation
    async createEvaluation(req, res) {
        try {
            // Vérifie si l'utilisateur essaie de se voter lui-même
            if (req.body.utilisateurId === req.user.id) {
                return sendResponse(res, 400, { message: 'Vous ne pouvez pas vous évaluer vous-même.' });
            }

            // Vérifie si la note dépasse la limite autorisée
            if (req.body.note > 5) {
                return sendResponse(res, 400, { message: 'La note ne peut pas dépasser 5.' });
            }

            // Vérifie si la note est inférieure à la limite autorisée
            if (req.body.note < 0) {
                return sendResponse(res, 400, { message: 'La note ne peut pas être inférieure à 0.' });
            }

            const evaluation = await this.service.createEvaluation(req.body);
            sendResponse(res, 201, { message: 'Évaluation créée avec succès', evaluation });
        } catch (err) {
            console.error('Erreur lors de la création de l\'évaluation:', err);
            sendResponse(res, 500, { message: 'Erreur lors de la création de l\'évaluation', error: err.message });
        }
    }
}

export default new EvaluationController();
