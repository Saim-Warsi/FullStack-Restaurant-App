import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


//login user
const loginUser = async (req,res)=>{
      const {password, email} = req.body;
      try{
        const user = await userModel.findOne({email});
        if(!user){
           return res.json({success:false,message:"User doesn't exist."})
        };
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid password."})
        };
        const token = createToken(user._id);
        return res.json({success:true,message:"User Logged in",token})
      }catch(err){
        console.log(err.message);
        return res.json({success:false,message:err})
      }
};

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async (req,res)=>{
    const {name, password, email} = req.body; //destructuring
    try{
        //to check if the user already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists."});
        };

        // validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email."})
        };

        //to check if the password is strong or not
        if(password.length < 8){
            return res.json({success:false,message:"Please enter a strong password."})
        };

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch(err){
        console.log(err);
        res.json({success:false,message:err.message})
    }
};


//get user data for profile
const getUserData = async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await userModel.findById(userId).select('-password');
        
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        return res.json({ 
            success: true, 
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.log(err);
        return res.json({ success: false, message: err.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const userId = req.body.userId; // From authMiddleware
        const { currentPassword, newPassword } = req.body;

        // Find user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Check if current password is correct
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Current password is incorrect" });
        }

        // Validate new password
        if (newPassword.length < 8) {
            return res.json({ success: false, message: "New password must be at least 8 characters" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        user.password = hashedPassword;
        await user.save();

        return res.json({ success: true, message: "Password changed successfully" });
    } catch (err) {
        console.log(err);
        return res.json({ success: false, message: err.message });
    }
};


export {loginUser, registerUser, getUserData, changePassword}