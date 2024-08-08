import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Schéma des mesures communes
const mesureCommuneSchema = new Schema({
    poitrine: { type: Number },
    taille: { type: Number },
    hanches: { type: Number },
    hauteur: { type: Number }
}, { _id: false });

// Schéma de base pour les mesures spécifiques aux hommes
const mesureHommeSchema = new Schema({
    cou: { type: Number },
    epaules: { type: Number },
    longueurManche: { type: Number },
    longueurPantalon: { type: Number },
    tourCeinture: { type: Number }
}, { _id: false });

// Schéma de base pour les mesures spécifiques aux femmes
const mesureFemmeSchema = new Schema({
    sousPoitrine: { type: Number },
    tourDeBuste: { type: Number },
    longueurRobe: { type: Number }
}, { _id: false });

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
    aPropos: { type: String },
    sexe: { type: String, enum: ['Homme', 'Femme'], default: 'Homme' }  // Modification pour accepter uniquement Homme ou Femme
});

// Schéma pour les utilisateurs
const utilisateurSchema = new Schema({
    profile: { type: profileSchema, required: true },
    followers: [{ type: Schema.Types.ObjectId, ref: 'Utilisateur' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'Utilisateur' }],
    evaluations: [{ type: Schema.Types.ObjectId, ref: 'Evaluation' }],
    services: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    favoris: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    mesMesures: {
        commune: { type: mesureCommuneSchema, default: () => ({}) },
        homme: { type: mesureHommeSchema, default: () => ({}) },
        femme: { type: mesureFemmeSchema, default: () => ({}) }
    },
    exigences: { type: String }
}, { timestamps: true });

// Hook pour hacher le mot de passe avant de sauvegarder
utilisateurSchema.pre('save', async function(next) {
    if (this.isModified('profile.motDePasse')) {
        this.profile.motDePasse = await bcrypt.hash(this.profile.motDePasse, 10);
    }
    next();
});

const Utilisateur = model('Utilisateur', utilisateurSchema);
export default Utilisateur;