

import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();
  
  return (
    <div className="cart mt-16 md:mt-24 px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl mx-auto pb-12">
      <div className="cart-items">
        <div className="hidden sm:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] items-center text-gray-600 text-sm md:text-base font-medium pb-3 border-b-2 border-gray-300">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <div className="mt-4 space-y-4">
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={index}>
                  <div className="grid grid-cols-[80px_1fr_auto] sm:grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] gap-3 sm:gap-4 items-center py-3 sm:py-4">
                    <img 
                      src={url + "/images/" + item.image} 
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shadow-sm"
                    />
                    
                    <div className="sm:contents">
                      <p className="font-medium text-gray-800 text-sm sm:text-base">{item.name}</p>
                      
                      <div className="flex sm:contents gap-4 text-sm sm:text-base text-gray-700">
                        <div className="sm:hidden">
                          <span className="text-gray-500">Price: </span>
                          <span className="font-medium">${item.price}</span>
                        </div>
                        <p className="hidden sm:block">${item.price}</p>
                        
                        <div className="sm:hidden">
                          <span className="text-gray-500">Qty: </span>
                          <span className="font-medium">x{cartItems[item._id]}</span>
                        </div>
                        <p className="hidden sm:block">x{cartItems[item._id]}</p>
                        
                        <p className="font-semibold text-gray-900">${cartItems[item._id] * item.price}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center hover:scale-110 transition-transform"
                      aria-label="Remove item"
                    >
                      <img src={assets.cross_icon} alt="Remove" className="w-full h-full" />
                    </button>
                  </div>
                  <hr className="border-gray-200" />
                </div>
              );
            }
          })}
        </div>
      </div>

      <div className="mt-12 md:mt-16 flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="flex-1 bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-200">
          <h2 className="text-xl md:text-2xl font-semibold text-green-900 mb-6">Cart Totals</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700 text-base md:text-lg">
              <p>Subtotal</p>
              <p className="font-medium">${getTotalCartAmount()}</p>
            </div>
            <hr className="border-gray-200" />
            
            <div className="flex justify-between text-gray-700 text-base md:text-lg">
              <p>Delivery Fee</p>
              <p className="font-medium">${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr className="border-gray-200" />
            
            <div className="flex justify-between text-gray-900 text-lg md:text-xl font-bold pt-2">
              <p>Total</p>
              <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
            </div>
          </div>

          <button
            className="mt-6 w-full border-2 border-yellow-300 bg-yellow-300 hover:bg-white hover:border-green-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-full py-3 text-base md:text-lg font-medium"
            onClick={() => navigate("/order")}
            disabled={getTotalCartAmount() === 0}
          >
            Proceed to checkout
          </button>
        </div>

        {/* <div className="flex-1 bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-200">
          <p className="text-gray-700 text-base md:text-lg mb-4">If you have a promo code, enter it here</p>
          <div className="flex flex-col sm:flex-row gap-3 bg-gray-100 rounded-full p-2">
            <input
              type="text"
              placeholder="Promo code"
              className="bg-transparent border-none outline-none pl-3 py-2 flex-grow text-base"
            />
            <button className="bg-black text-white rounded-full py-2 px-6 hover:bg-gray-800 transition-colors whitespace-nowrap">
              Submit
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Cart;