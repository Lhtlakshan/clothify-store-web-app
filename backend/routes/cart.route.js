import express from "express";
import verifyJwt from "../middleware/auth.js";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.use(verifyJwt);

router.get("/", getCart);
router.post("/", addToCart); // { productId, size, qty }
router.put("/", updateCartItem); // { productId, size, qty }
router.delete("/", removeFromCart); // { productId, size }

export default router;
