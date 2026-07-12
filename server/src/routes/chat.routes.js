import { Router } from "express";

import auth from "../middleware/auth.js";

import * as chatController from "../controllers/chat.controller.js";

const router = Router();

router.use(auth);

router.post(

    "/",

    chatController.askAI

);

export default router;
