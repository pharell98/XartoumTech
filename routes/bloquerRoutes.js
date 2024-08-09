import express from "express";
import BloquerController from "../controllers/BloquerController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/:id/bloquer", AuthMiddleware.verify, BloquerController.bloquerUtilisateur.bind(BloquerController));
router.delete("/:id/debloquer", AuthMiddleware.verify, BloquerController.debloquerUtilisateur.bind(BloquerController));
router.get("/nombre-bloques", AuthMiddleware.verify, BloquerController.getNombreUtilisateursBloquesParMoi.bind(BloquerController));
router.get("/nombre-bloqueurs", AuthMiddleware.verify, BloquerController.getNombreUtilisateursMeBloquer.bind(BloquerController));

export default router;