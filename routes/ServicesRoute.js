import express from 'express';
import ServiceController from '../controllers/ServiceController.js';
import { serviceValidationRules } from '../utils/validators.js';
import ValidationMiddleware from '../middlewares/ValidationMiddleware.js';

const router = express.Router();


router.post('/add', serviceValidationRules(), ValidationMiddleware.validate, ServiceController.create.bind(ServiceController));
router.put('/update/:id', serviceValidationRules(), ValidationMiddleware.validate, ServiceController.update.bind(ServiceController));
router.delete('/delete/:id', serviceValidationRules(), ValidationMiddleware.validate, ServiceController.delete.bind(ServiceController));
router.get('/', ServiceController.findAll.bind(ServiceController));
router.get('/:id', ServiceController.getById.bind(ServiceController));
// Ajoutez d'autres routes si nécessaire

export default router;