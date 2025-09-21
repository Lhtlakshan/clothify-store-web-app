import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./forms/Login";
import Signup from "./forms/Signup";
import { Toaster } from "react-hot-toast";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Products />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/*" element={<h1>404 Not found</h1>} />{" "}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
