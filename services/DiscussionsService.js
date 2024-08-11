import BaseService from './BaseService.js';
import Discussions from '../models/Discussions.js';
class DiscussionsService extends BaseService {
    constructor() {
        super(Discussions);
    }

    async createOrUpdateDiscussion(discussionData, userId) {
        try {
            // Utiliser l'ID de l'utilisateur qui envoie le message
            discussionData.from = userId;

            const participantsKey = [discussionData.from, discussionData.to].sort().join('_');
            let discussion = await this.model.findOne({ participantsKey });

            if (discussion) {
                discussion.messages.push({ contenu: discussionData.contenu });
                await discussion.save();
            } else {
                discussionData.participantsKey = participantsKey;
                discussionData.messages = [{ contenu: discussionData.contenu }];
                discussion = new this.model(discussionData);
                await discussion.save();
            }
            return discussion;
        } catch (err) {
            console.error('Erreur lors de l\'envoi du message:', err);
            throw err;
        }
    }

    async getDiscussions(userId) {
        try {
            const discussions = await this.model.find({
                $or: [{ from: userId }, { to: userId }]
            }).populate('from to', 'nom prenom').exec();
            return discussions;
        } catch (err) {
            console.error('Erreur lors de la récupération des discussions:', err);
            throw err;
        }
    }

    async getDiscussionById(discussionId) {
        try {
            const discussion = await this.model.findById(discussionId).populate('from to', 'nom prenom').exec();
            return discussion;
        } catch (err) {
            console.error('Erreur lors de la récupération de la discussion:', err);
            throw err;
        }
    }
}

export default new DiscussionsService();
