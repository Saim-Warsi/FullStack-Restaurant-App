import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://Saim:Saim123321@cluster0.p67y51u.mongodb.net/lil-lemon').then(()=>console.log("DB connected"))
}