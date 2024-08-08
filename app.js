import express from 'express';
import connectDB from './utils/database.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import servicesRoutes from './routes/ServicesRoute.js';
import AuthMiddleware from './middlewares/AuthMiddleware.js';
import discutionsRoutes from './routes/discutionsRoutes.js';
import storyRoutes from './routes/storyRoutes.js';
connectDB();

const app = express();

// Utilisez express.json() et express.urlencoded() pour analyser les corps des requêtes
app.use(express.json());

// Routes publiques
app.use('/auth', authRoutes);
// Middleware d'authentification
app.use(AuthMiddleware.verify);
/*
// Routes protégées
*/
app.use('/discussions', discutionsRoutes);
app.use('/services', servicesRoutes);
app.use('/posts', postRoutes);
app.use('/stories', storyRoutes);

export default app;
