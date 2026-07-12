import {
    Search,
    Building2,
    Shield,
    Plus
} from "lucide-react";

import styles from "./EmployeeToolbar.module.css";

const departments = [

    "All",

    "Information Technology",

    "Human Resources",

    "Finance",

    "Administration"

];

const roles = [

    "All",

    "Admin",

    "Manager",

    "Employee"

];

export default function EmployeeToolbar({

    search,

    department,

    role,

    onSearch,

    onDepartmentChange,

    onRoleChange,

    onAdd

}) {

    return (

        <div className={styles.toolbar}>

            {/* Search */}

            <div className={styles.searchBox}>

                <Search size={18} />

                <input

                    type="text"

                    placeholder="Search employees..."

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

            {/* Role */}

            <div className={styles.selectBox}>

                <Shield size={18} />

                <select

                    value={role}

                    onChange={(event)=>

                        onRoleChange(

                            event.target.value

                        )

                    }

                >

                    {

                        roles.map(item=>(

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

            {/* Add */}

            <button

                className={styles.addButton}

                onClick={onAdd}

            >

                <Plus size={18} />

                Add Employee

            </button>

        </div>

    );

}