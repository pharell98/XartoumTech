import BaseService from './BaseService.js';
import Post from '../models/Post.js';
import Utilisateur from '../models/Utilisateur.js';
import { cloudinary } from '../config/cloudinary.js';


class PostService extends BaseService {
    constructor() {
        super(Post);
    }

    async findAllPosts(userId) {
        const utilisateur = await Utilisateur.findById(userId);
        if (!utilisateur) {
            throw new Error('Utilisateur non trouvé');
        }

        const posts = await this.model.find({
            tailleurId: { $nin: utilisateur.bloquer }
        });

        return posts;
    }

    async createPost(data, filePath, userId) {
        const utilisateur = await Utilisateur.findById(userId);
        if (!utilisateur) {
            throw new Error('Utilisateur non trouvé');
        }

        const today = new Date().setHours(0, 0, 0, 0);
        if (utilisateur.postsGratuitsQuotidiens.getTime() < today) {
            utilisateur.postsGratuitsQuotidiens = new Date(today);
            utilisateur.postsGratuits = 0;
        }

        if (utilisateur.postsGratuits < 3) {
            utilisateur.postsGratuits += 1;
        } else {
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

    async updatePost(postId, userId, updateData) {
        const post = await this.model.findById(postId);
        if (!post) {
            throw new Error('Post non trouvé');
        }

        if (post.tailleurId.toString() !== userId) {
            throw new Error('Vous n\'êtes pas autorisé à modifier ce post');
        }

        Object.assign(post, updateData);
        return await post.save();
    }

    async deletePost(postId, userId) {
        const post = await this.model.findById(postId);
        if (!post) {
            throw new Error('Post non trouvé');
        }

        if (post.tailleurId.toString() !== userId) {
            throw new Error('Vous n\'êtes pas autorisé à supprimer ce post');
        }

        return await post.remove();
    }

    async addComment(postId, commentData, userId) {
        const post = await this.model.findById(postId);
        if (!post) {
            throw new Error('Post non trouvé');
        }

        const newComment = {
            ...commentData,
            utilisateurId: userId
        };

        post.commentaires.push(newComment);
        return await post.save();
    }

    async updateComment(postId, commentId, userId, updateData) {
        const post = await this.model.findById(postId);
        if (!post) {
            throw new Error('Post non trouvé');
        }

        const comment = post.commentaires.id(commentId);
        if (!comment) {
            throw new Error('Commentaire non trouvé');
        }

        if (comment.utilisateurId.toString() !== userId) {
            throw new Error('Vous n\'êtes pas autorisé à modifier ce commentaire');
        }

        Object.assign(comment, updateData);
        return await post.save();
    }

    async removeComment(postId, commentId, userId) {
        const post = await this.model.findById(postId);
        if (!post) {
            throw new Error('Post non trouvé');
        }

        const comment = post.commentaires.id(commentId);
        if (!comment) {
            throw new Error('Commentaire non trouvé');
        }

        if (comment.utilisateurId.toString() !== userId) {
            throw new Error('Vous n\'êtes pas autorisé à supprimer ce commentaire');
        }

        comment.remove();
        return await post.save();
    }

    async likePost(postId, userId) {
        const post = await this.model.findById(postId);
        if (!post) {
            throw new Error('Post non trouvé');
        }

        if (post.dislikes.includes(userId)) {
            post.dislikes = post.dislikes.filter((id) => id.toString() !== userId);
        }

        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter((id) => id.toString() !== userId);
        } else {
            post.likes.push(userId);
        }

        return await post.save();
    }

    async dislikePost(postId, userId) {
        const post = await this.model.findById(postId);
        if (!post) {
            throw new Error('Post non trouvé');
        }

        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter((id) => id.toString() !== userId);
        }

        if (post.dislikes.includes(userId)) {
            post.dislikes = post.dislikes.filter((id) => id.toString() !== userId);
        } else {
            post.dislikes.push(userId);
        }

        return await post.save();
    }

    async removeLike(postId, userId) {
        const post = await this.model.findById(postId);
        if (!post) {
            throw new Error('Post non trouvé');
        }

        post.likes = post.likes.filter((id) => id.toString() !== userId);
        return await post.save();
    }

    async removeDislike(postId, userId) {
        const post = await this.model.findById(postId);
        if (!post) {
            throw new Error('Post non trouvé');
        }

        post.dislikes = post.dislikes.filter((id) => id.toString() !== userId);
        return await post.save();
    }

    async viewPost(postId) {
        const post = await this.model.findById(postId);
        if (!post) {
            throw new Error('Post non trouvé');
        }

        post.vues += 1;
        return await post.save();
    }

    async sharePost(postId) {
        const post = await this.model.findById(postId);
        if (!post) {
            throw new Error('Post non trouvé');
        }

        post.partages += 1;
        return await post.save();
    }

    async downloadPost(postId) {
        const post = await this.model.findById(postId);
        if (!post) {
            throw new Error('Post non trouvé');
        }

        post.telechargements += 1;
        return await post.save();
    }
}

export default new PostService();
