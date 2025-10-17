import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { Search, ShoppingCart, User, ShoppingBag, LogOut, Menu, X } from "lucide-react";

const Navbar = ({ setShowLogin }) => {
  const Navigate = useNavigate();
  const [menu, setMenu] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  
  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    Navigate("/");
    setMobileMenuOpen(false);
  };
  
  const orders = () => {
    Navigate("/myorders");
    setMobileMenuOpen(false);
  };
  
  const profile = () => {
    Navigate("/profile");
    setMobileMenuOpen(false);
  };

  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="w-full flex items-center justify-between p-3 md:p-4 scroll-smooth relative">
        <Link to={"/"}>
          <img src={assets.logo} alt="Logo" className="w-[100px] md:w-[120px] lg:w-[150px]" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-5 text-lg xl:text-xl cursor-default">
          <Link
            to={"/"}
            onClick={() => setMenu("home")}
            className={`cursor-pointer hover:text-yellow-500 transition-colors ${menu === "home" ? "active" : ""}`}
          >
            home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={`cursor-pointer hover:text-yellow-500 transition-colors ${menu === "menu" ? "active" : ""}`}
          >
            menu
          </a>
          <a
            href="#table-reservation"
            onClick={() => setMenu("reserve-table")}
            className={`cursor-pointer hover:text-yellow-500 transition-colors ${menu === "reserve-table" ? "active" : ""}`}
          >
            reserve-a-table
          </a>
          <a
            href="#app-download"
            onClick={() => setMenu("mobile-app")}
            className={`cursor-pointer hover:text-yellow-500 transition-colors ${menu === "mobile-app" ? "active" : ""}`}
          >
            mobile-app
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contact-us")}
            className={`cursor-pointer hover:text-yellow-500 transition-colors ${menu === "contact-us" ? "active" : ""}`}
          >
            contact us
          </a>
        </ul>

        <div className="flex items-center gap-3 md:gap-5">
          {/* Cart Icon */}
          <div className="relative">
            <Link to="/cart">
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
            <div
              className={`absolute min-w-[8px] md:min-w-[10px] min-h-[8px] md:min-h-[10px] bg-yellow-300 rounded-full top-[-6px] md:top-[-8px] right-[-6px] md:right-[-8px] ${
                getTotalCartAmount() ? "" : "hidden"
              }`}
            ></div>
          </div>

          {/* Sign In / User Profile - Desktop */}
          {!token ? (
            <button
              onClick={() => setShowLogin(true)}
              className="hidden md:block bg-yellow-300 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-base md:text-xl hover:bg-transparent border-2 border-white hover:text-green-900 hover:border-green-900 transition ease-in-out duration-300"
            >
              Sign in
            </button>
          ) : (
            <div className="hidden md:block Navbar-profile relative group">
              <User className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" />
              <ul className="nav-profile-dropdown absolute hidden right-0 z-10 group-hover:flex group-hover:flex-col gap-2 bg-white p-3 md:p-4 rounded border border-green-900 outline-2 outline-white min-w-[140px] md:min-w-[150px] shadow-lg">
                <li className="flex items-center gap-2 cursor-pointer hover:text-yellow-500 transition-colors" onClick={profile}>
                  <User className="w-4 h-4" />
                  <p className="text-green-900 text-sm">Profile</p>
                </li>
                <hr className="border-green-700" />
                <li className="flex items-center gap-2 cursor-pointer hover:text-yellow-500 transition-colors" onClick={orders}>
                  <ShoppingBag className="w-4 h-4" />
                  <p className="text-green-900 text-sm">Orders</p>
                </li>
                <hr className="border-green-700" />
                <li onClick={logout} className="flex items-center gap-2 cursor-pointer hover:text-yellow-500 transition-colors">
                  <LogOut className="w-4 h-4" />
                  <p className="text-green-900 text-sm">Logout</p>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-green-900">Menu</h2>
            <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <div className="flex-1 overflow-y-auto">
            <ul className="flex flex-col p-4 gap-1">
              <li>
                <Link
                  to={"/"}
                  onClick={() => handleMenuClick("home")}
                  className={`block px-4 py-3 rounded-lg text-base hover:bg-yellow-50 transition-colors ${
                    menu === "home" ? "bg-yellow-100 text-yellow-700 font-medium" : "text-gray-700"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#explore-menu"
                  onClick={() => handleMenuClick("menu")}
                  className={`block px-4 py-3 rounded-lg text-base hover:bg-yellow-50 transition-colors ${
                    menu === "menu" ? "bg-yellow-100 text-yellow-700 font-medium" : "text-gray-700"
                  }`}
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="#table-reservation"
                  onClick={() => handleMenuClick("reserve-table")}
                  className={`block px-4 py-3 rounded-lg text-base hover:bg-yellow-50 transition-colors ${
                    menu === "reserve-table" ? "bg-yellow-100 text-yellow-700 font-medium" : "text-gray-700"
                  }`}
                >
                  Reserve a Table
                </a>
              </li>
              <li>
                <a
                  href="#app-download"
                  onClick={() => handleMenuClick("mobile-app")}
                  className={`block px-4 py-3 rounded-lg text-base hover:bg-yellow-50 transition-colors ${
                    menu === "mobile-app" ? "bg-yellow-100 text-yellow-700 font-medium" : "text-gray-700"
                  }`}
                >
                  Mobile App
                </a>
              </li>
              <li>
                <a
                  href="#footer"
                  onClick={() => handleMenuClick("contact-us")}
                  className={`block px-4 py-3 rounded-lg text-base hover:bg-yellow-50 transition-colors ${
                    menu === "contact-us" ? "bg-yellow-100 text-yellow-700 font-medium" : "text-gray-700"
                  }`}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Mobile Menu Footer - User Actions */}
          <div className="border-t border-gray-200 p-4">
            {!token ? (
              <button
                onClick={() => {
                  setShowLogin(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-yellow-300 px-4 py-3 rounded-lg text-base font-medium hover:bg-yellow-400 transition-colors"
              >
                Sign In
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  onClick={profile}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                >
                  <User className="w-5 h-5 text-green-900" />
                  <span className="text-green-900 font-medium">Profile</span>
                </button>
                <button
                  onClick={orders}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                >
                  <ShoppingBag className="w-5 h-5 text-green-900" />
                  <span className="text-green-900 font-medium">Orders</span>
                </button>
                <button
                  onClick={logout}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors text-left"
                >
                  <LogOut className="w-5 h-5 text-red-600" />
                  <span className="text-red-600 font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;