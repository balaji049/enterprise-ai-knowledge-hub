import { useEffect, useMemo, useState } from "react";

import DocumentsHome from "../../../components/admin/documents/DocumentsHome";
import * as documentService from "../../../services/document.service";

export default function Documents() {

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("All");

    const [fileType, setFileType] = useState("All");

    const [documents, setDocuments] = useState([]);

    const [selectedDocument, setSelectedDocument] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDocuments();

    }, []);

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

    const filteredDocuments = useMemo(() => {

        return documents.filter(document =>

            (document.originalName || document.name)
                ?.toLowerCase()
                .includes(search.toLowerCase())

        );

    }, [documents, search]);

    const handleUpload = () => {

        setSelectedDocument(null);

        setShowModal(true);

    };

    const handleEdit = (document) => {

        setSelectedDocument(document);

        setShowModal(true);

    };

    const handleDelete = async (document) => {

        try {

            await documentService.deleteDocument(

                document._id

            );

            await loadDocuments();

        } catch (error) {

            console.error(error);

        }

    };

    const handleSave = async (document) => {

        try {

            console.log("Uploading...", document);

            await documentService.uploadDocument(document);

            await loadDocuments();

            setShowModal(false);

        } catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Upload failed"

            );

        }

    };

    return(

        <DocumentsHome

            documents={filteredDocuments}

            loading={loading}

            search={search}

            status={status}

            fileType={fileType}

            showModal={showModal}

            selectedDocument={selectedDocument}

            onSearch={setSearch}

            onStatusChange={setStatus}

            onFileTypeChange={setFileType}

            onUpload={handleUpload}

            onEdit={handleEdit}

            onDelete={handleDelete}

            onSave={handleSave}

            onClose={()=>setShowModal(false)}

        />

    );

}