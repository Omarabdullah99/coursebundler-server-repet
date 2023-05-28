export const sendToken=(res,user,message,statusCode=200)=>{
    const token=user.getJWTToken(); //ei function pabo modal er User.js

    const options={
        expires:new Date(Date.now()+ 15 * 24 * 60 * 60 * 1000),
        httpOnly:true,
        // secure:true, //fontend e secure:true, postman e secure comment
        sameSite:"none",
    }

    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        message,
        user
    })
    
}