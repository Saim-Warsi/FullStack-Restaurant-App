import React from "react";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../assets/assets";
import ConfirmPopup from "../components/ConfirmPopup";
import { StoreContext } from "../context/StoreContext";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrder, setUpdatingOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const { showPopup, setShowPopup } = useContext(StoreContext);
  const [listFilter, setListFilter] = useState(null)
  const popupData = "Are you sure you want to cancel this order?";
  const [orderIdToCancel, setOrderIdToCancel] = useState(null);
  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        // Sort orders to show latest first (reverse order)
        const sortedOrders = response.data.data.reverse();
        setOrders(sortedOrders);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Error connecting to server");
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelFood = async () => {
    if (!orderIdToCancel) {
      toast.error("No order selected to cancel.");
      return;
    }
    let responce = await axios.post(`${url}/api/order/cancel`, {
      orderId: orderIdToCancel,
    });
    if (responce.data.success) {
      toast.success("Cancelled");
    } else {
      toast.error(
        "There was an error removing the order, Please try again later."
      );
    }
  };
  const statusHandler = async (event, orderId) => {
    try {
      const newStatus = event.target.value;
      setOrderStatus(newStatus);
      setUpdatingOrder(orderId);
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: newStatus,
      });
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated successfully");
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      toast.error("Error updating order status");
      console.error("Error updating order status:", error);
    } finally {
      setUpdatingOrder(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Food Processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Out for delivery":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleClick = (orderId) => {
    setOrderIdToCancel(orderId);
    setShowPopup(true);
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);
  if (loading) {
    return (
      <div className="w-full  bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Orders Management
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="hidden sm:inline">Total Orders:</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                  {orders.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Spinner */}
        <div className="flex items-center justify-center mt-20">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }
  return (
    <>
      {showPopup && (
        <ConfirmPopup
          onConfirm={cancelFood}
          popupData={popupData}
          setShowPopup={setShowPopup}
        />
      )}
      <div className="w-full  bg-gray-50">
        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(45deg, #fbbf24, #f59e0b);
              border-radius: 10px;
              border: 1px solid #f59e0b;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(45deg, #f59e0b, #d97706);
                }
                .custom-scrollbar {
                  scrollbar-width: thin;
                  scrollbar-color: #fbbf24 #f1f5f9;
                  }
                  `}</style>

        {/* Header */}
        <div className="bg-white shadow-sm border-b  top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Orders Management
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="hidden sm:inline">Total Orders:</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                  {orders.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* category wise filter */}
          {/* category wise filter */}
<div className="categories text-end m-4">
  <span 
    className={`cursor-pointer ${listFilter === "All" || listFilter == null ? "font-semibold" : ""}`} 
    onClick={() => setListFilter("All")}
  >
    All
  </span> / {" "}
  <span 
    className={`cursor-pointer ${listFilter === "Food Processing" ? "font-semibold" : ""}`} 
    onClick={() => setListFilter("Food Processing")}
  >
    Food processing
  </span> / {" "}
  <span 
    className={`cursor-pointer ${listFilter === "Out for delivery" ? "font-semibold" : ""}`} 
    onClick={() => setListFilter("Out for delivery")}
  >
    Out for delivery
  </span> / {" "}
  <span 
    className={`cursor-pointer ${listFilter === "Delivered" ? "font-semibold" : ""}`} 
    onClick={() => setListFilter("Delivered")}
  >
    Delivered
  </span>
</div>
          {/* Orders Container with Scroll */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-[70vh] overflow-auto custom-scrollbar">
              <div className="p-4 sm:p-6">
                {/* Empty State */}
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <img
                      src={assets.parcel_icon}
                      alt=""
                      className="w-16 h-16 mx-auto mb-4 opacity-50"
                    />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No orders found
                    </h3>
                    <p className="text-gray-500">
                      Orders will appear here once customers start placing them.
                    </p>
                  </div>
                ) : (
                  /* Orders Grid */
                  <div className="space-y-4 sm:space-y-6">
                    {orders
                    .filter((order)=>{
                      if(listFilter === "All" || listFilter == null) return true;


                      return order.status.includes(listFilter);
                    })
                    .map((order, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden"
                      >
                        {/* Mobile & Tablet Layout (< lg) */}
                        <div className="lg:hidden">
                          {/* Order Header */}
                          <div className="p-4 sm:p-6 border-b border-gray-100">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="bg-gray-100 p-2 rounded-lg">
                                <img
                                  src={assets.parcel_icon}
                                  alt=""
                                  className="w-6 h-6"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight mb-2">
                                  {order.items
                                    .map((item, idx) =>
                                      idx === order.items.length - 1
                                        ? `${item.name} x ${item.quantity}`
                                        : `${item.name} x ${item.quantity}, `
                                    )
                                    .join("")}
                                </h3>

                                {/* Order ID with Status and Cancel on tablet, separate on mobile */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                                  <p className="text-[10px] font-bold text-gray-500">
                                    Id:
                                    <span className="font-medium underline ml-1">
                                      {order._id}
                                    </span>
                                  </p>

                                  <div className="flex items-center gap-2 sm:gap-3">
                                    <div
                                      className={`px-3 py-2 rounded-full text-xs font-medium border ${getStatusColor(
                                        order.status
                                      )} flex items-center gap-1`}
                                    >
                                      <span>{order.status}</span>
                                    </div>

                                    {/* cancel order */}
                                    <div
                                      onClick={
                                        order.status === "Delivered"
                                          ? null
                                          : () => handleClick(order._id)
                                      }
                                      className={` items-center justify-center text-xs bg-red-400 text-white hover:text-red-500 hover:bg-white transition-all duration-200 hover:border-red-500 border border-transparent rounded-full px-3 py-2 cursor-pointer  ${
                                        order.status === "Delivered" &&
                                        "disabled"
                                      }`}
                                    >
                                      <img
                                        src={assets.add_icon}
                                        alt="Cancel"
                                        className="w-3 h-3 invert rotate-45 sm:mr-1"
                                      />

                                      <span className="hidden sm:inline">
                                        Cancel
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Order Details */}
                          <div className="p-4 sm:p-6">
                            {/* Customer Info */}
                            <div className="mb-6">
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <span>👤</span>
                                Customer Details
                              </h4>
                              <div className="bg-gray-50 rounded-lg p-4">
                                <p className="font-medium text-gray-900 mb-2">
                                  {order.address.firstName}{" "}
                                  {order.address.lastName}
                                </p>
                                <div className="text-sm text-gray-600 space-y-1">
                                  <p className="flex items-start gap-2">
                                    <span className="text-gray-400">📍</span>
                                    <span>{order.address.street}</span>
                                  </p>
                                  <p className="ml-6">
                                    {order.address.city}, {order.address.state}
                                  </p>
                                  <p className="ml-6">
                                    {order.address.country},{" "}
                                    {order.address.zipcode}
                                  </p>
                                  <p className="flex items-center gap-2 pt-2">
                                    <span>📞</span>
                                    <span className="font-medium">
                                      {order.address.phone}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Order Summary */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                              <div className="bg-blue-50 rounded-lg p-4 text-center">
                                <p className="text-2xl font-bold text-blue-600 mb-1">
                                  {order.items.length}
                                </p>
                                <p className="text-sm text-blue-700">Items</p>
                              </div>
                              <div className="bg-green-50 rounded-lg p-4 text-center">
                                <p className="text-2xl font-bold text-green-600 mb-1">
                                  ${order.amount}
                                </p>
                                <p className="text-sm text-green-700">Total</p>
                              </div>
                            </div>

                            {/* Status Selector */}
                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-3">
                                Update Order Status
                              </label>
                              <select
                                onChange={(event) =>
                                  statusHandler(event, order._id)
                                }
                                value={order.status}
                                disabled={updatingOrder === order._id}
                                className={`w-full bg-white border-2 border-gray-200 rounded-lg p-3 text-sm font-medium focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-colors ${
                                  updatingOrder === order._id
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:border-gray-300"
                                }`}
                              >
                                <option value="Food Processing">
                                  Food Processing
                                </option>
                                <option value="Out for delivery">
                                  Out for delivery
                                </option>
                                <option value="Delivered">Delivered</option>
                              </select>
                              {updatingOrder === order._id && (
                                <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                                  <span className="animate-spin h-3 w-3 border border-gray-400 border-t-transparent rounded-full"></span>
                                  Updating status...
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Desktop Layout (>= lg) */}
                        <div className="hidden lg:block">
                          <div className="p-6">
                            <div className="grid grid-cols-12 gap-6 items-start">
                              {/* Order Icon & Number */}
                              <div className="col-span-1 flex flex-col items-center">
                                <div className="bg-gray-100 p-3 rounded-lg mb-2">
                                  <img
                                    src={assets.parcel_icon}
                                    alt=""
                                    className="w-8 h-8"
                                  />
                                </div>
                                <span className="text-xs text-gray-500">
                                  #{index + 1}
                                </span>
                              </div>

                              {/* Items & Customer */}
                              <div className="col-span-5">
                                <div className="mb-4">
                                  <h3 className="font-semibold text-gray-900 mb-2 leading-relaxed">
                                    {order.items
                                      .map((item, idx) =>
                                        idx === order.items.length - 1
                                          ? `${item.name} x ${item.quantity}`
                                          : `${item.name} x ${item.quantity}, `
                                      )
                                      .join("")}
                                  </h3>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                  <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <span>👤</span>
                                    {order.address.firstName}{" "}
                                    {order.address.lastName}
                                  </p>
                                  <div className="text-sm text-gray-600 space-y-1">
                                    <p className="flex items-start gap-2">
                                      <span className="text-gray-400">📍</span>
                                      <span>
                                        {order.address.street},{" "}
                                        {order.address.city},{" "}
                                        {order.address.state},{" "}
                                        {order.address.country},{" "}
                                        {order.address.zipcode}
                                      </span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                      <span>📞</span>
                                      <span className="font-medium">
                                        {order.address.phone}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Items Count */}
                              <div className="col-span-2 text-center">
                                <div className="bg-blue-50 rounded-lg p-4">
                                  <p className="text-2xl font-bold text-blue-600 mb-1">
                                    {order.items.length}
                                  </p>
                                  <p className="text-sm text-blue-700">Items</p>
                                </div>
                              </div>

                              {/* Total Amount */}
                              <div className="col-span-2 text-center">
                                <div className="bg-green-50 rounded-lg p-4">
                                  <p className="text-2xl font-bold text-green-600 mb-1">
                                    ${order.amount}
                                  </p>
                                  <p className="text-sm text-green-700">
                                    Total
                                  </p>
                                </div>
                              </div>

                              {/* Status Selector */}
                              <div className="col-span-2">
                                <div
                                  className={`mb-3 px-3 py-2 rounded-full text-sm font-medium text-center ${getStatusColor(
                                    order.status
                                  )} flex items-center justify-center gap-2`}
                                >
                                  <span>{order.status}</span>
                                </div>
                                <select
                                  onChange={(event) =>
                                    statusHandler(event, order._id)
                                  }
                                  value={order.status}
                                  disabled={updatingOrder === order._id}
                                  className={`w-full bg-white border-2 border-gray-200 rounded-lg p-3 text-sm font-medium focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-colors ${
                                    updatingOrder === order._id
                                      ? "opacity-50 cursor-not-allowed"
                                      : "hover:border-gray-300"
                                  }`}
                                >
                                  <option value="Food Processing">
                                    Food Processing
                                  </option>
                                  <option value="Out for delivery">
                                    Out for delivery
                                  </option>
                                  <option value="Delivered">Delivered</option>
                                </select>
                                {updatingOrder === order._id && (
                                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                                    <span className="animate-spin h-3 w-3 border border-gray-400 border-t-transparent rounded-full"></span>
                                    Updating...
                                  </p>
                                )}
                              </div>
                              <div></div>
                            </div>
                            <div className="flex justify-between w-full ">
                              <p className="text-[12px] font-bold text-gray-500 mb-1">
                                Order Id:{" "}
                                <span className="font-medium underline">
                                  {order._id}
                                </span>
                              </p>
                              <button
                                onClick={
                                  order.status === "Delivered"
                                    ? null
                                    : () => handleClick(order._id)
                                }
                                className={`text-[12px] w-auto border border-transparent bg-red-400 text-white hover:text-red-500 hover:bg-white transition ease-in-out hover:border hover:border-red-500 rounded-lg px-3 py-1  ${
                                  order.status === "Delivered" && "disabled"
                                }`}
                              >
                                Cancel Order
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
