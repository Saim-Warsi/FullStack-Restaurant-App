import React, { useEffect, useState, useContext } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import ConfirmPopup from "../components/ConfirmPopup";
import { StoreContext } from "../context/StoreContext.jsx";

const Add = ({ url }) => {
  const { showPopup, setShowPopup } = useContext(StoreContext);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });
  const [newErrors, setNewErrors] = useState("");
  const [newCategory, setNewCategory] = useState(``);

  const OnChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
    // Clear errors when user starts typing
    if (newErrors) setNewErrors("");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("image", image);

      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding item");
      console.error("Error adding food:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const popupData = "Are you sure you want to add this item?";

  const handleAdd = (e) => {
    e.preventDefault();
    //validation
    setNewErrors("");

    if (!image) {
      setNewErrors("Please upload product image");
      return;
    }

    if (!data.name.trim()) {
      setNewErrors("Please enter product name");
      return;
    }

    if (!data.description.trim()) {
      setNewErrors("Please enter product description");
      return;
    }

    if (!data.price || data.price <= 0) {
      setNewErrors("Please enter valid price");
      return;
    }

    setShowPopup(true);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Salad: "bg-green-100 text-green-800 border-green-200",
      Rolls: "bg-blue-100 text-blue-800 border-blue-200",
      Desserts: "bg-pink-100 text-pink-800 border-pink-200",
      Sandwich: "bg-orange-100 text-orange-800 border-orange-200",
      Cake: "bg-purple-100 text-purple-800 border-purple-200",
      "Pure Veg": "bg-emerald-100 text-emerald-800 border-emerald-200",
      Pasta: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Noodles: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  if (loading) {
    return (
      <div className="w-full  bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Add New Item
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                  Loading...
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
        <ConfirmPopup popupData={popupData} onConfirm={onSubmitHandler} />
      )}

      <div className="w-full mx-auto  bg-gray-50">
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
        <div className="bg-white shadow-sm border-b  top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Add New Item
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="hidden sm:inline">Current Category:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(
                    data.category
                  )}`}
                >
                  {data.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Form Container with Scroll */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-[70vh] overflow-auto custom-scrollbar">
              <div className="p-6 sm:p-8 lg:p-10">
                <form className="space-y-8" onSubmit={onSubmitHandler}>
                  {/* Image Upload Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Product Image
                      </h3>
                      <span className="text-red-500 text-sm">*</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start gap-6">
                      <div className="flex-shrink-0">
                        <label htmlFor="image" className="cursor-pointer block">
                          <div className="w-32 h-32 sm:w-40 sm:h-40 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors group">
                            <img
                              src={
                                image
                                  ? URL.createObjectURL(image)
                                  : assets.upload_area
                              }
                              alt="Upload preview"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                        </label>
                        <input
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                          }}
                          type="file"
                          id="image"
                          hidden
                          accept="image/*"
                        />
                      </div>

                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Upload Guidelines:
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Recommended size: 400x400px or larger</li>
                          <li>• Supported formats: JPG, PNG, GIF</li>
                          <li>• Maximum file size: 5MB</li>
                          <li>• Use high-quality images for best results</li>
                        </ul>

                        {image && (
                          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-800 font-medium">
                              ✓ Image uploaded successfully
                            </p>
                            <p className="text-xs text-green-600">
                              {image.name}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Product Details Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Product Name */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                          Product Name
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          onChange={OnChangeHandler}
                          value={data.name}
                          type="text"
                          name="name"
                          placeholder="Enter product name..."
                          className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-colors"
                        />
                      </div>

                      {/* Category */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                          Category
                          <span className="text-red-500">*</span>
                        </label>

                        <select
                          onChange={OnChangeHandler}
                          name="category"
                          className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-colors bg-white"
                          value={
                            data.category === "Other" ||
                            ![
                              "Salad",
                              "Rolls",
                              "Desserts",
                              "Sandwich",
                              "Cake",
                              "Pure Veg",
                              "Pasta",
                              "Noodles",
                            ].includes(data.category)
                              ? "Other"
                              : data.category
                          }
                        >
                          <option value="Salad">Salad</option>
                          <option value="Rolls">Rolls</option>
                          <option value="Desserts">Desserts</option>
                          <option value="Sandwich">Sandwich</option>
                          <option value="Cake">Cake</option>
                          <option value="Pure Veg">Pure Veg</option>
                          <option value="Pasta">Pasta</option>
                          <option value="Noodles">Noodles</option>
                          <option value="Other">Other (Custom)</option>
                        </select>

                        {(data.category === "Other" ||
                          ![
                            "Salad",
                            "Rolls",
                            "Desserts",
                            "Sandwich",
                            "Cake",
                            "Pure Veg",
                            "Pasta",
                            "Noodles",
                          ].includes(data.category)) && (
                          <input
                            type="text"
                            placeholder="Enter custom category"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            onBlur={(e) => {
                              // Only update data.category when user leaves the input field
                              OnChangeHandler({
                                target: {
                                  name: "category",
                                  value: e.target.value,
                                },
                              });
                            }}
                            className="w-full p-4 mt-2 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-colors"
                          />
                        )}

                        {/* Category Preview */}
                        <div className="mt-2">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(
                              data.category
                            )}`}
                          >
                            Selected: {data.category}
                          </span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                          Product Price
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                            $
                          </span>
                          <input
                            onChange={OnChangeHandler}
                            value={data.price}
                            type="number"
                            name="price"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-colors"
                          />
                        </div>
                        {data.price && (
                          <p className="text-sm text-green-600 font-medium">
                            Price: ${parseFloat(data.price).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Product Description */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                          Product Description
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          onChange={OnChangeHandler}
                          value={data.description}
                          name="description"
                          rows="8"
                          placeholder="Describe your product in detail..."
                          className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-colors resize-none"
                        />
                        <p className="text-xs text-gray-500">
                          {data.description.length}/500 characters
                        </p>
                      </div>

                      {/* Preview Card - Matches FoodItem design */}
                      <div className="hidden md:block bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Preview:
                        </h4>
                        <div className="w-full rounded-[15px] shadow-[0px_0px_10px_#00000035] bg-white overflow-hidden">
                          <div className="static">
                            <img
                              className="w-full h-40 object-cover rounded-t-[15px]"
                              src={
                                image
                                  ? URL.createObjectURL(image)
                                  : assets.upload_area
                              }
                              alt="Preview"
                            />
                            <div className="absolute bottom-[15px] right-[15px] w-[35px] h-[35px] bg-white rounded-full flex items-center justify-center shadow-md">
                              <span className="text-yellow-500 text-xl font-bold">
                                +
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-center mb-3">
                              <p className="text-base font-semibold text-gray-900">
                                {data.name || "Product Name"}
                              </p>
                              <img
                                src={assets.rating_starts}
                                alt=""
                                className="w-[60px]"
                              />
                            </div>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {data.description ||
                                "Product description will appear here..."}
                            </p>
                            <div className="flex items-center justify-between">
                              <p className="text-green-900 text-lg font-semibold">
                                ${data.price || "0.00"}
                              </p>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                                  data.category
                                )}`}
                              >
                                {data.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Error Message */}
                  {newErrors && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-red-700 font-medium">{newErrors}</p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                    <button
                      onClick={handleAdd}
                      disabled={submitting}
                      className={`flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-white transition-colors ${
                        submitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-200"
                      }`}
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                          <span>Adding Item...</span>
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                          <span>Add Item</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setData({
                          name: "",
                          description: "",
                          price: "",
                          category: "Salad",
                        });
                        setImage(false);
                        setNewErrors("");
                      }}
                      className="px-8 py-4 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition-colors"
                    >
                      Reset Form
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
