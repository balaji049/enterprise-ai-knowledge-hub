import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import DocumentsLayout from "../../components/documents/DocumentsLayout";
import DocumentsHome from "../../components/documents/DocumentsHome";
import * as documentService from "../../services/document.service";

export default function Documents() {

    /* ==========================================================
       USER
    ========================================================== */

    const [user] = useState({

        id: 1,

        name: "Balaji",

        role: "Employee",

        department: "Information Technology"

    });

    /* ==========================================================
       FILTERS
    ========================================================== */

    const [search, setSearch] = useState("");

    const [department, setDepartment] = useState("All");

    const [category, setCategory] = useState("All");

    /* ==========================================================
       DOCUMENT STATE
    ========================================================== */

    const [documents, setDocuments] = useState([]);

    const [selectedDocument, setSelectedDocument] = useState(null);

    const [loading, setLoading] = useState(true);

    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [showModal, setShowModal] = useState(false);

    /* ==========================================================
       INITIAL LOAD
    ========================================================== */

    useEffect(() => {

        loadDocuments();

    }, []);

    /* ==========================================================
       LOAD DOCUMENTS
    ========================================================== */

    const loadDocuments = async () => {

        setLoading(true);

        try {

            const data = await documentService.getDocuments();

            setDocuments(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    /* ==========================================================
       FILTERED DOCUMENTS
    ========================================================== */

    const filteredDocuments = useMemo(() => {

        return documents.filter(document => {

            const matchesSearch =

                document.title

                    .toLowerCase()

                    .includes(search.toLowerCase());

            const matchesDepartment =

                department === "All" ||

                document.department?.name === department;

            const matchesCategory =

                category === "All" ||

                document.category === category;

            return (

                matchesSearch &&

                matchesDepartment &&

                matchesCategory

            );

        });

    }, [

        documents,

        search,

        department,

        category

    ]);

    /* ==========================================================
       ACTIONS
    ========================================================== */

    const handleUpload = (files) => {
        setUploadedFiles(files);
        setUploading(true);
        setUploadProgress(0);
        let value = 0;
        const timer = setInterval(() => {
            value += 10;
            setUploadProgress(value);
            if (value >= 100) {
                clearInterval(timer);
                setUploading(false);
                setUploadProgress(100);
            }
        }, 200);
    };

    const handleRefresh = () => {
        loadDocuments();
    };

    const handlePreview = (document) => {

        setSelectedDocument(document);

    };

    const handleDownload = (document) => {

        console.log("Download", document);

    };

    const handleRename = (document) => {

        console.log("Rename", document);

    };

    const handleDelete = async (document) => {

        try {

            await documentService.deleteDocument(

                document._id

            );

            loadDocuments();

        } catch (error) {

            console.error(error);

        }

    };

    const handleSave = async (document) => {

        try {

            await documentService.uploadDocument(document);

            await loadDocuments();

            setShowModal(false);

        } catch (error) {

            console.error(error);

        }

    };

    const handleClosePreview = () => {

        setSelectedDocument(null);

    };

    /* ==========================================================
       UI
    ========================================================== */

    return (

        <DashboardLayout>

            <DocumentsLayout>

                <DocumentsHome

                    user={user}

                    loading={loading}

                    uploading={uploading}
                    uploadProgress={uploadProgress}
                    uploadedFiles={uploadedFiles}

                    search={search}

                    department={department}

                    category={category}

                    documents={filteredDocuments}

                    selectedDocument={selectedDocument}

                    onSearch={setSearch}

                    onDepartmentChange={setDepartment}

                    onCategoryChange={setCategory}

                    onUpload={handleUpload}
                    onRefresh={handleRefresh}

                    onPreview={handlePreview}

                    onDownload={handleDownload}

                    onRename={handleRename}

                    onDelete={handleDelete}

                    onClosePreview={handleClosePreview}

                />

            </DocumentsLayout>

        </DashboardLayout>

    );

}