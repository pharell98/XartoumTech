import BaseController from './BaseController.js';
import AuthService from '../services/AuthService.js';
import { sendResponse } from '../utils/response.js';
import { generateToken } from '../utils/jwt.js';

class AuthController extends BaseController {
    constructor() {
        super(AuthService);
    }

    async register(req, res) {
        try {
            console.log('Données reçues pour l\'enregistrement:', req.body.profile);
            const utilisateur = await this.service.register(req.body.profile);
            const token = generateToken(utilisateur);
            sendResponse(res, 201, { message: 'Enregistrement réussi', utilisateur, token });
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
            const { login, motDePasse } = req.body;
            const { utilisateur, token } = await this.service.login(login, motDePasse);
            sendResponse(res, 200, { utilisateur, token });
        } catch (err) {
            console.error('Erreur lors de la connexion:', err);
            sendResponse(res, 401, { message: err.message });
        }
    }


}

export default new AuthController();