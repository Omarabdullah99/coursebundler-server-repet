import express from 'express'
import { addLectures, createCourses, getAllCourses, getCourseLectures } from '../controllers/courseController.js'
import singleUpload from '../middlewares/multer.js' 

const router= express.Router()
//get all course
router.route("/courses").get(getAllCourses)

//post course,it's meen create course 
router.route("/createcourse").post(singleUpload,createCourses)

//getcourseLectures
router.route("/course/:id").get(getCourseLectures)

//add Lectures in Course
router.route("/course/:id").post(singleUpload,addLectures)

export default router