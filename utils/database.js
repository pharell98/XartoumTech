import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const connectDB = async () => {
    try {
        const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=${process.env.MONGO_DB}`;

        // Afficher la chaîne de connexion pour le débogage
        console.log('MongoDB URI:', mongoURI);

        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

export default connectDB;
