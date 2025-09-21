import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const token = localStorage.getItem("token");

  useEffect(() => {
    setIsLoggedIn(true);
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full shadow-md py-4 px-4 sm:px-10 bg-white min-h-[70px] tracking-wide z-50">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">

        <ul className="lg:flex gap-x-8 hidden">
          <li>
            <Link
              className="hover:text-blue-700 text-slate-900 font-medium text-[15px]"
              to="/"
            >
              Products
            </Link>
          </li>
          <li></li>
          <li>
            <Link
              className="hover:text-blue-700 text-slate-900 font-medium text-[15px]"
              to="/cart"
            >
              Cart
            </Link>
          </li>
        </ul>

        {/* Right side - Buttons */}
        {!token && (
          <div className="flex space-x-4">
            <Link
              className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-slate-900 border border-gray-400 bg-transparent hover:bg-gray-50 transition-all"
              to="/signup"
            >
              Signup
            </Link>
            <Link
              className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all"
              to="/login"
            >
              Login
            </Link>
          </div>
        )}

        {token && (
          <div className="flex space-x-4">
            <button className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all"
            onClick={logout}>
              logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
