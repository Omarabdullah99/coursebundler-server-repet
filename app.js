import express from "express"
import { config } from "dotenv"

config({
    path:"./config/config.env"
}) //confign.env te port 4000, connection er jonno
const app=express()

export default app