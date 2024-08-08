import express from "express";
import FollowController from "../controllers/FollowController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/:id/follow", AuthMiddleware.verify, FollowController.followUser.bind(FollowController));
router.delete("/:id/unfollow", AuthMiddleware.verify, FollowController.unfollowUser.bind(FollowController));
router.get("/:id/followers", AuthMiddleware.verify, FollowController.getFollowers.bind(FollowController));
router.get("/:id/following", AuthMiddleware.verify, FollowController.getFollowing.bind(FollowController));

export default router;
