import express from 'express';
import { subscribeEmail, getSubscribers, sendPromotion } from '../controllers/subscriptionController.js';

const subscriptionRouter = express.Router();

// Subscribe endpoint (for frontend footer)
subscriptionRouter.post('/subscribe', subscribeEmail);

// Get all subscribers (for admin panel)
subscriptionRouter.get('/list', getSubscribers);

// Send promotion to all subscribers (for admin panel)
subscriptionRouter.post('/send-promotion', sendPromotion);

export default subscriptionRouter;