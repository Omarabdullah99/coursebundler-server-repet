import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import validator from 'validator'

//user schema create
const schema= new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
      },
      email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: validator.isEmail,
      },
    
      password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password must be at least 6 characters"],
        select: false,
      },
      role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
      },
    
      subscription: {
        id: String,
        status: String,
      },
    
      avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      playlist: [
        {
          course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course", //Course.js er model Course er reference 
          },
          poster: String,
        },
      ],
    
      createdAt: {
        type: Date,
        default: Date.now,
      },
    
      resetPasswordToken: String,
      resetPasswordExpire: String,

})

//jwt token create, ei function er connection utils-> sendToken.js e 
schema.methods.getJWTToken= function(){
  return jwt.sign({_id: this._id},process.env.JWT_SECRET,{
    expiresIn:"15d"
  })
}

//user model create
export const User= mongoose.model("User", schema)