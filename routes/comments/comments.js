import express from "express";
import commentsController from "../../controllers/commentsController.js";

const commentsRouter = express.Router();

commentsRouter.get("/:postId", commentsController);

export default commentsRouter;
