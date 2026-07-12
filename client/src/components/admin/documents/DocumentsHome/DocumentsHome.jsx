import { motion } from "framer-motion";

import DocumentToolbar from "../DocumentToolbar";
import DocumentTable from "../DocumentTable";
import UploadDocumentModal from "../UploadDocumentModal";
import EmptyDocuments from "../EmptyDocuments";

import styles from "./DocumentsHome.module.css";

const container = {

    hidden: {},

    show: {

        transition: {

            staggerChildren: 0.08

        }

    }

};

const item = {

    hidden: {

        opacity: 0,

        y: 20

    },

    show: {

        opacity: 1,

        y: 0,

        transition: {

            duration: 0.4

        }

    }

};

export default function DocumentsHome({

    documents,

    loading,

    search,

    status,

    fileType,

    showModal,

    selectedDocument,

    onSearch,

    onStatusChange,

    onFileTypeChange,

    onUpload,

    onEdit,

    onDelete,

    onSave,

    onClose

}) {

    return (

        <motion.div

            variants={container}

            initial="hidden"

            animate="show"

            className={styles.container}

        >

            {/* Header */}

            <motion.div

                variants={item}

                className={styles.header}

            >

                <div>

                    <h1>

                        Document Management

                    </h1>

                    <p>

                        Upload and manage department documents.

                    </p>

                </div>

            </motion.div>

            {/* Toolbar */}

            <motion.div variants={item}>

                <DocumentToolbar

                    search={search}

                    status={status}

                    fileType={fileType}

                    onSearch={onSearch}

                    onStatusChange={onStatusChange}

                    onFileTypeChange={onFileTypeChange}

                    onUpload={onUpload}

                />

            </motion.div>

            {/* Table */}

            <motion.div variants={item}>

                {

                    documents.length > 0

                        ?

                        <DocumentTable

                            documents={documents}

                            loading={loading}

                            onEdit={onEdit}

                            onDelete={onDelete}

                        />

                        :

                        <EmptyDocuments

                            onUpload={onUpload}

                        />

                }

            </motion.div>

            {/* Upload Modal */}

            {

                showModal && (

                    <UploadDocumentModal

                        document={selectedDocument}

                        onSave={onSave}

                        onClose={onClose}

                    />

                )

            }

        </motion.div>

    );

}