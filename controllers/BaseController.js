    import { sendResponse } from '../utils/response.js';
    class BaseController {
        constructor(service) {
            this.service = service;
        }

        async getById(req, res) {
            try {
                const item = await this.service.findById(req.params.id);
                if (item) {
                    sendResponse(res, 200, item);
                } else {
                    sendResponse(res, 404, { message: 'Non trouvé' });
                }
            } catch (err) {
                sendResponse(res, 500, { message: 'Erreur serveur interne' });
            }
        }

        async create(req, res) {
            try {
                const item = await this.service.create(req.body);
                sendResponse(res, 201, item);
            } catch (err) {
                sendResponse(res, 500, { message: 'Erreur serveur interne' });
            }
        }

        async update(req, res) {
            try {
                const item = await this.service.update(req.params.id, req.body);
                if (item) {
                    sendResponse(res, 200, item);
                } else {
                    sendResponse(res, 404, { message: 'Non trouvé' });
                }
            } catch (err) {
                sendResponse(res, 500, { message: 'Erreur serveur interne' });
            }
        }

        async delete(req, res) {
            try {
                const item = await this.service.delete(req.params.id);
                if (item) {
                    sendResponse(res, 200, { message: 'Supprimé avec succès' });
                } else {
                    sendResponse(res, 404, { message: 'Non trouvé' });
                }
            } catch (err) {
                sendResponse(res, 500, { message: 'Erreur serveur interne' });
            }
        }

        async findAll(req, res) {
            try {
                const items = await this.service.findAll();
                sendResponse(res, 200, items);
            } catch (err) {
                sendResponse(res, 500, { message: 'Erreur serveur interne' });
            }
        }
    }

    export default BaseController;
