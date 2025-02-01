import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import TableHeading from "@/Components/TableHeading";
import { Link, router } from "@inertiajs/react";

const TaskTable = ({ tasks, queryParams }) => {
    const searchFieldChanged = (column, filter) => {
        if (filter) {
            queryParams[column] = filter;
        } else {
            delete queryParams[column];
        }

        router.get(route("task.index", queryParams));
    };

    console.log(tasks);

    const onKeyDown = (column, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(column, e.target.value);
    };

    const sortChanged = (column) => {
        if (queryParams.sortColumn === column) {
            queryParams.sortDirection =
                queryParams.sortDirection === "asc" ? "desc" : "asc";
        } else {
            queryParams.sortColumn = column;
            queryParams.sortDirection = "asc";
        }

        router.get(route("task.index", queryParams, { only: ["tasks"] }));
    };

    const deleteTask = (task) => {
        if (
            !window.confirm(
                `Are you sure you want task "${task.name}" deleted?`
            )
        ) {
            return;
        }

        router.delete(route("task.destroy", task.id));
    };
    return (
        <div className="overflow-auto">
            <table className="w-full text-sm text-left rtl:left-right text-gray-500 dark:text-gray-400 overflow-auto">
                <thead className="text-x text-gray-300 uppercase bg-gray-50 dark:bg-gray-700 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                        <TableHeading
                            name={"id"}
                            sortChanged={sortChanged}
                            sortDirection={queryParams.sortDirection}
                            sortColumn={queryParams.sortColumn}
                        >
                            ID
                        </TableHeading>
                        <th className="px-3 py-2">IMAGE</th>
                        <TableHeading
                            name={"name"}
                            sortChanged={sortChanged}
                            sortDirection={queryParams.sortDirection}
                            sortColumn={queryParams.sortColumn}
                        >
                            NAME
                        </TableHeading>
                        <th className="px-3 py-2">PROJECT NAME</th>
                        <TableHeading
                            name={"status"}
                            sortChanged={sortChanged}
                            sortDirection={queryParams.sortDirection}
                            sortColumn={queryParams.sortColumn}
                        >
                            STATUS
                        </TableHeading>
                        <TableHeading
                            name={"created_at"}
                            sortChanged={sortChanged}
                            sortDirection={queryParams.sortDirection}
                            sortColumn={queryParams.sortColumn}
                        >
                            CREATE DATE
                        </TableHeading>
                        <TableHeading
                            name={"due_date"}
                            sortChanged={sortChanged}
                            sortDirection={queryParams.sortDirection}
                            sortColumn={queryParams.sortColumn}
                        >
                            DUE DATE
                        </TableHeading>
                        <th className="px-3 py-2">CREATED BY</th>
                        <th className="px-3 py-2">ACTIONS</th>
                    </tr>
                </thead>
                <thead className="text-x text-gray-300 uppercase bg-gray-50 dark:bg-gray-700 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                        <th className="px-3 py-2"></th>
                        <th className="px-3 py-2"></th>
                        <th className="px-3 py-2">
                            <TextInput
                                defaultValue={queryParams.name}
                                className="w-full"
                                placeHolder="Search Names"
                                onBlur={(e) =>
                                    searchFieldChanged("name", e.target.value)
                                }
                                onKeyDown={(e) => onKeyDown("name", e)}
                            />
                        </th>
                        <th className="px-3 py-2">
                            <SelectInput
                                defaultValue={queryParams.status}
                                className="w-full"
                                onChange={(e) =>
                                    searchFieldChanged("status", e.target.value)
                                }
                            >
                                <option value="">Filter Status</option>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </SelectInput>
                        </th>
                        <th className="px-3 py-2"></th>
                        <th className="px-3 py-2"></th>
                        <th className="px-3 py-2"></th>
                        <th className="px-3 py-2"></th>
                        <th className="px-3 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.data.map((task) => (
                        <tr
                            key={task.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-400"
                        >
                            <td className="px-3 py-2">{task.id}</td>
                            <td className="px-3 py-2">
                                <img
                                    style={{ width: 60 }}
                                    src={task.image_path}
                                    alt=""
                                />{" "}
                            </td>
                            <td className="px-3 py-2">{task.name}</td>
                            <td className="px-3 py-2">
                                {task.project
                                    ? task.project.name
                                    : "Not assigned to a project"}
                            </td>
                            <td className="px-3 py-2 ">
                                <span
                                    className={
                                        "px-2 py-1 text-white rounded " +
                                        TASK_STATUS_CLASS_MAP[task.status]
                                    }
                                >
                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                </span>
                            </td>
                            <td className="px-3 py-2 text-nowrap">
                                {task.created_at}
                            </td>
                            <td className="px-3 py-2 text-nowrap">
                                {task.due_date}
                            </td>
                            <td className="px-3 py-2">{task.created_by}</td>
                            <td className="px-3 py-2">
                                <Link
                                    href={route("task.edit", task.id)}
                                    className="font-medium mx-1 hover:text-blue-500 dark:text-blue-400 text-blue-500"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={(e) => deleteTask(task)}
                                    className="font-medium mx-1 hover:text-red-500 dark:text-red-400 text-red-500"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination links={tasks.meta.links} />
        </div>
    );
};

export default TaskTable;
