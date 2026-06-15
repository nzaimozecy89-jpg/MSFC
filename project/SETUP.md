# Setup Guide for Madamani Strikers FC

## System Requirements

- **Node.js**: v18 or higher
- **npm**: v8 or higher
- **MongoDB**: v4.4 or higher (local or Docker)
- **Docker** (optional): For containerized setup

## Installation & Running Locally

### Step 1: Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### Step 2: Configure Environment Variables

#### Backend Configuration
```bash
cd backend
cp .env.example .env
```

Edit `.env` and update these values:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/madamani-fc
JWT_SECRET=change_this_to_a_strong_secret_key_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

#### Frontend Configuration
```bash
cd frontend
cp .env.example .env.local
```

The `.env.local` should contain:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 3: Start MongoDB

**Option A: Using Docker**
```bash
docker run -d -p 27017:27017 --name madamani-mongo mongo:latest
```

**Option B: Local MongoDB**
```bash
# macOS with Homebrew
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# Use MongoDB services from Services app
```

### Step 4: Start the Backend

```bash
cd backend
npm run dev
```

Backend should run on `http://localhost:5000`

### Step 5: Start the Frontend (New Terminal)

```bash
cd frontend
npm start
```

Frontend should open at `http://localhost:3000`

## Docker Setup (Recommended for Production)

### Prerequisites
- Docker & Docker Compose installed

### Quick Start
```bash
# From project root
docker-compose up --build
```

Services will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- MongoDB: `localhost:27017`

### Stop Containers
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f [service-name]
# service-name: frontend, backend, or mongodb
```

## Initial Admin Account Setup

### Create Admin via API

After the backend is running:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@madamani.com",
    "password": "SecurePassword123",
    "confirmPassword": "SecurePassword123"
  }'
```

### Login with Admin Account
1. Navigate to `http://localhost:3000`
2. Enter credentials:
   - Email: `admin@madamani.com`
   - Password: `SecurePassword123`

## Common Issues & Troubleshooting

### Issue: MongoDB Connection Failed

**Solution:**
```bash
# Check if MongoDB is running
mongosh

# If not, start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
# Docker: docker-compose up mongodb
```

### Issue: Port Already in Use

```bash
# macOS/Linux - Find process using port
lsof -i :5000  # Backend
lsof -i :3000  # Frontend
lsof -i :27017 # MongoDB

# Kill process
kill -9 [PID]
```

### Issue: CORS Errors

Ensure backend is running and `CORS` is enabled in `server.js`. Check that `REACT_APP_API_URL` matches the backend URL.

### Issue: Build Fails

```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Database Seeding (Optional)

To seed the database with initial data:

```bash
cd backend
node scripts/seed.js  # If seed script exists
```

## Deployment

### Vercel (Frontend Only)
```bash
cd frontend
npm run build
# Connect repo to Vercel dashboard
```

### Heroku (Full Stack)
```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

heroku login
heroku create madamani-strikers-fc
git push heroku main
```

### AWS/DigitalOcean
1. Push code to GitHub
2. Set up CI/CD pipeline
3. Deploy using Docker Compose
4. Configure MongoDB Atlas for database

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Development Workflow

### Working on Features

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes, commit regularly
git add .
git commit -m "Clear commit message"

# Push to remote
git push origin feature/your-feature-name

# Open pull request
```

### Code Style

Ensure consistent code formatting:
```bash
# Install Prettier (optional)
npm install --save-dev prettier

# Format code
npx prettier --write .
```

## Performance Optimization

### Frontend
- Lazy load components with React.lazy()
- Use React DevTools Profiler
- Minimize bundle size

### Backend
- Add database indexing
- Implement caching
- Use compression middleware

### Database
- Create indexes on frequently queried fields
- Regular backups
- Monitor query performance

## Security Checklist

✅ Change JWT_SECRET in production
✅ Use HTTPS in production
✅ Set NODE_ENV=production
✅ Enable rate limiting
✅ Validate all user inputs
✅ Keep dependencies updated
✅ Use environment variables for sensitive data
✅ Enable CORS properly for production domains
✅ Implement API key authentication if needed

## Monitoring & Logging

### Backend Logging
```bash
# View logs
docker-compose logs -f backend

# Or locally
NODE_ENV=development npm run dev
```

### Database Monitoring
```bash
# Connect to MongoDB
mongosh mongodb://localhost:27017/madamani-fc

# View collections
show collections

# Query data
db.teamMembers.find()
db.news.find()
db.fixtures.find()
```

## Support & Documentation

- API Documentation: See `API.md`
- Architecture Overview: See `ARCHITECTURE.md`
- Contributing Guidelines: See `CONTRIBUTING.md`

## Support Contacts

For technical support:
- Email: support@madamanistrikersfc.com
- GitHub Issues: [repository-url]/issues
