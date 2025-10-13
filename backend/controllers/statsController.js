import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import foodModel from '../models/foodModel.js'

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
    try {
        // Get total orders count
        const totalOrders = await orderModel.countDocuments();
        
        // Get total revenue from paid orders
        const revenueResult = await orderModel.aggregate([
            { $match: { payment: true } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;
        
        // Get total menu items
        const totalMenuItems = await foodModel.countDocuments();
        
        // Get total customers (registered users)
        const totalCustomers = await userModel.countDocuments();
        
        // Get recent orders for activity
        const recentOrders = await orderModel.find()
            .sort({ date: -1 })
            .limit(5)
            .select('status date items amount');

        res.json({
            success: true,
            data: {
                totalOrders,
                totalRevenue,
                totalMenuItems,
                totalCustomers,
                recentOrders
            }
        });

    } catch (error) {
        console.log('Error fetching dashboard stats:', error);
        res.json({
            success: false,
            message: error.message
        });
    }
};

// Get orders statistics
const getOrderStats = async (req, res) => {
    try {
        const totalOrders = await orderModel.countDocuments();
        const paidOrders = await orderModel.countDocuments({ payment: true });
        const pendingOrders = await orderModel.countDocuments({ payment: false });
        
        // Orders by status
        const ordersByStatus = await orderModel.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        res.json({
            success: true,
            data: {
                totalOrders,
                paidOrders,
                pendingOrders,
                ordersByStatus
            }
        });

    } catch (error) {
        console.log('Error fetching order stats:', error);
        res.json({
            success: false,
            message: error.message
        });
    }
};

// Get revenue statistics
const getRevenueStats = async (req, res) => {
    try {
        // Total revenue from paid orders
        const revenueResult = await orderModel.aggregate([
            { $match: { payment: true } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

        // Revenue by month (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const monthlyRevenue = await orderModel.aggregate([
            { 
                $match: { 
                    payment: true,
                    date: { $gte: sixMonthsAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" }
                    },
                    total: { $sum: "$amount" },
                    orders: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        res.json({
            success: true,
            data: {
                totalRevenue,
                monthlyRevenue
            }
        });

    } catch (error) {
        console.log('Error fetching revenue stats:', error);
        res.json({
            success: false,
            message: error.message
        });
    }
};

export { getDashboardStats, getOrderStats, getRevenueStats }