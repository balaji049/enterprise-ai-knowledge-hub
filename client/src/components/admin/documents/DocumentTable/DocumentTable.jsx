import DocumentRow from "../DocumentRow";
import EmptyDocuments from "../EmptyDocuments";

import styles from "./DocumentTable.module.css";

export default function DocumentTable({

    documents = [],

    loading = false,

    onEdit,

    onDelete

}) {

    if (loading) {

        return (

            <div className={styles.wrapper}>

                {

                    Array.from({ length: 5 }).map((_, index) => (

                        <div

                            key={index}

                            className={styles.skeleton}

                        />

                    ))

                }

            </div>

        );

    }

    if (documents.length === 0) {

        return (

            <EmptyDocuments />

        );

    }

    return (

        <div className={styles.wrapper}>

            <table className={styles.table}>

                <thead>

                    <tr>

                        <th>Document</th>

                        <th>Department</th>

                        <th>Type</th>

                        <th>Uploaded By</th>

                        <th>Date</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        documents.map(document => (

                            <DocumentRow

                                key={document._id}

                                document={document}

                                onEdit={onEdit}

                                onDelete={onDelete}

                            />

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}