import express from "express";
import logoutCOntroller from "../controllers/logoutController.js";

const router = express.Router();

router.route("/").post(logoutCOntroller.logout);
export default router;