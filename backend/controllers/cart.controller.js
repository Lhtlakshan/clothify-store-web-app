import User from "../models/User.js";
import products from "../seed/products.js"; // your existing array-based product catalog

// helper to validate product id and size
function findProduct(productId) {
  return products.find((p) => Number(p.id) === Number(productId));
}

//get the cart
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId).lean();
    if (!user) return res.status(404).json({ message: "User not found" });
    // enrich cart with product details
    const enriched = user.cart.map((ci) => {
      const prod = findProduct(ci.productId) || {};
      return {
        productId: ci.productId,
        size: ci.size,
        qty: ci.qty,
        name: prod.name,
        price: prod.price || 0,
        imageUrl: prod.imageUrl || "",
      };
    });
    res.json(enriched);
  } catch (err) {
    console.error("getCart error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//ptoduct items add to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, size = "", qty = 1 } = req.body;
    if (!productId)
      return res.status(400).json({ message: "productId required" });

    // verify product exists (from seed)
    const prod = findProduct(productId);
    if (!prod) return res.status(404).json({ message: "Product not found" });

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // try to merge same productId+size
    const idx = user.cart.findIndex(
      (c) => Number(c.productId) === Number(productId) && c.size === size
    );
    if (idx >= 0) {
      user.cart[idx].qty = Number(user.cart[idx].qty) + Number(qty);
    } else {
      user.cart.push({ productId: Number(productId), size, qty: Number(qty) });
    }

    await user.save();
    return res.json({ cart: user.cart });
  } catch (err) {
    console.error("addToCart error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// update the product cart
export const updateCartItem = async (req, res) => {
  try {
    const { productId, size = "", qty } = req.body;
    if (!productId)
      return res.status(400).json({ message: "productId required" });

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const idx = user.cart.findIndex(
      (c) => Number(c.productId) === Number(productId) && c.size === size
    );
    if (idx === -1)
      return res.status(404).json({ message: "Cart item not found" });

    if (Number(qty) <= 0) {
      user.cart.splice(idx, 1);
    } else {
      user.cart[idx].qty = Number(qty);
    }

    await user.save();
    return res.json({ cart: user.cart });
  } catch (err) {
    console.error("updateCartItem error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

//remove item from product cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId, size = "" } = req.body;
    if (!productId)
      return res.status(400).json({ message: "productId required" });

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter(
      (c) => !(Number(c.productId) === Number(productId) && c.size === size)
    );
    await user.save();
    return res.json({ cart: user.cart });
  } catch (err) {
    console.error("removeFromCart error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
