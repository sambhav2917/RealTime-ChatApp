import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routers/userRoutes.js'
const app = express()

dotenv.config()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))


app.use('/api/auth', userRouter)

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB')
}).catch(error => {
    console.log(error)
})

const Port=process.env.PORT || 5000;
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`)
})