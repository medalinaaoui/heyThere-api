import express from "express";
import refreshAccessTokenController from "../../controllers/refreshAccessTokenController.js";

const refreshAccessTokenRouter = express.Router();

refreshAccessTokenRouter.get("/", refreshAccessTokenController);

export default refreshAccessTokenRouter;
