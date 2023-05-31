import express from 'express'
import { addLectures, createCourses, deleteCourse, deleteLecture, getAllCourses, getCourseLectures } from '../controllers/courseController.js'
import singleUpload from '../middlewares/multer.js' 
import { authorizedAdmin, isAuthenticated } from '../middlewares/auth.js'

const router= express.Router()
//get all course
router.route("/courses").get(getAllCourses)

//post course,it's meen create course this route only for admin--------
router.route("/createcourse").post(isAuthenticated,authorizedAdmin,singleUpload,createCourses)

//getcourseLectures
router.route("/course/:id").get(getCourseLectures)

//add Lectures in Course , this route only for admin----------
router.route("/course/:id").post(isAuthenticated,authorizedAdmin,singleUpload,addLectures)

//delete Course, it's meen Course Delete soho poster ar lecture er video delete hobe , this route only for admin-----------
router.route("/course/:id").delete(isAuthenticated,authorizedAdmin,deleteCourse)

//delete lecture, this route only for admin---
router.route('/lecture').delete(isAuthenticated,authorizedAdmin,deleteLecture)

export default router