// routes/reservationRoute.js
import express from "express";
import { 
  createReservation, 
  listReservations, 
  getReservationsByTable,
  updateReservationStatus,
  deleteReservation 
} from "../controllers/reservationController.js";

const reservationRouter = express.Router();

// Create a new reservation
reservationRouter.post('/create', createReservation);

// Get all reservations
reservationRouter.get('/list', listReservations);

// Get reservations by table
reservationRouter.get('/table/:tableId', getReservationsByTable);

// Update reservation status
reservationRouter.post('/updatestatus', updateReservationStatus);

// Delete reservation
reservationRouter.post('/delete', deleteReservation);

export default reservationRouter;