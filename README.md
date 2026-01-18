
# BlogApp

A modern blog application built with **Laravel** (backend) and **React** (frontend) featuring a fast and flexible search functionality using **Laravel Scout** and **Meilisearch**.  

> ⚠️ **Note:** This project is currently under development.

---

## Features

- User authentication (register/login)
- Create, edit, and delete blog posts
- Search blog posts using Laravel Scout & Meilisearch
- Responsive and interactive frontend built with React
- Fully modular and extendable

---

## Tech Stack

- **Backend:** Laravel 10
- **Frontend:** React 18
- **Search:** Laravel Scout + Meilisearch
- **Database:** MySQL
- **Styling:** TailwindCSS
- **Version Control:** Git & GitHub

---

## Installation

### Prerequisites

- PHP >= 8.1
- Composer
- Node.js & npm
- MySQL
- Meilisearch

---

## Setup Commands

### 1. Clone Repository
```bash
git clone https://github.com/Muhammadahmad14/react-laravel-blog.git
cd react-laravel-blog
```

---

### 2. Backend Setup (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed  # optional
php artisan serve
```

---

### 3. Frontend Setup (React)
```bash
cd /foldername
npm install
npm start
```

---

### 4. Search Setup (Laravel Scout + Meilisearch)
```bash
# Add the following to backend/.env manually:
SCOUT_DRIVER=meilisearch
MEILISEARCH_HOST=http://127.0.0.1:7700
MEILISEARCH_KEY=your_meilisearch_key
```

---

### 5. Re-index Models
```bash
cd /foldername
php artisan scout:import "App\Models\Post"
php artisan scout:import "App\Models\User"
```
