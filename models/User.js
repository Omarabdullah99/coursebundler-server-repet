import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import validator from 'validator'
import bcrypt from 'bcrypt'

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

//regitation korar somoy password jate hase dekay. it's mean main password na dekay
schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
  
});

//jwt token create, ei function er connection utils-> sendToken.js e 
schema.methods.getJWTToken= function(){
  return jwt.sign({_id: this._id},process.env.JWT_SECRET,{
    expiresIn:"15d"
  })
}

//compare passowrd function ta userController e login e use hoise
schema.methods.comparePassword=async function(password){
  // console.log(this.password)
  return await bcrypt.compare(password, this.password)

}

//user model create
export const User= mongoose.model("User", schema)