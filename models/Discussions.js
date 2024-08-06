const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définition du schéma de la discussion
const discutionSchema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: 'Utilisateur' },
    to: { type: Schema.Types.ObjectId, ref: 'Utilisateur' },
    contenu: { type: String }
}, 
{
    timestamp: true
}
);

// Création du modèle basé sur le schéma
module.exports = mongoose.model('Discution', discutionSchema);
