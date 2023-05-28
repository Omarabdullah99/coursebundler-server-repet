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


//login controller
 export const login =catchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body;
    
    if( !email || !password )
    return next(new ErrorHandler("please enter all register field",400));

    const user=await User.findOne({email}).select("+password")
    if(!user) return next(new ErrorHandler("User dosen't Exist", 401))

    const isMatch=await user.comparePassword(password)
    if(!isMatch) return next(new ErrorHandler("Incorrect Email or Password",401))

  

    sendToken(res,user, `Welcome back, ${user.name}`, 200)

 })

 //logout controller

 export const logout=catchAsyncError(async (req,res,next)=>{
    res.status(200).cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
        // secure:true, //fontend means 3000 hole true,postman check korar somoy secure:true comment hobe
        sameSite:"none",
    }).json({
        success:true,
        message:"Logout successfully"

    })
})