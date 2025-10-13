// // controllers/reservationController.js
// import reservationModel from "../models/reservationModel.js";
// import tableModel from "../models/tableModel.js";

// // Create a new reservation
// const createReservation = async (req, res) => {
//   try {
//     const { tableId, tableName, customerName, phone, email, date, time, guests, specialRequests } = req.body;

//     // Validate required fields
//     if (!tableId || !customerName || !phone || !email || !date || !time) {
//       return res.json({ 
//         success: false, 
//         message: "All required fields must be filled" 
//       });
//     }

//     // Check if table exists
//     const table = await tableModel.findById(tableId);
//     if (!table) {
//       return res.json({ 
//         success: false, 
//         message: "Table not found" 
//       });
//     }

//     // Check if table is already reserved for this date/time
//     const existingReservation = await reservationModel.findOne({
//       tableId: tableId,
//       date: date,
//       time: time,
//       status: { $in: ['pending', 'confirmed'] }
//     });

//     if (existingReservation) {
//       return res.json({ 
//         success: false, 
//         message: "Table is already reserved for this date and time" 
//       });
//     }

//     // Create new reservation
//     const newReservation = new reservationModel({
//       tableId,
//       tableName: tableName || table.name,
//       customerName,
//       phone,
//       email,
//       date,
//       time,
//       guests: guests || 2,
//       specialRequests: specialRequests || '',
//       status: 'confirmed'
//     });

//     await newReservation.save();

//     // Update table status
//     await tableModel.findByIdAndUpdate(tableId, {
//       isReserved: true,
//       currentReservation: newReservation._id
//     });

//     return res.json({ 
//       success: true, 
//       message: "Reservation created successfully",
//       data: newReservation
//     });

//   } catch (err) {
//     console.log(err);
//     return res.json({ 
//       success: false, 
//       message: err.message 
//     });
//   }
// };

// // Get all reservations
// const listReservations = async (req, res) => {
//   try {
//     const reservations = await reservationModel.find({})
//       .populate('tableId', 'name capacity')
//       .sort({ date: -1, time: -1 });
    
//     return res.json({ 
//       success: true, 
//       data: reservations 
//     });
//   } catch (err) {
//     return res.json({ 
//       success: false, 
//       message: err.message 
//     });
//   }
// };

// // Get reservations by table
// const getReservationsByTable = async (req, res) => {
//   try {
//     const { tableId } = req.params;
    
//     const reservations = await reservationModel.find({ tableId })
//       .sort({ date: -1, time: -1 });
    
//     return res.json({ 
//       success: true, 
//       data: reservations 
//     });
//   } catch (err) {
//     return res.json({ 
//       success: false, 
//       message: err.message 
//     });
//   }
// };

// // Update reservation status
// const updateReservationStatus = async (req, res) => {
//   try {
//     const { id, status } = req.body;

//     if (!id || !status) {
//       return res.json({ 
//         success: false, 
//         message: "Reservation ID and status are required" 
//       });
//     }

//     const reservation = await reservationModel.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     );

//     if (!reservation) {
//       return res.json({ 
//         success: false, 
//         message: "Reservation not found" 
//       });
//     }

//     // If cancelled or completed, free up the table
//     if (status === 'cancelled' || status === 'completed') {
//       await tableModel.findByIdAndUpdate(reservation.tableId, {
//         isReserved: false,
//         currentReservation: null
//       });
//     }

//     return res.json({ 
//       success: true, 
//       message: "Reservation status updated successfully",
//       data: reservation
//     });

//   } catch (err) {
//     return res.json({ 
//       success: false, 
//       message: err.message 
//     });
//   }
// };

// // Delete reservation
// const deleteReservation = async (req, res) => {
//   try {
//     const { id } = req.body;

//     if (!id) {
//       return res.json({ 
//         success: false, 
//         message: "Reservation ID is required" 
//       });
//     }

//     const reservation = await reservationModel.findByIdAndDelete(id);

//     if (!reservation) {
//       return res.json({ 
//         success: false, 
//         message: "Reservation not found" 
//       });
//     }

//     // Free up the table
//     await tableModel.findByIdAndUpdate(reservation.tableId, {
//       isReserved: false,
//       currentReservation: null
//     });

//     return res.json({ 
//       success: true, 
//       message: "Reservation deleted successfully" 
//     });

//   } catch (err) {
//     return res.json({ 
//       success: false, 
//       message: err.message 
//     });
//   }
// };

// export { 
//   createReservation, 
//   listReservations, 
//   getReservationsByTable, 
//   updateReservationStatus,
//   deleteReservation 
// };

// controllers/reservationController.js
import reservationModel from "../models/reservationModel.js";
import tableModel from "../models/tableModel.js";

// Create a new reservation
const createReservation = async (req, res) => {
  try {
    const { tableId, tableName, customerName, phone, email, date, time, guests, specialRequests } = req.body;

    // Validate required fields
    if (!tableId || !customerName || !phone || !email || !date || !time) {
      return res.json({ 
        success: false, 
        message: "All required fields must be filled" 
      });
    }

    // Check if table exists
    const table = await tableModel.findById(tableId);
    if (!table) {
      return res.json({ 
        success: false, 
        message: "Table not found" 
      });
    }

    // Check if table is already reserved for this date/time
    const existingReservation = await reservationModel.findOne({
      tableId: tableId,
      date: date,
      time: time,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingReservation) {
      return res.json({ 
        success: false, 
        message: "Table is already reserved for this date and time" 
      });
    }

    // Create new reservation
    const newReservation = new reservationModel({
      tableId,
      tableName: tableName || table.name,
      customerName,
      phone,
      email,
      date,
      time,
      guests: guests || 2,
      specialRequests: specialRequests || '',
      status: 'confirmed'
    });

    await newReservation.save();

    return res.json({ 
      success: true, 
      message: "Reservation created successfully",
      data: newReservation
    });

  } catch (err) {
    console.log(err);
    return res.json({ 
      success: false, 
      message: err.message 
    });
  }
};

// Get all reservations
const listReservations = async (req, res) => {
  try {
    // ❌ REMOVED .populate() - we don't need it, we have tableName already
    const reservations = await reservationModel.find({})
      .sort({ date: -1, time: -1 });
    
    return res.json({ 
      success: true, 
      data: reservations 
    });
  } catch (err) {
    return res.json({ 
      success: false, 
      message: err.message 
    });
  }
};

// Get reservations by table
const getReservationsByTable = async (req, res) => {
  try {
    const { tableId } = req.params;
    
    const reservations = await reservationModel.find({ tableId })
      .sort({ date: -1, time: -1 });
    
    return res.json({ 
      success: true, 
      data: reservations 
    });
  } catch (err) {
    return res.json({ 
      success: false, 
      message: err.message 
    });
  }
};

// Update reservation status
const updateReservationStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.json({ 
        success: false, 
        message: "Reservation ID and status are required" 
      });
    }

    const reservation = await reservationModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!reservation) {
      return res.json({ 
        success: false, 
        message: "Reservation not found" 
      });
    }

    return res.json({ 
      success: true, 
      message: "Reservation status updated successfully",
      data: reservation
    });

  } catch (err) {
    return res.json({ 
      success: false, 
      message: err.message 
    });
  }
};

// Delete reservation
const deleteReservation = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.json({ 
        success: false, 
        message: "Reservation ID is required" 
      });
    }

    const reservation = await reservationModel.findByIdAndDelete(id);

    if (!reservation) {
      return res.json({ 
        success: false, 
        message: "Reservation not found" 
      });
    }

    return res.json({ 
      success: true, 
      message: "Reservation deleted successfully" 
    });

  } catch (err) {
    return res.json({ 
      success: false, 
      message: err.message 
    });
  }
};

export { 
  createReservation, 
  listReservations, 
  getReservationsByTable, 
  updateReservationStatus,
  deleteReservation 
};