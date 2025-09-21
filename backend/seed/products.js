const products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    description: "100% cotton, comfortable and breathable",
    price: 19.99,
    imageUrl:
      "https://oldguysrule.co.uk/cdn/shop/files/original-classic-t-shirt-navy-165_5000x.jpg?v=1695740020",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Denim Jacket",
    description: "Stylish denim jacket for all seasons",
    price: 59.99,
    imageUrl:
      "https://img.drz.lazcdn.com/g/kf/S3dc9630523404f648632d2ab4c4ef00eq.jpg_400x400q75.avif",
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    id: 3,
    name: "Blue Jeans",
    description: "Slim-fit jeans with stretch fabric",
    price: 39.99,
    imageUrl:
      "https://img.drz.lazcdn.com/g/kf/S75c03901ee0743168f8f899bba407812v.png_400x400q75.avif",
    category: "Men",
    sizes: ["M", "L", "XL"],
  },
  {
    id: 4,
    name: "Summer Dress",
    description: "Lightweight dress perfect for summer",
    price: 49.99,
    imageUrl:
      "https://img.drz.lazcdn.com/g/kf/S3ff13731a65d40f18d1d2c2a17ec842bF.jpg_400x400q75.avif",
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    id: 5,
    name: "Kids Hoodie",
    description: "Soft hoodie with fun prints for kids",
    price: 29.99,
    imageUrl:
      "https://img.drz.lazcdn.com/g/kf/Sd34401dc66f04e14a4b92184488f35beM.jpg_400x400q75.avif",
    category: "Kids",
    sizes: ["S", "M", "L"],
  },
  {
    id: 6,
    name: "",
    description: "Premium leather jacket with a modern fit",
    price: 129.99,
    imageUrl:
      "https://img.drz.lazcdn.com/static/lk/p/4b3d0a203419e8eb336ea23c220cd16b.jpg_400x400q75.avif",
    category: "Men",
    sizes: ["M", "L", "XL"],
  },
  {
    id: 7,
    name: "Floral Skirt",
    description: "Elegant skirt with floral patterns",
    price: 34.99,
    imageUrl:
      "https://img.drz.lazcdn.com/g/kf/S59c6dde7215842da8aaceea6bdfb9e30H.jpg_400x400q75.avif",
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    id: 8,
    name: "Kids Jeans",
    description: "Durable and comfortable jeans for kids",
    price: 24.99,
    imageUrl:
      "https://img.drz.lazcdn.com/g/kf/Se4bdd0e98ccc4c3bbec4132c144d9e25J.jpg_400x400q75.avif",
    category: "Kids",
    sizes: ["S", "M", "L"],
  },
  {
    id: 9,
    name: "Hooded Sweatshirt",
    description: "Warm and cozy hoodie for casual wear",
    price: 44.99,
    imageUrl:
      "https://img.drz.lazcdn.com/g/kf/S12055b00ba474596b8be9ea209e37fdfc.jpg_400x400q75.avif",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 10,
    name: "Graphic Tee",
    description: "Trendy graphic t-shirt with cool prints",
    price: 22.99,
    imageUrl:
      "https://img.drz.lazcdn.com/static/lk/p/5aa293cd5d6ab16abcebaba442688604.jpg_400x400q75.avif",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 11,
    name: "Maxi Dress",
    description: "Flowy maxi dress for summer outings",
    price: 54.99,
    imageUrl:
      "https://img.drz.lazcdn.com/g/kf/S8fe41e7ec7764a9ab05add028ce884399.jpg_400x400q75.avif",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 12,
    name: "Leather Boots",
    description: "Durable and stylish leather boots",
    price: 89.99,
    imageUrl:
      "https://img.drz.lazcdn.com/g/kf/S1b0c6342d0734a1189312d25339ecbbcv.jpg_400x400q75.avif",
    category: "Men",
    sizes: ["M", "L", "XL"],
  },
  {
    id: 13,
    name: "Kids Sneakers",
    description: "Comfortable sneakers for everyday wear",
    price: 34.99,
    imageUrl:
      "https://img.drz.lazcdn.com/g/kf/S4c518d27d803450b962ab66e04cba2b9v.jpg_400x400q75.avif",
    category: "Kids",
    sizes: ["S", "M", "L"],
  },
  {
    id: 14,
    name: "Cardigan Sweater",
    description: "Lightweight cardigan for layering",
    price: 39.99,
    imageUrl:
      "https://img.drz.lazcdn.com/g/kf/S7d892da632a14ace99f668d0d20f7470K.jpg_400x400q75.avif",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 15,
    name: "Tie",
    description: "Casual chinos for office or weekend",
    price: 42.99,
    imageUrl:
      "https://img.drz.lazcdn.com/g/kf/Sa3ee3dd9b27849298a8a8b7aafb6532cE.jpg_400x400q75.avif",
    category: "Men",
    sizes: ["M", "L", "XL"],
  },
  {
    id: 16,
    name: "Summer Shorts",
    description: "Comfortable cotton shorts for warm weather",
    price: 19.99,
    imageUrl:
      "https://img.drz.lazcdn.com/g/kf/S8569b0c4c1c24694a1d463c949f5904ag.jpg_400x400q75.avif",
    category: "Men",
    sizes: ["S", "M", "L"],
  },
  {
    id: 17,
    name: "Pleated Skirt",
    description: "Chic pleated skirt for women",
    price: 32.99,
    imageUrl:
      "https://img.drz.lazcdn.com/g/kf/S6c01fd0523d94b5ca157b9acc7fc97113.jpg_400x400q75.avif",
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    id: 18,
    name: "Kids T-Shirt Set",
    description: "2-pack cotton t-shirts for kids",
    price: 21.99,
    imageUrl:
      "https://img.drz.lazcdn.com/g/kf/S2ec7c99da3214a45a98e43cfed53e6a0P.jpg_400x400q75.avif",
    category: "Kids",
    sizes: ["S", "M", "L"],
  },
  {
    id: 19,
    name: "Windbreaker Jacket",
    description: "Lightweight jacket for rainy or windy days",
    price: 49.99,
    imageUrl:
      "https://img.drz.lazcdn.com/g/kf/S362b572c834a4f4dbff7a9ec21706d6fj.jpg_400x400q75.avif",
    category: "Men",
    sizes: ["M", "L", "XL"],
  },
  {
    id: 20,
    name: "Hooded Dress",
    description: "Casual hooded dress for women",
    price: 44.99,
    imageUrl:
      "https://img.drz.lazcdn.com/g/kf/S0d0dcbb198704eca93aa5f4195ee8186e.jpg_400x400q75.avif",
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    id: 21,
    name: "Kids Hoodie Set",
    description: "Warm hoodie and pants set for kids",
    price: 39.99,
    imageUrl:
      "https://img.drz.lazcdn.com/g/kf/S30f1d158e30145dfb466b19e50ae01acT.jpg_400x400q75.avif",
    category: "Kids",
    sizes: ["S", "M", "L"],
  },
  {
    id: 22,
    name: "Polo Shirt",
    description: "Smart casual polo shirt",
    price: 29.99,
    imageUrl:
      "https://img.drz.lazcdn.com/static/lk/p/2fb51877a323a5dd0e512376b8f13baa.jpg_400x400q75.avif",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },
];

export default products;
