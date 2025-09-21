import express from "express";
import verifyJwt from "../middleware/auth.js";
import {
  checkout,
  listOrders,
  getOrder,
} from "../controllers/order.controller.js";

const router = express.Router();
router.use(verifyJwt);

router.post("/checkout", checkout);
router.get("/", listOrders);
router.get("/:id", getOrder);

export default router;
