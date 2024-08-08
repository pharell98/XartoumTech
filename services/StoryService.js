import BaseService from './BaseService.js';
import Story from '../models/Story.js';
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
}

export default new StoryService();
