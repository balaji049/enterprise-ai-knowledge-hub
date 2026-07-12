import PipelineRow from "../PipelineRow";
import EmptyPipeline from "../EmptyPipeline";

import styles from "./PipelineTable.module.css";

export default function PipelineTable({

    pipeline = [],

    loading = false,

    onView,
    onReindex

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

    if (pipeline.length === 0) {

        return (

            <EmptyPipeline />

        );

    }

    return (

        <div className={styles.wrapper}>

            <table className={styles.table}>

                <thead>

                    <tr>

                        <th>Document</th>

                        <th>Department</th>

                        <th>Chunks</th>

                        <th>Embedding</th>

                        <th>Vector DB</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        pipeline.map(item => (

                            <PipelineRow

                                key={item.id}

                                item={item}

                                onView={onView}

                                onReindex={onReindex}

                            />

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}