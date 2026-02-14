<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Status Update - BlogApp</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f7; margin:0; padding:0; }
        .container { max-width:600px; margin:30px auto; background:#fff; padding:20px; border-radius:10px; border:1px solid #ddd; box-shadow:0 0 10px rgba(0,0,0,0.05);}
        .header { text-align:center; margin-bottom:20px;}
        .header img { width:80px; height:80px; }
        p { color:#555; font-size:16px; line-height:1.5; }
        .footer { margin-top:30px; text-align:center; color:#999; font-size:14px; }
        .btn { display:inline-block; background:#3b82f6; color:#fff; padding:10px 20px; border-radius:5px; text-decoration:none; margin-top:20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://i.ibb.co/2N0VqgH/blogapp-icon.png" alt="BlogApp Logo">
        </div>
        <p>{{ $messageText }}</p>
        <a href="mailto:support@blogapp.com" class="btn">Contact Support</a>
        <div class="footer">
            &copy; {{ date('Y') }} BlogApp. All rights reserved.
        </div>
    </div>
</body>
</html>
