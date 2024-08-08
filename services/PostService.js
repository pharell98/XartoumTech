import BaseService from './BaseService.js';
import Post from '../models/Post.js';
import Utilisateur from '../models/Utilisateur.js';
import cloudinary from '../config/cloudinary.js';

class PostService extends BaseService {
    constructor() {
        super(Post);
    }

    async createPost(data, filePath, userId) {
        // Récupérer l'utilisateur
        const utilisateur = await Utilisateur.findById(userId);
        if (!utilisateur) {
            throw new Error('Utilisateur non trouvé');
        }

        // Initialiser les champs si nécessaire
        if (!utilisateur.postsGratuitsQuotidiens) {
            utilisateur.postsGratuitsQuotidiens = new Date(0); // Date très ancienne
        }
        if (!utilisateur.postsGratuits) {
            utilisateur.postsGratuits = 0;
        }

        // Vérifier le nombre de posts gratuits aujourd'hui
        const today = new Date().setHours(0, 0, 0, 0);
        if (utilisateur.postsGratuitsQuotidiens.getTime() < today) {
            utilisateur.postsGratuitsQuotidiens = new Date(today);
            utilisateur.postsGratuits = 0;
        }

        if (utilisateur.postsGratuits < 3) {
            utilisateur.postsGratuits += 1;
        } else {
            // Vérifier le solde de l'utilisateur
            if (utilisateur.solde < 1) {
                throw new Error('Solde insuffisant pour poster un nouveau post');
            }
            utilisateur.solde -= 1;
        }

        await utilisateur.save();

        if (filePath) {
            const result = await cloudinary.uploader.upload(filePath, {
                folder: 'posts'
            });
            data.file = [{
                type: data.type,
                url: result.secure_url
            }];
        }

        data.tailleurId = userId;
        const post = new this.model(data);
        return await post.save();
    }


    async addComment(postId, commentData) {
        try {
            const post = await this.model.findById(postId);
            if (!post) {
                throw new Error('Post non trouvé');
            }
            post.commentaires.push(commentData);
            return await post.save();
        } catch (err) {
            console.error('Erreur dans PostService.addComment:', err);
            throw err;
        }
    }

    async removeComment(postId, commentId) {
        try {
            const post = await this.model.findById(postId);
            if (!post) {
                throw new Error('Post non trouvé');
            }
            post.commentaires.id(commentId).remove();
            return await post.save();
        } catch (err) {
            console.error('Erreur dans PostService.removeComment:', err);
            throw err;
        }
    }

    async likePost(postId, userId) {
        try {
            const post = await this.model.findById(postId);
            if (!post) {
                throw new Error('Post non trouvé');
            }

            // Enlever le dislike si l'utilisateur a déjà disliké
            if (post.dislikes.includes(userId)) {
                post.dislikes = post.dislikes.filter((id) => id.toString() !== userId);
            }

            // Enlever le like si l'utilisateur a déjà liké
            if (post.likes.includes(userId)) {
                post.likes = post.likes.filter((id) => id.toString() !== userId);
            } else {
                post.likes.push(userId);
            }

            return await post.save();
        } catch (err) {
            console.error('Erreur dans PostService.likePost:', err);
            throw err;
        }
    }

    async dislikePost(postId, userId) {
        try {
            const post = await this.model.findById(postId);
            if (!post) {
                throw new Error('Post non trouvé');
            }

            // Enlever le like si l'utilisateur a déjà liké
            if (post.likes.includes(userId)) {
                post.likes = post.likes.filter((id) => id.toString() !== userId);
            }

            // Enlever le dislike si l'utilisateur a déjà disliké
            if (post.dislikes.includes(userId)) {
                post.dislikes = post.dislikes.filter((id) => id.toString() !== userId);
            } else {
                post.dislikes.push(userId);
            }

            return await post.save();
        } catch (err) {
            console.error('Erreur dans PostService.dislikePost:', err);
            throw err;
        }
    }

    async removeLike(postId, userId) {
        try {
            const post = await this.model.findById(postId);
            if (!post) {
                throw new Error('Post non trouvé');
            }
            post.likes = post.likes.filter((id) => id.toString() !== userId);
            return await post.save();
        } catch (err) {
            console.error('Erreur dans PostService.removeLike:', err);
            throw err;
        }
    }

    async removeDislike(postId, userId) {
        try {
            const post = await this.model.findById(postId);
            if (!post) {
                throw new Error('Post non trouvé');
            }
            post.dislikes = post.dislikes.filter((id) => id.toString() !== userId);
            return await post.save();
        } catch (err) {
            console.error('Erreur dans PostService.removeDislike:', err);
            throw err;
        }
    }

    async viewPost(postId) {
        try {
            const post = await this.model.findById(postId);
            if (!post) {
                throw new Error('Post non trouvé');
            }
            post.vues += 1;
            return await post.save();
        } catch (err) {
            console.error('Erreur dans PostService.viewPost:', err);
            throw err;
        }
    }

    async sharePost(postId) {
        try {
            const post = await this.model.findById(postId);
            if (!post) {
                throw new Error('Post non trouvé');
            }
            post.partages += 1;
            return await post.save();
        } catch (err) {
            console.error('Erreur dans PostService.sharePost:', err);
            throw err;
        }
    }

    async downloadPost(postId) {
        try {
            const post = await this.model.findById(postId);
            if (!post) {
                throw new Error('Post non trouvé');
            }
            post.telechargements += 1;
            return await post.save();
        } catch (err) {
            console.error('Erreur dans PostService.downloadPost:', err);
            throw err;
        }
    }
}

export default new PostService();
