import promoCodeModel from "../models/PromoCodeModel.js";

const createPromoCode = async(req, res) => {
    try {
        const response = await promoCodeModel.create(req.body);
        res.json({success: true, data: response})
    } catch(err) {
        res.json({success: false, message: err.message})
    }
};

const listPromoCodes = async(req, res) => {
    try {
        const promoCodes = await promoCodeModel.find({});
        res.json({success: true, data: promoCodes});
    } catch(err) {
        res.json({success: false, message: err.message});
    }
};

const deletePromoCode = async(req, res) => {
    try {
        const { id } = req.body;
        const response = await promoCodeModel.findByIdAndDelete(id);
        
        if (!response) {
            return res.json({success: false, message: "Promo code not found"});
        }
        
        res.json({success: true, message: "Promo code deleted successfully"});
    } catch(err) {
        res.json({success: false, message: err.message});
    }
};


const verifyPromoCode = async(req, res) => {
    try {
        const { code } = req.body;
        const promoCode = await promoCodeModel.findOne({ code: code.toUpperCase() });
        
        if (!promoCode) {
            return res.json({success: false, message: "Invalid promo code"});
        }

        // Check if expired
        if (promoCode.expirationDate && new Date(promoCode.expirationDate) < new Date()) {
            return res.json({success: false, message: "This promo code has expired"});
        }
        
        res.json({success: true, data: promoCode});
    } catch(err) {
        res.json({success: false, message: err.message});
    }
};

export { createPromoCode, listPromoCodes, deletePromoCode, verifyPromoCode };
