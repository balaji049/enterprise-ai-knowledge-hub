import { Router } from "express";

import auth from "../middleware/auth.js";
import * as authController from "../controllers/auth.controller.js";

const router = Router();

router.post(
    "/login",
    authController.login
);

router.get(
    "/me",
    auth,
    authController.getCurrentUser
);

export default router;