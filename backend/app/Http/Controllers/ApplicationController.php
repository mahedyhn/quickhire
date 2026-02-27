<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Job;
use App\Http\Requests\StoreApplicationRequest;
use Illuminate\Http\JsonResponse;

class ApplicationController extends Controller
{
    /**
     * POST /api/applications
     * Submit a job application
     */
    public function store(StoreApplicationRequest $request): JsonResponse
    {
        // Check if job exists
        $job = Job::findOrFail($request->job_id);

        // Check for duplicate application (same email + job)
        $exists = Application::where('job_id', $request->job_id)
            ->where('email', $request->email)
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'You have already applied for this job.',
            ], 422);
        }

        $application = Application::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Application submitted successfully.',
            'data' => $application->load('job'),
        ], 201);
    }

    /**
     * GET /api/jobs/{jobId}/applications
     * Get all applications for a job (Admin)
     */
    public function indexByJob(int $jobId): JsonResponse
    {
        $job = Job::findOrFail($jobId);
        $applications = $job->applications()->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $applications,
            'total' => $applications->count(),
        ]);
    }
}
