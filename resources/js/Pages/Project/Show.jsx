import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP,
} from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import TaskTable from "../Task/TaskTable";

const Index = ({ project, tasks, queryParams = null }) => {
    queryParams = queryParams || {};
    const selectedProject = project.data;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {`Project "${selectedProject.name}"`}
                </h2>
            }
        >
            <Head title={`Project ${selectedProject.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid grid-cols-3">
                                <img
                                    src={selectedProject.image_path}
                                    className="h-full"
                                    alt=""
                                />
                                <div className="pl-4">
                                    <div>
                                        <label className="dark:text-gray-100 font-bold">
                                            {" "}
                                            Project Id:{" "}
                                        </label>
                                        <p className="dark:text-gray-300 ml-3 mt-1">
                                            {" "}
                                            {selectedProject.id}{" "}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="dark:text-gray-100 font-bold">
                                            {" "}
                                            Project Name:{" "}
                                        </label>
                                        <p className="dark:text-gray-300 ml-3 mt-1">
                                            {" "}
                                            {selectedProject.name}{" "}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="dark:text-gray-100 font-bold">
                                            {" "}
                                            Created By:{" "}
                                        </label>
                                        <p className="dark:text-gray-300 ml-3 mt-1">
                                            {" "}
                                            {
                                                selectedProject.created_by.name
                                            }{" "}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="dark:text-gray-100 font-bold">
                                            {" "}
                                            Project Status:{" "}
                                        </label>
                                        <p className="ml-3 mt-1">
                                            <span
                                                className={
                                                    "px-2 py-1 text-white rounded " +
                                                    PROJECT_STATUS_CLASS_MAP[
                                                        selectedProject.status
                                                    ]
                                                }
                                            >
                                                {
                                                    PROJECT_STATUS_TEXT_MAP[
                                                        selectedProject.status
                                                    ]
                                                }
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="pl-5">
                                    <div>
                                        <label className="dark:text-gray-100 font-bold">
                                            {" "}
                                            Project Created At:{" "}
                                        </label>
                                        <p className="dark:text-gray-300 ml-3 mt-1">
                                            {" "}
                                            {selectedProject.created_at}{" "}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="dark:text-gray-100 font-bold">
                                            {" "}
                                            Project Due Date:{" "}
                                        </label>
                                        <p className="dark:text-gray-300 ml-3 mt-1">
                                            {" "}
                                            {selectedProject.due_date}{" "}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="dark:text-gray-100 font-bold">
                                            {" "}
                                            Updated By:{" "}
                                        </label>
                                        <p className="dark:text-gray-300 ml-3 mt-1">
                                            {" "}
                                            {
                                                selectedProject.updated_by.name
                                            }{" "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 p-10">
                                <label className="dark:text-gray-100 font-bold">
                                    {" "}
                                    Project Desctiption:{" "}
                                </label>
                                <p className="dark:text-gray-300 mt-1">
                                    {" "}
                                    {selectedProject.description}{" "}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                          <TaskTable tasks={tasks} queryParams={queryParams}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
