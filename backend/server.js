import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import statsRouter from "./routes/statsRoute.js";  
import subscriptionRouter from "./routes/SubscriptionRoute.js";
import tableRouter from "./routes/tableRoute.js"
import reservationRouter from './routes/reservationRoute.js';
import promoCodeRouter from "./routes/PromoCodeRoute.js";

//app config
const app = express()
const port = process.env.PORT || 4000

//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

//api endpoint
app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.use("/api/stats",statsRouter); 
app.use("/api/subscription",subscriptionRouter);
app.use("/api/table",tableRouter);
app.use('/api/reservation', reservationRouter);
app.use('/api/promocode', promoCodeRouter);
app.get("/",(req,res)=>{
    res.send("API working")
});



// Keep old subscription endpoint for footer compatibility
app.post('/api/subscribe', async (req, res) => {
    try {
        const { email } = req.body;
        const existingSubscription = await SubscriptionModel.findOne({ email });
        if (existingSubscription) {
            return res.json({ success: false, message: "Email already subscribed" });
        }
        await SubscriptionModel.create({ email });
        res.json({ success: true, message: 'Subscribed successfully!' });
    } catch (error) {
        console.error('Error subscribing:', error);
        res.json({ success: false, message: 'Error subscribing' });
    }
});
// UPDATED: Add '0.0.0.0' host
app.listen(port, '0.0.0.0', ()=>{
    console.log(`Server started on port ${port}`)
})