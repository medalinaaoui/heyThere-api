import express from "express";
import userPostsController from "../../controllers/userPostsController.js";

const userPostsRouter = express.Router();

userPostsRouter.get("/:userId", userPostsController);

export default userPostsRouter;
