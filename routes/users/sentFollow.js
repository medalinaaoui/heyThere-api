import express from "express";
import sentFollowController from "../../controllers/sentFollowController.js";
const sentFollowRouter = express.Router();

sentFollowRouter.post("/to", sentFollowController);

export default sentFollowRouter;
