import asyncHandler from "../middleware/asyncHandler.js";

import * as dashboardService from "../services/dashboard.service.js";

import {

    successResponse

} from "../utils/apiResponse.js";

export const getDashboard = asyncHandler(

    async (req, res) => {

        const dashboard =

            await dashboardService.getDashboard();

        successResponse(

            res,

            "Dashboard loaded successfully",

            dashboard

        );

    }

);