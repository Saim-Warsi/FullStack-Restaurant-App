// // import React, { useContext, useEffect, useState } from "react";
// // import axios from "axios";
// // import { StoreContext } from "../context/StoreContext";
// // import { useNavigate } from "react-router-dom";

// // const Placeorder = () => {
// //   const { getTotalCartAmount, token, food_list, cartItems, url } =
// //     useContext(StoreContext);
// //   const [savedData, setSavedData] = useState(null);

// //   const navigate = useNavigate();
// //   const [data, setData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     street: "",
// //     city: "",
// //     state: "",
// //     zipcode: "",
// //     country: "",
// //     phone: "",
// //   });

// //   const onChangeHandler = (e) => {
// //     const name = e.target.name;
// //     const value = e.target.value;
// //     setData((data) => ({ ...data, [name]: value }));
// //   };

// //   const placeOrder = async (e) => {
// //     e.preventDefault();
// //     let orderItems = [];
// //     food_list.map((item) => {
// //       if (cartItems[item._id] > 0) {
// //         let itemInfo = item;
// //         itemInfo["quantity"] = cartItems[item._id];
// //         orderItems.push(itemInfo);
// //       }
// //     });

// //     let orderData = {
// //       address: data,
// //       items: orderItems,
// //       amount: getTotalCartAmount() + 2,
// //     };
// //     let response = await axios.post(url + "/api/order/place", orderData, {
// //       headers: { token },
// //     });
// //     if (response.data.success) {
// //       const { session_url } = response.data;
// //       window.location.replace(session_url);
// //     } else {
// //       alert("There was a problem, Please try again later");
// //     }
// //   };

// //   const handleSaveInfo = () => {
// //     if (
// //       !data.firstName ||
// //       !data.phone ||
// //       !data.email ||
// //       !data.address ||
// //       !data.city ||
// //       !data.country ||
// //       !data.state ||
// //       !data.zipcode ||
// //       !data.lastName ||
// //       !data.street
// //     ) {
// //       return;
// //     }

// //     localStorage.setItem("userDeliveryInfo", JSON.stringify(data));
// //     setSavedData(data);
// //   };

// //   const handleAutoFill = () => {
// //     if (savedData) {
// //       setData(savedData);
// //     }
// //   };

// //   useEffect(() => {
// //     if (!token) {
// //       navigate("/cart");
// //       alert("Please login or create an account.");
// //     } else if (getTotalCartAmount() === 0) {
// //       navigate("/cart");
// //     }

// //     const saved = localStorage.getItem("userDeliveryInfo");
// //     if (saved) {
// //       const parsedData = JSON.parse(saved);
// //       setSavedData(parsedData);
// //     }
// //   }, [token]);

// //   return (
// //     <form
// //       onSubmit={placeOrder}
// //       className="flex items-start justify-between gap-[50px] mt-[100px]"
// //     >
// //       <div className="place-order-left  w-[max(30%,500px)]">
// //         <p className="title text-[30px] font-semibold mb-[30px] text-green-900">
// //           Delivery Information
// //         </p>
// //         {savedData && (
// //           <div className="m-3">
// //             <div className="flex items-center justify-between">
// //               <button
// //                 type="button"
// //                 onClick={handleAutoFill}
// //                 className="px-4 py-1 text-sm text-green-700 rounded-full border-1 hover:bg-green-100 transition-all duration-300 hover:text-green-900"
// //               >
// //                 Auto-fill
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //         <div className="multi-fields flex gap-[10px] ">
// //           <input
// //             required
// //             name="firstName"
// //             onChange={onChangeHandler}
// //             value={data.firstName}
// //             className="mb-[15px] w-full p-[10px] border border-gray-400 rounded-full outline-yellow-300"
// //             type="text"
// //             placeholder="First Name"
// //           />
// //           <input
// //             required
// //             name="lastName"
// //             onChange={onChangeHandler}
// //             value={data.lastName}
// //             className="mb-[15px] w-full p-[10px] border border-gray-400 rounded-full outline-yellow-300"
// //             type="text"
// //             placeholder="Last Name"
// //           />
// //         </div>
// //         <input
// //           required
// //           name="email"
// //           onChange={onChangeHandler}
// //           value={data.email}
// //           className="mb-[15px] w-full p-[10px] border border-gray-400 rounded-full outline-yellow-300"
// //           type="email"
// //           placeholder="Email Address"
// //         />
// //         <input
// //           required
// //           name="street"
// //           onChange={onChangeHandler}
// //           value={data.street}
// //           className="mb-[15px] w-full p-[10px] border border-gray-400 rounded-full outline-yellow-300"
// //           type="text"
// //           placeholder="Street"
// //         />
// //         <div className="multi-fields flex gap-[10px] ">
// //           <input
// //             required
// //             name="city"
// //             onChange={onChangeHandler}
// //             value={data.city}
// //             className="mb-[15px] w-full p-[10px] border border-gray-400 rounded-full outline-yellow-300"
// //             type="text"
// //             placeholder="City"
// //           />
// //           <input
// //             required
// //             name="state"
// //             onChange={onChangeHandler}
// //             value={data.state}
// //             className="mb-[15px] w-full p-[10px] border border-gray-400 rounded-full outline-yellow-300"
// //             type="text"
// //             placeholder="State"
// //           />
// //         </div>
// //         <div className="multi-fields flex gap-[10px] ">
// //           <input
// //             required
// //             name="zipcode"
// //             onChange={onChangeHandler}
// //             value={data.zipcode}
// //             className="mb-[15px] w-full p-[10px] border border-gray-400 rounded-full outline-yellow-300"
// //             type="text"
// //             placeholder="Zip Code"
// //           />
// //           <input
// //             required
// //             name="country"
// //             onChange={onChangeHandler}
// //             value={data.country}
// //             className="mb-[15px] w-full p-[10px] border border-gray-400 rounded-full outline-yellow-300"
// //             type="text"
// //             placeholder="Country"
// //           />
// //         </div>

// //         <input
// //           required
// //           name="phone"
// //           onChange={onChangeHandler}
// //           value={data.phone}
// //           className="mb-[15px] w-full p-[10px] border border-gray-400 rounded-full outline-yellow-300"
// //           type="text"
// //           placeholder="Phone"
// //         />

// //         <div className="mt-4 space-y-2">
// //           <label className="flex items-center gap-2 cursor-pointer">
// //             <input
// //               type="checkbox"
// //               checked={!!savedData}
// //               disabled={!!savedData}
// //               onChange={handleSaveInfo}
// //               className="w-4 h-4 accent-green-600 cursor-pointer disabled:cursor-not-allowed"
// //             />
// //             <span className="text-gray-600 text-sm">
// //               {savedData ? "Information saved" : "Remember me for next orders"}
// //             </span>
// //           </label>

// //           {savedData && (
// //             <button
// //               type="button"
// //               onClick={() => {
// //                 localStorage.removeItem("userDeliveryInfo");
// //                 setSavedData(null);
// //               }}
// //               className="text-xs text-red-600 hover:text-red-800 underline"
// //             >
// //               Clear saved info
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //       <div className="place-order-right w-[max(40%,500px)] ">
// //         <div className="flex flex-1 flex-col gap-4 md:gap-5">
// //           <h2 className="text-xl md:text-2xl font-semibold">Cart Totals</h2>
// //           <div className="detail flex justify-between text-gray-800 text-base md:text-lg">
// //             <p>Subtotal</p>
// //             <p>${getTotalCartAmount()}</p>
// //           </div>
// //           <hr className="bg-gray-200 border-none h-[1px]" />
// //           <div className="detail flex justify-between text-gray-800 text-base md:text-lg">
// //             <p>Delivery Fee</p>
// //             <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
// //           </div>
// //           <hr className="bg-gray-200 border-none h-[1px]" />
// //           <div className="detail flex justify-between text-gray-800 text-base md:text-lg">
// //             <b>Total</b>
// //             <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
// //           </div>

// //           <button
// //             type="submit"
// //             className="border-2 border-yellow-300 bg-yellow-300 hover:bg-white hover:border-green-900 transition rounded-full py-2 w-full md:w-[max(16vw,220px)] cursor-pointer mt-[20px]"
// //           >
// //             Proceed to payment
// //           </button>
// //         </div>
// //       </div>
// //     </form>
// //   );
// // };

// // export default Placeorder;


// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { StoreContext } from "../context/StoreContext";
// import { useNavigate } from "react-router-dom";

// const Placeorder = () => {
//   const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
//   const [savedData, setSavedData] = useState(null);
//   const navigate = useNavigate();
  
//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const onChangeHandler = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setData((data) => ({ ...data, [name]: value }));
//   };

//   const placeOrder = async (e) => {
//     e.preventDefault();
//     let orderItems = [];
//     food_list.map((item) => {
//       if (cartItems[item._id] > 0) {
//         let itemInfo = item;
//         itemInfo["quantity"] = cartItems[item._id];
//         orderItems.push(itemInfo);
//       }
//     });

//     let orderData = {
//       address: data,
//       items: orderItems,
//       amount: getTotalCartAmount() + 2,
//     };
    
//     let response = await axios.post(url + "/api/order/place", orderData, {
//       headers: { token },
//     });
    
//     if (response.data.success) {
//       const { session_url } = response.data;
//       window.location.replace(session_url);
//     } else {
//       alert("There was a problem, Please try again later");
//     }
//   };

//   const handleSaveInfo = () => {
//     if (
//       !data.firstName ||
//       !data.phone ||
//       !data.email ||
//       !data.street ||
//       !data.city ||
//       !data.country ||
//       !data.state ||
//       !data.zipcode ||
//       !data.lastName
//     ) {
//       return;
//     }

//     localStorage.setItem("userDeliveryInfo", JSON.stringify(data));
//     setSavedData(data);
//   };

//   const handleAutoFill = () => {
//     if (savedData) {
//       setData(savedData);
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       navigate("/cart");
//       alert("Please login or create an account.");
//     } else if (getTotalCartAmount() === 0) {
//       navigate("/cart");
//     }

//     const saved = localStorage.getItem("userDeliveryInfo");
//     if (saved) {
//       const parsedData = JSON.parse(saved);
//       setSavedData(parsedData);
//     }
//   }, [token]);

//   return (
//     <form
//       onSubmit={placeOrder}
//       className="mt-16 md:mt-24 px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl mx-auto pb-12"
//     >
//       <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
//         <div className="flex-1 lg:max-w-2xl">
//           <h2 className="text-2xl md:text-3xl font-semibold text-green-900 mb-6">
//             Delivery Information
//           </h2>

//           {savedData && (
//             <div className="mb-6 p-4 flex items-center justify-between">
              
//               <button
//                 type="button"
//                 onClick={handleAutoFill}
//                 className="px-4 py-2 text-sm text-green-700 border border-green-600 rounded-full hover:bg-green-100 transition-all"
//               >
//                 Auto-fill
//               </button>
//             </div>
//           )}

//           <div className="space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <input
//                 required
//                 name="firstName"
//                 onChange={onChangeHandler}
//                 value={data.firstName}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
//                 type="text"
//                 placeholder="First Name"
//               />
//               <input
//                 required
//                 name="lastName"
//                 onChange={onChangeHandler}
//                 value={data.lastName}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
//                 type="text"
//                 placeholder="Last Name"
//               />
//             </div>

//             <input
//               required
//               name="email"
//               onChange={onChangeHandler}
//               value={data.email}
//               className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
//               type="email"
//               placeholder="Email Address"
//             />

//             <input
//               required
//               name="street"
//               onChange={onChangeHandler}
//               value={data.street}
//               className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
//               type="text"
//               placeholder="Street"
//             />

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <input
//                 required
//                 name="city"
//                 onChange={onChangeHandler}
//                 value={data.city}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
//                 type="text"
//                 placeholder="City"
//               />
//               <input
//                 required
//                 name="state"
//                 onChange={onChangeHandler}
//                 value={data.state}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
//                 type="text"
//                 placeholder="State"
//               />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <input
//                 required
//                 name="zipcode"
//                 onChange={onChangeHandler}
//                 value={data.zipcode}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
//                 type="text"
//                 placeholder="Zip Code"
//               />
//               <input
//                 required
//                 name="country"
//                 onChange={onChangeHandler}
//                 value={data.country}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
//                 type="text"
//                 placeholder="Country"
//               />
//             </div>

//             <input
//               required
//               name="phone"
//               onChange={onChangeHandler}
//               value={data.phone}
//               className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
//               type="text"
//               placeholder="Phone"
//             />

//             <div className="pt-4 space-y-2">
//               <label className="flex items-center gap-3 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={!!savedData}
//                   disabled={!!savedData}
//                   onChange={handleSaveInfo}
//                   className="w-4 h-4 accent-green-600 cursor-pointer disabled:cursor-not-allowed"
//                 />
//                 <span className="text-gray-700 text-sm">
//                   {savedData ? "Information saved" : "Remember me for next orders"}
//                 </span>
//               </label>

//               {savedData && (
//                 <button
//                   type="button"
//                   onClick={() => {
//                     localStorage.removeItem("userDeliveryInfo");
//                     setSavedData(null);
//                   }}
//                   className="text-xs text-red-600 hover:text-red-800 underline ml-7"
//                 >
//                   Clear saved info
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 lg:max-w-md">
//           <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-200 sticky top-24">
//             <h2 className="text-xl md:text-2xl font-semibold text-green-900 mb-6">
//               Cart Totals
//             </h2>

//             <div className="space-y-4">
//               <div className="flex justify-between text-gray-700 text-base md:text-lg">
//                 <p>Subtotal</p>
//                 <p className="font-medium">${getTotalCartAmount()}</p>
//               </div>
//               <hr className="border-gray-200" />

//               <div className="flex justify-between text-gray-700 text-base md:text-lg">
//                 <p>Delivery Fee</p>
//                 <p className="font-medium">${getTotalCartAmount() === 0 ? 0 : 2}</p>
//               </div>
//               <hr className="border-gray-200" />

//               <div className="flex justify-between text-gray-900 text-lg md:text-xl font-bold pt-2">
//                 <p>Total</p>
//                 <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="mt-6 w-full border-2 border-yellow-300 bg-yellow-300 hover:bg-white hover:border-green-900 transition-all rounded-full py-3 text-base md:text-lg font-medium"
//             >
//               Proceed to payment
//             </button>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Placeorder;



import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { Tag, X } from "lucide-react";

const Placeorder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [savedData, setSavedData] = useState(null);
  const navigate = useNavigate();
  
  // Promo code states
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState("");
  
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // Apply promo code
  const applyPromoCode = async () => {
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    setPromoLoading(true);
    setPromoError("");

    try {
      const response = await axios.post(url + "/api/promocode/verify", {
        code: promoCode.toUpperCase()
      });

      if (response.data.success) {
        setAppliedPromo(response.data.data);
        setPromoError("");
      } else {
        setPromoError(response.data.message || "Invalid promo code");
        setAppliedPromo(null);
      }
    } catch (err) {
      setPromoError(err.response?.data?.message || "Error applying promo code");
      setAppliedPromo(null);
    } finally {
      setPromoLoading(false);
    }
  };

  // Remove promo code
  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode("");
    setPromoError("");
  };

  // Calculate discount amount
  const getDiscountAmount = () => {
    if (!appliedPromo) return 0;
    const subtotal = getTotalCartAmount();
    return (subtotal * appliedPromo.discount) / 100;
  };

  // Calculate final total with discount
  const getFinalTotal = () => {
    const subtotal = getTotalCartAmount();
    const deliveryFee = subtotal === 0 ? 0 : 2;
    const discount = getDiscountAmount();
    return subtotal + deliveryFee - discount;
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getFinalTotal(),
      promoCode: appliedPromo ? appliedPromo.code : null,
      discount: appliedPromo ? appliedPromo.discount : 0
    };
    
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("There was a problem, Please try again later");
    }
  };

  const handleSaveInfo = () => {
    if (
      !data.firstName ||
      !data.phone ||
      !data.email ||
      !data.street ||
      !data.city ||
      !data.country ||
      !data.state ||
      !data.zipcode ||
      !data.lastName
    ) {
      return;
    }

    localStorage.setItem("userDeliveryInfo", JSON.stringify(data));
    setSavedData(data);
  };

  const handleAutoFill = () => {
    if (savedData) {
      setData(savedData);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
      alert("Please login or create an account.");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }

    const saved = localStorage.getItem("userDeliveryInfo");
    if (saved) {
      const parsedData = JSON.parse(saved);
      setSavedData(parsedData);
    }
  }, [token]);

  return (
    <form
      onSubmit={placeOrder}
      className="mt-16 md:mt-24 px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl mx-auto pb-12"
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="flex-1 lg:max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-green-900 mb-6">
            Delivery Information
          </h2>

          {savedData && (
            <div className="mb-6 p-4 flex items-center justify-between">
              <button
                type="button"
                onClick={handleAutoFill}
                className="px-4 py-2 text-sm text-green-700 border border-green-600 rounded-full hover:bg-green-100 transition-all"
              >
                Auto-fill
              </button>
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                required
                name="firstName"
                onChange={onChangeHandler}
                value={data.firstName}
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                type="text"
                placeholder="First Name"
              />
              <input
                required
                name="lastName"
                onChange={onChangeHandler}
                value={data.lastName}
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                type="text"
                placeholder="Last Name"
              />
            </div>

            <input
              required
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
              type="email"
              placeholder="Email Address"
            />

            <input
              required
              name="street"
              onChange={onChangeHandler}
              value={data.street}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
              type="text"
              placeholder="Street"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                required
                name="city"
                onChange={onChangeHandler}
                value={data.city}
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                type="text"
                placeholder="City"
              />
              <input
                required
                name="state"
                onChange={onChangeHandler}
                value={data.state}
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                type="text"
                placeholder="State"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                required
                name="zipcode"
                onChange={onChangeHandler}
                value={data.zipcode}
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                type="text"
                placeholder="Zip Code"
              />
              <input
                required
                name="country"
                onChange={onChangeHandler}
                value={data.country}
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                type="text"
                placeholder="Country"
              />
            </div>

            <input
              required
              name="phone"
              onChange={onChangeHandler}
              value={data.phone}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
              type="text"
              placeholder="Phone"
            />

            <div className="pt-4 space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!savedData}
                  disabled={!!savedData}
                  onChange={handleSaveInfo}
                  className="w-4 h-4 accent-green-600 cursor-pointer disabled:cursor-not-allowed"
                />
                <span className="text-gray-700 text-sm">
                  {savedData ? "Information saved" : "Remember me for next orders"}
                </span>
              </label>

              {savedData && (
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("userDeliveryInfo");
                    setSavedData(null);
                  }}
                  className="text-xs text-red-600 hover:text-red-800 underline ml-7"
                >
                  Clear saved info
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 lg:max-w-md">
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-200 sticky top-24">
            <h2 className="text-xl md:text-2xl font-semibold text-green-900 mb-6">
              Cart Totals
            </h2>

            {/* Promo Code Section */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Have a promo code?
              </label>
              
              {!appliedPromo ? (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Enter code"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent uppercase"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={applyPromoCode}
                    disabled={promoLoading}
                    className="px-4 py-2 bg-yellow-300 hover:bg-yellow-400 rounded-lg font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {promoLoading ? "..." : "Apply"}
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-900">{appliedPromo.code}</p>
                      <p className="text-xs text-green-700">{appliedPromo.discount}% off applied</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removePromoCode}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
              
              {promoError && (
                <p className="mt-2 text-xs text-red-600">{promoError}</p>
              )}
            </div>

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

              {appliedPromo && (
                <>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-green-600 text-base md:text-lg">
                    <p>Discount ({appliedPromo.discount}%)</p>
                    <p className="font-medium">-${getDiscountAmount().toFixed(2)}</p>
                  </div>
                </>
              )}

              <hr className="border-gray-200" />

              <div className="flex justify-between text-gray-900 text-lg md:text-xl font-bold pt-2">
                <p>Total</p>
                <p>${getFinalTotal().toFixed(2)}</p>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full border-2 border-yellow-300 bg-yellow-300 hover:bg-white hover:border-green-900 transition-all rounded-full py-3 text-base md:text-lg font-medium"
            >
              Proceed to payment
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;