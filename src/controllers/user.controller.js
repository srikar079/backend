import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/Cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
   const { fullName, email, username, password } = req.body;
   
   if ([fullName, email, username, password].some((field) => !field?.trim())) {
      throw new ApiError(400, "All fields are required");
   }

   const existedUser = await User.findOne({
      $or: [{ username }, { email }]
   });
   if (existedUser) {
      throw new ApiError(409, "User with email or username exists");
   }

   const avatarLocalPath = req.files?.avatar?.[0]?.path;
   const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

   if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar is required");
   }

   const avatar = await uploadOnCloudinary(avatarLocalPath);
   const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

   if (!avatar) {
      throw new ApiError(400, "Error uploading avatar");
   }

   const user = await User.create({
      fullName,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase()
   });
   const createdUser = await User.findById(user._id);

   if (!createdUser) {
      throw new ApiError(500, "Error while registering the user");
   }

   return res.status(201).json(new ApiResponse(201, createdUser, "Successfully registered"));
});

export {registerUser};