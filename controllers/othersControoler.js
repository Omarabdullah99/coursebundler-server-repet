import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";


//contact 
export const contact=catchAsyncError(async(req,res,next)=>{
    const {name,email,message}=req.body;

    if(!name || !email || !message)
    return next(new ErrorHandler("All fields are mandatory"))

    const to=process.env.MY_MAIL
    const subject="Contact from CourseBundler"
    const text=`I am ${name} and my Email is ${email}. \n${message}`

    await sendEmail(to,subject,text)

    res.status(200).json({
        success:true,
        message:"Your message has been send"
    })
})

export const courseRequest=catchAsyncError(async(req,res,next)=>{
    const {name,email,course}=req.body;

    if(!name || !email || !course)
    return next(new ErrorHandler("All fields are mandatory"))

    const to=process.env.MY_MAIL
    const subject="Request for a course on CourseBundler"
    const text=`I am ${name} and my Email is ${email}. \n${course}`

    await sendEmail(to,subject,text)

    res.status(200).json({
        success:true,
        message:"Your request course has been send"
    })
})