import { Schema, model } from 'mongoose';

// Schéma pour les services
const serviceSchema = new Schema({
    id: { type: Number, required: true },
    type: { type: String, required: true },
    nom: { type: String, required: true },
    description: { type: String, required: true },
    prixBase: { type: Number, required: true },
    urlImage: [{ type: String, required: true }],
    stock: { type: Number, default: 0 }, // nombre d'unités disponibles, par défaut 0
}, { timestamps: true });

const Service = model('Service', serviceSchema);

export default Service;
