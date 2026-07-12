import { motion } from "framer-motion";

import PipelineStats from "../PipelineStats";
import PipelineToolbar from "../PipelineToolbar";
import PipelineTable from "../PipelineTable";
import EmptyPipeline from "../EmptyPipeline";

import styles from "./PipelineHome.module.css";

const container = {

    hidden: {},

    show: {

        transition: {

            staggerChildren: .08

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

            duration: .4

        }

    }

};

export default function PipelineHome({

    pipeline,

    loading,

    search,

    department,

    onSearch,

    onDepartmentChange,

    onRefresh,

    onReindex,
    onReindexAll

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

                        Knowledge Pipeline

                    </h1>

                    <p>

                        Monitor document indexing and embedding status.

                    </p>

                </div>

            </motion.div>

            {/* Stats */}

            <motion.div variants={item}>

                <PipelineStats

                    pipeline={pipeline}

                />

            </motion.div>

            {/* Toolbar */}

            <motion.div variants={item}>

                <PipelineToolbar

                    search={search}

                    department={department}

                    onSearch={onSearch}

                    onDepartmentChange={onDepartmentChange}

                    onRefresh={onRefresh}

                    onReindexAll={onReindexAll}

                />

            </motion.div>

            {/* Table */}

            <motion.div variants={item}>

                {

                    pipeline.length > 0

                        ?

                        <PipelineTable

                            pipeline={pipeline}

                            loading={loading}

                            onView={(item)=>console.log(item)}

                            onReindex={onReindex}

                        />

                        :

                        <EmptyPipeline

    onRefresh={onRefresh}

/>

                }

            </motion.div>

        </motion.div>

    );

}