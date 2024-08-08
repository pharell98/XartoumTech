import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectDB from './utils/database.js';
//import User from './models/Utilisateur.js';
import Utilisateur from './models/Utilisateur.js';

// Connectez-vous à la base de données
connectDB();
/*
// Créez des utilisateurs fictifs
const seedUsers = async () => {
    const users = [
        {
            profile: {
                nom: 'Sow',
                prenom: 'BOBO',
                login: 'bobo.sow@example.com',
                motDePasse: await bcrypt.hash('password123', 10),
                role: 'tailleur',
                adresse: '123 Rue des Tailleurs, Dakar, Sénégal',
                email: 'bobo.sow@example.com',
                telephone: '+221123456789',
                aPropos: 'Tailleur expérimenté spécialisé en vêtements traditionnels africains.'
            },
            followers: [],
            following: [],
            evaluations: [],
            services: [],
            favoris: []
        },
        {
            profile: {
                nom: 'Ba',
                prenom: 'Hamidou',
                login: 'hamidou.ba@example.com',
                motDePasse: await bcrypt.hash('password123', 10),
                role: 'client',
                adresse: '456 Rue des Clients, Dakar, Sénégal',
                email: 'hamidou.ba@example.com',
                telephone: '+221987654321',
                aPropos: ''
            },
            followers: [],
            following: [],
            evaluations: [],
            services: [],
            favoris: []
        }
    ];

    try {
        await User.insertMany(users);
        console.log('Données initiales insérées avec succès');
    } catch (err) {
        console.error('Erreur lors de l\'insertion des données:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedUsers();
*/

const seedMesures = async (userId) => {
    try {
        await connectDB(); // Connectez-vous à la base de données

        const utilisateur = await Utilisateur.findById(userId);

        if (utilisateur) {
            const { nom } = utilisateur.profile;
            const mesures = {
                Femme: {
                    nom,
                    poitrine: 90,
                    taille: 75,
                    hanches: 95,
                    hauteur: 180,
                    cou: 40,
                    epaules: 50,
                    longueurManche: 60,
                    longueurPantalon: 100,
                    tourCeinture: 85
                },

            };

            utilisateur.mesMesures = mesures;
            await utilisateur.save();
            console.log('Mesures mises à jour avec succès pour l\'utilisateur:', utilisateur);
        } else {
            console.log('Utilisateur non trouvé');
        }
    } catch (err) {
        console.error('Erreur lors de la mise à jour des mesures:', err);
    } finally {
        mongoose.connection.close();
    }
};

// Remplacez 'votre_user_id' par l'ID de l'utilisateur que vous souhaitez mettre à jour
const userId = '66b3ef98a8fc38b016174946';
seedMesures(userId);