import express from 'express'
import { contact, courseRequest } from '../controllers/othersControoler.js'

const router=express.Router()

//contact form
router.route("/contact").post(contact)
//course request
router.route("/courserequest").post(courseRequest)

export default router