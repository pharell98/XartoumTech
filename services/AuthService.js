import BaseService from './BaseService.js';
import Utilisateur from '../models/Utilisateur.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';
import { sendResponse } from '../utils/response.js';

class AuthService extends BaseService {
    constructor() {
        super(Utilisateur);
    }

    async register(profileData) {
        try {
         //   console.log('Tentative d\'enregistrement avec le profil:', profileData);
            const utilisateur = new this.model({ profile: profileData });
            await utilisateur.save();
        } catch (err) {
            console.error('Erreur lors de l\'enregistrement:', err);
            throw err;
        }
    }

    async login(login, motDePasse) {
        try {
            console.log('Tentative de connexion avec le login:', login);
            const utilisateur = await this.model.findOne({ 'profile.login': login });
            if (!utilisateur) {
                throw new Error('Utilisateur non trouvé');
            }

            const isMatch = await bcrypt.compare(motDePasse, utilisateur.profile.motDePasse);
            if (!isMatch) {
                throw new Error('Mot de passe incorrect');
            }

            const token = generateToken(utilisateur);
            return { utilisateur, token };
        } catch (err) {
            console.error('Erreur lors de la connexion:', err);
            throw err;
        }
    }
}

export default new AuthService();
