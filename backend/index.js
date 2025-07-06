require('dotenv').config()

const express = require('express')

const mongoose = require('mongoose')

const { mongoUrl, secretkey ,} = require('./config')

const app = express() 

const PORT = process.env.PORT ;

const {userRouter} = require("./user")
const { todoRouter } = require('./todo')

app.use(express.json())

app.use("/api/v1/user" ,userRouter)
app.use("/api/v1/todo" ,todoRouter)

async function Main() {

    try{
       const connection =  await mongoose.connect(mongoUrl);
      console.log("Connected to the database");
      
    }catch
(error) {
        console.log("Error connecting to the database", error)
    }
}
app.listen(PORT)

Main()


