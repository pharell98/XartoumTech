import BaseController from './BaseController.js';
import AuthService from '../services/AuthService.js';
import { sendResponse } from '../utils/response.js';

class AuthController extends BaseController {
    constructor() {
        super(AuthService);
    }

    async register(req, res) {
        try {
            console.log('Données reçues pour l\'enregistrement:', req.body);
            await this.service.register(req.body.profile);  // Appelle le service d'enregistrement
            sendResponse(res, 201, { message: 'Enregistrement réussi' });  // Envoie uniquement un message de confirmation
        } catch (err) {
            console.error('Erreur lors de l\'enregistrement:', err);
            if (err.code === 11000) {
                sendResponse(res, 400, { message: 'Utilisateur déjà existant' });
            } else {
                sendResponse(res, 500, { message: 'Erreur serveur interne', error: err.message });
            }
        }
    }

    async login(req, res) {
        try {
            console.log('Données reçues pour la connexion:', req.body);
            const { login, motDePasse } = req.body;
            const { utilisateur, token } = await this.service.login(login, motDePasse);  // Appelle le service de connexion
            sendResponse(res, 200, { utilisateur, token });  // Envoie les données de l'utilisateur et le token
        } catch (err) {
            console.error('Erreur lors de la connexion:', err);
            sendResponse(res, 401, { message: err.message });
        }
    }
}

export default new AuthController();
