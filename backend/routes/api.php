<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ApplicationController;

/*
|--------------------------------------------------------------------------
| API Routes - QuickHire Job Board
|--------------------------------------------------------------------------
|
| IMPORTANT: Meta/static routes MUST come BEFORE wildcard routes so Laravel
| does not match "meta" as the {id} parameter.
|
*/

// ── Job Meta ─────────────────────────────────────────────────────────────────
// These must be declared BEFORE the /{id} wildcard routes
Route::get('/jobs/meta/categories', [JobController::class, 'categories']);
Route::get('/jobs/meta/locations',  [JobController::class, 'locations']);

// ── Jobs CRUD ────────────────────────────────────────────────────────────────
Route::get('/jobs',         [JobController::class, 'index']);    // GET    /api/jobs
Route::post('/jobs',        [JobController::class, 'store']);    // POST   /api/jobs
Route::get('/jobs/{id}',    [JobController::class, 'show']);     // GET    /api/jobs/{id}
Route::delete('/jobs/{id}', [JobController::class, 'destroy']); // DELETE /api/jobs/{id}

// ── Applications ─────────────────────────────────────────────────────────────
Route::post('/applications',             [ApplicationController::class, 'store']);      // POST /api/applications
Route::get('/jobs/{jobId}/applications', [ApplicationController::class, 'indexByJob']); // GET  /api/jobs/{jobId}/applications
