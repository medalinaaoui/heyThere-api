import express from "express";
import likesController from "../../controllers/likesController.js";

const likesRouter = express.Router();

likesRouter.get("/:postLikersId", likesController);

export default likesRouter;
