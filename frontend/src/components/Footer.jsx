
import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Footer = () => {
  const { setShowTerms } = useContext(StoreContext);
  const { setShowPrivacyPolicy } = useContext(StoreContext);
  const { setShowCookiePolicy } = useContext(StoreContext);
  const [menu, setMenu] = useState("home");
  const [data, setData] = useState('');
  const {url} = useContext(StoreContext);
  const [subErr, setSubErr] = useState("")
 
  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   // console.log(data);
  //   axios.post(`${url}/api/subscribe`, {email: data})
  //     .then(response => {
  //       setSubErr("Subscribed successfully!");
  //       setData('');
  //     })
  //     .catch(error => {
  //       setSubErr("Please try again.");
  //     });
  // }
  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.post(`${url}/api/subscription/subscribe`, {email: data})
      .then(response => {
        if (response.data.success) {
          setSubErr("Subscribed successfully!");
          setData('');
        } else {
          setSubErr(response.data.message || "Please try again.");
        }
      })
      .catch(error => {
        setSubErr("Please try again.");
      });
  }

  return (
    <footer
      id="footer"
      className="mt-20 text-white bg-green-900 relative overflow-hidden"
    >


      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Main content grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
            {/* Brand section - takes more space */}
            <div className="lg:col-span-5 text-center md:text-left">
              <img
                src={assets.logo}
                alt="Little Lemon logo"
                className="w-40 mx-auto md:mx-0 mb-6"
              />

              <p className="text-green-100 leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                Discover a culinary journey with our diverse menu, crafted to
                delight every palate. From classic favorites to innovative new
                dishes, each item is prepared with the freshest local
                ingredients and a passion for flavor.
              </p>

              {/* Social media */}
              <div className="flex justify-center md:justify-start gap-4 mb-8">
                <button
                  className="group p-3 bg-green-800 hover:bg-yellow-400 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  onClick={() =>
                    window.open("https://www.facebook.com", "_blank")
                  }
                  aria-label="Visit our Facebook page"
                >
                  <img
                    src={assets.facebook_icon}
                    alt=""
                    className="w-5 h-5 group-hover:brightness-0"
                  />
                </button>
                <button
                  className="group p-3 bg-green-800 hover:bg-yellow-400 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  onClick={() => window.open("https://x.com", "_blank")}
                  aria-label="Visit our Twitter page"
                >
                  <img
                    src={assets.twitter_icon}
                    alt=""
                    className="w-5 h-5 group-hover:brightness-0"
                  />
                </button>
                <button
                  className="group p-3 bg-green-800 hover:bg-yellow-400 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  onClick={() =>
                    window.open("https://www.linkedin.com", "_blank")
                  }
                  aria-label="Visit our LinkedIn page"
                >
                  <img
                    src={assets.linkedin_icon}
                    alt=""
                    className="w-5 h-5 group-hover:brightness-0"
                  />
                </button>
              </div>
            </div>

            {/* Navigation links */}
            <div className="lg:col-span-3 text-center md:text-left">
              <h3 className="text-xl font-bold text-yellow-400 mb-6 border-b border-yellow-400/30 pb-2">
                Quick Links
              </h3>
              <nav>
                <ul className="space-y-3">
                  <li>
                    <Link to={"/"} onClick={() => setMenu("home")}>
                      home
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#explore-menu"
                      onClick={() => setMenu("menu")}
                    >
                      menu
                    </a>
                  </li>
                   <li>
                    <a
                      href="#table-reservation"
                      onClick={() => setMenu("mobile-app")}
                    >
                      Reserve a table
                    </a>
                    
                  </li>
                  <li>
                    <a
                      href="#app-download"
                      onClick={() => setMenu("mobile-app")}
                    >
                      mobile-app
                    </a>
                    
                  </li>
                </ul>
              </nav>
            </div>

            {/* Contact info */}
            <div className="lg:col-span-4 text-center md:text-left">
              <h3 className="text-xl font-bold text-yellow-400 mb-6 border-b border-yellow-400/30 pb-2">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center md:justify-start gap-3 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center group-hover:bg-yellow-400 transition-colors">
                    <span className="material-symbols-outlined">add_call</span>
                  </div>
                  <a
                    href="tel:+923895912"
                    className="text-green-100 hover:text-yellow-400 transition-colors focus:outline-none "
                  >
                    +92 3895 9125
                  </a>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-3 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center group-hover:bg-yellow-400 transition-colors">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <a
                    href="mailto:contact@littlelemon.com"
                    className="text-green-100 hover:text-yellow-400 transition-colors focus:outline-none "
                  >
                    contact@littlelemon.com
                  </a>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined">
                      location_on
                    </span>
                  </div>
                  <span className="text-green-100">Karachi, Pakistan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter section */}
          <div className="bg-green-800/30 rounded-xl p-6 lg:p-8 mb-8 border border-green-700/50">
            <div className="text-center max-w-2xl mx-auto">
              <h4 className="text-xl font-bold text-yellow-400 mb-3">
                Stay Connected
              </h4>
              <p className="text-green-100 mb-6">
                Subscribe to our newsletter for exclusive offers and updates on
                new dishes!
              </p>
              <div >
                <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  onChange={(e)=>{setData(e.target.value)}}
                  value={data.name}
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-white/10 border border-green-600/50 rounded-full text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
                <button type="submit"  className="rounded-full px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300">
                  Subscribe
                </button>
                <span>
                  {subErr && <p className="text-green-500 mt-2 text-center">{subErr}</p>}
                </span>
                </form>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-green-700/50 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <p className="text-green-200 text-sm text-center lg:text-left">
                © 2025 Little Lemon. All rights reserved.
              </p>

              <ul className="flex flex-wrap justify-center gap-6 text-sm">
                <li
                  onClick={() => setShowTerms(true)}
                  className="cursor-pointer text-green-200 hover:text-yellow-400 transition-colors focus:outline-none "
                >
                  Terms of Service
                </li>
                <li
                  onClick={() => setShowPrivacyPolicy(true)}
                  className="cursor-pointer text-green-200 hover:text-yellow-400 transition-colors focus:outline-none "
                >
                  Privacy Policy
                </li>
                <li
                  onClick={() => setShowCookiePolicy(true)}
                  className="cursor-pointer text-green-200 hover:text-yellow-400 transition-colors focus:outline-none "
                >
                  Cookie Policy
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
