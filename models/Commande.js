const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schéma des mesures communes
const mesureCommuneSchema = new Schema({
    poitrine: { type: Number },
    taille: { type: Number },
    hanches: { type: Number },
    hauteur: { type: Number }
    
   
}, { _id: false });

// Schéma des mesures spécifiques aux hommes
const mesureHommeSchema = new Schema({
    ...mesureCommuneSchema.obj,
    cou: { type: Number },
    epaules: { type: Number },
    longueurManche: { type: Number },
    longueurPantalon: { type: Number },
    tourCeinture: { type: Number }
}, { _id: false });

// Schéma des mesures spécifiques aux femmes (inclut les mesures des hommes)
const mesureFemmeSchema = new Schema({
    ...mesureHommeSchema.obj,
    sousPoitrine: { type: Number },
    tourDeBuste: { type: Number },
    longueurRobe: { type: Number }
}, { _id: false });

// Schéma des mesures spécifiques aux enfants
const mesureEnfantSchema = new Schema({
    ...mesureCommuneSchema.obj,
    longueurBras: { type: Number },
    longueurJambe: { type: Number }
}, { _id: false });

// Schéma principal de la commande
import { Schema, model } from 'mongoose';

// Schéma principal de la commande
const commandeSchema = new Schema({
    clientId: { type: Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
    tailleurId: { type: Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Utilisateur.services', required: true },
    type: { type: String, enum: ['modele_pret', 'commande_sur_mesure', 'reparation'], required: true },
    quantite: { type: Number, required: true },
    total: { type: Number, required: true },
    statut: { type: String, enum: ['en attente', 'en cours', 'terminer'], required: true }
}, { timestamps: true });

module.exports = model('Commande', commandeSchema);