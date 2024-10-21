//require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import mongoose from 'mongoose';
import {app} from './app.js'
import connectDB from './DB/index.js';

dotenv.config({
    path:'./env'
})
connectDB() //returns a promise from async
.then(()=>{
  app.listen(process.env.PORT || 8000,()=>{
    console.log(`Server running at ${process.env.PORT}`)
  })
  app.on("error",(error)=>{
    console.log("error", error);
  })
})
.catch((err)=>{
  console.log("Mongo Db error", err)
})

