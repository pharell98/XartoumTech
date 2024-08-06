import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectDB from './utils/database.js';
import User from './models/Utilisateur.js';

// Connectez-vous à la base de données
connectDB();

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
