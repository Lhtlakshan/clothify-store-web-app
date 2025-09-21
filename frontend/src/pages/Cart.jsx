import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Cart = () => {
  const token = localStorage.getItem("token");
  const [cartItems, setCartItems] = useState([]);
const navigate = useNavigate();
  //calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  //update
  const updateQty = async (productId, size, qty) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/`,
        { productId, size, qty },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setCartItems(res.data.cart);
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };

  // remove item
  const removeItem = async (productId, size) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/`,
        {
          headers: { Authorization: "Bearer " + token },
          data: { productId, size },
        }
      );
      setCartItems(res.data.cart);
    } catch (err) {
      console.error("Error removing cart item:", err);
    }
  };

  //checkout order
  const checkoutOrder = async (paymentType = "creditCard") => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/checkout`,
        {
          paymentType,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      toast.success(
        "Order placed successfully! Please check your email for confirmation."
      );

      navigate("/products")
    } catch (err) {
      console.error("Error removing cart item:", err);
    }
  };

  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setCartItems(res.data); // assuming res.data is an array of cart items
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    getCart();
  }, [token]);

  return (
    <div className="p-6">
    <Header/>
      <h2 className="text-2xl font-bold mb-4 mt-8">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div>
          <table className="table-auto w-full border border-gray-300 relative">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Product</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Total</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">Rs. {item.price}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) =>
                        updateQty(item.productId, item.size, e.target.value)
                      }
                      className="w-16 border text-center"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    Rs. {item.price * item.qty}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => removeItem(item.productId, item.size)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right mt-4 font-bold text-lg">
            Total: Rs. {totalPrice}
          </div>

          <button
            type="submit"
            className="text-right mt-8 font-semibold text-lg absolute right-8 p-4 bg-blue-700 text-white rounded-[10px] cursor-pointer hover:bg-blue-600 shadow-lg"
            onClick={() => {
              checkoutOrder("Debit card");
            }}
          >
            Place order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
