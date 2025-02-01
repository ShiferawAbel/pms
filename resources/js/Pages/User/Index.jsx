import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import { PlusIcon } from "@heroicons/react/24/outline";

const Index = ({ users, queryParams = null, success }) => {
    queryParams = queryParams || {};
    const usersList = users.data;

    const searchFieldChanged = (column, filter) => {
        if (filter) {
            queryParams[column] = filter;
        } else {
            delete queryParams[column];
        }

        router.get(route("user.index", queryParams));
    };

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

        router.get(route("user.index", queryParams));
    };

    const deleteUser = (user) => {
        if (
            !window.confirm(
                `Are you sure you want user "${user.name}" deleted?`
            )
        ) {
            return;
        }

        router.delete(route("user.destroy", user.id));
    };
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Users
                    </h2>
                    <Link
                        href={route("user.create")}
                        className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
                    >
                        <PlusIcon className="w-4 font-bold mr-2" />
                        Add New
                    </Link>
                </div>
            }
        >
            <Head title="Users" />
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
                            <table className="w-full text-sm text-left rtl:left-right text-gray-500 dark:text-gray-400">
                                <thead className="text-x text-gray-300 uppercase bg-gray-50 dark:bg-gray-700 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <TableHeading
                                            name={"id"}
                                            sortChanged={sortChanged}
                                            sortDirection={
                                                queryParams.sortDirection
                                            }
                                            sortColumn={queryParams.sortColumn}
                                        >
                                            ID
                                        </TableHeading>
                                        <TableHeading
                                            name={"name"}
                                            sortChanged={sortChanged}
                                            sortDirection={
                                                queryParams.sortDirection
                                            }
                                            sortColumn={queryParams.sortColumn}
                                        >
                                            NAME
                                        </TableHeading>
                                        <TableHeading
                                            name={"status"}
                                            sortChanged={sortChanged}
                                            sortDirection={
                                                queryParams.sortDirection
                                            }
                                            sortColumn={queryParams.sortColumn}
                                        >
                                            Email
                                        </TableHeading>
                                        <TableHeading
                                            name={"created_at"}
                                            sortChanged={sortChanged}
                                            sortDirection={
                                                queryParams.sortDirection
                                            }
                                            sortColumn={queryParams.sortColumn}
                                        >
                                            CREATE DATE
                                        </TableHeading>
                                        <th className="px-3 py-2">ACTIONS</th>
                                    </tr>
                                </thead>
                                <thead className="text-x text-gray-300 uppercase bg-gray-50 dark:bg-gray-700 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2">
                                            <TextInput
                                                defaultValue={queryParams.name}
                                                className="w-full"
                                                placeHolder="Search Names"
                                                onBlur={(e) =>
                                                    searchFieldChanged(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                onKeyDown={(e) =>
                                                    onKeyDown("name", e)
                                                }
                                            />
                                        </th>
                                        <th className="px-3 py-2">
                                        <TextInput
                                                defaultValue={queryParams.email}
                                                className="w-full"
                                                placeHolder="Search Names"
                                                onBlur={(e) =>
                                                    searchFieldChanged(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                onKeyDown={(e) =>
                                                    onKeyDown("name", e)
                                                }
                                            />
                                        </th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersList.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-400"
                                        >
                                            <td className="px-3 py-2">
                                                {user.id}
                                            </td>
                                            <td className="px-3 py-2">
                                                <Link
                                                    href={route(
                                                        "user.show",
                                                        user
                                                    )}
                                                    className="dark:text-gray-300 hover:underline"
                                                >
                                                    {user.name}
                                                </Link>
                                            </td>
                                            <td className="px-3 py-2 ">
                                                {user.email}
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">
                                                {user.created_at}
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">
                                                <Link
                                                    href={route(
                                                        "user.edit",
                                                        user.id
                                                    )}
                                                    className="font-medium mx-1 hover:text-blue-500 dark:text-blue-400 text-blue-500"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={(e) =>
                                                        deleteUser(user)
                                                    }
                                                    className="font-medium mx-1 hover:text-red-500 dark:text-red-400 text-red-500"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={users.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
