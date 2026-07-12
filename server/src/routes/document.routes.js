import { Router } from "express";

import auth from "../middleware/auth.js";

import authorize from "../middleware/authorize.js";

import upload from "../middleware/upload.js";

import {

    ROLES

} from "../constants/roles.js";

import * as documentController from "../controllers/document.controller.js";

const router = Router();

router.use(auth);

router.get(

    "/",

    documentController.getDocuments

);

router.get(

    "/stats",

    auth,

    documentController.getDocumentStats

);

router.post(

    "/",

    authorize(

        ROLES.ADMIN,

        ROLES.SUPER_ADMIN

    ),

    upload.single("file"),

    documentController.uploadDocument

);

router.delete(

    "/:id",

    authorize(

        ROLES.ADMIN,

        ROLES.SUPER_ADMIN

    ),

    documentController.deleteDocument

);

export default router;