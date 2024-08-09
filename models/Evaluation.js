import { Schema, model } from 'mongoose';

// Schéma pour l'évaluation
const evaluationSchema = new Schema({
    utilisateurId: { type: Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
    note: { type: Number, required: true, min: 0, max: 5  },
}, { timestamps: true });

const Evaluation = model('Evaluation', evaluationSchema);

export default Evaluation;