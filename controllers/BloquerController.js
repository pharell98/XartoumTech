import BaseController from './BaseController.js';
import BloquerService from '../services/BloquerService.js';
import { sendResponse } from '../utils/response.js';

class BloquerController extends BaseController {
    constructor() {
        super(BloquerService);
    }

    async bloquerUtilisateur(req, res) {
        try {
            const { id } = req.params; // l'ID de l'utilisateur à bloquer
            const userId = req.user.id; // l'ID de l'utilisateur courant
            if (id === userId) {
                return sendResponse(res, 400, { message: 'Un utilisateur ne peut pas se bloquer lui-même.' });
            }
            const utilisateur = await this.service.bloquerUtilisateur(id, userId);
            sendResponse(res, 201, { message: 'Utilisateur bloqué avec succès', utilisateur });
        } catch (err) {
            console.error('Erreur lors du blocage de l\'utilisateur:', err);
            sendResponse(res, 500, { message: 'Erreur lors du blocage de l\'utilisateur', error: err.message });
        }
    }

    async debloquerUtilisateur(req, res) {
        try {
            const { id } = req.params; // l'ID de l'utilisateur à débloquer
            const userId = req.user.id; // l'ID de l'utilisateur courant
            if (id === userId) {
                return sendResponse(res, 400, { message: 'Un utilisateur ne peut pas se débloquer lui-même.' });
            }
            const utilisateur = await this.service.debloquerUtilisateur(id, userId);
            sendResponse(res, 200, { message: 'Utilisateur débloqué avec succès', utilisateur });
        } catch (err) {
            console.error('Erreur lors du déblocage de l\'utilisateur:', err);
            sendResponse(res, 500, { message: 'Erreur lors du déblocage de l\'utilisateur', error: err.message });
        }
    }

    async getNombreUtilisateursBloquesParMoi(req, res) {
        try {
            const userId = req.user.id;
            const count = await this.service.getNombreUtilisateursBloquesParMoi(userId);
            sendResponse(res, 200, { message: 'Nombre d\'utilisateurs bloqués récupéré avec succès', count });
        } catch (err) {
            console.error('Erreur lors de la récupération du nombre d\'utilisateurs bloqués:', err);
            sendResponse(res, 500, { message: 'Erreur lors de la récupération du nombre d\'utilisateurs bloqués', error: err.message });
        }
    }

    async getNombreUtilisateursMeBloquer(req, res) {
        try {
            const userId = req.user.id;
            const count = await this.service.getNombreUtilisateursMeBloquer(userId);
            sendResponse(res, 200, { message: 'Nombre d\'utilisateurs qui vous ont bloqué récupéré avec succès', count });
        } catch (err) {
            console.error('Erreur lors de la récupération du nombre d\'utilisateurs qui vous ont bloqué:', err);
            sendResponse(res, 500, { message: 'Erreur lors de la récupération du nombre d\'utilisateurs qui vous ont bloqué', error: err.message });
        }
    }
}

export default new BloquerController();