# Production Deployment Guide - Madamani Strikers FC

## Pre-Deployment Checklist

Before deploying to production, ensure you have:

- [ ] MongoDB Atlas account created and cluster provisioned
- [ ] Strong JWT secret generated (minimum 32 characters)
- [ ] SSL/TLS certificate obtained (free via Let's Encrypt)
- [ ] Domain name provisioned
- [ ] Production hosting platform selected
- [ ] CI/CD pipeline configured
- [ ] Backup strategy documented
- [ ] Monitoring and alerting set up
- [ ] Security audit completed

---

## 1. Database Setup (MongoDB Atlas)

### Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free or paid cluster
3. Add database user with strong password
4. Whitelist IP addresses (allow your server IP)
5. Get connection string in format: `mongodb+srv://username:password@cluster.mongodb.net/madamani-fc?retryWrites=true&w=majority`

### Enable Backups

1. In MongoDB Atlas Console → Backup
2. Configure automated daily backups
3. Set retention period (minimum 7 days recommended)

---

## 2. Environment Configuration

### Backend Setup

1. Update `backend/.env.production`:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://your-user:your-pass@cluster.mongodb.net/madamani-fc?retryWrites=true&w=majority
   JWT_SECRET=generate-with: openssl rand -base64 32
   JWT_EXPIRE=7d
   ADMIN_EMAIL=your-admin@madamani.com
   ADMIN_PASSWORD=strong-password-here
   ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   ```

2. Generate secure JWT secret:
   ```bash
   openssl rand -base64 32
   ```

### Frontend Setup

1. Create or update `frontend/.env.production` or `frontend/.env.production.local`:
   ```
   REACT_APP_API_URL=/api
   ```

   - Use `/api` when the frontend and backend are served from the same domain and Nginx proxies `/api` to the backend.
   - If you use a separate API host, set it to `https://api.yourdomain.com/api`.

2. Build production bundle:
   ```bash
   cd frontend
   npm run build
   ```

---

## 3. Deployment Options

### Option A: Docker with Docker Compose (Recommended for Simple Setup)

#### Prerequisites
- Docker and Docker Compose installed
- Server with minimum 2GB RAM

#### Steps

1. Create `.env.docker` with production values:
   ```
   JWT_SECRET=your-generated-secret
   NODE_ENV=production
   ADMIN_EMAIL=admin@madamani.com
   ADMIN_PASSWORD=strong-password
   ```

2. Update `docker-compose.yml` for production:
   ```yaml
   version: '3.8'
   services:
     mongodb:
       image: mongo:latest
       container_name: madamani_mongodb
       ports:
         - "27017:27017"
       environment:
         MONGO_INITDB_DATABASE: madamani-fc
       volumes:
         - mongodb_data:/data/db
       restart: always

     backend:
       build: ./backend
       container_name: madamani_backend
       ports:
         - "5000:5000"
       environment:
         - NODE_ENV=production
         - PORT=5000
         - MONGODB_URI=${MONGODB_URI}
         - JWT_SECRET=${JWT_SECRET}
       depends_on:
         - mongodb
       restart: always

     frontend:
       build:
         context: ./frontend
         dockerfile: Dockerfile
       container_name: madamani_frontend
       ports:
         - "80:3000"
       environment:
         - REACT_APP_API_URL=https://api.yourdomain.com/api
       depends_on:
         - backend
       restart: always

   volumes:
     mongodb_data:
   ```

3. Build and deploy:
   ```bash
   docker-compose -f docker-compose.yml up -d
   ```

### Option B: AWS EC2 Deployment

#### Requirements
- AWS Account with EC2 instance (t3.small minimum)
- Ubuntu 20.04 LTS or Amazon Linux 2
- Elastic IP address assigned
- Security Group configured (ports 22, 80, 443, 5000)

#### Setup Steps

1. Connect to EC2 instance:
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

2. Install dependencies:
   ```bash
   sudo apt update
   sudo apt install -y nodejs npm docker.io docker-compose git curl wget
   sudo usermod -aG docker $USER
   ```

3. Clone repository:
   ```bash
   git clone https://github.com/yourusername/madamani.git
   cd madamani/project
   ```

4. Configure environment variables:
   ```bash
   cp .env.docker .env.production
   nano .env.production  # Edit with your production values
   ```

5. Start with Docker Compose:
   ```bash
   docker-compose up --build -d
   ```

6. Verify services:
   ```bash
   curl http://localhost:5000/api/health
   ```

### Option C: Heroku Deployment

#### Backend Deployment

1. Install Heroku CLI and login:
   ```bash
   npm install -g heroku
   heroku login
   ```

2. Create Heroku app:
   ```bash
   heroku create madamani-fc-backend
   ```

3. Add MongoDB Atlas URI:
   ```bash
   heroku config:set MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/madamani-fc?retryWrites=true&w=majority"
   heroku config:set JWT_SECRET="your-generated-secret"
   heroku config:set NODE_ENV=production
   ```

4. Create Procfile in backend directory:
   ```
   web: node src/server.js
   ```

5. Deploy:
   ```bash
   cd backend
   heroku git:remote -a madamani-fc-backend
   git push heroku main
   ```

#### Frontend Deployment

1. Create React app:
   ```bash
   heroku create madamani-fc-frontend
   ```

2. Create buildpack configuration:
   ```bash
   heroku buildpacks:add heroku/nodejs
   ```

3. Build and deploy:
   ```bash
   cd frontend
   npm run build
   heroku git:remote -a madamani-fc-frontend
   git push heroku main
   ```

### Option D: DigitalOcean App Platform

1. Connect GitHub repository to DigitalOcean
2. Configure environment variables in dashboard
3. DigitalOcean auto-deploys on push to main branch
4. Includes automatic HTTPS certificate

---

## 4. SSL/HTTPS Setup

### Using Nginx with Let's Encrypt (Recommended for Self-Hosted)

1. Install Nginx and Certbot:
   ```bash
   sudo apt install -y nginx certbot python3-certbot-nginx
   ```

2. Configure Nginx:
   ```bash
   sudo nano /etc/nginx/sites-available/madamani
   ```

   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

3. Enable site and get SSL cert:
   ```bash
   sudo ln -s /etc/nginx/sites-available/madamani /etc/nginx/sites-enabled/
   sudo certbot --nginx -d api.yourdomain.com
   sudo systemctl restart nginx
   ```

---

## 5. CI/CD Pipeline Setup

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Build Docker image
      run: docker build -t madamani-fc:latest ./backend

    - name: Run tests
      run: |
        cd backend
        npm install
        npm test

    - name: Deploy to production
      env:
        DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
      run: |
        mkdir -p ~/.ssh
        echo "$DEPLOY_KEY" > ~/.ssh/deploy_key
        chmod 600 ~/.ssh/deploy_key
        ssh -i ~/.ssh/deploy_key -o StrictHostKeyChecking=no deploy@your-server "cd /app/madamani && docker-compose pull && docker-compose up -d"
```

---

## 6. Health Checks & Monitoring

### Health Check Endpoint

```bash
curl https://api.yourdomain.com/api/health
```

Expected response:
```json
{ "status": "Server is running", "timestamp": "2024-04-08T10:00:00.000Z" }
```

### Monitoring Setup

1. **Application Performance Monitoring (APM)**:
   - Option: DataDog, New Relic, or Elastic APM
   - Monitor response times, error rates, database queries

2. **Log Aggregation**:
   - Option: ELK Stack, Splunk, or Loggly
   - Centralize logs from all containers

3. **Uptime Monitoring**:
   - Option: Pingdom, StatusCake, or UptimeRobot
   - Monitor health endpoint every 5 minutes

---

## 7. Backup & Recovery

### Automated Database Backups

1. MongoDB Atlas handles automated backups
2. Configure retention: 7-30 days recommended
3. Test recovery process monthly

### Application Backup

1. Backup Docker volume:
   ```bash
   docker-compose exec mongodb mongodump --uri="mongodb://mongodb:27017/madamani-fc" --out=/backup
   docker cp madamani_mongodb:/backup ./mongodb-backup-$(date +%Y%m%d).tar
   ```

2. Store backups off-site (AWS S3, Google Cloud Storage)

### Recovery Checklist

- [ ] Restore MongoDB backup to new cluster
- [ ] Update connection strings in .env
- [ ] Restart backend service
- [ ] Verify health endpoint
- [ ] Test admin login
- [ ] Verify all data is accessible

---

## 8. Security Hardening

- [ ] Enable HTTPS/SSL (Let's Encrypt recommended)
- [ ] Update firewall rules (whitelist only necessary IPs)
- [ ] Set strong passwords for all services
- [ ] Enable database authentication
- [ ] Configure CORS to specific domains only
- [ ] Enable rate limiting (already implemented)
- [ ] Set up DDoS protection (Cloudflare recommended)
- [ ] Enable MongoDB encryption at rest
- [ ] Regular security updates and patches
- [ ] Enable monitoring and alerting

---

## 9. Performance Optimization

- [ ] Enable MongoDB indexing on frequently queried fields
- [ ] Configure CDN for static assets (Cloudflare)
- [ ] Enable gzip compression in Nginx
- [ ] Use environment-appropriate database connection pooling
- [ ] Implement caching strategy for news/fixtures
- [ ] Monitor database query performance

---

## 10. Post-Deployment

### Initial Checks

1. Verify all services are running:
   ```bash
   docker-compose ps
   ```

2. Test API endpoints:
   ```bash
   curl https://api.yourdomain.com/api/health
   curl https://api.yourdomain.com/api/team
   ```

3. Test admin login at frontend URL

4. Verify logs are being collected:
   ```bash
   docker-compose logs backend
   ```

### Ongoing Maintenance

- Monitor performance metrics daily
- Review logs for errors/warnings
- Update dependencies monthly
- Test backup/recovery process
- Conduct security audits quarterly

---

## Troubleshooting

### Backend Not Starting

```bash
# Check logs
docker-compose logs backend

# Verify environment variables
docker-compose exec backend printenv | grep -E "MONGODB|JWT"
```

### Database Connection Issues

```bash
# Test MongoDB connection
docker-compose exec backend npm run test:db

# Verify URI format
# mongodb+srv://user:pass@cluster.mongodb.net/database?retryWrites=true
```

### High Memory Usage

```bash
# Monitor container resources
docker stats

# Reduce backend container memory limit in docker-compose.yml
# Add: mem_limit: 512m
```

---

## Contact & Support

For issues or questions:
- Check logs: `docker-compose logs -f backend`
- Review error messages carefully
- Consult MongoDB Atlas documentation
- Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`

---

**Last Updated**: April 8, 2026
**Version**: 1.0
