import express from 'express';
import DiscussionsController from '../controllers/DiscussionsController.js';  // Correction de l'importation
import { discussionsValidationRules } from '../utils/validators.js';
import ValidationMiddleware from '../middlewares/ValidationMiddleware.js';
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

// Route pour créer ou mettre à jour une discussion
router.post('/create',AuthMiddleware.verify, discussionsValidationRules(), ValidationMiddleware.validate, DiscussionsController.createOrUpdateDiscussion.bind(DiscussionsController));

// Route pour récupérer toutes les discussions d'un utilisateur spécifique
router.get('/',AuthMiddleware.verify, DiscussionsController.getDiscussions.bind(DiscussionsController));

// Route pour récupérer une discussion spécifique par son ID
router.get('/discussion/:id',AuthMiddleware.verify, DiscussionsController.getDiscussionById.bind(DiscussionsController));

export default router;
