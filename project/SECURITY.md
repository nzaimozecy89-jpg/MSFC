# Security Best Practices - Madamani Strikers FC

## Overview

This document outlines security measures implemented and recommendations for maintaining a secure application in production.

---

## Security Features Implemented

### 1. Authentication & Authorization

✅ **JWT (JSON Web Token) Authentication**
- Secure token-based authentication
- Configurable token expiry (default: 7 days)
- Token verification on protected routes

✅ **Password Security**
- Passwords hashed with bcryptjs (salt rounds: 10)
- Admin credentials stored securely in environment variables
- Never send passwords in API responses

### 2. Environment Variable Management

✅ **Secure Secrets Handling**
- All sensitive data in environment variables
- `.env` files excluded from git (see `.gitignore`)
- `.env.docker` for Docker deployments
- `.env.production` template for production setup
- Never commit actual `.env` files to repository

### 3. Rate Limiting

✅ **Implemented Rate Limiting**
- General API rate limit: 100 requests per 15 minutes per IP
- Auth endpoints rate limit: 5 attempts per 15 minutes per IP
- Prevents brute force attacks on login endpoints
- Returns HTTP 429 when limit exceeded

Configuration in `backend/src/server.js`:
```javascript
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true
});
```

### 4. CORS (Cross-Origin Resource Sharing)

✅ **Restricted CORS Policy**
- Limited to specific origins via `ALLOWED_ORIGINS` environment variable
- Default origins: `http://localhost:3000`, `http://localhost:5000`
- Production: Configure for your domain only
- Example: `https://madamani.com,https://www.madamani.com`

### 5. HTTPS/SSL Encryption

✅ **In-Transit Encryption**
- Use HTTPS in production
- RECOMMENDED: Use Let's Encrypt (free SSL certificates)
- Force HTTPS redirects from HTTP
- See `DEPLOYMENT.md` for Nginx SSL configuration

### 6. Logging & Monitoring

✅ **Request Logging**
- Morgan middleware for HTTP request logging
- Development: Condensed logs
- Production: Combined log format
- Error stack traces only shown in development

### 7. Graceful Shutdown

✅ **Proper Process Termination**
- Handles SIGTERM and SIGINT signals
- Closes HTTP server cleanly
- Closes MongoDB connections properly
- Prevents data corruption on shutdown

### 8. Database Security

✅ **MongoDB Best Practices**
- Connection string validation
- Authentication required
- Network whitelisting via MongoDB Atlas
- Automatic encryption at rest (Atlas M10+)

---

## Configuration Checklist

### Before Deploying to Production

- [ ] Generate strong JWT secret (minimum 32 characters)
  ```bash
  openssl rand -base64 32
  ```

- [ ] Create MongoDB Atlas account and cluster
  - [ ] Configure network access whitelist
  - [ ] Create database user with strong password
  - [ ] Enable automated backups

- [ ] Update environment variables:
  - [ ] `JWT_SECRET` - Generate unique value
  - [ ] `MONGODB_URI` - Set MongoDB Atlas connection string
  - [ ] `ALLOWED_ORIGINS` - Set your frontend domain
  - [ ] `ADMIN_EMAIL` - Set production admin email
  - [ ] `ADMIN_PASSWORD` - Set strong production password

- [ ] Configure HTTPS/SSL
  - [ ] Obtain SSL certificate
  - [ ] Configure web server (Nginx/Apache)
  - [ ] Force HTTPS redirects

- [ ] Enable firewall rules
  - [ ] Allow only necessary ports (22, 80, 443, 5000)
  - [ ] Restrict database port (27017) to application server IP

---

## API Security

### Authentication Endpoints

All auth endpoints require proper request validation:
```bash
# Login example
curl -X POST https://api.yourdomain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "password123"}'
```

### Protected Routes

Protected routes require valid JWT token in Authorization header:
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  https://api.yourdomain.com/api/admin/dashboard
```

### Request Validation

- Email validation: RFC 5322 compliant
- Password strength: Minimum requirements enforced
- Input sanitization: protect against SQL injection
- Request size limits: 50MB for JSON/URL-encoded bodies

---

## Common Security Vulnerabilities & Mitigations

### 1. SQL Injection
✅ **Not Applicable** - Using MongoDB with Mongoose ORM
- Mongoose prevents injection through schema validation
- Always use parameterized queries/documents

### 2. Cross-Site Scripting (XSS)
✅ **Mitigations:**
- Server-side rendering where applicable
- Content Security Policy (CSP) headers recommended
- Input validation and output encoding

### 3. Cross-Site Request Forgery (CSRF)
✅ **Mitigations:**
- Token-based authentication (JWT)
- CORS configuration prevents unauthorized domain requests
- Consider CSRF tokens for state-changing operations

### 4. Broken Authentication
✅ **Mitigations:**
- Never store passwords in plain text
- Implement account lockout after failed attempts (rate limiting)
- Implement password reset functionality securely
- Log all authentication events

### 5. Insecure Direct Object References (IDOR)
✅ **Mitigations:**
- Always verify user authorization before operations
- Check that user owns resource before modification
- Implement proper access controls

### 6. Sensitive Data Exposure
✅ **Mitigations:**
- Use HTTPS for all communications
- Encrypt sensitive data at rest
- Never expose sensitive data in logs
- Use .env files for secrets

---

## Monitoring & Alerting

### Recommended Monitoring

1. **Application Health**
   ```bash
   curl https://api.yourdomain.com/api/health
   ```

2. **Error Rates**
   - Monitor > 5% error rate for alerts

3. **Response Times**
   - Alert if average response time > 1 second

4. **Database Connectivity**
   - Monitor MongoDB connection status

5. **Security Events**
   - Failed authentication attempts
   - Rate limit violations
   - Unusual API access patterns

### Logging

Logs include:
- HTTP requests (method, path, status code, response time)
- Authentication attempts
- Database operations
- Errors and exceptions

View logs:
```bash
# Docker
docker-compose logs backend

# Specific service
docker-compose logs -f backend

# Last 100 lines
docker-compose logs --tail=100 backend
```

---

## Update & Patch Management

### Regular Updates

- Check for dependency updates monthly
  ```bash
  npm outdated
  ```

- Update production dependencies carefully
  - Test in staging first
  - Review breaking changes
  - Update package-lock.json

### Vulnerability Scanning

```bash
# Scan for known vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix
```

---

## Access Control

### Admin Roles

Define and implement role-based access control:
- **Admin**: Full access to all endpoints
- **Editor**: Can create/edit news and fixtures
- **Viewer**: Read-only access

### IP Whitelisting (Optional)

For additional security, whitelist admin panel IPs:
- Configure in firewall rules
- Add IP validation middleware for sensitive endpoints

---

## Incident Response

### If Credentials Are Exposed

1. Immediately rotate JWT_SECRET
2. Invalidate all existing tokens
3. Alert all users
4. Force password reset for affected accounts
5. Review audit logs for unauthorized access

### If Database Is Compromised

1. Restore from latest backup
2. Reset all user passwords
3. Revoke all tokens
4. Review and patch vulnerability
5. Increase security monitoring

---

## Third-Party Dependencies

### Trusted Dependencies Used

- **express**: Web framework (maintained by StrongLoop)
- **mongoose**: MongoDB ODM (widely used, well-maintained)
- **jsonwebtoken**: JWT implementation
- **bcryptjs**: Password hashing
- **express-rate-limit**: Rate limiting middleware
- **cors**: CORS handling

### Dependency Management

- Review `package.json` for any suspicious packages
- Use `npm audit` regularly
- Keep dependencies up-to-date
- Verify package authenticity before adding

---

## Compliance & Standards

This application follows:
- OWASP Top 10 security practices
- JWT RFC 7519 standard
- RESTful API security guidelines
- MongoDB security best practices

---

## Additional Resources

- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [MongoDB Security](https://docs.mongodb.com/manual/security/)
- [Express.js Security](https://expressjs.com/en/advanced/best-practice-security.html)
- [Node.js Security Checklist](https://nodejs.org/en/docs/guides/security/)

---

## Questions or Security Issues?

If you discover a security vulnerability, please email: security@madamani.com

**Do NOT create public GitHub issues for security vulnerabilities.**

---

**Last Updated**: April 8, 2026
**Version**: 1.0
