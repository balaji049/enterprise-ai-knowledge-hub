import asyncHandler from "../middleware/asyncHandler.js";

import * as documentService from "../services/document.service.js";

import {

    successResponse

} from "../utils/apiResponse.js";

export const getDocuments = asyncHandler(

    async (req, res) => {

        const documents =

            await documentService.getDocuments(

                req.user.department._id

            );

        successResponse(

            res,

            "Documents fetched successfully",

            documents

        );

    }

);

export const uploadDocument = asyncHandler(

    async (req, res) => {

        const file = req.file;

        const document = await documentService.uploadAndIndexDocument(

            {

                name: req.body.name,

                originalName: file.originalname,

                department: req.user.department._id,

                uploadedBy: req.user._id,

                fileName: file.filename,

                filePath: file.path,

                mimeType: file.mimetype,

                fileSize: file.size

            },

            req.user.department

        );

        successResponse(

            res,

            "Document uploaded successfully",

            document,

            201

        );

    }

);

export const deleteDocument = asyncHandler(

    async (req, res) => {

        await documentService.deleteDocument(

            req.params.id

        );

        successResponse(

            res,

            "Document deleted successfully"

        );

    }

);

export const getDocumentStats = asyncHandler(

    async (

        req,

        res

    ) => {

        const stats =

            await documentService.getDocumentStats(

                req.user.department._id

            );

        return res.status(200).json({

            success: true,

            data: stats

        });

    }

);