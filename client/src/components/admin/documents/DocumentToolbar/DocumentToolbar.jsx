import {

    Search,

    Building2,

    Upload

} from "lucide-react";

import styles from "./DocumentToolbar.module.css";

const departments = [

    "All",

    "Information Technology",

    "Human Resources",

    "Finance",

    "Administration"

];

export default function DocumentToolbar({

    search,

    department,

    onSearch,

    onDepartmentChange,

    onUpload

}) {

    return (

        <div className={styles.toolbar}>

            {/* Search */}

            <div className={styles.searchBox}>

                <Search size={18} />

                <input

                    type="text"

                    placeholder="Search documents..."

                    value={search}

                    onChange={(event)=>

                        onSearch(

                            event.target.value

                        )

                    }

                />

            </div>

            {/* Department */}

            <div className={styles.selectBox}>

                <Building2 size={18} />

                <select

                    value={department}

                    onChange={(event)=>

                        onDepartmentChange(

                            event.target.value

                        )

                    }

                >

                    {

                        departments.map(item=>(

                            <option

                                key={item}

                                value={item}

                            >

                                {item}

                            </option>

                        ))

                    }

                </select>

            </div>

            {/* Upload */}

            <button

                className={styles.uploadButton}

                onClick={onUpload}

            >

                <Upload size={18} />

                Upload Document

            </button>

        </div>

    );

}