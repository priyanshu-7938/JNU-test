import { Router } from "express";
import { validateProof } from "../controllers/verification.controller.js";

const router=Router();

router.route("/").post(validateProof)

export default router;