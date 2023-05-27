import app from "./app.js"; //.js dewya lagbey, na hole error dibe

app.listen(process.env.PORT,()=>{
    console.log(`server is working:${process.env.PORT} `)

} )