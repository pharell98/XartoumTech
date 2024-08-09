import express from 'express';
import MesuresController from '../controllers/MesuresController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';

const router = express.Router();

// Route pour ajouter ou mettre à jour une mesure
router.post('/add', AuthMiddleware.verify, MesuresController.createOrUpdateMesure.bind(MesuresController));

// Route pour supprimer une mesure par nom
router.delete('/mesures/:nom', AuthMiddleware.verify, MesuresController.deleteMesure.bind(MesuresController));

// Route pour obtenir toutes les mesures d'un utilisateur
router.get('/', AuthMiddleware.verify, MesuresController.getMesures.bind(MesuresController));

// Route pour mettre à jour une mesure par nom
router.put('/mesures/:nom', AuthMiddleware.verify, MesuresController.updateMesure.bind(MesuresController));

export default router;
