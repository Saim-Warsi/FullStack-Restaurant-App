// import { useContext, useState, useEffect } from "react";
// import { StoreContext } from "../context/StoreContext";
// import axios from "axios";
// import { Calendar, Clock, User, Phone, Mail, Users, Trash2, CheckCircle, XCircle } from "lucide-react";
// import { toast } from "react-toastify";
// import ConfirmPopup from "../components/ConfirmPopup";

// const ReservationsList = () => {
//   const { url, showPopup, setShowPopup } = useContext(StoreContext);
//   const [reservations, setReservations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [popupData, setPopupData] = useState("");
//   const [reservationIdToDelete, setReservationIdToDelete] = useState(null);
//   const [reservationIdToUpdate, setReservationIdToUpdate] = useState(null);
//   const [popupAction, setPopupAction] = useState(null);
//   const [filterStatus, setFilterStatus] = useState("all");

//   // Fetch all reservations
//   const fetchAllReservations = async () => {
//     try {
//       setLoading(true);
//       const newUrl = url + "/api/reservation/list";
//       const response = await axios.get(newUrl);
//       if (response.data.success) {
//         setReservations(response.data.data);
//       } else {
//         toast.error("Could not fetch reservations");
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle delete click
//   const handleDeleteClick = (id) => {
//     setReservationIdToDelete(id);
//     setPopupData("Are you sure you want to delete this reservation? This will free up the table.");
//     setPopupAction('delete');
//     setShowPopup(true);
//   };

//   // Handle status update click
//   const handleStatusUpdateClick = (id, currentStatus) => {
//     setReservationIdToUpdate(id);
//     const newStatus = currentStatus === 'confirmed' ? 'completed' : 'confirmed';
//     setPopupData(`Are you sure you want to mark this reservation as ${newStatus}?`);
//     setPopupAction('update');
//     setShowPopup(true);
//   };

//   // Delete reservation
//   const handleDelete = async () => {
//     if (!reservationIdToDelete) return;

//     try {
//       const newUrl = url + "/api/reservation/delete";
//       const response = await axios.post(newUrl, { id: reservationIdToDelete });
//       if (response.data.success) {
//         toast.success("Reservation deleted successfully");
//         fetchAllReservations();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error("An error occurred while deleting the reservation");
//     } finally {
//       setReservationIdToDelete(null);
//     }
//   };

//   // Update reservation status
//   const handleUpdateStatus = async () => {
//     if (!reservationIdToUpdate) return;

//     try {
//       const reservation = reservations.find(r => r._id === reservationIdToUpdate);
//       const newStatus = reservation.status === 'confirmed' ? 'completed' : 'confirmed';
      
//       const newUrl = url + "/api/reservation/updatestatus";
//       const response = await axios.post(newUrl, { 
//         id: reservationIdToUpdate,
//         status: newStatus
//       });
      
//       if (response.data.success) {
//         toast.success("Reservation status updated successfully");
//         fetchAllReservations();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error("An error occurred while updating the reservation");
//     } finally {
//       setReservationIdToUpdate(null);
//     }
//   };

//   // Handle confirmation based on action type
//   const handleConfirm = () => {
//     if (popupAction === 'delete') {
//       handleDelete();
//     } else if (popupAction === 'update') {
//       handleUpdateStatus();
//     }
//   };

//   // Filter reservations
//   const filteredReservations = reservations.filter(reservation => {
//     if (filterStatus === "all") return true;
//     return reservation.status === filterStatus;
//   });

//   // Format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric' 
//     });
//   };

//   useEffect(() => {
//     fetchAllReservations();
//   }, []);

//   return (
//     <div className="bg-gray-50 min-h-[87vh] py-8 px-4 sm:px-6 lg:px-8 w-[70%] lg:w-[80%] overflow-y-auto custom-scrollbar">
//       <style>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #f1f5f9;
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: linear-gradient(45deg, #fbbf24, #f59e0b);
//           border-radius: 10px;
//           border: 1px solid #f59e0b;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(45deg, #f59e0b, #d97706);
//         }
//         .custom-scrollbar {
//           scrollbar-width: thin;
//           scrollbar-color: #fbbf24 #f1f5f9;
//         }
//       `}</style>

//       <div>
//         {showPopup && <ConfirmPopup onConfirm={handleConfirm} popupData={popupData} />}
        
//         <div className="bg-white rounded-lg shadow-lg">
//           {/* Header */}
//           <div className="bg-yellow-500 px-6 py-5 sm:px-8">
//             <h2 className="text-xl sm:text-2xl font-semibold text-white">
//               Reservations Management
//             </h2>
//             <p className="mt-1 text-sm text-white">
//               View and manage all table reservations
//             </p>
//           </div>

//           {/* Filter Section */}
//           <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//             <div className="flex flex-wrap gap-2">
//               <button
//                 onClick={() => setFilterStatus("all")}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                   filterStatus === "all"
//                     ? "bg-yellow-500 text-white"
//                     : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
//                 }`}
//               >
//                 All ({reservations.length})
//               </button>
//               <button
//                 onClick={() => setFilterStatus("confirmed")}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                   filterStatus === "confirmed"
//                     ? "bg-yellow-500 text-white"
//                     : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
//                 }`}
//               >
//                 Confirmed ({reservations.filter(r => r.status === 'confirmed').length})
//               </button>
//               <button
//                 onClick={() => setFilterStatus("completed")}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                   filterStatus === "completed"
//                     ? "bg-yellow-500 text-white"
//                     : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
//                 }`}
//               >
//                 Completed ({reservations.filter(r => r.status === 'completed').length})
//               </button>
//               <button
//                 onClick={() => setFilterStatus("cancelled")}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                   filterStatus === "cancelled"
//                     ? "bg-yellow-500 text-white"
//                     : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
//                 }`}
//               >
//                 Cancelled ({reservations.filter(r => r.status === 'cancelled').length})
//               </button>
//             </div>
//           </div>

//           {/* Content */}
//           {loading ? (
//             <div className="flex items-center justify-center py-20">
//               <div className="w-8 h-8 border-2 border-gray-300 border-t-yellow-600 rounded-full animate-spin"></div>
//             </div>
//           ) : (
//             <>
//               {filteredReservations.length === 0 ? (
//                 <div className="p-8 text-center text-gray-500">
//                   <p className="text-lg mb-2">No reservations found</p>
//                   <p className="text-sm">
//                     {filterStatus !== "all" 
//                       ? `No ${filterStatus} reservations at the moment.`
//                       : "No reservations have been made yet."}
//                   </p>
//                 </div>
//               ) : (
//                 <div className="overflow-y-auto max-h-[600px] custom-scrollbar">
//                   <div className="p-4 space-y-4">
//                     {filteredReservations.map((reservation, index) => (
//                       <div
//                         key={reservation._id || index}
//                         className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
//                       >
//                         {/* Header Row */}
//                         <div className="flex justify-between items-start mb-4">
//                           <div>
//                             <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                               {reservation.tableName}
//                               <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                                 reservation.status === 'confirmed'
//                                   ? "bg-green-100 text-green-700"
//                                   : reservation.status === 'completed'
//                                   ? "bg-blue-100 text-blue-700"
//                                   : reservation.status === 'cancelled'
//                                   ? "bg-red-100 text-red-700"
//                                   : "bg-yellow-100 text-yellow-700"
//                               }`}>
//                                 {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
//                               </span>
//                             </h3>
//                             <p className="text-sm text-gray-500 mt-1">
//                               Reservation ID: {reservation._id?.slice(-8)}
//                             </p>
//                           </div>
//                           <div className="flex gap-2">
//                             {reservation.status === 'confirmed' && (
//                               <button
//                                 onClick={() => handleStatusUpdateClick(reservation._id, reservation.status)}
//                                 className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                                 title="Mark as completed"
//                               >
//                                 <CheckCircle size={20} />
//                               </button>
//                             )}
//                             <button
//                               onClick={() => handleDeleteClick(reservation._id)}
//                               className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//                               title="Delete reservation"
//                             >
//                               <Trash2 size={20} />
//                             </button>
//                           </div>
//                         </div>

//                         {/* Details Grid */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           {/* Customer Info */}
//                           <div className="space-y-3">
//                             <div className="flex items-center gap-3 text-gray-700">
//                               <User size={18} className="text-yellow-500 flex-shrink-0" />
//                               <div>
//                                 <p className="text-xs text-gray-500">Customer Name</p>
//                                 <p className="font-medium">{reservation.customerName}</p>
//                               </div>
//                             </div>
//                             <div className="flex items-center gap-3 text-gray-700">
//                               <Phone size={18} className="text-yellow-500 flex-shrink-0" />
//                               <div>
//                                 <p className="text-xs text-gray-500">Phone</p>
//                                 <p className="font-medium">{reservation.phone}</p>
//                               </div>
//                             </div>
//                             <div className="flex items-center gap-3 text-gray-700">
//                               <Mail size={18} className="text-yellow-500 flex-shrink-0" />
//                               <div>
//                                 <p className="text-xs text-gray-500">Email</p>
//                                 <p className="font-medium text-sm break-all">{reservation.email}</p>
//                               </div>
//                             </div>
//                           </div>

//                           {/* Reservation Info */}
//                           <div className="space-y-3">
//                             <div className="flex items-center gap-3 text-gray-700">
//                               <Calendar size={18} className="text-yellow-500 flex-shrink-0" />
//                               <div>
//                                 <p className="text-xs text-gray-500">Date</p>
//                                 <p className="font-medium">{formatDate(reservation.date)}</p>
//                               </div>
//                             </div>
//                             <div className="flex items-center gap-3 text-gray-700">
//                               <Clock size={18} className="text-yellow-500 flex-shrink-0" />
//                               <div>
//                                 <p className="text-xs text-gray-500">Time</p>
//                                 <p className="font-medium">{reservation.time}</p>
//                               </div>
//                             </div>
//                             <div className="flex items-center gap-3 text-gray-700">
//                               <Users size={18} className="text-yellow-500 flex-shrink-0" />
//                               <div>
//                                 <p className="text-xs text-gray-500">Number of Guests</p>
//                                 <p className="font-medium">{reservation.guests} {reservation.guests === 1 ? 'Guest' : 'Guests'}</p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Special Requests */}
//                         {reservation.specialRequests && (
//                           <div className="mt-4 pt-4 border-t border-gray-200">
//                             <p className="text-xs text-gray-500 mb-1">Special Requests</p>
//                             <p className="text-sm text-gray-700 italic">{reservation.specialRequests}</p>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReservationsList;

import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Users,
  Trash2,
  CheckCircle,
  CalendarCheck,
} from "lucide-react";
import { toast } from "react-toastify";
import ConfirmPopup from "../components/ConfirmPopup";

const ReservationsList = () => {
  const { url, showPopup, setShowPopup } = useContext(StoreContext);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popupData, setPopupData] = useState("");
  const [reservationIdToDelete, setReservationIdToDelete] = useState(null);
  const [reservationIdToUpdate, setReservationIdToUpdate] = useState(null);
  const [popupAction, setPopupAction] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchAllReservations = async () => {
    try {
      setLoading(true);
      const newUrl = url + "/api/reservation/list";
      const response = await axios.get(newUrl);
      if (response.data.success) {
        setReservations(response.data.data);
      } else {
        toast.error("Could not fetch reservations");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setReservationIdToDelete(id);
    setPopupData(
      "Are you sure you want to delete this reservation? This will free up the table."
    );
    setPopupAction("delete");
    setShowPopup(true);
  };

  const handleStatusUpdateClick = (id, currentStatus) => {
    setReservationIdToUpdate(id);
    const newStatus = currentStatus === "confirmed" ? "completed" : "confirmed";
    setPopupData(
      `Are you sure you want to mark this reservation as ${newStatus}?`
    );
    setPopupAction("update");
    setShowPopup(true);
  };

  const handleDelete = async () => {
    if (!reservationIdToDelete) return;

    try {
      const newUrl = url + "/api/reservation/delete";
      const response = await axios.post(newUrl, { id: reservationIdToDelete });
      if (response.data.success) {
        toast.success("Reservation deleted successfully");
        fetchAllReservations();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while deleting the reservation");
    } finally {
      setReservationIdToDelete(null);
    }
  };

  const handleUpdateStatus = async () => {
    if (!reservationIdToUpdate) return;

    try {
      const reservation = reservations.find(
        (r) => r._id === reservationIdToUpdate
      );
      const newStatus =
        reservation.status === "confirmed" ? "completed" : "confirmed";

      const newUrl = url + "/api/reservation/updatestatus";
      const response = await axios.post(newUrl, {
        id: reservationIdToUpdate,
        status: newStatus,
      });

      if (response.data.success) {
        toast.success("Reservation status updated successfully");
        fetchAllReservations();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while updating the reservation");
    } finally {
      setReservationIdToUpdate(null);
    }
  };

  const handleConfirm = () => {
    if (popupAction === "delete") {
      handleDelete();
    } else if (popupAction === "update") {
      handleUpdateStatus();
    }
  };

  const filteredReservations = reservations.filter((reservation) => {
    if (filterStatus === "all") return true;
    return reservation.status === filterStatus;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    fetchAllReservations();
  }, []);

  return (
    <div className="w-full bg-gray-50">
      {showPopup && (
        <ConfirmPopup onConfirm={handleConfirm} popupData={popupData} />
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                Reservations
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <span className="hidden sm:inline">Total:</span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                {reservations.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl h-[70vh] overflow-auto mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Filter Section */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  filterStatus === "all"
                    ? "bg-yellow-500 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                All ({reservations.length})
              </button>
              <button
                onClick={() => setFilterStatus("confirmed")}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  filterStatus === "confirmed"
                    ? "bg-yellow-500 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                Confirmed (
                {reservations.filter((r) => r.status === "confirmed").length})
              </button>
              <button
                onClick={() => setFilterStatus("completed")}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  filterStatus === "completed"
                    ? "bg-yellow-500 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                Completed (
                {reservations.filter((r) => r.status === "completed").length})
              </button>
              <button
                onClick={() => setFilterStatus("cancelled")}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  filterStatus === "cancelled"
                    ? "bg-yellow-500 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                Cancelled (
                {reservations.filter((r) => r.status === "cancelled").length})
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin h-8 w-8 border-2 border-yellow-500 border-t-transparent rounded-full"></div>
              </div>
            ) : filteredReservations.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                  <CalendarCheck className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  No reservations found
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {filterStatus !== "all"
                    ? `No ${filterStatus} reservations at the moment.`
                    : "No reservations have been made yet."}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredReservations.map((reservation, index) => (
                  <div
                    key={reservation._id || index}
                    className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 overflow-hidden"
                  >
                    <div className="p-3 sm:p-4">
                      {/* Header Row */}
                      <div className="flex items-start justify-between gap-2 sm:gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                              {reservation.tableName}
                            </h3>
                            <span
                              className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${
                                reservation.status === "confirmed"
                                  ? "bg-green-100 text-green-700"
                                  : reservation.status === "completed"
                                  ? "bg-blue-100 text-blue-700"
                                  : reservation.status === "cancelled"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {reservation.status.charAt(0).toUpperCase() +
                                reservation.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            ID: {reservation._id?.slice(-8)}
                          </p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          {reservation.status === "confirmed" && (
                            <button
                              onClick={() =>
                                handleStatusUpdateClick(
                                  reservation._id,
                                  reservation.status
                                )
                              }
                              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-colors text-green-600 hover:bg-green-600 hover:text-white"
                              title="Mark as completed"
                            >
                              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteClick(reservation._id)}
                            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-colors text-red-600 hover:bg-red-600 hover:text-white"
                            title="Delete reservation"
                          >
                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {/* Customer Info */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-gray-500">
                                Customer Name
                              </p>
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {reservation.customerName}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-gray-500">Phone</p>
                              <p className="text-sm font-medium text-gray-900">
                                {reservation.phone}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-gray-500">Email</p>
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {reservation.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Reservation Info */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-gray-500">Date</p>
                              <p className="text-sm font-medium text-gray-900">
                                {formatDate(reservation.date)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-gray-500">Time</p>
                              <p className="text-sm font-medium text-gray-900">
                                {reservation.time}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-gray-500">Guests</p>
                              <p className="text-sm font-medium text-gray-900">
                                {reservation.guests}{" "}
                                {reservation.guests === 1 ? "Guest" : "Guests"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Special Requests */}
                      {reservation.specialRequests && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">
                            Special Requests
                          </p>
                          <p className="text-sm text-gray-700 italic">
                            {reservation.specialRequests}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationsList;