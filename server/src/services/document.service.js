import Document from "../models/Document.js";
import * as pythonService from "./python.service.js";

export const uploadAndIndexDocument = async (

    data,

    department

) => {

    const document = await Document.create({

        ...data,

        status: "Processing"

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

    return await Document.findById(document._id)

        .populate("department")

        .populate("uploadedBy", "fullName");
};

export const getDocuments = async (departmentId) => {

    return await Document

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

};

export const getDocument = async (id) => {

    return await Document

        .findById(id)

        .populate("department")

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

export const deleteDocument = async (id) => {

    return await Document.findByIdAndDelete(id);

};

export const getDocumentStats = async (

    departmentId

) => {

    const [

        total,

        indexed,

        processing,

        failed,

        documents

    ] = await Promise.all([

        Document.countDocuments({

            department: departmentId

        }),

        Document.countDocuments({

            department: departmentId,

            status: "Indexed"

        }),

        Document.countDocuments({

            department: departmentId,

            status: "Processing"

        }),

        Document.countDocuments({

            department: departmentId,

            status: "Failed"

        }),

        Document.find({

            department: departmentId

        })

        .select("fileSize")

    ]);

    const storage =

        documents.reduce(

            (

                sum,

                doc

            ) =>

                sum +

                (doc.fileSize || 0),

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