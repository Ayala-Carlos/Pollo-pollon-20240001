import express from "express";
import cart from "../controllers/cartController.js";

const router = express.Router();

router.route("/")
    .get(cart.getAllCarts)
    .post(cart.insertCart)

router.route("/:id")
    .get(cart.getCartById)
    .put(cart.updateCart)
    .delete(cart.deleteCart)

export default router;