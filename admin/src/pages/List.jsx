import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../context/StoreContext";
import ConfirmPopup from "../components/ConfirmPopup";
import {Search, X} from "lucide-react"

const List = ({ url }) => {
  const { showPopup, setShowPopup } = useContext(StoreContext);
  const [list, setList] = useState([]);
  const [foodIdToRemove, setFoodIdToRemove] = useState(null);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);
  const [search, setSearch] = useState(null);

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/food/list`);

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch items");
      }
    } catch (error) {
      toast.error("Error connecting to server");
      console.error("Error fetching list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const popupData = "Are you sure you want to remove this item?";

  const handleClick = (foodId) => {
    setFoodIdToRemove(foodId);
    setShowPopup(true);
  };

  const removeFood = async () => {
    if (!foodIdToRemove) {
      toast.error("No food item selected for removal.");
      return;
    }

    try {
      setRemoving(foodIdToRemove);
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodIdToRemove,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error("Failed to remove item");
      }
    } catch (error) {
      toast.error("Error removing item");
      console.error("Error removing food:", error);
    } finally {
      setRemoving(null);
      setFoodIdToRemove(null);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Salad: "bg-green-100 text-green-800",
      Rolls: "bg-blue-100 text-blue-800",
      Desserts: "bg-pink-100 text-pink-800",
      Sandwich: "bg-orange-100 text-orange-800",
      Cake: "bg-purple-100 text-purple-800",
      "Pure Veg": "bg-emerald-100 text-emerald-800",
      Pasta: "bg-yellow-100 text-yellow-800",
      Noodles: "bg-red-100 text-red-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="w-[85%] md:w-full bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                All Food Items
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="hidden sm:inline">Total Items:</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                  {list.length}
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
          onConfirm={removeFood}
          popupData={popupData}
          setShowPopup={setShowPopup}
        />
      )}

      <div className="w-[85%] md:w-full  bg-gray-50">
        {/* Custom Scrollbar Styles */}
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
        <div className="bg-white shadow-sm border-b top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                All Food Items
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="hidden sm:inline">Total Items:</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                  {list.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Items Container with Scroll */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-[70vh] overflow-auto custom-scrollbar">
              <div className="p-4 sm:p-6">
                {/* Empty State */}
                {list.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🍽️</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No items found
                    </h3>
                    <p className="text-gray-500">
                      Add some food items to get started.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Search Input */}
                    <div className="mb-6">
                      <div className="relative ">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Search className="h-5 w-5 text-gray-400 " />
                        </div>
                        <input
                          className="w-72 py-2 pl-12 pr-12 rounded-xl bg-white focus:outline-none transition-all duration-300 placeholder:text-black text-gray-700 font-light"
                          type="search"
                          value={search || ""}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search items..."
                        />
                        
                      </div>
                      {search && (
                        <p className="mt-2 text-sm text-gray-600">
                          Found{" "}
                          <span className="font-semibold text-yellow-600">
                            {
                              list.filter((item) =>
                                item.name
                                  .toLowerCase()
                                  .includes(search.toLowerCase())
                              ).length
                            }
                          </span>{" "}
                          items matching "{search}"
                        </p>
                      )}
                    </div>

                    {/* Desktop Table Header */}
                    <div className="hidden lg:grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 rounded-lg mb-4 font-semibold text-gray-700 text-sm">
                      <div className="col-span-2">Image</div>
                      <div className="col-span-3">Name</div>
                      <div className="col-span-2">Category</div>
                      <div className="col-span-2 text-center">Price</div>
                      <div className="col-span-3 text-center">Remove</div>
                    </div>

                    {/* Items List */}
                    <div className="space-y-3 sm:space-y-4">
                      {list
                        .filter((item) => {
                          if (search == null) return true;
                          return item.name
                            .toLowerCase()
                            .includes(search.toLowerCase());
                        })
                        .map((item, index) => (
                          <div
                            key={item._id || index}
                            className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 overflow-hidden"
                          >
                            {/* Mobile & Tablet Layout (< lg) */}
                            <div className="lg:hidden">
                              <div className="p-3 sm:p-4">
                                <div className="flex items-start gap-3">
                                  {/* Image - Smaller on mobile */}
                                  <div className="flex-shrink-0">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg overflow-hidden">
                                      <img
                                        src={`${url}/images/${item.image}`}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          e.target.src =
                                            "/api/placeholder/64/64";
                                        }}
                                      />
                                    </div>
                                  </div>

                                  {/* Content - Better spacing */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                      <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 break-words line-clamp-2">
                                          {item.name}
                                        </h3>
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                          <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                                              item.category
                                            )}`}
                                          >
                                            {item.category}
                                          </span>
                                          <span className="text-base sm:text-lg font-bold">
                                            ${item.price}
                                          </span>
                                        </div>
                                      </div>

                                      {/* Action Button - Smaller on mobile */}
                                      <button
                                        onClick={() => handleClick(item._id)}
                                        disabled={removing === item._id}
                                        className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-colors flex-shrink-0 ${
                                          removing === item._id
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : "text-red-600 hover:bg-red-600 hover:text-white"
                                        }`}
                                        title="Remove item"
                                      >
                                        {removing === item._id ? (
                                          <div className="animate-spin h-3 w-3 sm:h-4 sm:w-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                                        ) : (
                                          <span className="material-symbols-outlined">
                                            delete
                                          </span>
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Desktop Layout (>= lg) */}
                            <div className="hidden lg:block">
                              <div className="px-4 py-3">
                                <div className="grid grid-cols-12 gap-4 items-center">
                                  {/* Image */}
                                  <div className="col-span-2">
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                                      <img
                                        src={`${url}/images/${item.image}`}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          e.target.src =
                                            "/api/placeholder/64/64";
                                        }}
                                      />
                                    </div>
                                  </div>

                                  {/* Name */}
                                  <div className="col-span-3">
                                    <p className="font-semibold text-gray-900 break-words pr-2">
                                      {item.name}
                                    </p>
                                  </div>

                                  {/* Category */}
                                  <div className="col-span-2">
                                    <span
                                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                                        item.category
                                      )}`}
                                    >
                                      {item.category}
                                    </span>
                                  </div>

                                  {/* Price */}
                                  <div className="col-span-2">
                                    <p className="text-lg font-bold text-center">
                                      ${item.price}
                                    </p>
                                  </div>

                                  {/* Actions */}
                                  <div className="col-span-3">
                                    <button
                                      onClick={() => handleClick(item._id)}
                                      disabled={removing === item._id}
                                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full justify-center ${
                                        removing === item._id
                                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                          : "text-red-800  hover:text-red-500 border border-transparent "
                                      }`}
                                    >
                                      {removing === item._id ? (
                                        <>
                                          <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                                          <span>Removing...</span>
                                        </>
                                      ) : (
                                        <>
                                          <span className="material-symbols-outlined text-lg">
                                            delete
                                          </span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
