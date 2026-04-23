import express from "express";
import recoveryPassword from "../controllers/recoveryPasswordController.js";

const router = express.Router();

router.post("/requestCode", recoveryPassword.requestCode);
router.post("/verifyCode", recoveryPassword.verifyCode);
router.post("/newPassword", recoveryPassword.newPassword);

export default router;