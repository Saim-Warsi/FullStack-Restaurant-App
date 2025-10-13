import React, { useEffect, useState } from "react";

const Home = ({ url }) => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalMenuItems: 0,
    totalCustomers: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(url + "/api/stats/dashboard");
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      } else {
        console.error("Failed to fetch dashboard stats");
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
    }).format(amount);
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const orderDate = new Date(date);
    const diffInMinutes = Math.floor((now - orderDate) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60)
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
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

  useEffect(() => {
    fetchDashboardStats();
    // Refresh stats every 30 seconds for real-time updates
    const interval = setInterval(fetchDashboardStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-gray-50 ">
        <div className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                  Loading...
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-20">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 ">
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
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                Live Data
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[80vh] overflow-auto max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="p-4 sm:p-6 lg:p-8 text-center">
            <div className="max-w-2xl mx-auto">
              {/* Welcome Text */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Welcome to Admin Dashboard
              </h2>
              <p className="text-base sm:text-lg text-gray-600  leading-relaxed">
                Manage your restaurant efficiently with comprehensive admin
                tools. Use the sidebar to navigate through different sections
                and monitor your business operations.
              </p>

            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6">
          {/* Total Orders */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 hover:shadow-md transition-shadow duration-200">
            <div className="text-center lg:flex lg:items-center lg:justify-between lg:text-left">
              <div className="mb-2 lg:mb-0">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">
                  Total Orders
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  {stats.totalOrders}
                </p>
              </div>
              <div className="hidden lg:block bg-gray-100 p-3 rounded-lg">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-6m-10 0H4"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 hover:shadow-md transition-shadow duration-200">
            <div className="text-center lg:flex lg:items-center lg:justify-between lg:text-left">
              <div className="mb-2 lg:mb-0">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Revenue</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 break-words">
                  {formatCurrency(stats.totalRevenue)}
                </p>
              </div>
              <div className="hidden lg:block bg-gray-100 p-3 rounded-lg">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 hover:shadow-md transition-shadow duration-200">
            <div className="text-center lg:flex lg:items-center lg:justify-between lg:text-left">
              <div className="mb-2 lg:mb-0">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">
                  Menu Items
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  {stats.totalMenuItems}
                </p>
              </div>
              <div className="hidden lg:block bg-gray-100 p-3 rounded-lg">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Customers */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 hover:shadow-md transition-shadow duration-200">
            <div className="text-center lg:flex lg:items-center lg:justify-between lg:text-left">
              <div className="mb-2 lg:mb-0">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">
                  Customers
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  {stats.totalCustomers}
                </p>
              </div>
              <div className="hidden lg:block bg-gray-100 p-3 rounded-lg">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4  sm:p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Orders
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="hidden sm:inline">Auto-refresh:</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold text-xs">
                  30s
                </span>
              </div>
            </div>
          </div>

          {/* Scrollable Orders Container */}
          <div className="h-[300px] overflow-auto custom-scrollbar">
            <div className="p-4 sm:p-6">
              {stats.recentOrders.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-6m-10 0H4"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No recent orders
                  </h3>
                  <p className="text-gray-500">
                    Recent orders will appear here as they come in
                  </p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {stats.recentOrders.map((order, index) => (
                    <div
                      key={order._id || index}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden"
                    >
                      {/* Mobile Layout */}
                      <div className="lg:hidden">
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 mb-1">
                                Order #{index + 1}
                              </p>
                              <p className="text-xs text-gray-500">
                                {order.items.length} item
                                {order.items.length > 1 ? "s" : ""}
                              </p>
                            </div>
                            <div
                              className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-semibold text-gray-900">
                              {formatCurrency(order.amount)}
                            </span>
                            <span className="text-gray-500">
                              {getTimeAgo(order.date)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden lg:block">
                        <div className="p-6">
                          <div className="grid grid-cols-12 gap-6 items-center">
                            <div className="col-span-1 text-center">
                              <span className="text-sm font-medium text-gray-500">
                                #{index + 1}
                              </span>
                            </div>
                            <div className="col-span-3">
                              <p className="text-sm font-medium text-gray-900">
                                {order.items.length} item
                                {order.items.length > 1 ? "s" : ""}
                              </p>
                            </div>
                            <div className="col-span-3">
                              <div
                                className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                                  order.status
                                )}`}
                              >
                                {order.status}
                              </div>
                            </div>
                            <div className="col-span-2 text-right">
                              <p className="text-sm font-semibold text-gray-900">
                                {formatCurrency(order.amount)}
                              </p>
                            </div>
                            <div className="col-span-3 text-right">
                              <p className="text-sm text-gray-500">
                                {getTimeAgo(order.date)}
                              </p>
                            </div>
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
  );
};

export default Home;
