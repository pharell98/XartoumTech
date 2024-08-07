import BaseController from './BaseController.js';
import ServiceService from '../services/ServiceService.js';
import { sendResponse } from '../utils/response.js';

class ServiceController extends BaseController {
    constructor() {
        super(ServiceService);
    }

    // Ajoutez des méthodes spécifiques pour Service si nécessaire

//     async update(req, res) {
//         try {
//             const item = await this.service.update(req.params.id, req.body);
//             if (item) {
//                 sendResponse(res, 200, item);
//             } else {
//                 sendResponse(res, 404, { message: 'Non trouvé' });
//             }
//         } catch (err) {
//             sendResponse(res, 500, { message: 'Erreur serveur interne' });
//         }
//     }

//     async delete(req, res) {
//         try {
//             const item = await this.service.delete(req.params.id);
//             if (item) {
//                 sendResponse(res, 200, { message: 'Supprimé avec succès' });
//             } else {
//                 sendResponse(res, 404, { message: 'Non trouvé' });
//             }
//         } catch (err) {
//             sendResponse(res, 500, { message: 'Erreur serveur interne' });
//         }
//     }
 }

export default new ServiceController();
