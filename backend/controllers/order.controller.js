// backend/controllers/order.controller.js
import User from "../models/User.js";
import Order from "../models/order.js";
import products from "../seed/products.js";
import transporter from "../config/mailer.js";
import crypto from "crypto";

// helper to find product by id
function findProduct(productId) {
  return products.find((p) => Number(p.id) === Number(productId));
}

// Generate HTML summary for email
function generateOrderHtml(order, user) {
  const itemsHtml = order.items
    .map(
      (i) =>
        `<li>${i.name} — size: ${i.size || "-"} — qty: ${
          i.qty
        } — $${i.price.toFixed(2)}</li>`
    )
    .join("");
  const dateStr = (order.orderDate || order.createdAt).toString();
  return `
    <h2>Thank you for your order!</h2>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p><strong>Date:</strong> ${dateStr}</p>
    <h3>Items</h3>
    <ul>${itemsHtml}</ul>
    <p><strong>Total: $${order.totalPrice.toFixed(2)}</strong></p>
    <p>We will notify you about shipping updates.</p>
  `;
}


export const checkout = async (req, res) => {
  try {
    // Authenticated path: userId present (middleware sets req.userId)
    if (req.userId) {
      const user = await User.findById(req.userId).lean();
      if (!user) return res.status(404).json({ message: "User not found" });
      if (!user.cart || user.cart.length === 0)
        return res.status(400).json({ message: "Cart is empty" });

      const items = user.cart.map((ci) => {
        const prod = findProduct(ci.productId) || {};
        return {
          productId: Number(ci.productId),
          name: prod.name || "Unknown",
          size: ci.size,
          qty: Number(ci.qty),
          price: Number(prod.price || 0),
        };
      });

      const total = items.reduce((s, i) => s + i.qty * i.price, 0);

      const order = new Order({
        user: user._id,
        items,
        totalPrice: total,
        paymentType: req.body.paymentType || "mock",
      });
      await order.save();

      // clear user cart
      user.cart = [];
      await user.save();

      // send email (async)
      const html = generateOrderHtml(order, user);
    //   try {
    //     await transporter.sendMail({
    //       from: process.env.EMAIL_FROM,
    //       to: user.email,
    //       subject: `Order Confirmation - ${order._id}`,
    //       html,
    //     });
    //   } catch (mailErr) {
    //     console.warn("Email sending failed:", mailErr);
    //   }

      return res.status(201).json({ order });
    }
  } catch (err) {
    console.error("checkout error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// list orders for authenticated user
export const listOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .lean();
    res.json({ orders });
  } catch (err) {
    console.error("listOrders error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// get order by id (must belong to user)
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).lean();
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user.toString() !== req.userId)
      return res.status(403).json({ message: "Forbidden" });
    res.json({ order });
  } catch (err) {
    console.error("getOrder error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
