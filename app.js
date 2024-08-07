import express from 'express';
import connectDB from './utils/database.js';
import authRoutes from './routes/authRoutes.js';
import discutionsRoutes from './routes/discutionsRoutes.js';
import servicesRoutes from './routes/ServicesRoute.js';
import AuthMiddleware from './middlewares/AuthMiddleware.js';

connectDB();

const app = express();

// Utilisez express.json() et express.urlencoded() pour analyser les corps des requêtes
app.use(express.json());

// Routes publiques
//app.use('/auth', authRoutes);
app.use('/discussions', discutionsRoutes);
app.use('/services', servicesRoutes);
// Middleware d'authentification
app.use(AuthMiddleware.verify);
export default app;
