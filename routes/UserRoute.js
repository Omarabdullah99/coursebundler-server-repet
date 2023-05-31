import express from 'express'
import { addToPlaylist, chnagePassword, forgetPassword, getMyProfile, login, logout, register, removeFromPlaylist, resetPassword, updateProfile, updateprofilepicture } from '../controllers/userController.js'
import { isAuthenticated } from '../middlewares/auth.js'
import singleUpload from '../middlewares/multer.js'


const router= express.Router()

//register router
router.route("/register").post(singleUpload,register)
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

//update profile picture
router.route("/updateprofilepicture").put(isAuthenticated,singleUpload,updateprofilepicture)

//forgetpassword router
router.route("/forgetpassword").post(forgetPassword)

//resetpassword
router.route("/resetpassword/:token").put(resetPassword)

//addToPlayList, like addtoCard
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist)
//removeFromPlayList
router.route("/removefromplaylist").delete(isAuthenticated,removeFromPlaylist)

export default router