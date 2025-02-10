<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body>
    <h2>Hello, {{ $name }}</h2>
    <p>Please verify your email by clicking the following link:</p>
    <a href="{{ $verificationUrl }}">Verify Email</a>

    <p>If you've already verified, you can go to your dashboard by clicking the link below:</p>
    <a href="{{ $dashboardUrl }}">Go to Dashboard</a>
</body>
</html>


