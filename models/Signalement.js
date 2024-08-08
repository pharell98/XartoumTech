import mongoose, { Schema, model } from 'mongoose';

// Définition du schéma pour les signalements
const signalementSchema = new Schema({
    idUtilisateurSignale: { type: Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
    idUtilisateurSignalant: { type: Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
    motif: { 
        type: String, 
        enum: ['Contenu inapproprié', 'Harcèlement', 'Spam', 'Faux profil', 'Autre'], 
        required: true 
    },
    description: { type: String }, // Description pour le motif "Autre"
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

const Signalement = model('Signalement', signalementSchema);

export default Signalement;
