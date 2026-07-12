import {
    Eye,
    Download,
    Pencil,
    Trash2,
    FileText
} from "lucide-react";

import styles from "./DocumentRow.module.css";

export default function DocumentRow({

    document,

    onPreview,

    onDownload,

    onEdit,

    onDelete

}) {

    const department = document.department?.name || "—";

    const uploadedBy = document.uploadedBy?.fullName || "—";

    const type =

        document.mimeType === "application/pdf"

            ? "PDF"

            : document.mimeType?.includes("word")

            ? "DOCX"

            : "FILE";

    const uploadedAt = new Date(

        document.createdAt

    ).toLocaleDateString();

    return (

        <tr>

            {/* Document */}

            <td>

                <div className={styles.document}>

                    <div className={styles.icon}>

                        <FileText size={18} />

                    </div>

                    <span>

                        {document.name}

                    </span>

                </div>

            </td>

            {/* Department */}

            <td>

                {department}

            </td>

            {/* Type */}

            <td>

                {type}

            </td>

            {/* Uploaded By */}

            <td>

                {uploadedBy}

            </td>

            {/* Date */}

            <td>

                {uploadedAt}

            </td>

            {/* Status */}

            <td>

                <span

                    className={`${styles.status} ${
                        document.status === "Indexed"

                            ? styles.active

                            : styles.processing
                    }`}

                >

                    {document.status}

                </span>

            </td>

            {/* Actions */}

            <td>

                <div className={styles.actions}>

                    <button

                        title="Preview"

                        onClick={() =>

                            onPreview?.(

                                document

                            )

                        }

                    >

                        <Eye size={16} />

                    </button>

                    <button

                        title="Download"

                        onClick={() =>

                            onDownload?.(

                                document

                            )

                        }

                    >

                        <Download size={16} />

                    </button>

                    <button

                        title="Edit"

                        onClick={() =>

                            onEdit?.(

                                document

                            )

                        }

                    >

                        <Pencil size={16} />

                    </button>

                    <button

                        title="Delete"

                        className={styles.delete}

                        onClick={() =>

                            onDelete?.(

                                document

                            )

                        }

                    >

                        <Trash2 size={16} />

                    </button>

                </div>

            </td>

        </tr>

    );

}