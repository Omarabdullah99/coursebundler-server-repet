import express from "express"
import { config } from "dotenv"

config({
    path:"./config/config.env"
}) //confign.env te port 4000, connection er jonno
const app=express()

//router setup
import course from './routes/CourseRoute.js' //note: .js dewa lagbey na hole error dibe
import users from './routes/UserRoute.js'
app.use("/api/v1",course)
app.use("/api/v1", users)

export default app