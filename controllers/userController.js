import { User } from "../models/User.js";
import {catchAsyncError} from '../middlewares/catchAsyncError.js'
 import ErrorHandler from '../utils/errorHandler.js'
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from 'crypto'

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
    return next(new ErrorHandler("please enter all login field",400));

    const user=await User.findOne({email}).select("+password")
    if(!user) return next(new ErrorHandler("User dosen't Exist", 401))

    const isMatch=await user.comparePassword(password) //comparePassword function modal->User e pabo
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

//get my profile, like middleware
export const getMyProfile=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.user._id) //ei line buji ni
    res.status(200).json({
        success:true,
       user,

    })
})

//change password
export const chnagePassword=catchAsyncError(async (req,res,next)=>{
    const {oldPassword,newPassword}=req.body
    if(!oldPassword || !newPassword)
    return next(new ErrorHandler("please enter all field",400))

    const user=await User.findById(req.user._id).select("+password")

    const isMatch=await user.comparePassword(oldPassword)
    if(!isMatch) return next(new ErrorHandler("Incorrect old password",400))
    user.password=newPassword
    await user.save()
    res.status(200).json({
        success:true,
       message:"Password Changed successfully"

    })
})

//update Profile, like name, email change
export const updateProfile=catchAsyncError(async (req,res,next)=>{
    const {name,email}=req.body
    const user=await User.findById(req.user._id)

    if(name) user.name=name;
    if(email) user.email=email


    await user.save()
    res.status(200).json({
        success:true,
       message:"Profile updated successfully"

    })
})

//forget password
export const forgetPassword=catchAsyncError(async(req,res,next)=>{

    const {email}=req.body;
    const user=await User.findOne({email});
    // console.log(email)
    if(!user) return next(new ErrorHandler("User not found",400))
    const resetToken=await user.getResetToken() //getResetToken()function models=> User.js e ache
    await user.save()

    const url=`${process.env.FRONTEND_URL}/resetpassword/${resetToken}`
    //http://localhost:3000/resetpassword/jkkladfsjkljdksjdsakjd(resettoken eisob)
    const  message=`Click on the link to reset your password. ${url}. If you have not request then please ignore`
    //first step end

    //second step start--send token via email
    await sendEmail(user.email, "CourseBundler Reset Password", message) //sendEmail() ei function ta utils er sendEmail.js



    res.status(200).json({
        success:true,
       message:`Reset Token has been sent to ${user.email}`

    })

    
})

//reset password
export const resetPassword=catchAsyncError(async(req,res,next)=>{

    const {token}=req.params; //router resetpassword/:token dile bole eikahne {token} bosebe must
     const resetPasswordToken=crypto
    .createHash("sha256")
    .update(token)
    .digest("hex")

    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{
            $gt: Date.now()
        },
        
    })
    if(!user) return next(new ErrorHandler("Token is invalid or has been expired",401))
    //new password bolso
    user.password=req.body.password;

    //reset e mongo theke theresetPasswordToken undefiend kore dilam
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save()
    res.status(200).json({
        success:true,
       message:"Password change successfully"

    })
})
