import express from "express";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import evaluationRoutes from "./routes/evaluationRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import partageRoutes from "./routes/partageRoutes.js";
import telechargementRoutes from "./routes/telechargementRoutes.js";
import bodyParser from "body-parser";
import modelRoutes from "./routes/modelRoutes.js";

const app = express();
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/comments', commentRoutes);
app.use('/evaluations', evaluationRoutes);
app.use('/likes', likeRoutes);
app.use('/models', modelRoutes);
app.use('/partages', partageRoutes);
app.use('/telechargements', telechargementRoutes);

export default app;