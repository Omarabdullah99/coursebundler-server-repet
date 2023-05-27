import app from "./app.js"; //.js dewya lagbey, na hole error dibe
//mongodb connection
import { connectDB } from "./config/database.js";

connectDB()


app.listen(process.env.PORT,()=>{
    console.log(`server is working:${process.env.PORT} `)

} )