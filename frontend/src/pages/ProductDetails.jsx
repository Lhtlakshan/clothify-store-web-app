import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../components/Header";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  // Fetch product details
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
        );
        setProduct(res.data);
        setStatus("loaded");
      } catch (e) {
        console.error(e);
        setStatus("error");
      }
    };

    getProduct();
  }, [id]);

  // Add to cart
  const addToCart = async (product, quantity = 1) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/`,
        {
          productId: product.id,
          quantity,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Product added to cart successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product to cart: " + err.message);
    }
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Failed to load product.</div>;
  if (!product) return null;

  return (
    <div className="flex">
    <Header/>
      <div className="w-full min-h-screen flex pt-[100px] px-10 gap-10">
        {/* Product Image */}
        <div className="w-[50%] h-full flex justify-center items-start">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-[300px] h-[300px] object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="w-[50%] h-full flex flex-col justify-start">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <h2 className="text-xl font-semibold mb-2">
            Price: Rs.{product.price}
          </h2>
          <h3 className="text-md text-gray-600 mb-4">
            Category: {product.category}
          </h3>
          <p className="text-gray-700 mb-4">{product.description}</p>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex items-center gap-2 mb-6">
              <span className="font-medium">Sizes:</span>
              {product.sizes.map((size, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 border rounded bg-gray-100 text-gray-800 text-sm"
                >
                  {size}
                </span>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 hover:bg-blue-800 focus:outline-none cursor-pointer"
              onClick={() => addToCart(product, 1)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
