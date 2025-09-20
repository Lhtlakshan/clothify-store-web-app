import express from "express";
import {
  getAllProducts,
  getProductById,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.get("/:id", getProductById);
productRouter.get("/", getAllProducts);

export default productRouter;
