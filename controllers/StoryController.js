import BaseController from './BaseController.js';
import StoryService from '../services/StoryService.js';
import { sendResponse } from '../utils/response.js';

class StoryController extends BaseController {
    constructor() {
        super(StoryService);
    }

    async create(req, res) {
        try {
            const storyData = req.body;
            const filePath = req.file ? req.file.path : null;
            const newStory = await this.service.createStory(storyData, filePath, req.user.id);
            sendResponse(res, 201, newStory);
        } catch (err) {
            console.error('Erreur lors de la création de la story:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    async view(req, res) {
        try {
            const storyId = req.params.id;
            const updatedStory = await this.service.viewStory(storyId, req.user.id);
            sendResponse(res, 200, updatedStory);
        } catch (err) {
            console.error('Erreur lors de la vue de la story:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    async addReaction(req, res) {
        try {
            const storyId = req.params.id;
            const reactionData = req.body;
            reactionData.utilisateurId = req.user.id;
            const updatedStory = await this.service.addReaction(storyId, reactionData);
            sendResponse(res, 200, updatedStory);
        } catch (err) {
            console.error('Erreur lors de l\'ajout de la réaction:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    async addResponse(req, res) {
        try {
            const storyId = req.params.id;
            const responseData = req.body;
            responseData.utilisateurId = req.user.id;
            const updatedStory = await this.service.addResponse(storyId, responseData);
            sendResponse(res, 200, updatedStory);
        } catch (err) {
            console.error('Erreur lors de l\'ajout de la réponse:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    async removeResponse(req, res) {
        try {
            const storyId = req.params.id;
            const responseId = req.params.responseId;
            const updatedStory = await this.service.removeResponse(storyId, responseId, req.user.id);
            sendResponse(res, 200, updatedStory);
        } catch (err) {
            console.error('Erreur lors de la suppression de la réponse:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }
}

export default new StoryController();
