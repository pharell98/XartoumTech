import express from 'express';
import AuthController from '../controllers/AuthController.js';
import { userValidationRules, loginValidationRules } from '../utils/validators.js';
import ValidationMiddleware from '../middlewares/ValidationMiddleware.js';
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import multer from 'multer';


const router = express.Router();
const upload = multer({ dest: 'uploads/' }).single('photo'); // Assurez-vous que le nom ici est correct


router.post('/register', upload, userValidationRules(), ValidationMiddleware.validate, AuthController.register.bind(AuthController));
router.post('/login', loginValidationRules(), ValidationMiddleware.validate, AuthController.login.bind(AuthController));
router.put('/update-solde', AuthMiddleware.verify, AuthController.updateSolde.bind(AuthController));

export default router;
