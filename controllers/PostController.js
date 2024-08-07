import BaseController from './BaseController.js';
import PostService from '../services/PostService.js';
import { sendResponse } from '../utils/response.js';

class PostController extends BaseController {
    constructor() {
        super(PostService);
    }

    async addComment(req, res) {
        try {
            const postId = req.params.id;
            const commentData = req.body;
            console.log('Ajout d\'un commentaire au post:', postId, commentData);
            const updatedPost = await this.service.addComment(postId, commentData);
            sendResponse(res, 200, updatedPost);
        } catch (err) {
            console.error('Erreur lors de l\'ajout du commentaire:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    async removeComment(req, res) {
        try {
            const postId = req.params.id;
            const commentId = req.params.commentId;
            console.log('Suppression du commentaire:', commentId, 'du post:', postId);
            const updatedPost = await this.service.removeComment(postId, commentId);
            sendResponse(res, 200, updatedPost);
        } catch (err) {
            console.error('Erreur lors de la suppression du commentaire:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    async likePost(req, res) {
        try {
            const postId = req.params.id;
            const userId = req.body.userId;
            const updatedPost = await this.service.likePost(postId, userId);
            sendResponse(res, 200, updatedPost);
        } catch (err) {
            console.error('Erreur lors de l\'ajout du like:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    async dislikePost(req, res) {
        try {
            const postId = req.params.id;
            const userId = req.body.userId;
            const updatedPost = await this.service.dislikePost(postId, userId);
            sendResponse(res, 200, updatedPost);
        } catch (err) {
            console.error('Erreur lors de l\'ajout du dislike:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    async removeLike(req, res) {
        try {
            const postId = req.params.id;
            const userId = req.body.userId;
            const updatedPost = await this.service.removeLike(postId, userId);
            sendResponse(res, 200, updatedPost);
        } catch (err) {
            console.error('Erreur lors de la suppression du like:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    async removeDislike(req, res) {
        try {
            const postId = req.params.id;
            const userId = req.body.userId;
            const updatedPost = await this.service.removeDislike(postId, userId);
            sendResponse(res, 200, updatedPost);
        } catch (err) {
            console.error('Erreur lors de la suppression du dislike:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    async viewPost(req, res) {
        try {
            const postId = req.params.id;
            const updatedPost = await this.service.viewPost(postId);
            sendResponse(res, 200, updatedPost);
        } catch (err) {
            console.error('Erreur lors de l\'ajout de la vue:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    async sharePost(req, res) {
        try {
            const postId = req.params.id;
            const updatedPost = await this.service.sharePost(postId);
            sendResponse(res, 200, updatedPost);
        } catch (err) {
            console.error('Erreur lors du partage:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    async downloadPost(req, res) {
        try {
            const postId = req.params.id;
            const updatedPost = await this.service.downloadPost(postId);
            sendResponse(res, 200, updatedPost);
        } catch (err) {
            console.error('Erreur lors du téléchargement:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }
}

export default new PostController();
