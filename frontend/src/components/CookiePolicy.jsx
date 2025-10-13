import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";

const CookiePolicy = () => {
  const { showCookiePolicy, setShowCookiePolicy } = useContext(StoreContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const shortText =
    "Little Lemon - Cookie Policy. We use cookies and similar tracking technologies to enhance your browsing experience on our website and mobile applications. Cookies are small data files stored on your device that help us remember your preferences and improve our services...";

  const fullText =
    "Little Lemon - Cookie Policy. We use cookies and similar tracking technologies to enhance your browsing experience on our website and mobile applications. Cookies are small data files stored on your device that help us remember your preferences and improve our services. We use essential cookies that are necessary for our website to function properly, including maintaining your shopping cart, remembering your login status, and processing orders. We also use performance cookies to analyze how visitors use our site, which pages are most popular, and how users navigate through our content. These analytics help us improve our website design and functionality. Marketing cookies may be used to track your visits across websites and display relevant advertisements about our menu items and promotions. You can control cookie preferences through your browser settings by accepting, rejecting, or deleting cookies. However, disabling essential cookies may affect website functionality and your ability to place orders online. We may also use web beacons, pixel tags, and similar technologies in our emails to track open rates and engagement. Third-party services like Google Analytics, payment processors, and social media plugins may set their own cookies when you interact with their embedded content. We do not sell cookie data to third parties, but some cookies may be shared with trusted partners to provide our services. Cookies typically expire after a set period, ranging from session-based (deleted when you close your browser) to persistent (stored for up to 2 years). By continuing to use our website, you consent to our use of cookies as described in this policy. For questions about our cookie practices, contact us at privacy@littlelemon.com or +92 3895 9125.";

  return (
    <div className="bg-opacity-50 backdrop-blur-sm  flex items-center justify-center fixed z-50 w-full h-full ">
      <div className=" px-[25px] py-[30px] bg-white rounded-xl self-center w-[max(23vw,330px)] grid items-center ">
        <div className="flex justify-between px-8 items-center">
          <h1 className="font-bold   text-2xl">Cookie Policy</h1>
          <img
            src={assets.cross_icon}
            className="text-3xl cursor-pointer"
            onClick={() => setShowCookiePolicy(false)}
          />
        </div>

        <div className="mt-4 px-2">
          <p className="text-sm leading-relaxed overflow-auto h-40">
            {isExpanded ? fullText : shortText}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-green-900 hover:text-yellow-300 underline text-sm font-medium transition-colors"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>

        <button
          type="submit"
          className="cursor-pointer bg-yellow-300 rounded-full  py-2 px-5  text-black mt-4"
          onClick={() => setShowCookiePolicy(false)}
        >
          Acknowledged
        </button>
      </div>
    </div>
  );
};

export default CookiePolicy;