
# BlogApp

A modern blog application built with **Laravel** (backend) and **React** (frontend) featuring a fast and flexible search functionality using **Laravel Scout** and **Meilisearch**.  

> ⚠️ **Note:** This project is currently under development.

---

## Features

- User authentication (register/login)
- Create, edit, and delete blog posts
- Follow and Unfollow fucntionality
- User can like and comment on Post
- Search blog posts using Laravel Scout & Meilisearch
- Responsive and interactive frontend built with React
- Fully modular and extendable

---

## Tech Stack

- **Backend:** Laravel 12.29.0
- **Frontend:** React 19.1.1
- **Search:** Laravel Scout + Meilisearch
- **Database:** MySQL
- **Styling:** TailwindCSS
- **Version Control:** Git & GitHub

---

## Installation

### Prerequisites

- PHP >= 8.2.4
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

