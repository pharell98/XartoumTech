import express from 'express';
import connectDB from './utils/database.js';
import authRoutes from './routes/authRoutes.js';
import discutionsRoutes from './routes/discutionsRoutes.js';
/*
import userRoutes from './routes/userRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import evaluationRoutes from './routes/evaluationRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
import modelRoutes from './routes/modelRoutes.js';
import partageRoutes from './routes/partageRoutes.js';
import telechargementRoutes from './routes/telechargementRoutes.js';
*/
import AuthMiddleware from './middlewares/AuthMiddleware.js';

connectDB();

const app = express();

// Utilisez express.json() et express.urlencoded() pour analyser les corps des requêtes
app.use(express.json());

// Routes publiques
app.use('/auth', authRoutes);
app.use('/discussions', discutionsRoutes);

// Middleware d'authentification
app.use(AuthMiddleware.verify);
/*
// Routes protégées
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);
app.use('/evaluations', evaluationRoutes);
app.use('/likes', likeRoutes);
app.use('/models', modelRoutes);
app.use('/partages', partageRoutes);
app.use('/telechargements', telechargementRoutes);
*/

export default app;
