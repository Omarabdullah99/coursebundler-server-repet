import { User } from "../models/User.js";
import {catchAsyncError} from '../middlewares/catchAsyncError.js'
 import ErrorHandler from '../utils/errorHandler.js'
import { sendToken } from "../utils/sendToken.js";

 export const register =catchAsyncError(async(req,res,next)=>{
    const {name,email,password}=req.body;
    
    if(!name || !email || !password )
    return next(new ErrorHandler("please enter all register field",400));

    let user=await User.findOne({email})
    if(user) return next(new ErrorHandler("User Already Exist", 409))

    //upload file cloudinary

    user= await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"tempid",
            url:"tempurl"
        }
    })

    sendToken(res,user, "Register Successfully", 201)

 })