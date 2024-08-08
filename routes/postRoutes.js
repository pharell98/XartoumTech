import express from "express";

import PostController from "../controllers/PostController.js";

import {postValidationRules, postUpdateValidationRules, commentValidationRules, likeValidationRules} from "../utils/validators.js";

import AuthMiddleware from "../middlewares/AuthMiddleware.js";

import ValidationMiddleware from "../middlewares/ValidationMiddleware.js";

const router = express.Router();

router.get("/",AuthMiddleware.verify,PostController.findAll.bind(PostController));

router.get("/:id",AuthMiddleware.verify,PostController.getById.bind(PostController));

router.post("/",AuthMiddleware.verify,postValidationRules(),ValidationMiddleware.validate,PostController.create.bind(PostController));

router.put("/:id",AuthMiddleware.verify,postUpdateValidationRules(),ValidationMiddleware.validate,PostController.update.bind(PostController));

router.delete("/:id",AuthMiddleware.verify,PostController.delete.bind(PostController));

router.post("/:id/comment",AuthMiddleware.verify,commentValidationRules(),ValidationMiddleware.validate,PostController.addComment.bind(PostController));

router.delete("/:id/comment/:commentId",AuthMiddleware.verify,PostController.removeComment.bind(PostController));

router.post("/:id/like",AuthMiddleware.verify,likeValidationRules(),ValidationMiddleware.validate,PostController.likePost.bind(PostController));

router.delete("/:id/like",AuthMiddleware.verify,likeValidationRules(),ValidationMiddleware.validate,PostController.removeLike.bind(PostController));

router.post("/:id/dislike",AuthMiddleware.verify,likeValidationRules(),ValidationMiddleware.validate,PostController.dislikePost.bind(PostController));

router.delete("/:id/dislike",AuthMiddleware.verify,likeValidationRules(),ValidationMiddleware.validate,PostController.removeDislike.bind(PostController));

router.post("/:id/view",AuthMiddleware.verify,PostController.viewPost.bind(PostController));

router.post("/:id/share",AuthMiddleware.verify,PostController.sharePost.bind(PostController));

router.post("/:id/download",AuthMiddleware.verify,PostController.downloadPost.bind(PostController));

export default router;
