# !/bin/bash
# Madamani Strikers FC - Quick Deployment Script
# This script helps deploy your application

set -e

echo "🚀 Madamani Strikers FC - Deployment Helper"
echo "=========================================="
echo ""

# Check dependencies
echo "📋 Checking dependencies..."

if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "⚠️  npm is not installed. Some features won't work."
fi

echo "✅ Dependencies checked"
echo ""

# Menu
echo "Select deployment platform:"
echo "1) Heroku (Easiest - Recommended)"
echo "2) AWS EC2 (Production-grade)"
echo "3) Railway.app (Modern & Easy)"
echo "4) Docker Hub + VPS"
echo "5) Just test locally"
echo ""
read -p "Enter choice (1-5): " choice

case $choice in
    1)
        echo ""
        echo "📖 Heroku Deployment Instructions:"
        echo "===================================="
        echo ""
        echo "Prerequisites:"
        echo "  • Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli"
        echo "  • GitHub account with code pushed"
        echo ""
        echo "Steps:"
        echo "1. heroku login"
        echo "2. heroku create madamani-fc-backend"
        echo "3. heroku config:set MONGODB_URI=\"your-connection-string\""
        echo "4. heroku config:set JWT_SECRET=\"NzAzNzgyMjMtZTNhZi00YmE2LWJiNzQtN2U3OTYwM2Y0YTI0ZjI4Njg1N2UtY2VmYy00NTQ5LWEwOGYtODg2NzdjZWY3ZWQw\""
        echo "5. git push heroku main"
        echo ""
        echo "📖 Full instructions: See PUBLICATION-GUIDE.md"
        ;;
    2)
        echo ""
        echo "📖 AWS EC2 Deployment Instructions:"
        echo "===================================="
        echo ""
        echo "1. Launch Ubuntu 20.04 LTS EC2 instance (t3.small)"
        echo "2. ssh -i your-key.pem ubuntu@your-ec2-ip"
        echo "3. sudo apt update && sudo apt install docker.io docker-compose"
        echo "4. git clone <your-repo>"
        echo "5. Create .env.docker and frontend/.env.production with production values"
        echo "6. docker-compose up --build -d"
        echo ""
        echo "📖 Full instructions: See PUBLICATION-GUIDE.md"
        ;;
    3)
        echo ""
        echo "📖 Railway.app Deployment Instructions:"
        echo "========================================"
        echo ""
        echo "1. Go to https://railway.app"
        echo "2. Sign up with GitHub"
        echo "3. Click 'New Project' → 'Deploy from GitHub repo'"
        echo "4. Select your repository"
        echo "5. Configure environment variables"
        echo "6. Done! Auto-deploys on git push"
        echo ""
        echo "📖 Full instructions: See PUBLICATION-GUIDE.md"
        ;;
    4)
        echo ""
        echo "📖 Docker Hub + VPS Instructions:"
        echo "=================================="
        echo ""
        echo "1. docker build -t username/madamani ./backend"
        echo "2. docker push username/madamani"
        echo "3. SSH to VPS: ssh root@vps-ip"
        echo "4. docker run -e MONGODB_URI=... username/madamani"
        echo ""
        echo "📖 Full instructions: See PUBLICATION-GUIDE.md"
        ;;
    5)
        echo ""
        echo "📋 Local Testing Setup"
        echo "====================="
        echo ""
        echo "Prerequisites:"
        echo "  • Node.js 18+"
        echo "  • MongoDB (local or Docker)"
        echo ""
        echo "Backend:"
        echo "  cd backend"
        echo "  npm install"
        echo "  node src/server.js"
        echo ""
        echo "Frontend (new terminal):"
        echo "  cd frontend"
        echo "  npm install"
        echo "  npm start"
        echo ""
        echo "Access: http://localhost:3000"
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "=========================================="
echo "📖 Read PUBLICATION-GUIDE.md for details"
echo ""
