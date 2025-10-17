import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import {Search, ShoppingCart, User, ShoppingBag, LogOut} from "lucide-react"

const Navbar = ({ setShowLogin }) => {
  const Navigate = useNavigate()
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const logout = ()=>{
    localStorage.removeItem('token');
    setToken('');
    Navigate("/")
  };
  const orders = ()=>{
    Navigate("/myorders")
  };
   const profile = ()=>{
    Navigate("/profile")
  };
  return (
    <nav className="w-full flex items-center justify-between p-4 scroll-smooth">
      <Link to={"/"}>
        <img src={assets.logo} alt="Logo" className="w-[120px] md:w-[150px]" />
      </Link>

      <ul className="hidden lg:flex gap-5 text-xl cursor-default">
        <Link
          to={"/"}
          onClick={() => setMenu("home")}
          className={`cursor-pointer ${menu === "home" ? "active" : ""}`}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={`cursor-pointer ${menu === "menu" ? "active" : ""}`}
        >
          menu
        </a>
        <a
          href="#table-reservation"
          onClick={() => setMenu("reserve-table")}
          className={`cursor-pointer ${menu === "reserve-table" ? "active" : ""}`}
        >
          reserve-a-table
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={`cursor-pointer ${menu === "mobile-app" ? "active" : ""}`}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={`cursor-pointer ${menu === "contact-us" ? "active" : ""}`}
        >
          contact us
        </a>
      </ul>

      <div className="flex items-center gap-5">
        <div className="relative">
          <Link to="/cart">
            <ShoppingCart />
            {/* <img src={assets.bag_icon} className="w-[30px]" alt="" /> */}
          </Link>
          <div
            className={`absolute min-w-[10px] min-h-[10px] bg-yellow-300 rounded-full top-[-8px] right-[-8px] ${
              getTotalCartAmount() ? "" : "hidden"
            }`}
          ></div>
        </div>

        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className=" bg-yellow-300 px-4 py-2 rounded-full text-xl hover:bg-transparent border-2 border-white hover:text-green-900 hover:border-green-900 transition ease-in-out duration-300"
          >
            Sign in
          </button>
        ) : (
          <div className="Navbar-profile relative group">
        <User />
            <ul className="nav-profile-dropdown absolute hidden right-0 z-1 group-hover:flex group-hover:flex-col gap-[10px] bg-white p-[12px_25px] rounded-[4px] border-1 border-green-900 outline-2 outline-white w-[min(150px)]">
              <li className="flex items-center gap-[10px] cursor-pointer" onClick={profile}>
                <User />
                <p className="text-green-900 ">Profile</p>
              </li>
              <hr className="border-green-700" />
              <li className="flex items-center gap-[10px] cursor-pointer" onClick={orders}>
                <ShoppingBag />
                <p className="text-green-900 ">Orders</p>
              </li>
              <hr className="border-green-700" />
              <li onClick={logout} className="flex items-center gap-[10px] cursor-pointer">
              <LogOut />
                <p className="text-green-900 ">Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
