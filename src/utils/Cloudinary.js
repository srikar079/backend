import { v2 as cloudinary } from 'cloudinary';

import fs from 'fs'


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET// Click 'View API Keys' above to copy your API secret
    });


const uploadOnCloudinary = async (localFilePath)=>{
    try{
          if(!localFilePath)
            return "incorrect path, file does not exist";

          const response =await cloudindary.uploader.upload(localFilePath,{
            resource_type:"auto"
          })
          console.log("uploaded in cloudinary", response.url);
    }
    catch(error){
      fs.unlinkSync(localFilePath)
    //removes locally saved file after failing of the upload operation
    return null;
    }
}


    cloudinary.v2.uploader
    .upload(
        'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
            public_id: 'shoes',
[]