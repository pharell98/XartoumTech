import BaseService from './BaseService.js';
import Utilisateur from '../models/Utilisateur.js';

class FollowService extends BaseService {
    constructor() {
        super(Utilisateur);
    }

    async followUser(utilisateurId, userId) {
        if (utilisateurId === userId) {
            throw new Error('Un utilisateur ne peut pas se suivre lui-même.');
        }

        try {
            // Ajouter userId à la liste des followers de utilisateurId
            const utilisateur = await this.model.findByIdAndUpdate(
                utilisateurId,
                { $addToSet: { followers: userId } },
                { new: true }
            );

            // Ajouter utilisateurId à la liste des following de userId
            await this.model.findByIdAndUpdate(
                userId,
                { $addToSet: { following: utilisateurId } },
                { new: true }
            );

            return utilisateur;
        } catch (err) {
            console.error('Erreur lors de l\'ajout de follow:', err);
            throw err;
        }
    }

    async unfollowUser(utilisateurId, userId) {
        if (utilisateurId === userId) {
            throw new Error('Un utilisateur ne peut pas arrêter de se suivre lui-même.');
        }

        try {
            // Retirer userId de la liste des followers de utilisateurId
            const utilisateur = await this.model.findByIdAndUpdate(
                utilisateurId,
                { $pull: { followers: userId } },
                { new: true }
            );

            // Retirer utilisateurId de la liste des following de userId
            await this.model.findByIdAndUpdate(
                userId,
                { $pull: { following: utilisateurId } },
                { new: true }
            );

            return utilisateur;
        } catch (err) {
            console.error('Erreur lors de la suppression de follow:', err);
            throw err;
        }
    }

    async getFollowers(utilisateurId) {
        try {
            const utilisateur = await this.model.findById(utilisateurId).populate('followers', 'profile.nom profile.prenom').exec();
            return utilisateur.followers;
        } catch (err) {
            console.error('Erreur lors de la récupération des followers:', err);
            throw err;
        }
    }

    async getFollowing(utilisateurId) {
        try {
            const utilisateur = await this.model.findById(utilisateurId).populate('following', 'profile.nom profile.prenom').exec();
            return utilisateur.following;
        } catch (err) {
            console.error('Erreur lors de la récupération des followings:', err);
            throw err;
        }
    }

    async getFollowingCount(utilisateurId) {
        try {
            const utilisateur = await this.model.findById(utilisateurId);
            return utilisateur.following.length;
        } catch (err) {
            console.error('Erreur lors de la récupération du nombre de followings:', err);
            throw err;
        }
    }

    async getFollowerCount(utilisateurId) {
        try {
            const utilisateur = await this.model.findById(utilisateurId);
            return utilisateur.followers.length;
        } catch (err) {
            console.error('Erreur lors de la récupération du nombre de followers:', err);
            throw err;
        }
    }

    async isFollowing(utilisateurId, userId) {
        try {
            const isFollowing = await this.model.exists({ _id: utilisateurId, following: userId });
            return isFollowing;
        } catch (err) {
            console.error('Erreur lors de la vérification de follow:', err);
            throw err;
        }
    }

    async isFollower(utilisateurId, userId) {
        try {
            const isFollower = await this.model.exists({ _id: utilisateurId, followers: userId });
            return isFollower;
        } catch (err) {
            console.error('Erreur lors de la vérification de follower:', err);
            throw err;
        }
    }

    async getMutualFollowers(utilisateurId) {
        try {
            const utilisateur = await this.model.findById(utilisateurId).populate('followers following', 'profile.nom profile.prenom').exec();
            const mutualFollowers = utilisateur.followers.filter(follow => utilisateur.following.some(following => following._id.equals(follow._id)));
            return mutualFollowers;
        } catch (err) {
            console.error('Erreur lors de la récupération des followers mutuels:', err);
            throw err;
        }
    }

    async getMutualFollowings(utilisateurId) {
        try {
            const utilisateur = await this.model.findById(utilisateurId).populate('followers following', 'profile.nom profile.prenom').exec();
            const mutualFollowings = utilisateur.following.filter(following => utilisateur.followers.some(follower => follower._id.equals(following._id)));
            return mutualFollowings;
        } catch (err) {
            console.error('Erreur lors de la récupération des followings mutuels:', err);
            throw err;
        }
    }

    async getMutualFollowersCount(utilisateurId) {
        try {
            const mutualFollowers = await this.getMutualFollowers(utilisateurId);
            return mutualFollowers.length;
        } catch (err) {
            console.error('Erreur lors de la récupération du nombre de followers mutuels:', err);
            throw err;
        }
    }

    async getMutualFollowingCount(utilisateurId) {
        try {
            const mutualFollowings = await this.getMutualFollowings(utilisateurId);
            return mutualFollowings.length;
        } catch (err) {
            console.error('Erreur lors de la récupération du nombre de followings mutuels:', err);
            throw err;
        }
    }
}

export default new FollowService();
