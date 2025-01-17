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

const Create = () => {
    const { data, setData, post, errors } = useForm({
        image_path: "",
        name: "",
        status: "",
        description: "",
        due_date: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("project.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Add New Project
                </h2>
            }
        >
            <Head title="Add New Project" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <Link
                                href={route("project.index")}
                                className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-600 dark:text-gray-200  dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
                            >
                                <ArrowLeftIcon className="w-4 font-bold mr-2" />
                                Back
                            </Link>
                            <form
                                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm-rounded-lg"
                                onSubmit={(e) => onSubmit(e)}
                            >
                                {/* Project Image */}
                                <div>
                                    <InputLabel
                                        htmlFor="image_path"
                                        value="Project Image"
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

                                {/* Project Name */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        name="name"
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

                                {/* Project Status */}
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="status"
                                        value="Status"
                                    />
                                    <SelectInput name="status" value={data.status} onChange={e => setData('status', e.target.value)} className="w-full">
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

                                {/* Project Description */}
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

                                {/* Project Due Date */}
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
                                        Save Project
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

export default Create;
