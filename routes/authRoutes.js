import express from 'express';
import AuthController from '../controllers/AuthController.js';
import { userValidationRules, loginValidationRules } from '../utils/validators.js';
import ValidationMiddleware from '../middlewares/ValidationMiddleware.js';
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import { upload } from '../config/cloudinary.js';  // Utilisation de Cloudinary pour multer

const router = express.Router();

// Route pour l'inscription avec upload de la photo de profil via Cloudinary
router.post('/register', upload.single('photo'), userValidationRules(), ValidationMiddleware.validate, AuthController.register.bind(AuthController));


// Route pour la connexion
router.post('/login', loginValidationRules(), ValidationMiddleware.validate, AuthController.login.bind(AuthController));

// Route pour la mise à jour du solde
router.put('/update-solde', AuthMiddleware.verify, AuthController.updateSolde.bind(AuthController));

export default router;
