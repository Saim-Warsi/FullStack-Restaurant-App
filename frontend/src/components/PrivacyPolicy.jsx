import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";

const PrivacyPolicy = () => {
  const { showPrivacyPolicy, setShowPrivacyPolicy } = useContext(StoreContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const shortText =
    "Little Lemon - Privacy Policy.  We respect your privacy and are committed to protecting your personal information. We collect information when you make reservations, place orders, or interact with our services. This includes your name, contact details, payment information, and dining preferences...";

  const fullText =
    "Little Lemon - Privacy Policy.  We respect your privacy and are committed to protecting your personal information. We collect information when you make reservations, place orders, or interact with our services. This includes your name, contact details, payment information, and dining preferences. We use this information to process your orders, manage reservations, improve our services, and communicate with you about promotions and updates. We do not sell, rent, or share your personal information with third parties except as necessary to fulfill your orders (such as payment processors and delivery services). We implement appropriate security measures to protect your data against unauthorized access, alteration, or disclosure. You have the right to access, update, or delete your personal information at any time by contacting us. We may use cookies and similar technologies to enhance your browsing experience and analyze website usage. You can control cookie settings through your browser preferences. We retain your information only as long as necessary to provide our services and comply with legal obligations. By using our services, you consent to the collection and use of your information as described in this policy. We may update this privacy policy from time to time, and continued use of our services constitutes acceptance of any changes. For questions about your privacy or to exercise your rights, contact us at privacy@littlelemon.com or +92 3895 9125. This policy is governed by local privacy laws and regulations.";

  return (
    <div className="  bg-opacity-50 backdrop-blur-sm flex items-center justify-center fixed z-50 w-full h-full">
      <div className=" px-[25px] py-[30px] bg-white rounded-xl self-center w-[max(23vw,330px)] grid items-center ">
        <div className="flex justify-between px-8 items-center">
          <h1 className="font-bold   text-2xl">Privacy Policy</h1>
          <img
            src={assets.cross_icon}
            className="text-3xl cursor-pointer"
            onClick={() => setShowPrivacyPolicy(false)}
          />
        </div>

        <div className="mt-4 px-2">
          <p className="text-sm leading-relaxed overflow-auto h-40">
            {isExpanded ? fullText : shortText}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-green-900 hover:text-yellow-300 underline text-sm font-medium transition-colors "
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>

        <button
          type="submit"
          className="cursor-pointer bg-yellow-300 rounded-full  py-2 px-5  text-black mt-4"
          onClick={() => setShowPrivacyPolicy(false)}
        >
          Acknowledged
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;