import BaseService from './BaseService.js';
import Utilisateur from '../models/Utilisateur.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';
import { cloudinary } from '../config/cloudinary.js';  // Importation nommée

class AuthService extends BaseService {
    constructor() {
        super(Utilisateur);
    }

    async register(profileData, filePath) {
        try {
            // Vérifiez si un fichier est fourni pour l'upload
            if (filePath) {
                const result = await cloudinary.uploader.upload(filePath, {
                    folder: 'profiles'
                });
                profileData.photo = result.secure_url; // Stocker l'URL de la photo dans le profil
            }

            // Initialiser profile avec des valeurs par défaut correctes
            const utilisateurData = {
                profile: {
                    ...profileData,
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

    async updateSolde(userId, solde) {
        try {
            const utilisateur = await this.model.findById(userId);
            if (!utilisateur) {
                throw new Error('Utilisateur non trouvé');
            }

            utilisateur.solde = solde;
            await utilisateur.save();
            return utilisateur;
        } catch (err) {
            console.error('Erreur lors de la mise à jour du solde:', err);
            throw err;
        }
    }
}

export default new AuthService();
