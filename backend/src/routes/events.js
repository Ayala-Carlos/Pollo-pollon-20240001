import express from "express";
import eventsController from "../controllers/eventsController.js";

const router = express.Router();

router.route("/").
post(eventsController.getEvents)

router.route("/insert").
post(eventsController.insertEvent)

router.route("/:id")
.put(eventsController.updateEvent)
.delete(eventsController.deleteEvent)

export default router;