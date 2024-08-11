import BaseController from './BaseController.js';
import DiscussionsService from '../services/DiscussionsService.js';
import { sendResponse } from '../utils/response.js';

class DiscussionsController extends BaseController {
    constructor() {
        super(DiscussionsService);
    }

    async createOrUpdateDiscussion(req, res) {
        try {
            // Récupérer l'ID de l'utilisateur connecté depuis req.user.id
            const userId = req.user.id;

            // Appeler le service avec les données de la discussion et l'ID de l'utilisateur
            const discussion = await this.service.createOrUpdateDiscussion(req.body, userId);
            sendResponse(res, 201, { message: 'Message envoyé avec succès', discussion });
        } catch (err) {
            console.error('Erreur lors de l\'envoi de message:', err);
            sendResponse(res, 500, { message: 'Erreur lors de l\'envoi du message', error: err.message });
        }
    }

    async getDiscussions(req, res) {
        try {
            // Utiliser req.user.id pour obtenir les discussions de l'utilisateur connecté
            const userId = req.user.id;
            const discussions = await this.service.getDiscussions(userId);
            sendResponse(res, 200, { discussions });
        } catch (err) {
            console.error('Erreur lors de la récupération des discussions:', err);
            sendResponse(res, 500, { message: 'Erreur lors de la récupération des discussions', error: err.message });
        }
    }

    async getDiscussionById(req, res) {
        try {
            const discussionId = req.params.id;
            const discussion = await this.service.getDiscussionById(discussionId);
            sendResponse(res, 200, { discussion });
        } catch (err) {
            console.error('Erreur lors de la récupération de la discussion:', err);
            sendResponse(res, 500, { message: 'Erreur lors de la récupération de la discussion', error: err.message });
        }
    }
}

export default new DiscussionsController();

