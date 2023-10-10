import express from "express";
import allUsersfbController from "../../controllers/allUsersfbController.js";

const allUsersRouter = express.Router();

allUsersRouter.get("/", allUsersfbController);

export default allUsersRouter;
