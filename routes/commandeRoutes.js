import express from "express";
import CommandeController from "../controllers/CommandeController.js";
import { commandeValidationRules } from "../utils/validators.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import ValidationMiddleware from "../middlewares/ValidationMiddleware.js";

const router = express.Router();
const commandeController = new CommandeController(); // Crée une instance de CommandeController

router.get("/", AuthMiddleware.verify, commandeController.findAll.bind(commandeController));
router.get("/:id", AuthMiddleware.verify, commandeController.getById.bind(commandeController));
router.post("/create", AuthMiddleware.verify, commandeValidationRules(), ValidationMiddleware.validate, commandeController.createCommande.bind(commandeController));
router.put("/:id", AuthMiddleware.verify, commandeValidationRules(), ValidationMiddleware.validate, commandeController.update.bind(commandeController));
router.delete("/:id", AuthMiddleware.verify, commandeController.delete.bind(commandeController));
router.patch("/:id/statut", AuthMiddleware.verify, commandeController.update.bind(commandeController));

export default router;
