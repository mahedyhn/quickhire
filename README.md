### LIVE LINK: https://reliable-rebirth-production-38e7.up.railway.app/
# QuickHire – Simple Job Board Application

A full-stack job board application built with **Next.js 14** (frontend) and **Laravel 11** (backend) as part of the Qtec Solution Limited Associate Software Engineer technical assessment.

---

## 📋 Features

### User-Facing
- **Job Listings Page** – Browse all jobs with live search and sidebar filters
- **Search** – Full-text search by title, company, or keyword
- **Filters** – Filter by category, location, and job type; clear all filters
- **Job Detail Page** – Full job description, requirements, key info summary
- **Apply Now Form** – Submit applications (name, email, resume URL, cover note) with client + server validation
- **Responsive Design** – Fully responsive across mobile, tablet, and desktop
- **Loading Skeletons** – Smooth UX while data loads
- **404 Page** – Custom not-found page

### Admin Panel (`/admin`)
- **Post a Job** – Create new listings (title, company, location, category, type, salary, description, requirements)
- **Delete Jobs** – Remove listings with confirmation
- **View All Listings** – Table with application counts per job

---

## 🏗️ Project Structure

```
quickhire/
├── backend/                          # Laravel 11 API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── JobController.php         # GET/POST/DELETE /api/jobs
│   │   │   │   └── ApplicationController.php  # POST /api/applications
│   │   │   └── Requests/
│   │   │       ├── StoreJobRequest.php        # Job validation rules
│   │   │       └── StoreApplicationRequest.php # Application validation + URL/email checks
│   │   ├── Models/
│   │   │   ├── Job.php
│   │   │   └── Application.php
│   │   └── Providers/
│   │       └── AppServiceProvider.php
│   ├── bootstrap/
│   │   └── app.php                   # Laravel 11 app entry (CORS, JSON error handlers)
│   ├── config/
│   │   ├── app.php
│   │   ├── cors.php                  # CORS settings (allow frontend origin)
│   │   └── database.php              # MySQL / PostgreSQL / SQLite configs
│   ├── database/
│   │   ├── migrations/
│   │   │   ├── ..._create_jobs_table.php
│   │   │   └── ..._create_applications_table.php
│   │   └── seeders/
│   │       ├── DatabaseSeeder.php
│   │       └── JobSeeder.php         # 8 sample job listings
│   ├── public/
│   │   └── index.php                 # Web entry point
│   ├── routes/
│   │   └── api.php                   # All API routes
│   ├── artisan
│   ├── .env.example
│   ├── .gitignore
│   └── composer.json
│
└── frontend/                         # Next.js 14 + TypeScript
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx              # Home page (hero, categories, how-it-works)
    │   │   ├── layout.tsx            # Root layout (Navbar + Footer)
    │   │   ├── globals.css           # Tailwind + custom component classes
    │   │   ├── not-found.tsx         # 404 page
    │   │   ├── jobs/
    │   │   │   ├── page.tsx          # Job listings (search, filters, job cards)
    │   │   │   └── [id]/
    │   │   │       └── page.tsx      # Job detail + Apply Now form
    │   │   └── admin/
    │   │       └── page.tsx          # Admin panel (create/delete jobs, view table)
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── Navbar.tsx        # Sticky nav with mobile hamburger menu
    │   │   │   └── Footer.tsx
    │   │   ├── jobs/
    │   │   │   ├── JobCard.tsx       # Job listing card with time-ago, salary, badges
    │   │   │   └── JobFilters.tsx    # Sidebar filter panel (category, location, type)
    │   │   └── ui/
    │   │       ├── SearchBar.tsx     # Search input with clear button
    │   │       └── Skeleton.tsx      # Loading skeleton components
    │   ├── lib/
    │   │   └── api.ts                # All API calls (jobsApi, applicationsApi)
    │   └── types/
    │       └── index.ts              # TypeScript interfaces (Job, Application, etc.)
    ├── .env.local.example
    ├── .gitignore
    ├── next.config.js
    ├── package.json
    ├── tailwind.config.js
    └── tsconfig.json
```

---

## ⚙️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | Next.js 14, TypeScript, Tailwind CSS |
| Backend   | Laravel 11, PHP 8.2+                |
| Database  | MySQL (PostgreSQL / SQLite also supported) |
| API Style | RESTful JSON API                    |

---

## 🚀 Getting Started

### Prerequisites

- **PHP** 8.2+
- **Composer** 2+
- **Node.js** 18+ and **npm**
- **MySQL** 8+ (or PostgreSQL / SQLite)

---

### Backend Setup (Laravel 11)

```bash
# 1. Navigate to backend
cd backend

# 2. Install PHP dependencies
composer install

# 3. Copy environment file
cp .env.example .env

# 4. Generate application key
php artisan key:generate

# 5. Configure your database in .env:
#    DB_CONNECTION=mysql
#    DB_DATABASE=quickhire
#    DB_USERNAME=root
#    DB_PASSWORD=your_password
#
#    Or for SQLite (zero config):
#    DB_CONNECTION=sqlite
#    DB_DATABASE=/absolute/path/to/database.sqlite

# 6. Run migrations
php artisan migrate

# 7. Seed sample job data (8 jobs pre-loaded)
php artisan db:seed

# 8. Start the development server
php artisan serve
# ✅ API running at http://localhost:8000
```

---

### Frontend Setup (Next.js 14)

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install Node dependencies
npm install

# 3. Configure environment
cp .env.local.example .env.local
# .env.local already points to http://localhost:8000/api by default

# 4. Start development server
npm run dev
# ✅ App running at http://localhost:3000
```

---

## 🔌 API Endpoints

### Jobs

| Method   | Endpoint                      | Description                          |
|----------|-------------------------------|--------------------------------------|
| `GET`    | `/api/jobs`                   | List all jobs (supports query params)|
| `GET`    | `/api/jobs/{id}`              | Get single job details               |
| `POST`   | `/api/jobs`                   | Create a job (Admin)                 |
| `DELETE` | `/api/jobs/{id}`              | Delete a job (Admin)                 |
| `GET`    | `/api/jobs/meta/categories`   | Get all distinct categories          |
| `GET`    | `/api/jobs/meta/locations`    | Get all distinct locations           |

**Query parameters for `GET /api/jobs`:**
- `search` – search title, company, description
- `category` – exact category match
- `location` – partial location match
- `type` – exact type match (Full-time, Part-time, Remote, Contract, Internship)

### Applications

| Method | Endpoint                          | Description                   |
|--------|-----------------------------------|-------------------------------|
| `POST` | `/api/applications`               | Submit a job application      |
| `GET`  | `/api/jobs/{jobId}/applications`  | List applications for a job   |

### Example Payloads

**POST `/api/jobs`**
```json
{
  "title": "Senior Frontend Developer",
  "company": "TechCorp Solutions",
  "location": "Dhaka, Bangladesh",
  "category": "Engineering",
  "type": "Full-time",
  "salary": "$60,000 - $80,000",
  "description": "We are looking for an experienced developer...",
  "requirements": "5+ years React experience...",
  "logo": "https://example.com/logo.png"
}
```

**POST `/api/applications`**
```json
{
  "job_id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "resume_link": "https://drive.google.com/file/your-resume",
  "cover_note": "I am excited to apply for this role..."
}
```

**Consistent API response format:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Job created successfully.",
  "total": 8
}
```

---

## 🗄️ Database Schema

### `jobs` table
| Column        | Type                                                        | Notes      |
|---------------|-------------------------------------------------------------|------------|
| `id`          | bigint unsigned                                             | PK         |
| `title`       | varchar(255)                                                | required   |
| `company`     | varchar(255)                                                | required   |
| `location`    | varchar(255)                                                | required   |
| `category`    | varchar(100)                                                | required   |
| `type`        | enum(Full-time, Part-time, Remote, Contract, Internship)    | required   |
| `salary`      | varchar(100)                                                | nullable   |
| `description` | text                                                        | required   |
| `requirements`| text                                                        | nullable   |
| `logo`        | varchar(500)                                                | nullable   |
| `created_at`  | timestamp                                                   |            |
| `updated_at`  | timestamp                                                   |            |

### `applications` table
| Column        | Type             | Notes                              |
|---------------|------------------|------------------------------------|
| `id`          | bigint unsigned  | PK                                 |
| `job_id`      | bigint unsigned  | FK → jobs.id (cascade delete)      |
| `name`        | varchar(255)     | required                           |
| `email`       | varchar(255)     | required, valid email format       |
| `resume_link` | varchar(500)     | required, valid URL                |
| `cover_note`  | text             | nullable                           |
| `created_at`  | timestamp        |                                    |
| `updated_at`  | timestamp        |                                    |

> Unique constraint on `(job_id, email)` prevents duplicate applications.

---

## ✅ Validation Rules

### Job creation
| Field         | Rules                                                   |
|---------------|---------------------------------------------------------|
| `title`       | required, string, max 255                               |
| `company`     | required, string, max 255                               |
| `location`    | required, string, max 255                               |
| `category`    | required, string, max 100                               |
| `type`        | required, one of: Full-time/Part-time/Remote/Contract/Internship |
| `description` | required, string                                        |
| `salary`      | optional, string                                        |
| `requirements`| optional, string                                        |
| `logo`        | optional, string (URL)                                  |

### Application submission
| Field         | Rules                              |
|---------------|------------------------------------|
| `job_id`      | required, integer, must exist      |
| `name`        | required, string, max 255          |
| `email`       | required, valid email format       |
| `resume_link` | required, valid URL format         |
| `cover_note`  | optional, string, max 2000         |

---

## 🌍 Environment Variables

### Backend `.env`
```env
APP_NAME=QuickHire
APP_ENV=local
APP_KEY=                          # Generated by: php artisan key:generate
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_DATABASE=quickhire
DB_USERNAME=root
DB_PASSWORD=

FRONTEND_URL=http://localhost:3000  # Used for CORS
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## 🚢 Deployment Guide

### Frontend → Vercel
```bash
npm i -g vercel
cd frontend && vercel

# In Vercel dashboard, set:
# NEXT_PUBLIC_API_URL = https://your-backend-url.com/api
```

### Backend → Railway / Render
1. Push `backend/` to a GitHub repo
2. Connect to Railway or Render
3. Set all environment variables from `.env.example`
4. Build command: `composer install --no-dev && php artisan migrate --force && php artisan db:seed --force`
5. Start command: `php artisan serve --host=0.0.0.0 --port=$PORT`

---

## 🎁 Bonus Features Implemented

- ✅ Loading skeleton UI (smooth perceived performance)
- ✅ Duplicate application prevention (unique `job_id + email` constraint)
- ✅ Applications count displayed on job cards and detail page
- ✅ Mobile-responsive with hamburger menu and collapsible filters
- ✅ Filter by job type via radio buttons with clear option
- ✅ Try Again button on API connection errors
- ✅ Environment-based API URL configuration
- ✅ Consistent JSON API response format (`success`, `data`, `message`, `total`)
- ✅ Custom 404 page
- ✅ TypeScript throughout the entire frontend
- ✅ Clean API response formatting with proper HTTP status codes

---

*Built for Qtec Solution Limited – Associate Software Engineer Technical Assessment*
