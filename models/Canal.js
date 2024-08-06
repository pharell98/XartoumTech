// Importation du module Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema; //Création d'un objet Schema

// Définition du schéma de message
const messageSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Référence à l'utilisateur qui a envoyé le message
    contenu: { type: String }, // Contenu du message
    dateEnvoi: { type: Date, default: Date.now } // Date d'envoi du message, par défaut à la date actuelle
});

// Définition du schéma de canal
const canalSchema = new Schema({
    nom: { type: String }, // Nom du canal
    description: { type: String }, // Description du canal
    membres: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Liste des membres du canal (références aux utilisateurs)
    messages: [messageSchema] // Liste des messages du canal
});

// Exportation du modèle Canal
module.exports = mongoose.model('Canal', canalSchema);