import BaseService from './BaseService.js';
import Utilisateur from '../models/Utilisateur.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';

class AuthService extends BaseService {
    constructor() {
        super(Utilisateur);
    }

    async register(profileData) {
        try {
            // Initialiser profile avec des valeurs par défaut correctes
            const utilisateurData = {
                profile: {
                    ...profileData,
                    sexe: profileData.sexe || 'Homme'  // Valeur par défaut pour sexe
                },
                mesMesures: {
                    commune: profileData.mesMesures?.commune || {},
                    homme: profileData.mesMesures?.homme || {},
                    femme: profileData.mesMesures?.femme || {}
                }
            };

            const utilisateur = new this.model(utilisateurData);
            await utilisateur.save();
            return utilisateur;  // Assurez-vous de retourner l'utilisateur sauvegardé
        } catch (err) {
            console.error('Erreur lors de l\'enregistrement:', err);
            throw err;
        }
    }

    async login(login, motDePasse) {
        try {
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