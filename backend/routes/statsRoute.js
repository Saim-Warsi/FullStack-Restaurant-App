import express from 'express';
import { getDashboardStats, getOrderStats, getRevenueStats } from '../controllers/statsController.js';

const statsRouter = express.Router();

// Get all dashboard statistics
statsRouter.get('/dashboard', getDashboardStats);

// Get order statistics
statsRouter.get('/orders', getOrderStats);

// Get revenue statistics  
statsRouter.get('/revenue', getRevenueStats);

export default statsRouter;