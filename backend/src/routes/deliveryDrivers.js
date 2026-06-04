import express from "express"
import deliveryDriversController from "../controllers/deliveryDriversController.js"
import uploader from "../utils/cloudinaryConfig.js"

const router = express.Router()

router.route("/")
.get(deliveryDriversController.getAllDrivers)
.post(uploader.single("image"), deliveryDriversController.insertDrivers)

router.route("/:id")
.put(uploader.single("image"), deliveryDriversController.updateDriver)
.delete(deliveryDriversController.deleteDrivers)
.get(deliveryDriversController.getDriverById)

export default router;