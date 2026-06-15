# API Documentation - Madamani Strikers FC

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### Register Admin Account
```
POST /auth/register
```
**Public** - Create a new admin account

**Request Body:**
```json
{
  "email": "admin@madamani.com",
  "password": "SecurePassword123",
  "confirmPassword": "SecurePassword123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Admin registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@madamani.com",
    "role": "admin"
  }
}
```

### Login
```
POST /auth/login
```
**Public** - Authenticate admin user

**Request Body:**
```json
{
  "email": "admin@madamani.com",
  "password": "SecurePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@madamani.com",
    "role": "admin"
  }
}
```

### Verify Token
```
GET /auth/verify
```
**Protected** - Verify JWT token validity

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Token is valid",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@madamani.com",
    "role": "admin"
  }
}
```

---

## Team Endpoints

### Get All Team Members
```
GET /team
```
**Public** - Retrieve all team members with optional filters

**Query Parameters:**
- `role` - Filter by role (player, coach, staff)
- `status` - Filter by status (active, inactive, injured)

**Example:** `/team?role=player&status=active`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "role": "player",
      "position": "Striker",
      "number": 9,
      "nationality": "Ghana",
      "dateOfBirth": "1995-03-15",
      "photo": "url_or_base64",
      "status": "active",
      "joinedDate": "2023-01-10"
    }
  ],
  "count": 25
}
```

### Get Single Team Member
```
GET /team/:id
```
**Public** - Get details of specific team member

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "role": "player",
    "position": "Striker",
    "number": 9,
    "nationality": "Ghana",
    "dateOfBirth": "1995-03-15",
    "photo": "url_or_base64",
    "bio": "Talented striker with great goal-scoring ability",
    "email": "john@example.com",
    "phone": "+233123456789",
    "status": "active",
    "joinedDate": "2023-01-10"
  }
}
```

### Create Team Member
```
POST /team
```
**Protected** - Add new team member (Admin/Moderator only)

**Request Body:**
```json
{
  "name": "John Doe",
  "role": "player",
  "position": "Striker",
  "number": 9,
  "dateOfBirth": "1995-03-15",
  "nationality": "Ghana",
  "photo": "base64_or_url",
  "bio": "Talented striker",
  "email": "john@example.com",
  "phone": "+233123456789",
  "status": "active"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Team member added successfully",
  "data": { /* member object */ }
}
```

### Update Team Member
```
PUT /team/:id
```
**Protected** - Update team member details (Admin/Moderator only)

**Request Body:** (partial update)
```json
{
  "status": "injured",
  "position": "Midfielder"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Team member updated successfully",
  "data": { /* updated member object */ }
}
```

### Delete Team Member
```
DELETE /team/:id
```
**Protected** - Remove team member (Admin only)

**Response (200):**
```json
{
  "success": true,
  "message": "Team member deleted successfully"
}
```

---

## News Endpoints

### Get All News
```
GET /news
```
**Public** - Retrieve published news articles

**Query Parameters:**
- `category` - Filter by category (match, transfer, injury, achievement, announcement, general)
- `featured` - Filter featured articles (true/false)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Historic Victory Against City United",
      "summary": "Madamani Strikers FC secures a remarkable 3-2 victory...",
      "content": "Full article content here...",
      "category": "match",
      "featured": true,
      "image": "url_or_base64",
      "author": "admin@madamani.com",
      "views": 1250,
      "status": "published",
      "publishedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "count": 5
}
```

### Get Single News Article
```
GET /news/:id
```
**Public** - Increment views and return article

**Response (200):**
```json
{
  "success": true,
  "data": { /* news object with incremented views */ }
}
```

### Create News Article
```
POST /news
```
**Protected** - Create new news article (Admin/Moderator only)

**Request Body:**
```json
{
  "title": "Historic Victory Against City United",
  "summary": "Brief summary of the article (max 200 chars)",
  "content": "Full article content with details and context",
  "category": "match",
  "featured": true,
  "image": "base64_or_url",
  "status": "published"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "News created successfully",
  "data": { /* news object */ }
}
```

### Update News Article
```
PUT /news/:id
```
**Protected** - Edit news article (Admin/Moderator only)

**Response (200):**
```json
{
  "success": true,
  "message": "News updated successfully",
  "data": { /* updated news object */ }
}
```

### Delete News Article
```
DELETE /news/:id
```
**Protected** - Remove news article (Admin only)

**Response (200):**
```json
{
  "success": true,
  "message": "News deleted successfully"
}
```

---

## Fixtures Endpoints

### Get All Fixtures
```
GET /fixtures
```
**Public** - Retrieve all fixtures

**Query Parameters:**
- `status` - Filter (upcoming, live, completed, postponed, cancelled)
- `competition` - Filter (league, cup, friendly, playoff)
- `sort` - Sort by date (default: upcoming, or 'past')

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "opponent": "City United FC",
      "competition": "league",
      "date": "2024-02-15T15:00:00Z",
      "time": "15:00",
      "venue": "Madamani Stadium",
      "isHome": true,
      "status": "upcoming",
      "result": {
        "msfc_score": null,
        "opponent_score": null
      },
      "lineup": "4-3-3 Formation",
      "notes": "Important league match"
    }
  ],
  "count": 15
}
```

### Get Single Fixture
```
GET /fixtures/:id
```
**Public** - Get fixture details

**Response (200):**
```json
{
  "success": true,
  "data": { /* fixture object */ }
}
```

### Create Fixture
```
POST /fixtures
```
**Protected** - Schedule new fixture (Admin/Moderator only)

**Request Body:**
```json
{
  "opponent": "City United FC",
  "competition": "league",
  "date": "2024-02-15",
  "time": "15:00",
  "venue": "Madamani Stadium",
  "isHome": true,
  "status": "upcoming"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Fixture created successfully",
  "data": { /* fixture object */ }
}
```

### Update Fixture
```
PUT /fixtures/:id
```
**Protected** - Update fixture (usually to record results) (Admin/Moderator only)

**Request Body (after match):**
```json
{
  "status": "completed",
  "result": {
    "msfc_score": 3,
    "opponent_score": 2
  },
  "lineup": "Final lineup used",
  "notes": "Great performance by the team"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Fixture updated successfully",
  "data": { /* updated fixture object */ }
}
```

### Delete Fixture
```
DELETE /fixtures/:id
```
**Protected** - Remove fixture (Admin only)

**Response (200):**
```json
{
  "success": true,
  "message": "Fixture deleted successfully"
}
```

---

## Admin Endpoints

### Get Admin Profile
```
GET /admin/profile
```
**Protected** - Get current admin's profile information

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@madamani.com",
    "role": "admin",
    "isActive": true,
    "lastLogin": "2024-01-20T10:30:00Z",
    "createdAt": "2024-01-10T08:00:00Z"
  }
}
```

### Change Password
```
PUT /admin/password
```
**Protected** - Update admin password

**Request Body:**
```json
{
  "currentPassword": "OldPassword123",
  "newPassword": "NewSecurePassword456",
  "confirmPassword": "NewSecurePassword456"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

### Get Dashboard Statistics
```
GET /admin/stats
```
**Protected** - Get dashboard overview statistics (Admin only)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "teamMembers": 25,
    "publishedNews": 12,
    "totalFixtures": 30,
    "upcomingFixtures": 5
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized - Invalid token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Not authorized for this action"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Rate Limiting

Currently no rate limiting is implemented. In production, implement:
- 100 requests per minute for public endpoints
- 50 requests per minute for protected endpoints
- 10 requests per minute for auth endpoints

## Pagination

To implement pagination in future versions:
```
GET /team?page=1&limit=10
GET /news?page=1&limit=5
```

## Version

**API Version:** v1
**Last Updated:** 2024
