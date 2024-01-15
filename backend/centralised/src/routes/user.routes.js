import { Router } from "express";
import { registerUser,loginUser,applyforProof,fetchMyproofs} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router=Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/applyforproof").post(upload.single("document"),applyforProof)
router.route("/myproofs").post(fetchMyproofs)


export default router;