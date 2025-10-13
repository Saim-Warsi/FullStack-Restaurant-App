import userModel from "../models/userModel.js"

//add items to user cart
const addToCart = async (req,res)=>{
    try{
        let userData = await userModel.findById(req.body.userId);
        
        let cartData = userData.cartData || {};
        
        if(!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else{
            cartData[req.body.itemId] += 1;  
        }
        
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added to cart"})
    }catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}

//remove items from user cart
const removeFromCart = async (req,res)=>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
            
            // Remove item if quantity becomes 0
            if(cartData[req.body.itemId] === 0){
                delete cartData[req.body.itemId];
            }
        }
        
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from cart."})
    } catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}


//fetch user cart data
const getCart = async (req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);  // Correct syntax
        
        if (!userData) {
            return res.json({success: false, message: "User not found"});
        }
        
        let cartData = userData.cartData || {};  // Remove await, add fallback
        res.json({success:true,cartData})
    } catch(err){
        console.log("Error details:", err);  // Better logging
        res.json({success:false,message:err.message || "Server error"})
    }
}



export {addToCart,removeFromCart,getCart}






















//fetch user cart data
// const getCart = async (req,res)=>{
//      try {
//       let userData = await userModel.findById(req.body.userId);
//       let cartData = await userData.cartData;
//       res.json({success:true,cartData})
//     }

//       catch(err){
//         console.log(err.message);
//         res.json({success:false,message:err.message})
//       }
  


// }

//remove items from user cart

    // try{
    //     let userData = await userModel.findById(req.body.userId);
        
    //     if (!userData) {
    //         return res.json({success: false, message: "User not found"});
    //     }
        
    //     let cartData = userData.cartData || {};
        
    //     if(cartData[req.body.itemId] && cartData[req.body.itemId] > 0){
    //         cartData[req.body.itemId] -= 1;
            
    //         // IMPORTANT: Remove the item completely when quantity becomes 0
    //         if(cartData[req.body.itemId] === 0) {
    //             delete cartData[req.body.itemId];
    //         }
    //     }
        
    //     await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    //     res.json({success:true,message:"Removed from cart."})
    // } catch(err){
    //     console.log(err)
    //     res.json({success:false,message:err.message})
    // }

    //add items to user cart
// const addToCart = async (req,res)=>{
//     try{
//         let userData = await userModel.findById({_id:req.body.userId});
//         let cartData = await userData.cartData;
//         if(!cartData[req.body.itemId]) {
//             cartData[req.body.itemId] = 1;
//         } else{
//             cartData[req.body.itemId] += 1;  
//         }
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//         res.json({success:true,message:"Added to cart"})
//     }catch(err){
//         console.log(err)
//         res.json({success:false,message:err})
//     }
// }