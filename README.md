
# BlogApp

A modern blog application built with **Laravel** (backend) and **React** (frontend) featuring a fast and flexible search functionality using **Laravel Scout** and **Meilisearch**.  

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
# HomePage
<img width="400" height="1455" alt="localhost_5173_" src="https://github.com/user-attachments/assets/c84542ac-0542-422c-a9bb-545576c14874" />


# UserProfile
<img width="400" alt="localhost_5173_ (1)" src="https://github.com/user-attachments/assets/6e89629e-30ea-485e-b50f-16f238d18bad" />


# Login Page
<img src="https://github.com/user-attachments/assets/7f4260e7-c8f3-4e43-a799-10572c8e0625" width="400" />

# AdminPage
<img src="https://github.com/user-attachments/assets/4bbaadce-4e3a-496d-937d-61f168a65809" width="600" />



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

