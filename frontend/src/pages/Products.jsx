import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import Header from "../components/Header";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const getAllProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`,
        {
          params: {
            search,
            category,
            size,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            page,
            limit,
          },
        }
      );

      setProducts(res.data.products);
      console.log(res.data.products);
      
      // Calculate total pages
      const totalItems = res.data.total;
      setTotalPages(Math.ceil(totalItems / limit));
    } catch (err) {
      console.error(err);
    }
  };

  // Trigger fetch whenever search, filters, page, or limit changes
  useEffect(() => {
    getAllProducts();
  }, [search, category, size, priceRange, page, limit]);

  return (
    <div className="mt-[50px]">
      <Header />
      <div className="flex flex-col items-center justify-center relative">
        <h1 className="text-2xl font-bold text-center mb-[20px] mt-[80px]">
          Products
        </h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or description"
          className="border px-3 py-2 rounded mb-4 w-[300px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">All Categories</option>
            <option value="Kids">Kids</option>
            <option value="Women">Women</option>
            <option value="Men">Men</option>
          </select>

          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">All Sizes</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>

          <input
            type="number"
            placeholder="Min Price"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
            className="border px-2 py-1 rounded w-[80px]"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="border px-2 py-1 rounded w-[80px]"
          />
        </div>

        {/* products */}
        <div className="flex flex-wrap gap-6 justify-center p-4 mt-[20px]">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.imageUrl}
              sizes={product.sizes}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
