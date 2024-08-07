import BaseService from './BaseService.js';
import Post from '../models/Post.js';

class PostService extends BaseService {
    constructor() {
        super(Post);
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
            if (!post.likes.includes(userId)) {
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
            if (!post.dislikes.includes(userId)) {
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
            post.likes = post.likes.filter(id => id.toString() !== userId);
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
            post.dislikes = post.dislikes.filter(id => id.toString() !== userId);
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
