import express from "express";
import updateProfileController from "../../controllers/updateProfileController.js";

const updateProfileRouter = express.Router();

updateProfileRouter.put("/", updateProfileController);

export default updateProfileRouter;
