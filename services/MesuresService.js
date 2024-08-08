import BaseService from './BaseService.js';
import Utilisateur from '../models/Utilisateur.js';

class MesuresService extends BaseService {
  constructor() {
    super(Utilisateur);
  }

  async createOrUpdateMesure(userId, mesureData) {
    try {
      const user = await this.findById(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      // Utiliser le nom de l'utilisateur connecté si le nom n'est pas fourni
      const nomMesure = mesureData.nom || user.profile.nom;
      
      let mesure = user.mesMesures.find(m => m.nom === nomMesure);
      
      if (mesure) {
        // Mettre à jour la mesure existante
        Object.assign(mesure, mesureData);
      } else {
        // Ajouter une nouvelle mesure
        mesure = { ...mesureData, nom: nomMesure };
        user.mesMesures.push(mesure);
      }

      const updatedUser = await user.save();
      return mesure;
    } catch (error) {
      throw new Error(`Error creating or updating measurement: ${error.message}`);
    }
  }

  async getMesures(userId) {
    try {
      const user = await this.findById(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      return user.mesMesures;
    } catch (error) {
      throw new Error(`Error getting measurements: ${error.message}`);
    }
  }

  async updateMesure(userId, nom, updateData) {
    try {
      const user = await this.findById(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      const mesure = user.mesMesures.find(m => m.nom === nom);
      if (!mesure) {
        throw new Error(`Measurement with name ${nom} not found`);
      }

      Object.assign(mesure, updateData);
      await user.save();

      return mesure;
    } catch (error) {
      throw new Error(`Error updating measurement: ${error.message}`);
    }
  }

  async deleteMesure(userId, nom) {
    try {
      const user = await this.findById(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      const mesureIndex = user.mesMesures.findIndex(m => m.nom === nom);
      if (mesureIndex === -1) {
        throw new Error(`Measurement with name ${nom} not found`);
      }

      user.mesMesures.splice(mesureIndex, 1);
      await user.save();

      return { message: 'Measurement deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting measurement: ${error.message}`);
    }
  }
}

export default new MesuresService();
