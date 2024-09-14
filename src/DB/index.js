import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB =async () => {
    try {
        
        const connections= await  mongoose.connect
        (`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongooseConected !!!! ${connections.connection.host} `)
    } catch (error) {
        console.log('error from MONGODB', error);
        process.exit(1);
    }
}
export default connectDB;