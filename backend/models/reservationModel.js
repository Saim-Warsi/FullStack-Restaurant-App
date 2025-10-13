// models/reservationModel.js
import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'table',
    required: true
  },
  tableName: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: String, // or Date type
    required: true
  },
  time: {
    type: String,
    required: true
  },
  guests: {
    type: Number,
    default: 2
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  specialRequests: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const reservationModel = mongoose.model("reservation", reservationSchema);
export default reservationModel;