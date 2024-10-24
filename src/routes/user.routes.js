import {Router} from "express"
import {registerUser} from "../controllers/user.controller.js"

const router=Router();

router.route("/register").post(registerUser);

    const {fullName, email,username,password}=req.body;
    

export default router;
