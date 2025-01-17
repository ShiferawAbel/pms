import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Deferred, Head, Link, router } from "@inertiajs/react";
import TaskTable from "./TaskTable";

const Index = ({ tasks, queryParams = null }) => {
    queryParams = queryParams || {};

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Tasks
                </h2>
            }
        >
            <Head title="Tasks" />

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

export default Index;
