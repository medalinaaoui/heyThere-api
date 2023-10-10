import express from "express";
const addPostRouter = express.Router();
import addPostController from "../../controllers/addPostController.js";
import deletePostController from "../../controllers/deletePostController.js";

addPostRouter.post("/", addPostController).delete("/", deletePostController);

export default addPostRouter;
