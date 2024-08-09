import BaseController from './BaseController.js';
import CommandeService from '../services/CommandeService.js';
import { sendResponse } from '../utils/response.js';
import Service from '../models/Service.js';
import Commande from '../models/Commande.js';



class CommandeController extends BaseController {
    constructor(){
        super(CommandeService);
    }

    async createCommande(req, res) {
        try {
            // Récupérer le service depuis la base de données
            const service = await Service.findById(req.body.serviceId);
            if (!service) {
                return sendResponse(res, 404, { message: 'Service non trouvé' });
            }

            // Calculer le prix total
            const total = service.prixBase * req.body.quantite;

            // Créer la commande avec le prix total calculé
            const nouvelleCommande = {
                clientId: req.body.clientId,
                tailleurId: req.body.tailleurId,
                serviceId: req.body.serviceId,
                quantite: req.body.quantite,
                total: total,
                statut: req.body.statut
            };

            const commande = await Commande.create(nouvelleCommande);
            sendResponse(res, 201, { message: 'Commande créée avec succès', commande });
        } catch (err) {
            console.error('Erreur lors de la création de la commande:', err);
            sendResponse(res, 500, { message: 'Erreur lors de la création de la commande', error: err.message });
        }
    }

    async findAll(req, res) {
        try {
            const commandes = await this.service.findAll();
            sendResponse(res, 200, commandes);
        } catch (err) {
            console.error('Erreur lors de la récupération des commandes:', err);
            sendResponse(res, 500, { message: 'Erreur lors de la récupération des commandes', error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const commande = await this.service.findById(req.params.id);
            if (!commande) {
                return sendResponse(res, 404, { message: 'Commande non trouvée' });
            }
            sendResponse(res, 200, commande);
        } catch (err) {
            console.error('Erreur lors de la récupération de la commande:', err);
            sendResponse(res, 500, { message: 'Erreur lors de la récupération de la commande', error: err.message });
        }
    }

    async update(req, res) {
        try {
            const commande = await this.service.findById(req.params.id);
            if (!commande) {
                return sendResponse(res, 404, { message: 'Commande non trouvée' });
            }

            // Vérifie si la commande est déjà en état "en cours"
            if ((commande.statut === 'en cours' && req.body.statut === 'en attente') ||
                (commande.statut === 'terminer' && (req.body.statut === 'en attente' || req.body.statut === 'en cours'))) {
                return sendResponse(res, 400, { message: 'Modification de l\'état de la commande non autorisée.' });
            }


            const updatedCommande = await this.service.update(req.params.id, req.body);
            sendResponse(res, 200, { message: 'Commande  à avec succès', updatedCommande });
        } catch (err) {
            console.error('Erreur lors de la mise à jour de la commande:', err);
            sendResponse(res, 500, { message: 'Erreur lors de la mise à jour de la commande', error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const deletedCommande = await this.service.delete(req.params.id);
            if (!deletedCommande) {
                return sendResponse(res, 404, { message: 'Commande non trouvée' });
            }
            sendResponse(res, 200, { message: 'Commande supprimée avec succès' });
        } catch (err) {
            console.error('Erreur lors de la suppression de la commande:', err);
            sendResponse(res, 500, { message: 'Erreur lors de la suppression de la commande', error: err.message });
        }
    }
    //Modification etat commande
   
    
}

export default CommandeController;
