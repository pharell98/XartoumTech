import { Schema, model } from 'mongoose';

// Schéma pour les services
const serviceSchema = new Schema({
    type: { type: String, required: true, enum: ['modele_pret', 'commande_sur_mesure', 'reparation'] },
    nom: { type: String, required: true },
    description: { type: String, required: true },
    prixBase: { type: Number, required: true },
    urlImage: [{ type: String, required: true }],
    stock: { type: Number, default: 0 }, // nombre d'unités disponibles, par défaut 0
    tailleur: { type: Schema.Types.ObjectId, ref: 'Utilisateur', required: true } // Référence au tailleur
}, { timestamps: true });

const Service = model('Service', serviceSchema);

export default Service;
