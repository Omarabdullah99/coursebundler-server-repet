import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import { Course } from "../models/Course.js"

export const getAllCourses=catchAsyncError(async(req,res,next)=>{
    try {
     const getAllCourses= await Course.find()
     res.status(200).json({
         success:true,
         getAllCourses
     })
     
    } catch (error) {
     
    }
 })