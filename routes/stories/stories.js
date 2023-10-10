import express from "express";
import storiesController from "../../controllers/storiesController.js";

const storiesRouter = express.Router();

storiesRouter.get("/", storiesController);

export default storiesRouter;
