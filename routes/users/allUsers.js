import express from "express";
import allUsersController from "../../controllers/allUsersController.js";

const allUsersRouter = express.Router();

allUsersRouter.get("/", allUsersController);

export default allUsersRouter;
