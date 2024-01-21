import { generateProof,getProofRequests,loginUser, registerAdmin } from "../controllers/admin.controller.js";
import {Router} from "express";

const router=Router();

router.route("/login").post(loginUser);
router.route("/getproofs").get(getProofRequests);
router.route("/generateproof").post(generateProof);
router.route("/addAdmin").post(registerAdmin);

export default router;