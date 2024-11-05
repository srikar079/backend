import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { v2 as cloudinary } from 'cloudinary';
import { ApiResponse } from "../utils/ApiResponse.js";


const generateAccessAndRefreshTokens = async(userId)=>{
    try {
        
        const user= await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refresToken=  user.generateRefreshToken()
            
        user.refresToken= refresToken
        await user.save({validateBeforeSave:false}) // so whenever we use 

        return {accessToken, refresToken}
        // save the password and all are re-checked
        // so this prevents that and avoids errors
    } catch (error) {
        throw new ApiError(500, "Server Error")
    }
}
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body;

    if (!fullName || !email || !username || !password) {
        throw new ApiError(400, "All fields required");
    }

    const existedUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existedUser) {
        throw new ApiError(409, "User with email or username exists");
    }
    else{
           console.log(new ApiResponse(200,existedUser, "User Exists"))
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }
   else{
    console.log(new ApiResponse(200, avatarLocalPath, "Avatar Exists"));
   }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    });

    const createdUser = await User.findById(user._id);
    if (!createdUser) {
        throw new ApiError(500, "Error while registering the user");
    }
    else{
        console.log(new ApiResponse(200, {fullName:user.fullName}, "Yes registered "))
    }
            
    return res.status(201).json(new ApiResponse(200, createdUser, "Successfully registered"));
});
const loginUser = asyncHandler(async(req,res)=>{

    const {email, username, password} = req.body
        if(!username || !email){
            throw new ApiError(400, "username or password is required")                
         }
        
     const user= await User.findOne({
        $or: [{username}, {email}]
     })
     if(!user){
        throw new ApiError(404, "user does not exist")
     }  
     
     const isPasswordValid = await user.isPasswordCorrect(password)

     if(!isPasswordValid){
        throw new ApiError(404, " password is invalid");
     }
            const {accessToken,refresToken}=await generateAccessAndRefreshTokens(user._id)

            const loggedInUser= await User.findById(user._id)
            .select("-password -refreshToken")


            //cookies 

            const options= {
                httpOnly : true, // can only be modified by server, not frontend
                secure : true
            }
            return res.status(200)
            .cookie("acessToken",accessToken,options)
            .cookie("refreshToken", refresToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        user :loggedInUser , accessToken, refresToken
                    },
                    "user logged in successfully"
                )
            )

}) 

const logoutUser = asyncHandler(async(req,res)=>{
     await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken : undefined
            }
        },
        {
            new: true
        }
       )
       const options ={
             httpOnly :true,
             secure: true
       }
       return res
       .status(200)
       .clearCookie("accessToken", options)
       .clearCookie("refreshToken", options)
       .json( new ApiResponse(200,{}, "User logged"))
})
 

export { registerUser , logoutUser , loginUser};
