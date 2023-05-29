import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import { Course } from "../models/Course.js"
import getDataUri from "../utils/dataUri.js"
import ErrorHandler from "../utils/errorHandler.js"
import cloudinary from 'cloudinary'

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
        const file =req.file
        const fileUri= getDataUri(file)
        const mycloud= await cloudinary.v2.uploader.upload(fileUri.content)

        await Course.create({
            title,
            description,
            category,
            createdBy,
            poster:{
                public_id:mycloud.public_id,
                url:mycloud.secure_url
            }
        })
    
     res.status(201).json({
         success:true,
         message:"Course Created SUccessfully"
     })
     
    
 })

 //get courselectures
 export const getCourseLectures= catchAsyncError(async(req,res,next)=>{

    const course=await Course.findById(req.params.id)
    if(!course) return next(new ErrorHandler("Course not found",404))
    res.status(200).json({
        success:true,
        lectures:course.lectures
    })

 })


  //add courselectures
  export const addLectures= catchAsyncError(async(req,res,next)=>{
    const {id}=req.params
    const {title,description}=req.body

    // const file=req.file

    const course=await Course.findById(id)
    if(!course) return next(new ErrorHandler("Course not found",404))

     //upload file here

    course.lectures.push({
        title,
        description,
        video:{
            public_id:"url",
            url:"url"
        }
    })
    course.numOfVideos= course.lectures.length
  await course.save()

   
    res.status(200).json({
        success:true,
        message:"Lecture added in Course"
    })

 })