<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Http\Requests\StoreJobRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class JobController extends Controller
{
    /**
     * GET /api/jobs
     * List all jobs with optional search/filter
     */
    public function index(Request $request): JsonResponse
    {
        $query = Job::query();

        // Search by title or company
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('company', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by category
        if ($request->has('category') && $request->category) {
            $query->where('category', $request->category);
        }

        // Filter by location
        if ($request->has('location') && $request->location) {
            $query->where('location', 'like', "%{$request->location}%");
        }

        // Filter by type
        if ($request->has('type') && $request->type) {
            $query->where('type', $request->type);
        }

        $jobs = $query->withCount('applications')->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $jobs,
            'total' => $jobs->count(),
        ]);
    }

    /**
     * GET /api/jobs/{id}
     * Get single job details
     */
    public function show(int $id): JsonResponse
    {
        $job = Job::withCount('applications')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $job,
        ]);
    }

    /**
     * POST /api/jobs
     * Create a new job (Admin)
     */
    public function store(StoreJobRequest $request): JsonResponse
    {
        $job = Job::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Job created successfully.',
            'data' => $job,
        ], 201);
    }

    /**
     * DELETE /api/jobs/{id}
     * Delete a job (Admin)
     */
    public function destroy(int $id): JsonResponse
    {
        $job = Job::findOrFail($id);
        $job->delete();

        return response()->json([
            'success' => true,
            'message' => 'Job deleted successfully.',
        ]);
    }

    /**
     * GET /api/jobs/meta/categories
     * Get all distinct categories
     */
    public function categories(): JsonResponse
    {
        $categories = Job::distinct()->pluck('category')->filter()->values();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }

    /**
     * GET /api/jobs/meta/locations
     * Get all distinct locations
     */
    public function locations(): JsonResponse
    {
        $locations = Job::distinct()->pluck('location')->filter()->values();

        return response()->json([
            'success' => true,
            'data' => $locations,
        ]);
    }
}
