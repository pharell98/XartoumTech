import BaseController from './BaseController.js';
import FollowService from '../services/FollowService.js';
import { sendResponse } from '../utils/response.js';

class FollowController extends BaseController {
    constructor() {
        super(FollowService);
    }

    async followUser(req, res) {
        try {
            const { utilisateurId } = req.params; // l'ID de l'utilisateur à suivre
            const userId = req.user.id; // l'ID de l'utilisateur courant à partir du middleware d'authentification
            if (utilisateurId === userId) {
                return sendResponse(res, 400, { message: 'Un utilisateur ne peut pas se suivre lui-même.' });
            }
            const utilisateur = await this.service.followUser(utilisateurId, userId);
            sendResponse(res, 201, { message: 'Utilisateur suivi avec succès', utilisateur });
        } catch (err) {
            console.error('Erreur lors du suivi de l\'utilisateur:', err);
            sendResponse(res, 500, { message: 'Erreur lors du suivi de l\'utilisateur', error: err.message });
        }
    }

    async unfollowUser(req, res) {
        try {
            const { utilisateurId } = req.params;
            const userId = req.user.id;
            if (utilisateurId === userId) {
                return sendResponse(res, 400, { message: 'Un utilisateur ne peut pas arrêter de se suivre lui-même.' });
            }
            const utilisateur = await this.service.unfollowUser(utilisateurId, userId);
            sendResponse(res, 200, { message: 'Utilisateur désuivi avec succès', utilisateur });
        } catch (err) {
            console.error('Erreur lors du désuivi de l\'utilisateur:', err);
            sendResponse(res, 500, { message: 'Erreur lors du désuivi de l\'utilisateur', error: err.message });
        }
    }

    async getFollowers(req, res) {
        try {
            const { utilisateurId } = req.params;
            const followers = await this.service.getFollowers(utilisateurId);
            sendResponse(res, 200, { message: 'Liste des followers récupérée avec succès', followers });
        } catch (err) {
            console.error('Erreur lors de la récupération des followers:', err);
            sendResponse(res, 500, { message: 'Erreur lors de la récupération des followers', error: err.message });
        }
    }

    async getFollowing(req, res) {
        try {
            const { utilisateurId } = req.params;
            const following = await this.service.getFollowing(utilisateurId);
            sendResponse(res, 200, { message: 'Liste des followings récupérée avec succès', following });
        } catch (err) {
            console.error('Erreur lors de la récupération des followings:', err);
            sendResponse(res, 500, { message: 'Erreur lors de la récupération des followings', error: err.message });
        }
    }

    async getFollowingCount(req, res) {
        try {
            const { utilisateurId } = req.params;
            const followingCount = await this.service.getFollowingCount(utilisateurId);
            sendResponse(res, 200, { message: 'Nombre de followings récupéré avec succès', followingCount });
        } catch (err) {
            console.error('Erreur lors de la récupération du nombre de followings:', err);
            sendResponse(res, 500, { message: 'Erreur lors de la récupération du nombre de followings', error: err.message });
        }
    }

    async getFollowerCount(req, res) {
        try {
            const { utilisateurId } = req.params;
            const followerCount = await this.service.getFollowerCount(utilisateurId);
            sendResponse(res, 200, { message: 'Nombre de followers récupéré avec succès', followerCount });
        } catch (err) {
            console.error('Erreur lors de la récupération du nombre de followers:', err);
            sendResponse(res, 500, { message: 'Erreur lors de la récupération du nombre de followers', error: err.message });
        }
    }

    async isFollowing(req, res) {
        try {
            const { utilisateurId } = req.params;
            const userId = req.user.id;
            const isFollowing = await this.service.isFollowing(utilisateurId, userId);
            sendResponse(res, 200, { message: 'Vérification de suivi réussie', isFollowing });
        } catch (err) {
            console.error('Erreur lors de la vérification de suivi:', err);
            sendResponse(res, 500, { message: 'Erreur lors de la vérification de suivi', error: err.message });
        }
    }

    async isFollower(req, res) {
        try {
            const { utilisateurId } = req.params;
            const userId = req.user.id;
            const isFollower = await this.service.isFollower(utilisateurId, userId);
            sendResponse(res, 200, { message: 'Vérification de follower réussie', isFollower });
        } catch (err) {
            console.error('Erreur lors de la vérification de follower:', err);
            sendResponse(res, 500, { message: 'Erreur lors de la vérification de follower', error: err.message });
        }
    }

    async getMutualFollowers(req, res) {
        try {
            const { utilisateurId } = req.params;
            const mutualFollowers = await this.service.getMutualFollowers(utilisateurId);
            sendResponse(res, 200, { message: 'Followers mutuels récupérés avec succès', mutualFollowers });
        } catch (err) {
            console.error('Erreur lors de la récupération des followers mutuels:', err);
            sendResponse(res, 500, { message: 'Erreur lors de la récupération des followers mutuels', error: err.message });
        }
    }

    async getMutualFollowings(req, res) {
        try {
            const { utilisateurId } = req.params;
            const mutualFollowings = await this.service.getMutualFollowings(utilisateurId);
            sendResponse(res, 200, { message: 'Followings mutuels récupérés avec succès', mutualFollowings });
        } catch (err) {
            console.error('Erreur lors de la récupération des followings mutuels:', err);
            sendResponse(res, 500, { message: 'Erreur lors de la récupération des followings mutuels', error: err.message });
        }
    }

    async getMutualFollowersCount(req, res) {
        try {
            const { utilisateurId } = req.params;
            const mutualFollowersCount = await this.service.getMutualFollowersCount(utilisateurId);
            sendResponse(res, 200, { message: 'Nombre de followers mutuels récupéré avec succès', mutualFollowersCount });
        } catch (err) {
            console.error('Erreur lors de la récupération du nombre de followers mutuels:', err);
            sendResponse(res, 500, { message: 'Erreur lors de la récupération du nombre de followers mutuels', error: err.message });
        }
    }

    async getMutualFollowingCount(req, res) {
        try {
            const { utilisateurId } = req.params;
            const mutualFollowingCount = await this.service.getMutualFollowingCount(utilisateurId);
            sendResponse(res, 200, { message: 'Nombre de followings mutuels récupéré avec succès', mutualFollowingCount });
        } catch (err) {
            console.error('Erreur lors de la récupération du nombre de followings mutuels:', err);
            sendResponse(res, 500, { message: 'Erreur lors de la récupération du nombre de followings mutuels', error: err.message });
        }
    }
}

export default new FollowController();
