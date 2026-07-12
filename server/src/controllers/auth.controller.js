import asyncHandler from "../middleware/asyncHandler.js";
import * as authService from "../services/auth.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const login = asyncHandler(async (req, res) => {
    const {
        employeeId,
        password,
        role,
        department
    } = req.body;

    const data = await authService.login(
        employeeId,
        password,
        role,
        department
    );

    successResponse(
        res,
        "Login successful",
        data
    );
});

export const getCurrentUser = asyncHandler(async (req, res) => {
    successResponse(
        res,
        "User fetched successfully",
        req.user
    );
});