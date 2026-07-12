import {
    FileText,
    Eye,
    Download,
    Pencil,
    Trash2
} from "lucide-react";

import styles from "./DocumentRow.module.css";

export default function DocumentRow({

    document,

    onPreview,

    onDownload,

    onRename,

    onDelete

}) {

    const statusClass =

        document.status === "Approved"

            ? styles.approved

            : document.status === "Pending"

            ? styles.pending

            : styles.rejected;

    return (

        <tr>

            {/* ========================= */}
            {/* Document */}
            {/* ========================= */}

            <td>

                <div className={styles.document}>

                    <div className={styles.icon}>

                        <FileText size={20} />

                    </div>

                    <div>

                        <h4>

                            {document.title}

                        </h4>

                        <span>

                            {document.fileType}

                            {" • "}

                            {document.fileSize}

                            {" • v"}

                            {document.version}

                        </span>

                    </div>

                </div>

            </td>

            {/* ========================= */}
            {/* Department */}
            {/* ========================= */}

            <td>

                {document.department}

            </td>

            {/* ========================= */}
            {/* Category */}
            {/* ========================= */}

            <td>

                <span className={styles.category}>

                    {document.category}

                </span>

            </td>

            {/* ========================= */}
            {/* Uploaded By */}
            {/* ========================= */}

            <td>

                <div className={styles.user}>

                    <strong>

                        {document.uploadedBy}

                    </strong>

                    <small>

                        {document.uploadedAt}

                    </small>

                </div>

            </td>

            {/* ========================= */}
            {/* Status */}
            {/* ========================= */}

            <td>

                <span

                    className={`${styles.status} ${statusClass}`}

                >

                    {document.status}

                </span>

            </td>

            {/* ========================= */}
            {/* Actions */}
            {/* ========================= */}

            <td>

                <div className={styles.actions}>

                    <button

                        title="Preview"

                        onClick={() =>

                            onPreview?.(document)

                        }

                    >

                        <Eye size={16} />

                    </button>

                    <button

                        title="Download"

                        onClick={() =>

                            onDownload?.(document)

                        }

                    >

                        <Download size={16} />

                    </button>

                    <button

                        title="Rename"

                        onClick={() =>

                            onRename?.(document)

                        }

                    >

                        <Pencil size={16} />

                    </button>

                    <button

                        title="Delete"

                        className={styles.delete}

                        onClick={() =>

                            onDelete?.(document)

                        }

                    >

                        <Trash2 size={16} />

                    </button>

                </div>

            </td>

        </tr>

    );

}