@echo off
REM Madamani Strikers FC - Quick Deployment Script for Windows
REM This script helps deploy your application

echo.
echo 🚀 Madamani Strikers FC - Deployment Helper
echo ==========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed. Please install Git first.
    echo    Download from: https://git-scm.com/download/win
    exit /b 1
)

echo ✅ Git found
echo.

echo Select deployment platform:
echo 1 - Heroku (Easiest - Recommended)
echo 2 - AWS EC2 (Production-grade)
echo 3 - Railway.app (Modern ^& Easy)
echo 4 - Docker Hub + VPS
echo 5 - Local Testing
echo.

set /p choice="Enter choice (1-5): "

if "%choice%"=="1" (
    echo.
    echo 📖 Heroku Deployment Instructions:
    echo ====================================
    echo.
    echo Prerequisites:
    echo   * Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
    echo   * GitHub account with code pushed
    echo.
    echo Quick Steps:
    echo 1. heroku login
    echo 2. heroku create madamani-fc-backend
    echo 3. heroku config:set MONGODB_URI="your-connection-string"
    echo 4. heroku config:set JWT_SECRET="your-jwt-secret"
    echo 5. git push heroku main
    echo.
    echo 📖 Full instructions: See PUBLICATION-GUIDE.md
    goto end
)

if "%choice%"=="2" (
    echo.
    echo 📖 AWS EC2 Deployment Instructions:
    echo ====================================
    echo.
    echo 1. Launch Ubuntu 20.04 LTS EC2 instance ^(t3.small^)
    echo 2. Get your EC2 public IP and key pair
    echo 3. Use PuTTY or WSL to SSH: ssh -i your-key.pem ubuntu@your-ec2-ip
    echo 4. Run: sudo apt update ^&^& sudo apt install docker.io docker-compose
    echo 5. git clone your-repository
    echo 6. Create .env.docker and frontend/.env.production with production values
    echo 7. docker-compose up --build -d
    echo.
    echo 📖 Full instructions: See PUBLICATION-GUIDE.md
    goto end
)

if "%choice%"=="3" (
    echo.
    echo 📖 Railway.app Deployment Instructions:
    echo ========================================
    echo.
    echo 1. Go to https://railway.app
    echo 2. Sign up with GitHub
    echo 3. Click 'New Project' - 'Deploy from GitHub repo'
    echo 4. Select your repository
    echo 5. Configure environment variables in dashboard
    echo 6. Auto-deploys on git push!
    echo.
    echo 📖 Full instructions: See PUBLICATION-GUIDE.md
    goto end
)

if "%choice%"=="4" (
    echo.
    echo 📖 Docker Hub + VPS Instructions:
    echo ==================================
    echo.
    echo 1. Create Docker Hub account: https://hub.docker.com
    echo 2. docker build -t username/madamani-backend ./backend
    echo 3. docker login
    echo 4. docker push username/madamani-backend
    echo 5. SSH to VPS and run: docker run -e MONGODB_URI=... username/madamani-backend
    echo.
    echo 📖 Full instructions: See PUBLICATION-GUIDE.md
    goto end
)

if "%choice%"=="5" (
    echo.
    echo 📋 Local Testing Setup
    echo =====================
    echo.
    echo Prerequisites:
    echo   * Node.js 18+: https://nodejs.org
    echo   * MongoDB: https://www.mongodb.com/try/download/community
    echo.
    echo Backend:
    echo   cd backend
    echo   npm install
    echo   npm run dev
    echo.
    echo Frontend (new terminal):
    echo   cd frontend
    echo   npm install
    echo   npm start
    echo.
    echo Then open: http://localhost:3000
    goto end
)

echo Invalid choice
exit /b 1

:end
echo.
echo ==========================================
echo 📖 Read PUBLICATION-GUIDE.md for details
echo 📋 Read PRODUCTION-CHECKLIST.md before launch
echo 🔐 Read SECURITY.md for security info
echo.
pause
