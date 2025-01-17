<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
                
        $sortColumn = request("sortColumn", "created_at");
        $sortDirection = request("sortDirection", "desc");

        $query = Task::query();

        if (request("name")) {
            $query->where("name", "LIKE", "%" . request("name") . "%");
        }

        if (request("status")) {
            $query->where("status", "LIKE", "%" . request("status") . "%");
        }

        $tasks = $query->orderBy($sortColumn, $sortDirection)->paginate(10);

        return Inertia::render("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
