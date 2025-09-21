import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (username == "" || password == "") {
        toast.error("please fill all fields");
        return;
      }
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "api/user/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      console.log(res.data);
      console.log(res.data.token);
      
      
      navigate("/login");
      toast.success("Login successful...");
    } catch (err) {
      console.log(err);
      toast.error("Login failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          <label className="block mb-1 font-medium mt-5" htmlFor="username">
            Username
          </label>
          <input
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            required
          />

          <label className="block mb-1 font-medium mt-5" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />

          <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors mt-5 cursor-pointer"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
  );
};

export default Login;
