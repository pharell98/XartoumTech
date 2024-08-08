import BaseController from './BaseController.js';
import StoryService from '../services/StoryService.js';
import { sendResponse } from '../utils/response.js';
import multer from 'multer';
import fs from 'fs';

const upload = multer({ dest: 'uploads/' });

class StoryController extends BaseController {
    constructor() {
        super(StoryService);
    }

    async create(req, res) {
        try {
            const storyData = req.body;
            const filePath = req.file ? req.file.path : null;
            const expirationTime = 24 * 60 * 60 * 1000; // 24 heures en millisecondes
            storyData.expiration = new Date(Date.now() + expirationTime);
            const newStory = await this.service.createStory(storyData, filePath);
            if (filePath) {
                fs.unlinkSync(filePath);  // Supprime le fichier local après l'upload
            }
            sendResponse(res, 201, newStory);
        } catch (err) {
            console.error('Erreur lors de la création de la story:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    async view(req, res) {
        try {
            const storyId = req.params.id;
            const userId = req.user._id;
            const updatedStory = await this.service.viewStory(storyId, userId);
            sendResponse(res, 200, updatedStory);
        } catch (err) {
            console.error('Erreur lors de la vue de la story:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }
}

export default new StoryController();
