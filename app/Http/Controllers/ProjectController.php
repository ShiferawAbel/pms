<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectStoreRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $sortColumn = request("sortColumn", "created_at");
        $sortDirection = request("sortDirection", "desc");

        $query = Project::query();

        if (request("name")) {
            $query->where("name", "LIKE", "%" . request("name") . "%");
        }

        if (request("status")) {
            $query->where("status", "LIKE", "%" . request("status") . "%");
        }

        $projects = $query->orderBy($sortColumn, $sortDirection)->paginate(10);

        return Inertia::render("Project/Index", [
            "projects" => ProjectResource::collection($projects),
            "queryParams" => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectStoreRequest $request)
    {
        $data = $request->validated();
        $image = $data['image_path'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        
        if ($image) {
            $data['image_path'] = $image->store('projects-image', 'public');
        }
        Project::create($data);

        return redirect(route('project.index'))->with('success', 'project was created successfully');
    }
    
    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $sortColumn = request("sortColumn", "created_at");
        $sortDirection = request("sortDirection", "desc");
        
        $query = $project->tasks();
        dd($query);
        if (request("name")) {
            $query->where("name", "LIKE", "%" . request("name") . "%");
        }
        
        if (request("status")) {
            $query->where("status", "LIKE", "%" . request("status") . "%");
        }
        
        $tasks = $query->orderBy($sortColumn, $sortDirection)->paginate(10);
        
        return Inertia::render('Project/Show', [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null,
        ]);
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
