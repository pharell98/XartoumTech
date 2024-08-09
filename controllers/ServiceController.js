// controllers/serviceController.js
import BaseController from './BaseController.js';
import ServiceService from '../services/ServiceService.js';

class ServiceController extends BaseController {
    constructor() {
        super(ServiceService);
    }

    // Ajoutez des méthodes spécifiques pour Service si nécessaire
}



export default new ServiceController;
;