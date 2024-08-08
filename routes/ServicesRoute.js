import express from 'express';
import ServiceController from '../controllers/ServiceController.js';
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import { serviceValidationRules } from '../utils/validators.js';
import ValidationMiddleware from '../middlewares/ValidationMiddleware.js';

const router = express.Router();


router.post('/add', AuthMiddleware.verify, serviceValidationRules(), ValidationMiddleware.validate, ServiceController.create.bind(ServiceController));
router.put('/update/:id', AuthMiddleware.verify, serviceValidationRules(), ValidationMiddleware.validate, ServiceController.update.bind(ServiceController));
router.delete('/delete/:id', AuthMiddleware.verify, serviceValidationRules(), ValidationMiddleware.validate, ServiceController.delete.bind(ServiceController));
router.get('/', AuthMiddleware.verify, ServiceController.findAll.bind(ServiceController));
router.get('/:id', AuthMiddleware.verify, ServiceController.getById.bind(ServiceController));


export default router;