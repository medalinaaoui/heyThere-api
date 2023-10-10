import express from "express";
import usersController from "../../controllers/usersController.js";

const usersRouter = express.Router();

usersRouter.get("/:id", usersController);

export default usersRouter;
