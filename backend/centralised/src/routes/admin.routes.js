import { generateProof,getProofRequests,loginUser } from "../controllers/admin.controller.js";
import {Router} from "express";

const router=Router();

router.route("/login").post(loginUser);
router.route("/getproofs").get(getProofRequests);
router.route("/generateproof").post(generateProof);

export default router;