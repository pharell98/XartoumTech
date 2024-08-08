import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const commandeSchema = new Schema({
    clientId: { type: Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
    tailleurId: { type: Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    quantite: { type: Number, required: true },
    total: { type: Number, required: true },
    statut: { type: String, enum: ['en attente', 'en cours', 'terminer'], required: true }
}, { timestamps: true });

const Commande = model('Commande', commandeSchema);

export default Commande;
