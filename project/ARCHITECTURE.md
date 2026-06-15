# Architecture Overview - Madamani Strikers FC

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                         │
│                   (React Application)                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Navigation | Home | Team | Fixtures | News       │   │
│  │ Admin Dashboard (Protected)                      │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                      │ HTTP/REST API
                      ↓ with JWT tokens
┌─────────────────────────────────────────────────────────┐
│                   API LAYER                             │
│                (Express.js Backend)                     │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Authentication Routes                           │   │
│  │ ├─ /auth/register                              │   │
│  │ ├─ /auth/login                                 │   │
│  │ └─ /auth/verify                                │   │
│  │                                                 │   │
│  │ Protected Routes (Requires JWT)                │   │
│  │ ├─ /team (CRUD)                               │   │
│  │ ├─ /news (CRUD)                               │   │
│  │ ├─ /fixtures (CRUD)                           │   │
│  │ └─ /admin (Profile, Stats, Security)          │   │
│  │                                                 │   │
│  │ Middleware                                     │   │
│  │ ├─ Authentication JWT Verification            │   │
│  │ ├─ Role-Based Authorization                   │   │
│  │ └─ Error Handling                             │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                      │ CRUD Operations
                      ↓ Mongoose ODM
┌─────────────────────────────────────────────────────────┐
│                 DATA LAYER                              │
│              (MongoDB Database)                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Collections:                                    │   │
│  │ ├─ admins (email, password, role, permissions) │   │
│  │ ├─ team_members (players, coaches, staff)      │   │
│  │ ├─ news (articles, categories, status)         │   │
│  │ └─ fixtures (games, scores, venues)            │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Components

```
App (Main Entry Point)
├── Navigation (Header with Logo & Links)
├── LoginPage (Authentication)
└── Main Pages (Protected by JWT)
    ├── HomePage (Featured News & Hero)
    ├── TeamPage (Team Members List)
    ├── FixturesPage (Matches & Results)
    ├── AdminDashboard (Protected)
    │   ├── Team Management Form
    │   ├── News Management Form
    │   └── Fixture Management Form
    └── API Service Layer
        └── api.js (Axios interceptors, endpoints)
```

### Backend Routes Structure

```
server.js (Express App Entry)
├── /api/auth (Authentication)
│   ├── POST /register - Create admin
│   ├── POST /login     - Admin authentication
│   └── GET /verify     - Token validation
│
├── /api/team (Team Management - Protected)
│   ├── GET /          - List all
│   ├── GET /:id       - Single member
│   ├── POST /         - Create (Admin/Moderator)
│   ├── PUT /:id       - Update (Admin/Moderator)
│   └── DELETE /:id    - Delete (Admin)
│
├── /api/news (News Management - Protected)
│   ├── GET /          - List published
│   ├── GET /:id       - Single article (views++)
│   ├── POST /         - Create (Admin/Moderator)
│   ├── PUT /:id       - Update (Admin/Moderator)
│   └── DELETE /:id    - Delete (Admin)
│
├── /api/fixtures (Fixtures - Protected)
│   ├── GET /          - List all
│   ├── GET /:id       - Single fixture
│   ├── POST /         - Create (Admin/Moderator)
│   ├── PUT /:id       - Update (Admin/Moderator)
│   └── DELETE /:id    - Delete (Admin)
│
└── /api/admin (Admin Only - Protected)
    ├── GET /profile   - Admin info
    ├── PUT /password  - Change password
    └── GET /stats     - Dashboard stats
```

## Database Schema

### Admin Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed with bcrypt),
  role: String (admin, moderator),
  lastLogin: Date,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### TeamMember Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  role: String (player, coach, official, staff),
  position: String,
  number: Number,
  dateOfBirth: Date,
  nationality: String,
  photo: String (URL or base64),
  bio: String,
  email: String,
  phone: String,
  status: String (active, inactive, injured),
  joinedDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### News Collection
```javascript
{
  _id: ObjectId,
  title: String (required),
  content: String (required),
  summary: String (max 200 chars),
  category: String (match, transfer, injury, achievement, announcement),
  featured: Boolean,
  image: String (URL or base64),
  author: String,
  views: Number,
  status: String (draft, published, archived),
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Fixture Collection
```javascript
{
  _id: ObjectId,
  opponent: String (required),
  competition: String (league, cup, friendly, playoff),
  date: Date (required),
  time: String (HH:MM format),
  venue: String (required),
  isHome: Boolean,
  status: String (upcoming, live, completed, postponed, cancelled),
  result: {
    msfc_score: Number,
    opponent_score: Number
  },
  lineup: String (formation details),
  highlights: String (URL),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Authentication Flow

```
User (Frontend)
    ↓
    │ 1. POST /auth/login
    │    { email, password }
    ↓
API Server
    ↓
    │ 2. Find admin by email
    │ 3. Verify password with bcrypt
    │ 4. Generate JWT token
    ↓
User receives token
    ↓
    │ 5. Store token in localStorage
    │ 6. Include in all API requests
    │    Header: Authorization: Bearer <token>
    ↓
Subsequent Requests
    ↓
    │ 7. Middleware verifies JWT
    │ 8. Extract admin ID from token
    │ 9. Check admin permissions
    │10. Return protected resource
    ↓
Success Response or 401/403 Error
```

## Security Architecture

### Authentication & Authorization
- **JWT Tokens**: Stateless authentication, 7-day expiration
- **Password Hashing**: Bcryptjs with salt rounds
- **Role-Based Access**: Admin vs Moderator granular permissions
- **Token Validation**: Middleware on all protected routes

### Data Protection
- **CORS**: Restricted to frontend domain
- **Input Validation**: Server-side validation on all endpoints
- **Environment Variables**: Secrets never in code
- **HTTPS**: Recommended for production

### Database Security
- **MongoDB URI**: Stored in environment variables
- **Database authentication**: Username/password required
- **Collections indexes**: On frequently queried fields
- **Backups**: Regular backup strategy

## Performance Optimizations

### Frontend
- Lazy loading of components
- CSS modules for scoped styling
- React hooks for efficient state management
- Responsive images with object-fit

### Backend
- Database indexes on frequently searched fields
- Pagination support (to implement)
- Request validation before database queries
- Error handling with appropriate HTTP codes

### Database
- Indexed fields: email (unique), status, opponent
- Connection pooling
- Query optimization with projections

## Deployment Architecture

### Development
- Local Node.js + MongoDB
- npm dev scripts with nodemon
- Hot reload for development

### Production (Docker)
```
┌─────────────────────────────────────────┐
│      Docker Compose Orchestration       │
├─────────────────────────────────────────┤
│  Frontend (Node.js serving React)       │
│  ├─ Port: 3000                          │
│  └─ Environment: Production             │
├─────────────────────────────────────────┤
│  Backend (Express.js API)               │
│  ├─ Port: 5000                          │
│  └─ Environment: Production             │
├─────────────────────────────────────────┤
│  MongoDB                                │
│  ├─ Port: 27017                         │
│  └─ Volumes: Data persistence           │
└─────────────────────────────────────────┘
```

### Cloud Deployment Options
1. **Heroku**: Push to git, automatic CI/CD
2. **AWS**: EC2 instances with ECS/Docker
3. **DigitalOcean**: App Platform with containers
4. **MongoDB Atlas**: Managed MongoDB in cloud

## Monitoring & Logging

### Logs to Monitor
- Authentication attempts (success/failure)
- API request errors
- Database connection issues
- Admin actions (CRUD operations)

### Metrics to Track
- Request response times
- Database query performance
- Team size / News count trends
- Admin login frequency

## Scalability Considerations

### Current Architecture Supports
- Up to 1000 concurrent users (single instance)
- Unlimited team members/fixtures/news
- 100+ requests per second

### Future Scaling Strategy
1. Load balancing (multiple backend instances)
2. Database replication (MongoDB replica set)
3. Caching layer (Redis)
4. CDN for static assets
5. Microservices (separate auth, content, admin)

## Technology Stack Justification

| Component | Technology | Reason |
|-----------|-----------|--------|
| Frontend | React | Component-based, large ecosystem |
| Backend | Node.js/Express | Same language, fast development |
| Database | MongoDB | Flexible schema, JSON-native |
| Auth | JWT | Stateless, secure, scalable |
| Hashing | Bcryptjs | Industry standard, proven secure |
| API Style | REST | Simple, well-understood, cacheable |
| Deployment | Docker | Consistency across environments |
| Process Manager | Docker Compose | Local dev, production ready |

## Future Enhancements

1. **Real-time Updates**: WebSockets for live match scores
2. **File Uploads**: Image/video handling for news
3. **Advanced Search**: Full-text search with Elasticsearch
4. **Caching**: Redis for session management
5. **API Rate Limiting**: Prevent abuse
6. **Notifications**: Email/SMS alerts
7. **Analytics**: Track page views, user behavior
8. **Comments**: Fans commenting on news articles

---

**Architecture Version**: 1.0
**Last Updated**: 2024
**Maintainer**: Development Team
