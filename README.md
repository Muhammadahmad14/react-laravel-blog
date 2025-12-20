<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>React + Laravel Blog</title>
<style>
    body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        background-color: #f7f7f7;
        color: #333;
    }
    .container {
        max-width: 900px;
        margin: 30px auto;
        background: #fff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    h1, h2, h3 {
        color: #2c3e50;
    }
    pre {
        background: #f4f4f4;
        padding: 10px;
        border-left: 4px solid #3498db;
        overflow-x: auto;
    }
    code {
        font-family: monospace;
    }
    ul {
        margin: 10px 0 20px 20px;
    }
    a {
        color: #3498db;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
    .note {
        background: #fffae6;
        padding: 10px;
        border-left: 4px solid #f1c40f;
        margin-bottom: 20px;
    }
</style>
</head>
<body>

<div class="container">
    <h1>React + Laravel Blog</h1>

    <h2>Project Overview</h2>
    <p>This is a full-stack blog application built with <strong>Laravel</strong> (backend) and <strong>React</strong> (frontend). Users can register, login, create posts, comment, like posts, and search for users or posts.</p>

    <h2>Project Status</h2>
    <p><strong>Status:</strong> 🚧 In Progress / Pending</p>
    <p>Some features are still under development. Functionality like advanced search and optimization may not be fully implemented yet.</p>

    <h2>Features</h2>
    <ul>
        <li>User authentication (Register/Login)</li>
        <li>Create, edit, and delete blog posts</li>
        <li>Comment on posts</li>
        <li>Like posts</li>
        <li>Search users and posts</li>
        <li>Responsive UI with React</li>
    </ul>

    <h2>Technologies Used</h2>
    <ul>
        <li><strong>Backend:</strong> Laravel, PHP, MySQL</li>
        <li><strong>Frontend:</strong> React, JavaScript, Tailwind CSS</li>
        <li><strong>Search:</strong> Meilisearch</li>
        <li><strong>Version Control:</strong> Git, GitHub</li>
    </ul>

    <h2>Folder Structure</h2>
    <pre>
Blog-app/
├─ backend/   # Laravel backend
├─ frontend/  # React frontend
└─ README.html
    </pre>

    <h2>Installation</h2>
    <pre>
git clone https://github.com/Muhammadahmad14/react-laravel-blog.git
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
cd ../frontend
npm install
npm start
    </pre>

    <h2>Meilisearch Setup</h2>
    <ul>
        <li>Install Meilisearch on your machine: <code>https://docs.meilisearch.com/</code></li>
        <li>Run Meilisearch server: <code>meilisearch --master-key 'your-master-key'</code></li>
        <li>Set your Meilisearch host and key in Laravel <code>.env</code>:</li>
        <pre>
MEILISEARCH_HOST=http://127.0.0.1:7700
MEILISEARCH_KEY=your-master-key
        </pre>
        <li>Run Laravel scout import to index posts:</li>
        <pre>
php artisan scout:import "App\Models\Post"
        </pre>
        <li>Search from React will now work with Meilisearch backend.</li>
    </ul>

    <h2>Usage</h2>
    <ul>
        <li>Open your browser at <code>http://localhost:3000</code> for React frontend</li>
        <li>Laravel API backend runs at <code>http://localhost:8000</code></li>
        <li>Register a new user and start creating posts</li>
    </ul>

    <h2>GitHub Workflow</h2>
    <pre>
git status
git add .
git commit -m "Describe your changes"
git push
git pull origin main   # optional
    </pre>

    <div class="note">
        <strong>Note:</strong> Always commit with meaningful messages. Use <code>git pull</code> before pushing if working on multiple machines.
    </div>

    <h2>Author</h2>
    <p><strong>Muhammad Ahmad</strong></p>
    <p>GitHub: <a href="https://github.com/Muhammadahmad14" target="_blank">Muhammadahmad14</a></p>
</div>

</body>
</html>
