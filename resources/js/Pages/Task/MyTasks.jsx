import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Deferred, Head, Link, router } from "@inertiajs/react";
import TaskTable from "./TaskTable";
import { PlusIcon } from "@heroicons/react/24/outline";

const MyTasks = ({ tasks, queryParams = null, success }) => {
    queryParams = queryParams || {};

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Tasks
                    </h2>
                    <Link
                        href={route("task.create")}
                        className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
                    >
                        <PlusIcon className="w-4 font-bold mr-2" />
                        Add New
                    </Link>
                </div>
            }
        >
            <Head title="Tasks" />
            {success && (
                <div class="fixed top-4 right-4 bg-orange-500 text-white text-sm font-medium px-4 py-3 rounded shadow-lg">
                    <span>{success}</span>
                    <button
                        class="ml-4 text-white hover:text-blue-200"
                        onclick="this.parentElement.remove()"
                    >
                        ✖
                    </button>
                </div>
            )}
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                          <Deferred data="tasks" fallback={<h2>Loading...</h2>}>
                            <TaskTable tasks={tasks} queryParams={queryParams}/>
                          </Deferred>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default MyTasks;
