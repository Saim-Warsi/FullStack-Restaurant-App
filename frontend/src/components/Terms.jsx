import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";

const Terms = () => {
  const { showTerms, setShowTerms } = useContext(StoreContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const shortText =
    "Little Lemon - Terms of Service. By using Little Lemon's dining, takeout, delivery, or catering services, you agree to these terms. Reservations are held for 15 minutes and require 2-hour advance cancellation notice...";

  const fullText =
    "Little Lemon - Terms of Service. By using Little Lemon's dining, takeout, delivery, or catering services, you agree to these terms. Reservations are held for 15 minutes and require 2-hour advance cancellation notice. We reserve the right to refuse service and require proper attire for dining. Online orders cannot be modified after confirmation, and delivery times are estimates subject to weather and demand conditions. All prices are subject to change, applicable taxes will be added, and large parties may incur an 18% automatic gratuity. Refunds are issued at management discretion, and cancelled orders after food preparation may be non-refundable. Gift cards are valid for 2 years and cannot be replaced if lost. We collect necessary information for orders and communications, which you consent to by providing your contact details. Our name, logo, recipes, and menu items are proprietary intellectual property. Food is prepared in a kitchen handling common allergens, so please inform us of dietary restrictions. By dining with us, you consent to photography for promotional use. We may modify these terms at any time, and continued use of our services constitutes acceptance. For questions or concerns, contact us at contact@littlelemon.com or +92 3895 9125. These terms are governed by local laws and any disputes will be resolved through binding arbitration.";

  return (
    <div className="bg-opacity-50 backdrop-blur-sm flex items-center justify-center fixed z-50 w-full h-full">
      <div className=" px-[25px] py-[30px] bg-white rounded-xl self-center w-[max(23vw,330px)] grid items-center">
        <div className="flex justify-between px-8 items-center">
          <h1 className="font-bold   text-2xl">Our Terms</h1>
          <img
            src={assets.cross_icon}
            className="text-3xl cursor-pointer"
            onClick={() => setShowTerms(false)}
          />
        </div>

        <div className="mt-4 px-2">
          <p className="text-sm leading-relaxed overflow-auto h-35">
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
          onClick={() => setShowTerms(false)}
        >
          Acknowleged
        </button>
      </div>
    </div>
  );
};

export default Terms;
