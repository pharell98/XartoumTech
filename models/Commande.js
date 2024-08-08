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
