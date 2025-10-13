import express from "express";
import { createPromoCode, listPromoCodes, deletePromoCode, verifyPromoCode } from "../controllers/PromoCodeController.js";

const promoCodeRouter = express.Router();

promoCodeRouter.post('/create', createPromoCode);
promoCodeRouter.get('/list', listPromoCodes);
promoCodeRouter.post('/delete', deletePromoCode);
promoCodeRouter.post('/verify', verifyPromoCode);

export default promoCodeRouter;