import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    ArrowLeftCircleIcon,
    ArrowLeftIcon,
    ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

const Edit = ({ projects, users, task }) => {
    task = task.data;
    const projectsList = projects.data;
    console.log(task);
    const usersList = users.data;
    const { data, setData, post, errors } = useForm({
        image_path: "",
        name: task.name || "",
        status: task.status || "",
        priority: task.priority || "",
        description: task.description || "",
        assigned_user_id: task.assigned_user.id || "",
        project_id: task.project ? task.project.id : "",
        due_date: task.due_date || "",
        _method: 'PUT',
    });
    const onSubmit = (e) => {
        e.preventDefault();

        post(route("task.update", task.id), { _method: 'PUT' });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Add New Task
                </h2>
            }
        >
            <Head title="Add New Task" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <Link
                                href={route("task.index")}
                                className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-600 dark:text-gray-200  dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
                            >
                                <ArrowLeftIcon className="w-4 font-bold mr-2" />
                                Back
                            </Link>
                            <form
                                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm-rounded-lg"
                                onSubmit={(e) => onSubmit(e)}
                            >
                                {/* Task Image */}
                                <div>
                                    <div>
                                        <img
                                            src={task.image_path}
                                            className="w-[70px]"
                                            alt=""
                                        />
                                    </div>
                                    <InputLabel
                                        htmlFor="image_path"
                                        value="Task Image"
                                    />
                                    <TextInput
                                        type="file"
                                        id="image_path"
                                        name="image_path"
                                        onChange={(e) =>
                                            setData(
                                                "image_path",
                                                e.target.files[0]
                                            )
                                        }
                                        className="mt-1 block w-full"
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.image_path}
                                    />
                                </div>

                                {/* Task Name */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        name="name"
                                        placeholder="Name"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="mt-1 block w-full"
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                {/* Task Status */}
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="status"
                                        value="Status"
                                    />
                                    <SelectInput
                                        name="status"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        className="w-full"
                                    >
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">
                                            In Progress
                                        </option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                    </SelectInput>
                                    <InputError
                                        className="mt-2"
                                        message={errors.status}
                                    />
                                </div>

                                {/* Task Priority */}
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="prioriy"
                                        value="Prioriy"
                                    />
                                    <SelectInput
                                        name="priority"
                                        value={data.priority}
                                        onChange={(e) =>
                                            setData("priority", e.target.value)
                                        }
                                        className="w-full"
                                    >
                                        <option value="">
                                            Select Priority
                                        </option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </SelectInput>
                                    <InputError
                                        className="mt-2"
                                        message={errors.priority}
                                    />
                                </div>

                                {/* Task Project */}
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="project"
                                        value="Project"
                                    />
                                    <SelectInput
                                        name="project"
                                        value={data.project_id}
                                        onChange={(e) =>
                                            setData(
                                                "project_id",
                                                e.target.value
                                            )
                                        }
                                        className="w-full"
                                    >
                                        <option value="">Select Project</option>
                                        {projectsList.map((project) => (
                                            <option value={project.id}>
                                                {" "}
                                                {project.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    <InputError
                                        className="mt-2"
                                        message={errors.project_id}
                                    />
                                </div>

                                {/* Task User */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="user" value="User" />
                                    <SelectInput
                                        name="user"
                                        value={data.assigned_user_id}
                                        onChange={(e) =>
                                            setData(
                                                "assigned_user_id",
                                                e.target.value
                                            )
                                        }
                                        className="w-full"
                                    >
                                        <option value="">Assign User</option>
                                        {usersList.map((user) => (
                                            <option value={user.id}>
                                                {" "}
                                                {user.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    <InputError
                                        className="mt-2"
                                        message={errors.assigned_user_id}
                                    />
                                </div>

                                {/* Task Description */}
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="description"
                                        value="Description"
                                    />
                                    <TextAreaInput
                                        type="text"
                                        id="description"
                                        value={data.description}
                                        name="description"
                                        placeholder="Description"
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full"
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.description}
                                    />
                                </div>

                                {/* Task Due Date */}
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="due_date"
                                        value="Due Date"
                                    />
                                    <TextInput
                                        type="date"
                                        id="due_date"
                                        value={data.due_date}
                                        name="due_date"
                                        onChange={(e) =>
                                            setData("due_date", e.target.value)
                                        }
                                        className="mt-1 block w-full"
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.due_date}
                                    />
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Save Task
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
