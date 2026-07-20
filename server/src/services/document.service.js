import analyticsEvents from "../analytics/analytics.events.js";
import { ANALYTICS_EVENT_TYPES } from "../analytics/analytics.constants.js";
import Document from "../models/Document.js";
import * as pythonService from "./python.service.js";
import { logActivity } from "./activityLogger.service.js";

const buildFileUrl = filePath => {

    if (!filePath) return null;

    const relativePath = filePath
        .replace(/^src[\\/]/, "")
        .replace(/\\/g, "/");

    return `http://localhost:5000/${relativePath}`;

};

export const uploadAndIndexDocument = async (

    data,

    department,

    user

) => {

    const document = await Document.create({

        ...data,

        status: "Processing"

    });

    await analyticsEvents.log({

        employee: user._id,

        department: user.department,

        type: ANALYTICS_EVENT_TYPES.DOCUMENT_UPLOAD,

        resourceId: document._id,

        resourceType: "Document"

    });

    try {

        await pythonService.indexDocument({

            document_id: document._id.toString(),

            document_name: document.originalName,

            department: department.code,

            file_path: document.filePath

        });

        document.status = "Indexed";

        document.processing = {

            textExtracted: true,

            chunked: true,

            embedded: true,

            indexed: true

        };

        document.lastIndexedAt = new Date();

        await document.save();

    }

    catch (error) {

        console.error("Python Indexing Failed");

        console.error(error.message);

        document.status = "Failed";

        await document.save();

    }

    await logActivity({

        module: "Documents",

        action: "Upload",

        target: document.name,

        details: `Document "${document.originalName}" uploaded successfully`,

        performedBy: user._id,

        department: user.department._id,

        status: document.status === "Failed"
            ? "Failed"
            : "Success"

    });

    return await Document.findById(document._id)

        .populate("department")

        .populate("uploadedBy", "fullName");

};

export const getDocuments = async (departmentId) => {

    const documents = await Document

        .find({

            department: departmentId

        })

        .populate(

            "department"

        )

        .populate(

            "uploadedBy",

            "fullName"

        );

    return documents.map(document => {

        const payload = document.toObject();

        payload.fileUrl = buildFileUrl(payload.filePath);

        return payload;

    });

};

export const getDocument = async (

    id,

    departmentId

) => {

    const query = departmentId

        ? Document.findOne({

            _id: id,

            department: departmentId

        })

        : Document.findById(id);

    return await query

        .select(

            "_id name fileName filePath fileSize mimeType status uploadedBy createdAt department"

        )

        .populate(

            "department",

            "name"

        )

        .populate(

            "uploadedBy",

            "fullName"

        );

};

export const createDocument = async (data) => {

    return await Document.create(data);

};

export const updateDocument = async (

    id,

    data

) => {

    return await Document.findByIdAndUpdate(

        id,

        data,

        {

            new: true,

            runValidators: true

        }

    );

};

export const deleteDocument = async (

    id,

    user

) => {

    const document = await Document.findByIdAndDelete(id);

    if (!document) {

        return null;

    }

    await logActivity({

        module: "Documents",

        action: "Delete",

        target: document.name,

        details: `Document "${document.originalName}" deleted`,

        performedBy: user._id,

        department: user.department._id,

        status: "Success"

    });

    return document;

};

export const getDocumentStats = async (departmentId) => {

    const documents = await Document.find({

        department: departmentId

    });

    const total = documents.length;

    const indexed = documents.filter(

        document => document.status === "Indexed"

    ).length;

    const processing = documents.filter(

        document => document.status === "Processing"

    ).length;

    const failed = documents.filter(

        document => document.status === "Failed"

    ).length;

    const storage = documents.reduce(

        (total, document) => total + (document.fileSize || 0),

        0

    );

    return {

        total,

        indexed,

        processing,

        failed,

        storage

    };

};