import BaseService from './BaseService.js';
import Evaluation from '../models/Evaluation.js';

class EvaluationService extends BaseService {
    constructor() {
        super(Evaluation);
    }
    // Create a new Evaluation
    async createEvaluation(evaluation) {
        return await this.model.create(evaluation);
    }
}
export default new EvaluationService();