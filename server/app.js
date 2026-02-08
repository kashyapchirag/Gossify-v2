import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import dbConnection from './congig/db.js'
import roomRoute from './routes/roomRoute.js'

const app = express()

//env setup
dotenv.config()

//db connection
dbConnection()

//http cors
app.use(cors())

//global middleware setup
app.use(express.json())

//getting routes
app.use('/api',roomRoute)

export default app