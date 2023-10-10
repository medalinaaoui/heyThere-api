import express from "express";
import postsController from "../../controllers/postsController.js";

const postsRouter = express.Router();

postsRouter.get("/", postsController);

export default postsRouter;
