import express from "express";
import StoryController from "../controllers/StoryController.js";
import { storyValidationRules } from "../utils/validators.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import ValidationMiddleware from "../middlewares/ValidationMiddleware.js";
import { upload } from '../config/cloudinary.js';  // Utilisation de Cloudinary pour multer

const router = express.Router();

// Routes pour les histoires (stories)
router.post("/", AuthMiddleware.verify, upload.single('file'), storyValidationRules(), ValidationMiddleware.validate, StoryController.create.bind(StoryController));
router.get("/:id/view", AuthMiddleware.verify, StoryController.view.bind(StoryController));
router.post("/:id/reaction", AuthMiddleware.verify, StoryController.addReaction.bind(StoryController));
router.post("/:id/response", AuthMiddleware.verify, StoryController.addResponse.bind(StoryController));
router.delete("/:id/response/:responseId", AuthMiddleware.verify, StoryController.removeResponse.bind(StoryController));

export default router;
