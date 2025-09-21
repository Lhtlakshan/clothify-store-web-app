import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema(
  {
    productId: { type: Number, required: true }, // your products are stored in seed file with numeric id
    size: { type: String, default: "" },
    qty: { type: Number, default: 1 },
  },
  { _id: false }
);

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: { type: [CartItemSchema], default: [] },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
