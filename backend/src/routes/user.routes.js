import { Router } from "express";
import { Login, Logout, userRegister } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(userRegister);
router.route("/login").post(Login);
router.route("/logout").post(verifyJWT, Logout);

export { router };
