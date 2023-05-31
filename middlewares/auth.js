import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/errorHandler.js';
import { catchAsyncError } from './catchAsyncError.js';
import { User } from '../models/User.js';

//isAuthenticate means user login ache naki ta check
export const isAuthenticated=catchAsyncError(async(req,res,next)=>{
    const {token}=req.cookies;

    if(!token) return next(new ErrorHandler("Not LOgged In",401))

    const decoded=jwt.verify(token, process.env.JWT_SECRET )
    req.user=await User.findById(decoded._id)
    next()
})

//admin er middler ware
export const authorizedAdmin=(req,res,next)=>{
    if (req.user.role !== "admin")
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resource`,
        403
      )
    );

  next();
  
}