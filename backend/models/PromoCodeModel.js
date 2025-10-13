import mongoose from "mongoose";

const PromoCodeSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    category: { type: String },
    expirationDate: { type: Date },
    createdAt: { type: Date, default: Date.now }
})


const promoCodeModel = mongoose.model('PromoCodes', PromoCodeSchema);
export default promoCodeModel;






