import express from "express";
import StoryController from "../controllers/StoryController.js";
import { storyValidationRules } from "../utils/validators.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import ValidationMiddleware from "../middlewares/ValidationMiddleware.js";
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post("/", AuthMiddleware.verify, upload.single('file'), storyValidationRules(), ValidationMiddleware.validate, StoryController.create.bind(StoryController));
router.get("/:id/view", AuthMiddleware.verify, StoryController.view.bind(StoryController));
router.post("/:id/reaction", AuthMiddleware.verify, StoryController.addReaction.bind(StoryController));
router.post("/:id/response", AuthMiddleware.verify, StoryController.addResponse.bind(StoryController));

export default router;
