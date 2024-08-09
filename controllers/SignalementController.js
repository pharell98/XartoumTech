import BaseController from './BaseController.js';
import SignalementService from '../services/SignalementService.js';
import { sendResponse } from '../utils/response.js';

class SignalementController extends BaseController {
    constructor() {
        super(SignalementService);
    }

    async addSignal(req, res) {
        try {
            const { idUtilisateurSignale, motif, description } = req.body;
            const idUtilisateurSignalant = req.user.id;

            const signalement = await this.service.addSignal(idUtilisateurSignalant, { idUtilisateurSignale, motif, description });
            sendResponse(res, 201, { message: 'Signalement créé avec succès', signalement });
        } catch (err) {
            console.error('Erreur lors de la création du signalement:', err);
            sendResponse(res, 500, { message: 'Erreur lors de la création du signalement', error: err.message });
        }
    }
}

export default new SignalementController();
