import express from "express";
import bannerController from "../controllers/bannersController.js";
import upload from "../utils/cloudinaryConfig.js"

const router = express.Router();

router.route("/")
    .get(bannerController.getAllBanners)
    .post(upload.single("image"), bannerController.insertBanner)

router.route("/:id")
    .put(upload.single("image"), bannerController.insertBanner)
    .delete(bannerController.deleteBanner)

export default router;