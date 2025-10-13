import React, { useState, useEffect } from 'react';
import { Percent, Tag, Sparkles, Trash2, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const PromoCodes = ({ url }) => {
  const [formData, setFormData] = useState({
    code: '',
    discount: '',
    category: 'All',
    expirationDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(null);
  const [promoCodes, setPromoCodes] = useState([]);
  const [fetchingCodes, setFetchingCodes] = useState(false);

  // Fetch promo codes from database
  const fetchPromoCodes = async () => {
    try {
      setFetchingCodes(true);
      const response = await axios.get(url + '/api/promocode/list');
      if (response.data.success) {
        const formattedData = response.data.data.map(promo => ({
          id: promo._id,
          code: promo.code,
          discount: promo.discount,
          category: promo.category,
          expirationDate: promo.expirationDate
        }));
        setPromoCodes(formattedData);
      } else {
        toast.error('Failed to fetch promo codes');
      }
    } catch (err) {
      console.error('Error fetching promo codes:', err);
      toast.error('Error loading promo codes');
    } finally {
      setFetchingCodes(false);
    }
  };

  // Fetch promo codes on component mount
  useEffect(() => {
    fetchPromoCodes();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.code || !formData.discount) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.discount <= 0 || formData.discount > 100) {
      toast.error('Discount must be between 1 and 100');
      return;
    }

    if (formData.expirationDate) {
      const selectedDate = new Date(formData.expirationDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        toast.error('Expiration date cannot be in the past');
        return;
      }
    }

    setLoading(true);
    
    try { 
      const requestData = {
        code: formData.code.toUpperCase(),
        discount: parseFloat(formData.discount),
        category: formData.category
      };

      if (formData.expirationDate) {
        requestData.expirationDate = formData.expirationDate;
      }

      const response = await axios.post(url + '/api/promocode/create', requestData);
      
      if (response.data.success) {
        toast.success('Promo code created successfully!');
        setFormData({ code: '', discount: '', category: 'All', expirationDate: '' });
        fetchPromoCodes(); // Refresh the list
      } else {
        toast.error(response.data.message || 'Failed to create promo code');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error creating promo code';
      toast.error(errorMessage);
      console.error('Full error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    setRemoving(id);
    
    try {
      const response = await axios.post(url + '/api/promocode/delete', { id });
      
      if (response.data.success) {
        toast.success('Promo code deleted successfully!');
        fetchPromoCodes(); // Refresh the list
      } else {
        toast.error(response.data.message || 'Failed to delete promo code');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error deleting promo code';
      toast.error(errorMessage);
      console.error('Delete error:', err);
    } finally {
      setRemoving(null);
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
      All: "bg-gray-100 text-gray-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="w-full bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                Promo Codes
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <span className="hidden sm:inline">Active:</span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                {promoCodes.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl h-[70vh] overflow-auto mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Create Promo Code Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                  Create New Promo Code
                </h2>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-5">
                {/* Promo Code Input */}
                <div>
                  <label htmlFor="code" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Promo Code
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <Tag className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="code"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      placeholder="e.g., SAVE20"
                      className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-colors bg-white uppercase placeholder:normal-case"
                    />
                  </div>
                </div>

                {/* Discount Percentage Input */}
                <div>
                  <label htmlFor="discount" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Discount Percentage
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <Percent className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="discount"
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      placeholder="e.g., 20"
                      min="1"
                      max="100"
                      className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-colors bg-white"
                    />
                  </div>
                </div>

        

                {/* Category Select */}
                <div>
                  <label htmlFor="category" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Applicable Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-colors bg-white"
                  >
                    <option value="All">All Categories</option>
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                  </select>
                </div>


                <div className='text-center text-gray-500 hidden lg:block'>
                  ----------------
                </div>
                <div className="text-center text-gray-500 hidden lg:block">
                  <p className='text-gray-500'>
                    Slay your sales goals with irresistible promo codes!
                  </p>
                </div>
                <div className='text-center text-gray-500 hidden lg:block'>
                  ----------------
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full py-2 sm:py-3 px-4 rounded-lg text-sm sm:text-base font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-yellow-500 hover:bg-yellow-600 shadow-md hover:shadow-lg'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Promo Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Active Promo Codes List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                Active Promo Codes
              </h2>
            </div>
            
            <div className="p-4 sm:p-6">
              {fetchingCodes ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin h-8 w-8 border-2 border-yellow-500 border-t-transparent rounded-full"></div>
                </div>
              ) : promoCodes.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Tag className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    No promo codes yet
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Create your first promo code to get started.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {promoCodes.map((promo) => (
                    <div
                      key={promo.id}
                      className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 overflow-hidden"
                    >
                      <div className="p-3 sm:p-4">
                        <div className="flex items-start justify-between gap-2 sm:gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <h3 className="font-bold text-gray-900 text-base sm:text-lg tracking-wider">
                                {promo.code}
                              </h3>
                              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                                {promo.discount}% OFF
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">Category:</span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                                  promo.category
                                )}`}
                              >
                                {promo.category}
                              </span>
                            </div>
                            {promo.expirationDate && (
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-500">Expires:</span>
                                <span className="text-xs text-gray-700 font-medium">
                                  {new Date(promo.expirationDate).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => handleRemove(promo.id)}
                            disabled={removing === promo.id}
                            className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-colors flex-shrink-0 ${
                              removing === promo.id
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "text-red-600 hover:bg-red-600 hover:text-white"
                            }`}
                            title="Remove promo code"
                          >
                            {removing === promo.id ? (
                              <div className="animate-spin h-3 w-3 sm:h-4 sm:w-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                            ) : (
                              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            )}
                          </button>
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
  );
};

export default PromoCodes;