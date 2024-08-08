import BaseService from './BaseService.js';
import Story from '../models/Story.js';
import Discussions from '../models/Discussions.js';
import cloudinary from '../config/cloudinary.js';

class StoryService extends BaseService {
    constructor() {
        super(Story);
    }

    async createStory(data, filePath) {
        try {
            if (filePath) {
                const result = await cloudinary.uploader.upload(filePath, {
                    folder: 'stories'
                });
                data.file = [{
                    type: data.type,
                    url: result.secure_url
                }];
            }
            const story = new this.model(data);
            return await story.save();
        } catch (err) {
            console.error('Erreur dans StoryService.createStory:', err);
            throw err;
        }
    }

    async viewStory(storyId, userId) {
        try {
            const story = await this.model.findById(storyId);
            if (!story) {
                throw new Error('Story non trouvée');
            }
            if (!story.vues.includes(userId)) {
                story.vues.push(userId);
            }
            return await story.save();
        } catch (err) {
            console.error('Erreur dans StoryService.viewStory:', err);
            throw err;
        }
    }

    async addReaction(storyId, reactionData) {
        try {
            const story = await this.model.findById(storyId);
            if (!story) {
                throw new Error('Story non trouvée');
            }
            story.reactions.push(reactionData);
            return await story.save();
        } catch (err) {
            console.error('Erreur dans StoryService.addReaction:', err);
            throw err;
        }
    }

    async addResponse(storyId, responseData) {
        try {
            const story = await this.model.findById(storyId);
            if (!story) {
                throw new Error('Story non trouvée');
            }
            story.responses.push(responseData);
            const updatedStory = await story.save();

            // Créer ou mettre à jour la discussion entre les utilisateurs
            await this.createOrUpdateDiscussion(story.utilisateurId, responseData.utilisateurId, responseData.contenu);

            return updatedStory;
        } catch (err) {
            console.error('Erreur dans StoryService.addResponse:', err);
            throw err;
        }
    }

    async createOrUpdateDiscussion(from, to, contenu) {
        try {
            const participantsKey = [from.toString(), to.toString()].sort().join('_');
            let discussion = await Discussions.findOne({ participantsKey });

            if (!discussion) {
                discussion = new Discussions({
                    from,
                    to,
                    messages: [{ contenu }],
                    participantsKey
                });
            } else {
                discussion.messages.push({ contenu });
            }

            await discussion.save();
        } catch (err) {
            console.error('Erreur dans StoryService.createOrUpdateDiscussion:', err);
            throw err;
        }
    }
}

export default new StoryService();
