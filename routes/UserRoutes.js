import express from "express";
import { SignIn, SignUp } from "../ControllerFunctions/UserFunctions.js";

const router = express.Router();

router.post("/signin", SignIn);
router.post("/signup", SignUp);

export default router;
