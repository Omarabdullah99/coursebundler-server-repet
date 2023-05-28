import express from 'express'
import { getMyProfile, login, logout, register } from '../controllers/userController.js'
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


export default router