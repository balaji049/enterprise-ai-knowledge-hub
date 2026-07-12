import { Router } from "express";
import employeeRoutes from "./employee.routes.js";
import authRoutes from "./auth.routes.js";
import departmentRoutes from "./department.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import documentRoutes from "./document.routes.js";
import chatRoutes from "./chat.routes.js";


const router = Router();

router.use("/auth", authRoutes);
router.use(

    "/dashboard",

    dashboardRoutes

);
router.use("/documents", documentRoutes);
router.use("/chat", chatRoutes);
router.use(

    "/employees",

    employeeRoutes

);

router.use(

    "/departments",

    departmentRoutes

);

router.get(

    "/health",

    (req, res) => {

        res.json({

            success: true,

            message: "API Running"

        });

    }

);

export default router;