# Madamani Strikers FC - Full Stack Application

**Status**: ✅ Production-Ready | **Version**: 1.0.0

> **Ready to deploy?** See [PUBLICATION-STATUS.md](PUBLICATION-STATUS.md) for live deployment!

## Project Structure

```
project/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── models/         # MongoDB schemas (Admin, TeamMember, News, Fixture)
│   │   ├── routes/         # API endpoints (auth, team, news, fixtures, admin)
│   │   ├── middleware/     # Authentication & error handling
│   │   └── server.js       # Main entry point
│   ├── package.json        # Dependencies
│   ├── .env.example        # Environment template
│   └── Dockerfile          # Docker configuration
│
├── frontend/               # React.js application
│   ├── src/
│   │   ├── components/     # Reusable components (Navigation)
│   │   ├── pages/          # Page components (Home, Team, Fixtures, Admin, Login)
│   │   ├── services/       # API client & utilities
│   │   ├── styles/         # CSS styling
│   │   ├── App.js          # Main app component
│   │   └── index.js        # React entry point
│   ├── public/
│   │   └── index.html      # HTML template
│   ├── package.json        # Dependencies
│   ├── .env.example        # Environment template
│   └── Dockerfile          # Docker configuration
│
├── docker-compose.yml      # Multi-container orchestration
└── README.md               # Documentation
```

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Docker)
- npm or yarn

### Local Development (Without Docker)

#### Backend Setup
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Server runs on `http://localhost:5000`

#### Frontend Setup
```bash
cd frontend
cp .env.example .env
npm install
npm start
```

Application runs on `http://localhost:3000`

### Docker Setup

```bash
docker-compose up --build
```

Services:
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`
- MongoDB: `localhost:27017`

## 📚 Documentation

**Production Deployment (START HERE):**
- 🚀 [PUBLICATION-STATUS.md](PUBLICATION-STATUS.md) - **READ THIS FIRST** - Deployment overview & quick links
- 📖 [PUBLICATION-GUIDE.md](PUBLICATION-GUIDE.md) - Step-by-step deployment for Heroku, AWS, Railway, VPS

**Detailed Documentation:**
- [DEPLOYMENT.md](DEPLOYMENT.md) - Comprehensive deployment guide with all options
- [SECURITY.md](SECURITY.md) - Security best practices and implemented features
- [PRODUCTION-CHECKLIST.md](PRODUCTION-CHECKLIST.md) - Pre-launch verification checklist
- [SETUP.md](SETUP.md) - Detailed local setup instructions
- [API.md](API.md) - Complete API documentation
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture overview
- [QUICKSTART.md](QUICKSTART.md) - Quick start guide

**Helper Scripts:**
- [deploy.bat](deploy.bat) - Windows deployment helper
- [deploy.sh](deploy.sh) - Linux/Mac deployment helper

## Initial Setup

### 1. Create Admin Account

```bash
# Call the register endpoint
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@madamani.com",
    "password": "YourStrongPassword123",
    "confirmPassword": "YourStrongPassword123"
  }'
```

### 2. Login
Use the email and password from above to login in the frontend.

### 3. Start Managing Content
- Add team members in Admin Dashboard
- Create news articles
- Schedule fixtures
- All changes are persisted in MongoDB

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create admin account
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verify token

### Team (Protected)
- `GET /api/team` - List all members
- `GET /api/team/:id` - Get member details
- `POST /api/team` - Add new member (Admin only)
- `PUT /api/team/:id` - Update member (Admin only)
- `DELETE /api/team/:id` - Delete member (Admin only)

### News (Protected)
- `GET /api/news` - List published news
- `GET /api/news/:id` - Get news details
- `POST /api/news` - Create news (Admin only)
- `PUT /api/news/:id` - Update news (Admin only)
- `DELETE /api/news/:id` - Delete news (Admin only)

### Fixtures (Protected)
- `GET /api/fixtures` - List fixtures
- `GET /api/fixtures/:id` - Get fixture details
- `POST /api/fixtures` - Add fixture (Admin only)
- `PUT /api/fixtures/:id` - Update fixture (Admin only)
- `DELETE /api/fixtures/:id` - Delete fixture (Admin only)

### Admin Dashboard
- `GET /api/admin/profile` - Get admin profile
- `PUT /api/admin/password` - Change password
- `GET /api/admin/stats` - Get dashboard statistics

## Security Features

✅ **JWT Authentication** - Secure token-based access
✅ **Password Hashing** - Bcryptjs for secure password storage  
✅ **Role-Based Access** - Admin vs Moderator roles
✅ **Protected Routes** - Only authenticated users can modify data
✅ **Rate Limiting** - Brute force protection on auth endpoints
✅ **CORS Restrictions** - Configurable allowed origins
✅ **Input Validation** - Server-side data validation
✅ **Request Logging** - Morgan middleware for HTTP request tracking
✅ **Graceful Shutdown** - Proper process termination handling
✅ **Environment Variables** - Secure secrets management

**See [SECURITY.md](SECURITY.md) for detailed security documentation.**

## Styling

The frontend preserves the original Madamani Strikers FC design:
- Primary Color: Red (#D72638)
- Dark Color: Black (#111)
- Font: Bebas Neue (headers), DM Sans (body)
- Fully responsive design for mobile/tablet/desktop

## Technologies Used

**Backend:**
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcryptjs for password hashing

**Frontend:**
- React 18
- Axios for HTTP requests
- CSS3 with responsive design
- React hooks for state management

**DevOps:**
- Docker & Docker Compose
- Multi-environment configuration

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/madamani-fc
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB is running: `mongod` (local) or `docker-compose up`
- Check `MONGODB_URI` in `.env`

**API Connection Error**
- Verify backend is running on port 5000
- Check network connectivity
- Verify `REACT_APP_API_URL` in frontend .env

**Token Expired**
- Clear browser storage: `localStorage.clear()`
- Login again to get new token

## Future Enhancements

- [ ] Email notifications
- [ ] Advanced statistics dashboard
- [ ] Photo upload functionality
- [ ] Fixtures with lineup management
- [ ] News categories and tags
- [ ] User comments on news
- [ ] Season management
- [ ] League standings tracking

## Support

For issues or questions, refer to the original HTML design document or contact the development team.
