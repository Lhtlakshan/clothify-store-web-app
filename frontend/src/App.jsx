import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./forms/Login";
import Signup from "./forms/Signup";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products/*" element={<h1>Products</h1>} />
          <Route path="/*" element={<h1>404 Not found</h1>} />{" "}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
