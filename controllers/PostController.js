import BaseController from './BaseController.js';
import PostService from '../services/PostService.js';
import { sendResponse } from '../utils/response.js';
import { cloudinary } from '../config/cloudinary.js';


class PostController extends BaseController {
    constructor() {
        super(PostService);
    }

    async findAll(req, res) {
        try {
            const posts = await this.service.findAllPosts(req.user.id);
            sendResponse(res, 200, posts);
        } catch (err) {
            console.error('Erreur lors de la récupération des posts:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    async create(req, res) {
        try {
            const postData = req.body;
            const filePath = req.file ? req.file.path : null;
            const newPost = await this.service.createPost(postData, filePath, req.user.id);
            sendResponse(res, 201, newPost);
        } catch (err) {
            console.error('Erreur lors de la création du post:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    async addComment(req, res) {
        try {
            const postId = req.params.id;
            const commentData = req.body;
            const updatedPost = await this.service.addComment(postId, commentData, req.user.id);
            sendResponse(res, 200, updatedPost);
        } catch (err) {
            console.error('Erreur lors de l\'ajout du commentaire:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    async updateComment(req, res) {
        try {
            const postId = req.params.id;
            const commentId = req.params.commentId;
            const commentData = req.body;

            const updatedPost = await this.service.updateComment(postId, commentId, commentData, req.user.id);
            sendResponse(res, 200, updatedPost);
        } catch (err) {
            console.error('Erreur lors de la mise à jour du commentaire:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    async removeComment(req, res) {
        try {
            const postId = req.params.id;
            const commentId = req.params.commentId;

            const updatedPost = await this.service.removeComment(postId, commentId, req.user.id);
            sendResponse(res, 200, updatedPost);
        } catch (err) {
            console.error('Erreur lors de la suppression du commentaire:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    // Mettez à jour les méthodes like, dislike, removeLike, removeDislike pour utiliser req.user.id
    async likePost(req, res) {
        try {
            const postId = req.params.id;
            const updatedPost = await this.service.likePost(postId, req.user.id);
            sendResponse(res, 200, updatedPost);
        } catch (err) {
            console.error('Erreur lors de l\'ajout du like:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    async dislikePost(req, res) {
        try {
            const postId = req.params.id;
            const updatedPost = await this.service.dislikePost(postId, req.user.id);
            sendResponse(res, 200, updatedPost);
        } catch (err) {
            console.error('Erreur lors de l\'ajout du dislike:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    async removeLike(req, res) {
        try {
            const postId = req.params.id;
            const updatedPost = await this.service.removeLike(postId, req.user.id);
            sendResponse(res, 200, updatedPost);
        } catch (err) {
            console.error('Erreur lors de la suppression du like:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    async removeDislike(req, res) {
        try {
            const postId = req.params.id;
            const updatedPost = await this.service.removeDislike(postId, req.user.id);
            sendResponse(res, 200, updatedPost);
        } catch (err) {
            console.error('Erreur lors de la suppression du dislike:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    async viewPost(req, res) {
        try {
            const postId = req.params.id;
            const updatedPost = await this.service.viewPost(postId, req.user.id);
            sendResponse(res, 200, updatedPost);
        } catch (err) {
            console.error('Erreur lors de l\'ajout de la vue:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    async sharePost(req, res) {
        try {
            const postId = req.params.id;
            const updatedPost = await this.service.sharePost(postId, req.user.id);
            sendResponse(res, 200, updatedPost);
        } catch (err) {
            console.error('Erreur lors du partage:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }

    async downloadPost(req, res) {
        try {
            const postId = req.params.id;
            const updatedPost = await this.service.downloadPost(postId, req.user.id);
            sendResponse(res, 200, updatedPost);
        } catch (err) {
            console.error('Erreur lors du téléchargement:', err);
            sendResponse(res, 500, { message: 'Erreur serveur interne' });
        }
    }
}

export default new PostController();
