import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import verifyJwt from "./middleware/auth.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/user",userRouter);
app.use("/api/product", productRouter);

const connectDB = async () => {
  const url = process.env.MONGO_URI || process.env.MONGO_URL;
  try {
    await mongoose.connect(url);
    console.log("Database connected");

    const port = process.env.PORT || 5000;
    app.listen(port, "0.0.0.0", () => {
      console.log(`App running on port: ${port}`);
    });
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1);
  }
};

connectDB();
