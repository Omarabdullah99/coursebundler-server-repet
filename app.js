import express from "express"
import { config } from "dotenv"
import ErrorMiddleware from "./middlewares/Error.js"

config({
    path:"./config/config.env"
}) //confign.env te port 4000, connection er jonno
const app=express()

//using middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//router setup
import course from './routes/CourseRoute.js' //note: .js dewa lagbey na hole error dibe
import users from './routes/UserRoute.js'

app.use("/api/v1",course)
app.use("/api/v1", users)

export default app

app.use(ErrorMiddleware) //error middleware last e bosano lage