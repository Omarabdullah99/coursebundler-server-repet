import express from 'express'
import { chnagePassword, forgetPassword, getMyProfile, login, logout, register, resetPassword, updateProfile } from '../controllers/userController.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router= express.Router()

//register router
router.route("/register").post(register)
//login
router.route("/login").post(login)

//logout
router.route("/logout").post(logout)

//get my profile, like middleware
router.route("/getmyprofile").get(isAuthenticated,getMyProfile)

//changePassword
router.route("/changepassword").put(isAuthenticated,chnagePassword)

//update profile
router.route("/updateprofile").put(isAuthenticated,updateProfile)

//forgetpassword router
router.route("/forgetpassword").post(forgetPassword)

//resetpassword
router.route("/resetpassword/:token").put(resetPassword)

export default router