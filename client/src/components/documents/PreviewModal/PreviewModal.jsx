import { motion, AnimatePresence } from "framer-motion";

import {
    X,
    FileText,
    Download,
    Calendar,
    User,
    Building2,
    Tag
} from "lucide-react";

import styles from "./PreviewModal.module.css";

export default function PreviewModal({

    document,

    onClose,

    onDownload

}) {

    if (!document) return null;

    return (

        <AnimatePresence>

            <motion.div

                className={styles.overlay}

                initial={{ opacity: 0 }}

                animate={{ opacity: 1 }}

                exit={{ opacity: 0 }}

                onClick={onClose}

            >

                <motion.div

                    className={styles.modal}

                    initial={{

                        scale: .9,

                        opacity: 0

                    }}

                    animate={{

                        scale: 1,

                        opacity: 1

                    }}

                    exit={{

                        scale: .95,

                        opacity: 0

                    }}

                    transition={{

                        duration: .25

                    }}

                    onClick={(e)=>e.stopPropagation()}

                >

                    {/* Header */}

                    <div className={styles.header}>

                        <div className={styles.title}>

                            <FileText size={24}/>

                            <div>

                                <h2>

                                    {document.title}

                                </h2>

                                <span>

                                    {document.fileType}

                                </span>

                            </div>

                        </div>

                        <button

                            onClick={onClose}

                        >

                            <X size={22}/>

                        </button>

                    </div>

                    {/* Preview */}

                    <div className={styles.preview}>

                        <div className={styles.placeholder}>

                            <FileText size={80}/>

                            <h3>

                                Preview Coming Soon

                            </h3>

                            <p>

                                PDF, DOCX, PPT and Excel preview will be enabled after backend integration.

                            </p>

                        </div>

                    </div>

                    {/* Metadata */}

                    <div className={styles.infoGrid}>

                        <div>

                            <Building2 size={16}/>

                            <span>

                                {document.department}

                            </span>

                        </div>

                        <div>

                            <Tag size={16}/>

                            <span>

                                {document.category}

                            </span>

                        </div>

                        <div>

                            <User size={16}/>

                            <span>

                                {document.uploadedBy}

                            </span>

                        </div>

                        <div>

                            <Calendar size={16}/>

                            <span>

                                {document.uploadedAt}

                            </span>

                        </div>

                    </div>

                    {/* Footer */}

                    <div className={styles.footer}>

                        <button

                            className={styles.download}

                            onClick={()=>

                                onDownload?.(document)

                            }

                        >

                            <Download size={18}/>

                            Download

                        </button>

                    </div>

                </motion.div>

            </motion.div>

        </AnimatePresence>

    );

}