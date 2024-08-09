import BaseController from './BaseController.js';
import MesuresService from '../services/MesuresService.js';
import { sendResponse } from '../utils/response.js';

class MesuresController extends BaseController {
  async createOrUpdateMesure(req, res) {
    try {
      const userId = req.user.id;
      const mesureData = req.body;

      const mesure = await MesuresService.createOrUpdateMesure(userId, mesureData);

      return sendResponse(res, 201, mesure);
    } catch (error) {
      return sendResponse(res, 500, { message: error.message });
    }
  }

  async getMesures(req, res) {
    try {
      const userId = req.user.id;

      const mesures = await MesuresService.getMesures(userId);

      if (!mesures) {
        return sendResponse(res, 404, { message: 'User not found' });
      }

      return sendResponse(res, 200, mesures);
    } catch (error) {
      return sendResponse(res, 500, { message: error.message });
    }
  }

  async updateMesure(req, res) {
    try {
      const userId = req.user.id;
      const nom = req.params.nom;
      const updateData = req.body;

      const updatedMesure = await MesuresService.updateMesure(userId, nom, updateData);

      if (!updatedMesure) {
        return sendResponse(res, 404, { message: 'Measurement not found' });
      }

      return sendResponse(res, 200, updatedMesure);
    } catch (error) {
      return sendResponse(res, 500, { message: error.message });
    }
  }

  async deleteMesure(req, res) {
    try {
      const userId = req.user.id;
      const nom = req.params.nom;

      const result = await MesuresService.deleteMesure(userId, nom);

      return sendResponse(res, 200, result);
    } catch (error) {
      return sendResponse(res, 500, { message: error.message });
    }
  }


}

export default new MesuresController();
