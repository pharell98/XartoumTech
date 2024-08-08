import express from 'express';
import EvaluationController from '../controllers/EvaluationController.js';  // Assurez-vous que ce chemin est correct
import { evaluationValidationRules } from '../utils/validators.js';  // Assurez-vous que cette fonction est définie
import ValidationMiddleware from '../middlewares/ValidationMiddleware.js';  // Assurez-vous que ce fichier existe et exporte 'validate'
import AuthMiddleware from '../middlewares/AuthMiddleware.js';  // Assurez-vous que ce fichier existe et exporte 'verify'

const router = express.Router();

// Route pour créer une évaluation
router.post(
  '/create',
  AuthMiddleware.verify,  // Vérification de l'authentification de l'utilisateur
  evaluationValidationRules(),  // Validation des données de la requête
  ValidationMiddleware.validate,  // Gestion des erreurs de validation
  EvaluationController.createEvaluation.bind(EvaluationController)  // Contrôleur pour créer une évaluation
);

export default router;
