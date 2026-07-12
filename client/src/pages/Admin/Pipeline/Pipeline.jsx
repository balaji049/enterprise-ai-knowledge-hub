import { useEffect, useMemo, useState } from "react";

import AdminLayout from "../../../components/admin/AdminLayout";
import PipelineHome from "../../../components/admin/pipeline/PipelineHome";

export default function Pipeline() {

    const [search, setSearch] = useState("");

    const [department, setDepartment] = useState("All");

    const [loading, setLoading] = useState(true);

    const [pipeline, setPipeline] = useState([]);

    useEffect(() => {

        loadPipeline();

    }, []);

    const loadPipeline = () => {

        setLoading(true);

        setTimeout(() => {

            setPipeline([

                {

                    id:1,

                    document:"VPN Policy.pdf",

                    department:"Information Technology",

                    chunks:126,

                    embedding:"Completed",

                    vectorStatus:"Indexed",

                    status:"Ready"

                },

                {

                    id:2,

                    document:"Leave Policy.docx",

                    department:"Human Resources",

                    chunks:84,

                    embedding:"Completed",

                    vectorStatus:"Indexed",

                    status:"Ready"

                },

                {

                    id:3,

                    document:"Finance SOP.pdf",

                    department:"Finance",

                    chunks:102,

                    embedding:"Processing",

                    vectorStatus:"Pending",

                    status:"Processing"

                }

            ]);

            setLoading(false);

        },500);

    };

    const filteredPipeline = useMemo(() => {

        return pipeline.filter(item => {

            const matchesSearch =

                item.document

                    .toLowerCase()

                    .includes(search.toLowerCase());

            const matchesDepartment =

                department === "All" ||

                item.department === department;

            return matchesSearch && matchesDepartment;

        });

    },[pipeline,search,department]);

    const handleReindex = (item) => {

        console.log("Re-index", item);

    };

    const handleRefresh = () => {

        loadPipeline();

    };

    const handleReindexAll = () => {
        console.log("Re-index all documents");
    };

    return(

        <AdminLayout>

            <PipelineHome

                loading={loading}

                pipeline={filteredPipeline}

                search={search}

                department={department}

                onSearch={setSearch}

                onDepartmentChange={setDepartment}

                onRefresh={handleRefresh}

                onReindex={handleReindex}
                onReindexAll={handleReindexAll}

            />

        </AdminLayout>

    );

}