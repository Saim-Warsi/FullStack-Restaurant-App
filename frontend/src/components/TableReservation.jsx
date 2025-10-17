import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import ReservePopup from "./ReservePopup";

const TableReservation = () => {
  const { url } = useContext(StoreContext);
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showReservePopup, setShowReservePopup] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Get current time in HH:MM format
  const getCurrentTime = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };

  // Fetch tables with availability status for selected date/time
  const fetchTablesWithAvailability = async (date, time) => {
    try {
      setLoading(true);
      
      // Get all tables
      const tablesResponse = await axios.get(url + "/api/table/list");
      if (!tablesResponse.data.success) {
        toast.error("Could not fetch tables");
        return;
      }

      const allTables = tablesResponse.data.data;

      // Get all reservations for the selected date/time
      const reservationsResponse = await axios.get(url + "/api/reservation/list");
      if (!reservationsResponse.data.success) {
        toast.error("Could not fetch reservations");
        return;
      }

      const allReservations = reservationsResponse.data.data;

      // Check which tables are reserved for the selected date/time
      const tablesWithStatus = allTables.map(table => {
        // Find if there's a reservation for this table on this date/time
        const reservation = allReservations.find(res => {
          // Extract just the date part from reservation date (in case it has time)
          const resDate = res.date.split('T')[0]; // Handles both "2025-10-17" and "2025-10-17T00:00:00.000Z"
          const searchDate = date.split('T')[0];
          
          const tableIdMatch = String(res.tableId) === String(table._id);
          const dateMatch = resDate === searchDate;
          const timeMatch = res.time === time;
          const statusMatch = res.status === 'confirmed' || res.status === 'pending';

          return tableIdMatch && dateMatch && timeMatch && statusMatch;
        });

        const isReserved = !!reservation;

        return {
          ...table,
          isReserved: isReserved,
          reservationDetails: reservation || null
        };
      });

      setTables(tablesWithStatus);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle reserve button click
  const handleReserveClick = (table) => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time first");
      return;
    }

    if (table.isReserved) {
      toast.info("This table is already reserved for the selected date and time");
      return;
    }

    setSelectedTable(table);
    setShowReservePopup(true);
  };

  // Create reservation
  const handleCreateReservation = async (formData) => {
    try {
      const response = await axios.post(url + "/api/reservation/create", {
        tableId: selectedTable._id,
        tableName: selectedTable.name,
        date: selectedDate,
        time: selectedTime,
        ...formData
      });

      if (response.data.success) {
        toast.success("Reservation created successfully!");
        fetchTablesWithAvailability(selectedDate, selectedTime); // Refresh with current date/time
        setShowReservePopup(false);
        setSelectedTable(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Failed to create reservation");
    }
  };

  // Cancel reservation
  const handleCancelReservation = () => {
    setShowReservePopup(false);
    setSelectedTable(null);
  };

  // Initial load - set today's date and current time
  useEffect(() => {
    const today = getTodayDate();
    const currentTime = getCurrentTime();
    setSelectedDate(today);
    setSelectedTime(currentTime);
    fetchTablesWithAvailability(today, currentTime);
  }, []);

  // Auto-update when date or time changes
  useEffect(() => {
    if (selectedDate && selectedTime) {
      fetchTablesWithAvailability(selectedDate, selectedTime);
    }
  }, [selectedDate, selectedTime]);

  return (
    <>
      {/* Reserve Popup */}
      {showReservePopup && selectedTable && (
        <ReservePopup
          onConfirm={handleCreateReservation}
          onCancel={handleCancelReservation}
          prefilledDate={selectedDate}
          prefilledTime={selectedTime}
        />
      )}

      <div id="table-reservation" className="container  bg-gray-50 rounded-3xl py-6 md:py-10 px-3 md:px-5 mt-20 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-3 text-center">
          Table Reservation
        </h1>
        <p className="text-xs md:text-sm text-green-800 text-center px-2">
          Reserve the available tables, come to our restaurant and let us serve you.
        </p>

        {/* Date and Time Selection */}
        <div className="bg-white rounded-lg mt-5 p-4 md:p-6 shadow-md">
          <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">Select Date & Time</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label htmlFor="date" className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={getTodayDate()}
                className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                Time *
              </label>
              <input
                type="time"
                id="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
              />
            </div>
          </div>
          <p className="mt-3 text-[10px] md:text-xs text-gray-500 text-center">
            Availability updates automatically when you change date or time
          </p>
        </div>

        {/* Tables List */}
        <div className="bg-white rounded-lg mt-5 w-full flex flex-col max-h-[500px] md:max-h-[600px]">
          {/* Header */}
          <div className="bg-yellow-500 rounded-lg px-4 md:px-6 py-4 md:py-5 flex-shrink-0">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-white">
              Available Tables
            </h2>
            <p className="mt-1 text-xs md:text-sm text-white">
              {selectedDate && selectedTime 
                ? `Showing availability for ${new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at ${selectedTime}`
                : "Select date and time to check availability"
              }
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-yellow-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {!selectedDate || !selectedTime ? (
                <div className="p-6 md:p-8 text-center text-gray-500">
                  <p className="text-base md:text-lg mb-2">Please select date and time</p>
                  <p className="text-xs md:text-sm">Choose your preferred date and time to see available tables</p>
                </div>
              ) : tables.length === 0 ? (
                <p className="p-4 text-center text-sm md:text-base text-gray-500">No tables available yet.</p>
              ) : (
                <div className="flex flex-col flex-1 min-h-0">
                  {/* Header Row - Hidden on mobile, shown on md+ */}
                  <div className="hidden md:grid py-2 px-5 m-4 mb-2 grid-cols-4 gap-4 rounded-lg text-yellow-500 border-2 border-yellow-500 flex-shrink-0">
                    <h3 className="font-medium text-sm">Name</h3>
                    <p className="font-medium text-center text-sm">Capacity</p>
                    <p className="font-medium text-center text-sm">Status</p>
                    <p className="font-medium text-center text-sm">Reserve</p>
                  </div>

                  {/* Scrollable List */}
                  <div className="overflow-y-auto custom-scrollbar flex-1 px-3 md:px-4">
                    {tables.map((table, index) => (
                      <div
                        className="py-3 px-3 md:px-5 mb-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                        key={table._id || index}
                      >
                        {/* Mobile Layout (stacked) */}
                        <div className="md:hidden flex flex-col gap-2">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-gray-800 text-sm font-semibold mb-1">
                                {table.name}
                              </h3>
                              <p className="text-gray-600 text-xs">
                                Capacity: {table.capacity} seats
                              </p>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-[10px] font-medium whitespace-nowrap ${
                                table.isReserved
                                  ? "bg-red-100 text-red-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {table.isReserved ? "Reserved" : "Available"}
                            </span>
                          </div>
                          <button
                            onClick={() => handleReserveClick(table)}
                            disabled={table.isReserved}
                            className={`w-full text-xs py-2 px-3 rounded transition-all font-medium ${
                              table.isReserved
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer"
                            }`}
                          >
                            {table.isReserved ? "Not Available" : "Click to Reserve"}
                          </button>
                        </div>

                        {/* Desktop Layout (grid) */}
                        <div className="hidden md:grid grid-cols-4 gap-4 items-center">
                          {/* Table Name */}
                          <h3 className="text-gray-800 text-sm lg:text-base truncate">
                            {table.name}
                          </h3>

                          {/* Capacity */}
                          <p className="text-gray-600 text-center text-sm lg:text-base">
                            {table.capacity} seats
                          </p>

                          {/* Status Badge */}
                          <div className="flex justify-center">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                                table.isReserved
                                  ? "bg-red-100 text-red-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {table.isReserved ? "Reserved" : "Available"}
                            </span>
                          </div>

                          {/* Reserve Button */}
                          <div className="flex justify-center">
                            <button
                              onClick={() => handleReserveClick(table)}
                              disabled={table.isReserved}
                              className={`text-sm px-3 py-1 rounded transition-all ${
                                table.isReserved
                                  ? "text-gray-400 cursor-not-allowed"
                                  : "text-blue-600 hover:text-blue-800 hover:bg-blue-50 cursor-pointer"
                              }`}
                            >
                              {table.isReserved ? "Not Available" : "Click to Reserve"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="px-4 md:px-6 py-3 md:py-4 bg-gray-50 border-t border-gray-200 flex-shrink-0">
                    <p className="text-xs md:text-sm text-gray-600 text-center">
                      {tables.filter(t => !t.isReserved).length} of {tables.length} tables available for selected date and time
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        @media (min-width: 768px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
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
    </>
  );
};

export default TableReservation;