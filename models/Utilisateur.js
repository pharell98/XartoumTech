const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schéma pour les évaluations des clients
const evaluationSchema = new Schema({
    clientId: { type: Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
    note: { type: Number, min: 0, max: 5, required: true }
});

// Schéma pour les services proposés par les tailleurs
const serviceSchema = new Schema({
    type: { type: String, enum: ['modele_pret', 'commande_sur_mesure', 'reparation'], required: true },
    nom: { type: String, required: true },
    description: { type: String, required: true },
    prixBase: { type: Number, required: true },
    urlImage: [{ type: String, required: true }],
    stock: { type: Number, default: 0 }
});

// Schéma pour le profil des utilisateurs
const profileSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    login: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true },
    role: { type: String, enum: ['tailleur', 'client'], required: true },
    adresse: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telephone: { type: String, required: true },
    aPropos: { type: String }
});

// Schéma pour les utilisateurs
const utilisateurSchema = new Schema({
    profile: { type: profileSchema, required: true },
    followers: [{ type: Schema.Types.ObjectId, ref: 'Utilisateur' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'Utilisateur' }],
    evaluations: [evaluationSchema],
    services: [serviceSchema],
    favoris: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
}, { timestamps: true });

module.exports = mongoose.model('Utilisateur', utilisateurSchema);
