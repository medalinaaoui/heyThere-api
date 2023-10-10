import express from "express";
const addLikeRouter = express.Router();
import addLikeController from "../../controllers/addLikeController.js";
import deleteLikeController from "../../controllers/deleteLikeController.js";

addLikeRouter.post("/", addLikeController).delete("/", deleteLikeController);

export default addLikeRouter;
