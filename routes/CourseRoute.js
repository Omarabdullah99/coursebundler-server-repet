import express from 'express'
import { createCourses, getAllCourses } from '../controllers/courseController.js'

const router= express.Router()
//get all course
router.route("/courses").get(getAllCourses)

//post course,it's meen create course 
router.route("/createcourse").post(createCourses)

export default router