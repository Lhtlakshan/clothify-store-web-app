import products from "../seed/products.js";

export const getProductById = (req,res) => {
  const productId = Number(req.params.id);

  // Find the product with matching id
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

// export const getAllProducts = (req,res) => {

//   if (products == null) {
//     res.status(404).json({ message: "Products not found" });
//   }
//   res.status(200).json(products);
// };

export const getAllProducts = (req, res) => {
  if (!products || products.length === 0) {
    return res.status(404).json({ message: "Products not found" });
  }

  let { search, category, size, minPrice, maxPrice, page, limit } = req.query;

  // Convert numbers
  minPrice = minPrice ? parseFloat(minPrice) : 0;
  maxPrice = maxPrice ? parseFloat(maxPrice) : Infinity;
  page = page ? parseInt(page, 10) : 1;
  limit = limit ? parseInt(limit, 10) : 10;

  let filteredProducts = [...products];

  // Search by name or description
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
    );
  }

  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by size
  if (size) {
    filteredProducts = filteredProducts.filter((p) =>
      p.sizes.includes(size.toUpperCase())
    );
  }

  // Filter by price range
  filteredProducts = filteredProducts.filter(
    (p) => p.price >= minPrice && p.price <= maxPrice
  );

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  res.status(200).json({
    total: filteredProducts.length,
    page,
    limit,
    products: paginatedProducts,
  });
};




