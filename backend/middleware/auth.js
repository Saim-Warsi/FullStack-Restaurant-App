import jwt from "jsonwebtoken";

const authMiddleware = async (req,res,next)=>{
   
    const {token} = req.headers;
    if(!token)
        { return res.json({success:false,message:"Not authorized, login again."})}
        try{
            const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);
            
            // Initialize req.body if it doesn't exist
            if (!req.body) {
                req.body = {};
            }
            
            req.body.userId = tokenDecode.id;
            next();
    }catch(err){
            console.log(err)
            res.json({success:false,message:err.message})
    }
};

export default authMiddleware;

