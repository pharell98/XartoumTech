import express from 'express';
import SignalementController from '../controllers/SignalementController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';
import { signalementValidationRules } from '../utils/validators.js';
import ValidationMiddleware from '../middlewares/ValidationMiddleware.js';

const router = express.Router();

// Route pour créer un nouveau signalement
router.post('/add', AuthMiddleware.verify, signalementValidationRules(), ValidationMiddleware.validate, SignalementController.addSignal.bind(SignalementController));

export default router;
