//require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import mongoose from 'mongoose';

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
    console.log("eror", error);
  })
})
.catch((err)=>{
  console.log("Mongo Db error", error)
})


/*
import express from 'express';
const app = express();
;(async ()=>{
    try{
      await mongoose.connect(`${process.env.MONGODB_URI}/
      ${DB_NAME}`);
      app.on("error",(error)=>{
        console.log("error:", error)
      })

      app.listen(process.env.PORT,()=>{
        console.log(`Listening on port ${process.env.PORT}`)
      })
    }catch(error){
     console.log("ERROR"+error);
    }
})()
*/