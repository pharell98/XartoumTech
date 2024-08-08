import BaseService from './BaseService.js';
import Commande from '../models/Commande.js';

class CommandeService extends BaseService {
    constructor() {
        super(Commande);
    }
    // Create a new instance
    async createCommande(commande) {
        return await this.model.create(commande);
    }
    // Get all commands
    async getAllCommandes() {
        return await this.model.find().populate('clientId', 'nom prenom').populate('tailleurId', 'nom prenom').populate('serviceId', 'nom');
    }
    // Get a specific command by ID
    async getCommandeById(id) {
        return await this.model.findById(id).populate('clientId', 'nom prenom').populate('tailleurId', 'nom prenom').populate('serviceId', 'nom');
    }
}

export default new CommandeService();
