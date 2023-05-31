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


  //add courselectures note: Video less than 100mb must
  export const addLectures= catchAsyncError(async(req,res,next)=>{
    const {id}=req.params
    const {title,description}=req.body

    const course=await Course.findById(id)
    if(!course) return next(new ErrorHandler("Course not found",404))

     //upload file here
     const file=req.file;
     // console.log(file)
     const fileUri= getDataUri(file)
     const mycloud= await cloudinary.v2.uploader.upload(fileUri.content,{
         resource_type: "video", //eita must lagbe
     })

    course.lectures.push({
        title,
        description,
        video:{
            public_id:mycloud.public_id,
                url:mycloud.secure_url
        }
    })
    course.numOfVideos= course.lectures.length
  await course.save()

   
    res.status(200).json({
        success:true,
        message:"Lecture added in Course"
    })

 })

 //deleteCourse
 export const deleteCourse = catchAsyncError(
    async(req,res,next)=>{
        const {id}=req.params
        const course=await Course.findById(id)
        if(!course) return next(new ErrorHandler("Course not found",404))
        
        await cloudinary.v2.uploader.destroy(course.poster.public_id); //course er poster delete

        for (let i = 0; i < course.lectures.length; i++) {
          const singleLecture = course.lectures[i];
          await cloudinary.v2.uploader.destroy(singleLecture.video.public_id, {
            resource_type: "video", //course er lecture er video delete
          });
        }
      
        await course.deleteOne()

        res.status(200).json({
            success:true,
            message:"Course deleted successfully."
        })
    
    }
)

//delete lecture
export const deleteLecture = catchAsyncError(async (req, res, next) => {
    const { courseId, lectureId } = req.query;
   
  
    const course = await Course.findById(courseId);
    if (!course) return next(new ErrorHandler("Course not found", 404));
    // console.log(courseId,lectureId)
    const lecture = course.lectures.find((item) => {
      if (item._id.toString() === lectureId.toString()) return item;
    });
    await cloudinary.v2.uploader.destroy(lecture.video.public_id, {
      resource_type: "video",
    });
  
    course.lectures = course.lectures.filter((item) => {
      if (item._id.toString() !== lectureId.toString()) return item;
    });
  
    course.numOfVideos = course.lectures.length;
  
    await course.save();
  
    res.status(200).json({
      success: true,
      message: "Lecture Deleted Successfully",
    });
  });