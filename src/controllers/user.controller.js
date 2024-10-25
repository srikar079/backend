import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../"
const registerUser= asyncHandler(async(req,res)=>{
  
   const {fullName, email, username, password}= req.body;
   console.log("email:", email);
      
   if(fullName===""){
      throw new ApiError(400, "Full name is required")
   }
  if(
   [fullName, email, username, password].some((field)=>filed?.trim()==="")
     )
  {
   throw new ApiError(400, "All fields required")
  }
  
  User.findOne({
   $or: [{ username } , { email }]
  })
     if(existerUser){
      throw new ApiError(409,"User with email or username exists")
     }
   
})

export {registerUser};