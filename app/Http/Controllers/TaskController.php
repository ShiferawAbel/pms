<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskStoreRequest;
use App\Http\Requests\TaskUpdateRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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

        $tasks = $query->orderBy($sortColumn, $sortDirection)->paginate(30);

        return Inertia::render("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    public function myTasks()
    {
        $sortColumn = request("sortColumn", "created_at");
        $sortDirection = request("sortDirection", "desc");

        $query = Task::where('assigned_user_id', Auth::id());
        if (request("name")) {
            $query->where("name", "LIKE", "%" . request("name") . "%");
        }
        
        if (request("status")) {
            $query->where("status", "LIKE", "%" . request("status") . "%");
        }
        
        $tasks = $query->orderBy($sortColumn, $sortDirection)->paginate(30);

        return Inertia::render("Task/MyTasks", [
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::orderBy('name', 'asc')->get();
        $users = User::all();
        return inertia('Task/Create', [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(TaskStoreRequest $request)
    {
        $data = $request->validated();
        $image = $data['image_path'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        
        if ($image) {
            $data['image_path'] = $image->store('tasks-image', 'public');
        }
        Task::create($data);

        return redirect(route('task.index'))->with('success', 'task was created successfully');
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
    public function edit(Task $task)
    {
        $projects = Project::orderBy('name', 'asc')->get();
        $users = User::all();
        return inertia('Task/Edit', [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TaskUpdateRequest $request, Task $task)
    {
        $data = $request->validated();
        $image = $data['image_path'] ?? null;
        $data['updated_by'] = Auth::id();
        
        if ($image) {
            if ($task->image_path && substr($task->image_path, 0, 7) == "task") {
                if (Storage::disk('public')->exists($task->image_path)) {
                    Storage::disk('public')->delete($task->image_path);
                }
            }
            $data['image_path'] = $image->store('tasks-image', 'public');
        }

        
        $task->update($data);

        return to_route('task.index')->with('success', 'Task "' . $task->name . '" has been deleted successfully');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;

        if ($task->image_path && substr($task->image_path, 0, 7) == "task") {
            if (Storage::disk('public')->exists($task->image_path)) {
                Storage::disk('public')->delete($task->image_path);
            }
        }

        $task->delete();

        return to_route('task.index')->with('success', 'Task "' . $name . '" has been deleted successfully');
    }
}
