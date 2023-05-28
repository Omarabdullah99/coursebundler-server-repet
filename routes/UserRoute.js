import express from 'express'
import { register } from '../controllers/userController.js'

const router= express.Router()

//register router
router.route("/register").post(register)


export default router