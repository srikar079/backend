import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/Cloudinary.js"
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
  
  const existedUser=User.findOne({
   $or: [{ username } , { email }]
  })
     if(existedUser){
      throw new ApiError(409,"User with email or username exists")
     }
   
     const avatarLocalPath= req.files?.avatar[0]?.path;
     const coverImageLocalPath= req.files?.coverImage[0]?.path;
     path;

     if(!avatarLocalPath){
      throw new ApiError(400,"Avatar is required")
     }

      const avatar = await uploadOnCloudinary(avatarLocalPath)
      const coverImage= await uploadOnCloudinary(coverImageLocalPath)

})

export {registerUser};