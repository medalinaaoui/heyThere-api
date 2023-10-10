import express from "express";
const addCommentRouter = express.Router();
import addCommentController from "../../controllers/addCommentController.js";
import deleteCommentController from "../../controllers/deleteCommentController.js";

addCommentRouter
  .post("/", addCommentController)
  .delete("/", deleteCommentController);

// const addCommentRouter = ()=>{}
export default addCommentRouter;
