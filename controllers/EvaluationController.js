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
            const evaluation = await this.service.createEvaluation(req.body);
            sendResponse(res, 201, { message: 'Évaluation créée avec succès', evaluation });
        } catch (err) {
            console.error('Erreur lors de la création de l\'évaluation:', err);
            sendResponse(res, 500, { message: 'Erreur lors de la création de l\'évaluation', error: err.message });
        }
    }
}
export default new EvaluationController();