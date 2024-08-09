import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const mesureSchema = new Schema({
    nom: { type: String },  // Ajout de `required: true` pour éviter les valeurs nulles
    type: { type: String, enum: ['Homme', 'Femme', 'Enfant'] },
    valeurs: {
      poitrine: { type: Number },
      taille: { type: Number },
      hanches: { type: Number },
      hauteur: { type: Number },
      cou: { type: Number },
      epaules: { type: Number },
      longueurManche: { type: Number },
      longueurPantalon: { type: Number },
      tourCeinture: { type: Number },
      sousPoitrine: { type: Number },
      tourDeBuste: { type: Number },
      longueurRobe: { type: Number },
      longueurBras: { type: Number },
      longueurJambe: { type: Number }
    }
}, { timestamps: true });


// Schéma pour le profil des utilisateurs
const profileSchema = new Schema({
    photo: { type: String },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    login: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true },
    role: { type: String, enum: ['tailleur', 'client'], required: true },
    adresse: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telephone: { type: String, required: true },
    aPropos: { type: String },
    stateProfiles: { type: String, enum: ['normal', 'signaler'], default: 'normal'},
    sexe: { type: String, enum: ['Homme', 'Femme']}
}, { _id: false });  // Important: _id: false pour éviter un ID distinct

// Schéma pour les utilisateurs
const utilisateurSchema = new Schema({
    profile: { type: profileSchema, required: true },
    followers: [{ type: Schema.Types.ObjectId, ref: 'Utilisateur' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'Utilisateur' }],
    bloquer: [{ type: Schema.Types.ObjectId, ref: 'Utilisateur' }],
    evaluations: [{ type: Schema.Types.ObjectId, ref: 'Evaluation' }],
    services: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    favoris: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    mesMesures: [mesureSchema],
    signalementsCount: { type: Number, default: 0 }, // Ajout du champ pour suivre le nombre de signalements
    solde: { type: Number, default: 0 },
    postsGratuits: { type: Number, default: 0 },
    postsGratuitsQuotidiens: { type: Date, default: Date.now }
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
