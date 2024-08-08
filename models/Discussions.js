import { Schema, model } from 'mongoose';

// Définition du schéma du message
const messageSchema = new Schema({
    contenu: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

// Définition du schéma de la discussion
const discussionSchema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
    to: { type: Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
    messages: [messageSchema],
    participantsKey: { type: String, required: true }
}, {
    timestamps: true
});

// Ajouter un indice unique basé sur la propriété participantsKey
discussionSchema.index({ participantsKey: 1 }, { unique: true });

// Middleware pour définir participantsKey avant de sauvegarder
discussionSchema.pre('save', function(next) {
    this.participantsKey = [this.from.toString(), this.to.toString()].sort().join('_');
    next();
});

// Création du modèle basé sur le schéma
const Discussions = model('Discussions', discussionSchema);

export default Discussions;
