import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import { Course } from "../models/Course.js"
import ErrorHandler from "../utils/errorHandler.js"

export const getAllCourses=catchAsyncError(async(req,res,next)=>{
    try {
     const getAllCourses= await Course.find().select("-lectures")
     res.status(200).json({
         success:true,
         getAllCourses
     })
     
    } catch (error) {
     
    }
 })

 //create course er function

 export const createCourses=catchAsyncError(async(req,res,next)=>{

    const {title,description,category,createdBy}=req.body
    if(!title || !description || !category || !createdBy) 
        return next(new ErrorHandler("please add all fields",400))
        //file means image upload er kaj hobe pore
        // const file =req.file

        await Course.create({
            title,
            description,
            category,
            createdBy,
            poster:{
                public_id: "temp",
                url: "tmep"
            }
        })
    
     res.status(201).json({
         success:true,
         message:"Course Created SUccessfully"
     })
     
    
 })