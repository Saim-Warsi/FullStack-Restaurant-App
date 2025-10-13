// import mongoose from "mongoose";

// const tableSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     capacity:{
//         type:Number,
//         required:true
//     },
//     isReserved:{
//         type:Boolean,
//         default:false
//     },
//     createdAt:{
//         type:Date,
//         default:Date.now
//     }
// });

// const tableModel = mongoose.model("table",tableSchema);
// export default tableModel


// models/tableModel.js
import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  capacity: {
    type: Number,
    required: true,
    default: 4
  },
  isReserved: {
    type: Boolean,
    default: false
  },
  // Optional: Add current reservation reference
  currentReservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'reservation',
    default: null
  }
}, {
  timestamps: true
});

const tableModel = mongoose.model("table", tableSchema);
export default tableModel;