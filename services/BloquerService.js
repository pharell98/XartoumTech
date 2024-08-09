import BaseService from './BaseService.js';
import Utilisateur from '../models/Utilisateur.js';

class BloquerService extends BaseService {
    constructor() {
        super(Utilisateur);
    }

    async bloquerUtilisateur(utilisateurId, userId) {
        if (utilisateurId === userId) {
            throw new Error('Un utilisateur ne peut pas se bloquer lui-même.');
        }
    
        try {
            // Ajouter utilisateurId à la liste des utilisateurs bloqués par userId
            const utilisateur = await this.model.findByIdAndUpdate(
                userId,
                { $addToSet: { bloquer: utilisateurId } },
                { new: true }
            );
    
            // Optionnel : Vous pouvez également ajouter une logique pour empêcher l'utilisateur bloqué de suivre l'utilisateur qui le bloque
            await this.model.findByIdAndUpdate(
                userId,
                { $pull: { followers: utilisateurId } }
            );
    
            await this.model.findByIdAndUpdate(
                utilisateurId,
                { $pull: { following: userId } }
            );
    
            return utilisateur;
        } catch (err) {
            console.error('Erreur lors du blocage de l\'utilisateur:', err);
            throw err;
        }
    }

async debloquerUtilisateur(utilisateurId, userId) {
    if (utilisateurId === userId) {
        throw new Error('Un utilisateur ne peut pas se débloquer lui-même.');
    }

    try {
        // Retirer utilisateurId de la liste des utilisateurs bloqués par userId
        const utilisateur = await this.model.findByIdAndUpdate(
            userId,
            { $pull: { bloquer: utilisateurId } },
            { new: true }
        );

        // Optionnel : Vous pouvez également ajouter une logique pour permettre à l'utilisateur débloqué de suivre à nouveau l'utilisateur qui le débloque
        // Cependant, cela dépend de votre logique d'application spécifique

        return utilisateur;
    } catch (err) {
        console.error('Erreur lors du déblocage de l\'utilisateur:', err);
        throw err;
    }
}

    async getNombreUtilisateursBloquesParMoi(userId) {
        try {
            const utilisateur = await this.model.findById(userId);
            return utilisateur.utilisateursBloqués.length;
        } catch (err) {
            console.error('Erreur lors de la récupération du nombre d\'utilisateurs bloqués:', err);
            throw err;
        }
    }

    async getNombreUtilisateursMeBloquer(userId) {
        try {
            const utilisateur = await this.model.findById(userId);
            return utilisateur.bloquéPar.length;
        } catch (err) {
            console.error('Erreur lors de la récupération du nombre d\'utilisateurs qui ont bloqué:', err);
            throw err;
        }
    }
}

export default new BloquerService();