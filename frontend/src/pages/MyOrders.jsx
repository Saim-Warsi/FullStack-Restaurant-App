import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { assets } from "../assets/assets";
import { Salad, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <>
    <div className="my-orders m-[20px] sm:m-[50px_20px] lg:m-[50px_0px]">
      {data && data.length > 0 ? (
        <>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">My Orders</h2>
          <div className="flex flex-col gap-4 sm:gap-5 mb-[20vh]">
            {data.map((order, index) => {
              return (
                <div
                  key={index}
                  className="my-orders-order border border-yellow-300 rounded-lg p-4 sm:rounded-xl sm:p-5"
                >
                  {/* Mobile Layout */}
                  <div className="block sm:hidden">
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={assets.parcel_icon}
                        alt=""
                        className="w-8 h-8 flex-shrink-0 mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 break-words">
                          {order.items.map((item, index) => {
                            if (index === order.items.length - 1) {
                              return item.name + " x " + item.quantity;
                            } else {
                              return item.name + " x " + item.quantity + ", ";
                            }
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-semibold">
                          ${order.amount}.00
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Items:</span>
                        <span>
                          {order.items.length} item
                          <span className="text-gray-400">(s)</span>
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Status:</span>
                        <span>
                          <span className="text-green-900">&#x25cf;</span>{" "}
                          <span className="font-medium">{order.status}</span>
                        </span>
                      </div>
                      
                    </div>
                     {/* <button
                      className="w-fit p-[10px_15px] hover:underline cursor-pointer text-[#454545]"
                      onClick={fetchOrders}
                    >
                      Refresh Status
                    </button> */}

                    <div onClick={fetchOrders} className="text-center w-full mt-3 p-3 bg-yellow-100 hover:bg-yellow-200 rounded-lg text-sm font-medium transition-colors">
                      Track Order
                    </div>
                  </div>

                  {/* Tablet Layout */}
                  <div className="hidden sm:block lg:hidden">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={assets.parcel_icon}
                        alt=""
                        className="w-12 h-12 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 mb-3 break-words">
                          {order.items.map((item, index) => {
                            if (index === order.items.length - 1) {
                              return item.name + " x " + item.quantity;
                            } else {
                              return item.name + " x " + item.quantity + ", ";
                            }
                          })}
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Amount: </span>
                            <span className="font-semibold">
                              ${order.amount}.00
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Items: </span>
                            <span>
                              {order.items.length} item
                              <span className="text-gray-400">(s)</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>
                        <span className="text-green-900">&#x25cf;</span>{" "}
                        <span className="font-medium text-sm">
                          {order.status}
                        </span>
                      </span>
                      <div onClick={fetchOrders} className="text-center px-4 py-2 bg-yellow-100 hover:bg-yellow-200 rounded-lg text-sm font-medium transition-colors">
                        Track Order
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr_1fr] items-center gap-[30px] text-[14px]">
                    <img src={assets.parcel_icon} alt="" width={50} />
                    <p className="text-[#454545]">
                      {order.items.map((item, index) => {
                        if (index === order.items.length - 1) {
                          return item.name + " x " + item.quantity;
                        } else {
                          return item.name + " x " + item.quantity + ",  ";
                        }
                      })}
                    </p>
                    <p className="text-[#454545]">${order.amount}.00</p>
                    <p className="text-[#454545]">
                      {order.items.length} item
                      <span className="text-gray-400">(s)</span>
                    </p>
                    <p className="text-[#454545]">
                      <span className="text-green-900">&#x25cf;</span>
                      <b className="font-medium"> {order.status}</b>
                    </p>
                    
                   
                    <button
                      className="w-fit p-[10px_15px] hover:underline cursor-pointer text-[#454545]"
                      onClick={fetchOrders}
                    >
                      Refresh Status
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 py-12">
          <div className="relative mb-8">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div
              className="absolute -bottom-2 -right-2 w-20 h-20 bg-green-300 rounded-full blur-2xl opacity-25 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>

            {/* Main icon container */}
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 p-8 rounded-3xl shadow-xl transform transition-transform hover:scale-105">
                <Salad className="w-16 h-16 text-white" strokeWidth={1.5} />
              </div>

              {/* Decorative floating icon */}
              <div
                className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-lg animate-bounce"
                style={{ animationDuration: "2s" }}
              >
                <Clock className="w-5 h-5 text-yellow-600" strokeWidth={2} />
              </div>
            </div>
          </div>

          <div className="text-center max-w-lg space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">No Orders Yet</h2>
            <p className="text-lg text-gray-600 leading-relaxed px-4">
               Once you place an order, you'll see all your delicious history
              right here
            </p>
          </div>
   <Link to={"/"}>
          <button className="group mt-10 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-3">
            <span>Browse Our Menu</span>
            <ArrowRight
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              strokeWidth={2.5}
            />
          </button>
          </Link>

        </div>
      )}
    </div>
    </>
  );
};

export default MyOrders;

// import React, { useContext, useEffect, useState } from 'react'
// import { StoreContext } from '../context/StoreContext'
// import axios from 'axios'
// import { assets } from '../assets/assets';

// const MyOrders = () => {
//     const {url, token} = useContext(StoreContext);
//     const [data, setData] = useState([]);

//     const fetchOrders = async ()=>{
//         const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
//         setData(response.data.data);
//     };

//     useEffect(()=>{
//         if(token){
//             fetchOrders()
//         }
//     },[token]);

//   return (
//     <div className='my-orders m-[50px_0px]'>
//         <h2>My Orders</h2>
//         <div className=" flex flex-col gap-[20px] mt-[30px]">
//             {data.map((order, index)=>{
//                 return(
//                     <div key={index} className="my-orders-order grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] items-center gap-[30px] text-[14px] p-[10px_20px] text-[#454545] border border-yellow-300 rounded-full">
//                         <img src={assets.parcel_icon} alt="" width={50}/>
//                         <p>{order.items.map((item,index)=>{
//                             if(index === order.items.length-1){
//                                 return item.name+' x '+item.quantity
//                             } else{
//                                 return item.name+' x '+item.quantity+',  '

//                             }
//                         })}</p>
//                         <p>${order.amount}.00</p><p>item<span className='text-gray-400'>(s)</span> : {order.items.length}</p>
//                         <p><span className='text-green-900'>&#x25cf;</span><b className='font-medium'> {order.status}</b></p>
//                         <button className=' w-fit p-[10px_15px]  hover:underline cursor-pointer '>Track Order</button>
//                     </div>
//                 )
//             })}
//         </div>
//     </div>
//   )
// }

// export default MyOrders
