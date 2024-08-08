import BaseService from './BaseService.js';
import Signalement from '../models/Signalement.js';
import Utilisateur from '../models/Utilisateur.js';

class SignalementService extends BaseService {
    constructor() {
        super(Signalement);
    }

    async addSignal(idUtilisateurSignalant, signaleData) {
        try {
            const { idUtilisateurSignale, motif, description } = signaleData;

            // Vérifier que l'utilisateur ne se signale pas lui-même
            if (idUtilisateurSignalant === idUtilisateurSignale) {
                throw new Error("Un utilisateur ne peut pas se signaler lui-même.");
            }

            // Créer et sauvegarder le signalement
            const nouveauSignalement = new this.model({
                idUtilisateurSignale,
                idUtilisateurSignalant,
                motif,
                description
            });
            await nouveauSignalement.save();

            // Gérer le comptage des signalements
            await this.incrementSignalementsCount(idUtilisateurSignale);

            return nouveauSignalement;
        } catch (err) {
            console.error('Erreur lors de la création du signalement:', err);
            throw err;
        }
    }

    async incrementSignalementsCount(idUtilisateurSignale) {
        try {
            // Trouver l'utilisateur signalé
            const utilisateur = await Utilisateur.findById(idUtilisateurSignale);
            if (!utilisateur) {
                throw new Error('Utilisateur non trouvé');
            }

            // Incrémenter le compteur de signalements
            utilisateur.signalementsCount += 1;

            // Mettre à jour l'état du profil si le nombre de signalements atteint 3
            if (utilisateur.signalementsCount >= 3 && utilisateur.profile.stateProfiles === 'normal') {
                utilisateur.profile.stateProfiles = 'signaler';
            }

            // Supprimer l'utilisateur si le nombre de signalements atteint 10 et que le profil est déjà en état "signaler"
            if (utilisateur.signalementsCount >= 10 && utilisateur.profile.stateProfiles === 'signaler') {
                await Utilisateur.findByIdAndDelete(idUtilisateurSignale);
            } else {
                await utilisateur.save();
            }
        } catch (err) {
            console.error('Erreur lors du comptage des signalements:', err);
            throw err;
        }
    }
}

export default new SignalementService();
