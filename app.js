import express from 'express';
import connectDB from './utils/database.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import servicesRoutes from './routes/ServicesRoute.js';
import AuthMiddleware from './middlewares/AuthMiddleware.js';
import discutionsRoutes from './routes/discutionsRoutes.js';
import followRoutes from './routes/followRoutes.js';
import signalementRoutes from './routes/signalementRoutes.js';
import commandeRoutes from './routes/commandeRoutes.js';
import mesuresRoutes from './routes/mesuresRoutes.js';
import bloquerRoutes from './routes/bloquerRoutes.js';
import evaluationRoutes from './routes/evaluationRoutes.js';
import storyRoutes from './routes/storyRoutes.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

// Connect to the database
connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

// Middleware for parsing JSON bodies in requests
app.use(express.json());
app.use('/api-docs-XartoumTech', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Public routes
app.use('/auth', authRoutes);

// Middleware for authentication
app.use(AuthMiddleware.verify);

// Protected routes
app.use('/discussions', discutionsRoutes);
app.use('/services', servicesRoutes);
app.use('/posts', postRoutes);
app.use('/follows', followRoutes);
app.use('/mesures', mesuresRoutes);
app.use('/signaler', signalementRoutes);
app.use('/commandes', commandeRoutes);
app.use('/bloquer', bloquerRoutes);
app.use('/evaluation', evaluationRoutes);
app.use('/story', storyRoutes);

export default app;
