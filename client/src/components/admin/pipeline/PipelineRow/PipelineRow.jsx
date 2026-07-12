import {

    FileText,

    RotateCcw,

    Eye

} from "lucide-react";

import styles from "./PipelineRow.module.css";

export default function PipelineRow({

    item,

    onView,

    onReindex

}) {

    return (

        <tr>

            {/* Document */}

            <td>

                <div className={styles.document}>

                    <div className={styles.icon}>

                        <FileText size={18} />

                    </div>

                    <span>

                        {item.document}

                    </span>

                </div>

            </td>

            {/* Department */}

            <td>

                {item.department}

            </td>

            {/* Chunks */}

            <td>

                {item.chunks}

            </td>

            {/* Embedding */}

            <td>

                <span

                    className={`${styles.badge} ${
                        item.embedding === "Completed"

                            ? styles.success

                            : styles.processing
                    }`}

                >

                    {item.embedding}

                </span>

            </td>

            {/* Vector DB */}

            <td>

                <span

                    className={`${styles.badge} ${
                        item.vectorStatus === "Indexed"

                            ? styles.success

                            : styles.processing
                    }`}

                >

                    {item.vectorStatus}

                </span>

            </td>

            {/* Pipeline Status */}

            <td>

                <span

                    className={`${styles.badge} ${
                        item.status === "Ready"

                            ? styles.success

                            : styles.processing
                    }`}

                >

                    {item.status}

                </span>

            </td>

            {/* Actions */}

            <td>

                <div className={styles.actions}>

                    <button

                        title="View"

                        onClick={()=>

                            onView?.(item)

                        }

                    >

                        <Eye size={16}/>

                    </button>

                    <button

                        title="Re-index"

                        className={styles.primary}

                        onClick={()=>

                            onReindex?.(item)

                        }

                    >

                        <RotateCcw size={16}/>

                    </button>

                </div>

            </td>

        </tr>

    );

}