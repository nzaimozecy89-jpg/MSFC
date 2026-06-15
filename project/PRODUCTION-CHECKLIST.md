# Pre-Production Checklist

Use this checklist to ensure your application is ready for production deployment.

## Security ✅

- [ ] **Secrets Management**
  - [ ] Generate strong JWT secret: `openssl rand -base64 32`
  - [ ] Update `backend/.env.production` with actual secrets
  - [ ] Never commit `.env` files to git
  - [ ] Use `.env.example` for templates only
  - [ ] Store secrets securely (AWS Secrets Manager, HashiCorp Vault, etc.)

- [ ] **CORS Configuration**
  - [ ] Set `ALLOWED_ORIGINS` to your domain only (not `*`)
  - [ ] Example: `https://madamani.com,https://www.madamani.com`
  - [ ] Remove localhost origins from production

- [ ] **Rate Limiting**
  - [ ] Verify rate limiting is enabled (implemented by default)
  - [ ] Auth endpoints limited to 5 attempts per 15 minutes
  - [ ] General API limited to 100 requests per 15 minutes
  - [ ] Adjust limits based on your needs

- [ ] **HTTPS/SSL**
  - [ ] Obtain SSL certificate (Let's Encrypt recommended)
  - [ ] Configure web server with SSL
  - [ ] Force HTTP → HTTPS redirects
  - [ ] Set security headers (HSTS, CSP)

- [ ] **password Security**
  - [ ] All passwords hashed with bcryptjs
  - [ ] Admin password changed from default
  - [ ] Implement password reset functionality
  - [ ] Enforce password strength requirements

- [ ] **Database Security**
  - [ ] MongoDB user authentication enabled
  - [ ] Network whitelist configured (IP restrictions)
  - [ ] Automated backups enabled
  - [ ] Encryption at rest enabled (Atlas M10+)

- [ ] **Logging & Monitoring**
  - [ ] Request logs enabled (Morgan middleware)
  - [ ] Error logging configured
  - [ ] Log aggregation service set up
  - [ ] Alerts configured for errors/failures

---

## Environment Configuration ✅

- [ ] **Backend**
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=5000` (adjust if needed)
  - [ ] `MONGODB_URI` points to production MongoDB
  - [ ] `JWT_SECRET` is strong and unique
  - [ ] `JWT_EXPIRE` configured appropriately
  - [ ] `ADMIN_EMAIL` updated
  - [ ] `ADMIN_PASSWORD` updated and secure
  - [ ] `ALLOWED_ORIGINS` configured

- [ ] **Frontend**
  - [ ] `REACT_APP_API_URL` points to production API
  - [ ] Build production bundle: `npm run build`
  - [ ] Test production build locally: `npm install -g serve && serve -s build`

---

## Database Setup ✅

- [ ] **MongoDB Atlas** (Recommended)
  - [ ] Free or paid cluster created
  - [ ] Database user created with strong password
  - [ ] IP whitelist configured
  - [ ] Automated backups enabled (7+ days retention)
  - [ ] Connection string obtained

- [ ] **Backup Strategy**
  - [ ] Automated backups configured
  - [ ] Test restore process
  - [ ] Off-site backup storage set up (S3, GCS, etc.)
  - [ ] Backup retention policy defined

---

## Code Quality ✅

- [ ] **Testing**
  - [ ] Run test suite: `npm test`
  - [ ] All tests passing
  - [ ] Add more tests if needed

- [ ] **Dependencies**
  - [ ] Run `npm audit` - no critical vulnerabilities
  - [ ] All dependencies up-to-date
  - [ ] Remove unused dependencies

- [ ] **Code Review**
  - [ ] Code review completed
  - [ ] No debug code left in production
  - [ ] No console.logs in production (consider logger)
  - [ ] Error handling is comprehensive

---

## Deployment ✅

- [ ] **Deployment Platform Selected**
  - [ ] Docker + Docker Compose (recommended for simplicity)
  - [ ] AWS EC2 / ECS
  - [ ] Heroku
  - [ ] DigitalOcean
  - [ ] Other: _____________

- [ ] **Deployment Documentation**
  - [ ] Follow [DEPLOYMENT.md](DEPLOYMENT.md)
  - [ ] Platform-specific setup completed
  - [ ] CI/CD pipeline configured (optional but recommended)
  - [ ] Deployment process documented

- [ ] **Domain & DNS**
  - [ ] Domain registered
  - [ ] DNS records configured
  - [ ] SSL certificate obtained for domain

---

## Pre-Launch Testing ✅

- [ ] **Functionality Testing**
  - [ ] Admin login works
  - [ ] Can create/read/update/delete content
  - [ ] Team members display correctly
  - [ ] News articles load
  - [ ] Fixtures display
  - [ ] Navigation works

- [ ] **Performance Testing**
  - [ ] Page load time < 2 seconds
  - [ ] API response time < 500ms (average)
  - [ ] Database queries optimized
  - [ ] No console errors

- [ ] **Security Testing**
  - [ ] Rate limiting works (test 6th login attempt)
  - [ ] CORS blocks unauthorized origins
  - [ ] Protected routes require authentication
  - [ ] Invalid tokens rejected
  - [ ] SQL injection attempts fail
  - [ ] XSS attempts prevented

- [ ] **Cross-Browser Testing**
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge
  - [ ] Mobile browsers

---

## Monitoring & Support ✅

- [ ] **Health Monitoring**
  - [ ] Health check endpoint monitoring set up
  - [ ] Response time monitoring enabled
  - [ ] Error rate monitoring enabled
  - [ ] Database connectivity monitoring enabled

- [ ] **Alerting**
  - [ ] Alert on backend down
  - [ ] Alert on high error rate (>5%)
  - [ ] Alert on slow response times
  - [ ] Alert on database connection failure

- [ ] **Documentation**
  - [ ] README updated for production users
  - [ ] Troubleshooting guide created
  - [ ] Contact information provided
  - [ ] SLA defined

- [ ] **Support Plan**
  - [ ] Support email configured
  - [ ] Support hours defined
  - [ ] Incident response plan created
  - [ ] Emergency contact list prepared

---

## Post-Deployment ✅

After launching, complete these items:

- [ ] **Immediate (Day 1)**
  - [ ] Monitor error rates closely
  - [ ] Verify all features working
  - [ ] Check database performance
  - [ ] Monitor server resources

- [ ] **First Week**
  - [ ] Review logs for issues
  - [ ] Test backup/restore process
  - [ ] Collect user feedback
  - [ ] Address any bugs found

- [ ] **First Month**
  - [ ] Analyze usage patterns
  - [ ] Optimize slow endpoints
  - [ ] Plan performance improvements
  - [ ] Schedule security audit

---

## Additional Resources

- [Deployment Guide](DEPLOYMENT.md) - Detailed deployment instructions
- [Security Guide](SECURITY.md) - Security best practices
- [Setup Guide](SETUP.md) - Local setup instructions
- [API Documentation](API.md) - API endpoints reference

---

## Sign-Off

- **Ready for Production**: ☐ Yes / ☐ No
- **Production URL**: _____________________
- **Deployment Date**: _____________________
- **Deployed By**: _____________________
- **Reviewed By**: _____________________

---

**Last Updated**: April 8, 2026
**Version**: 1.0
