import express from "express";
const addStoryRouter = express.Router();
import addStoryController from "../../controllers/addStoryController.js";
// import deletePostController from "../../controllers/deletePostController.js";

addStoryRouter.post("/", addStoryController);
// .delete("/", deletePostController);

export default addStoryRouter;
