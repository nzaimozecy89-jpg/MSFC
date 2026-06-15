# AWS Deployment Guide for madamanistrikers.com

**Domain**: madamanistrikers.com
**Platform**: AWS EC2
**Setup Time**: 60-90 minutes

---

## Step 1: Register Domain (5 minutes)

### Option A: AWS Route 53 (Recommended - all in one place)
1. Go to [AWS Route 53](https://console.aws.amazon.com/route53)
2. Click "Registered domains" → "Register domain"
3. Search for `madamanistrikers.com`
4. Check availability and price (~$12/year)
5. Complete registration
6. Enter contact info and finalize

### Option B: Cheaper Alternative - Namecheap
1. Go to [Namecheap.com](https://www.namecheap.com)
2. Search `madamanistrikers.com`
3. Add to cart and buy (~$8.88/year)
4. You'll need to update DNS later to point to AWS

**👉 Recommendation**: Use Route 53 for simplicity (does everything in AWS)

---

## Step 2: Launch AWS EC2 Instance (10 minutes)

### 2.1 Create AWS Account
1. Go to [AWS Console](https://console.aws.amazon.com)
2. Sign up (free tier available - 1 year free)
3. Complete verification
4. Log in

### 2.2 Launch EC2 Instance
1. Search for "EC2" in AWS Console
2. Click "Instances" → "Launch instance"
3. **Name**: `madamani-strikers-server`
4. **OS Image**: Ubuntu 20.04 LTS (free tier eligible)
5. **Instance Type**: t3.micro (free tier - 750 hours/month)
6. **Key Pair**: 
   - Click "Create new key pair"
   - Name: `madamani-strikers-key`
   - Download the `.pem` file to your computer (SAVE THIS!)
7. **Network Settings**:
   - Security Group: Create new
   - Name: `madamani-security-group`
   - Add inbound rules:
     - Type: SSH, Port: 22, Source: Your IP
     - Type: HTTP, Port: 80, Source: 0.0.0.0/0
     - Type: HTTPS, Port: 443, Source: 0.0.0.0/0
     - Type: Custom TCP, Port: 5000, Source: 0.0.0.0/0
8. Click "Launch instance"

**Note your IP address** - You'll see it when instance launches

---

## Step 3: Connect to Your Server (5 minutes)

### On Windows PowerShell:

```powershell
# Navigate to where you saved the key
cd C:\Users\YourUsername\Downloads

# Connect to your server (replace IP with your EC2 IP)
ssh -i madamani-strikers-key.pem ubuntu@your-ec2-public-ip

# Example:
# ssh -i madamani-strikers-key.pem ubuntu@54.123.45.67
```

**First time**: You may see "Are you sure you want to continue?" → Type `yes`

You should now see: `ubuntu@ip-xxx-xxx-xxx-xxx:~$`

---

## Step 4: Install Docker (5 minutes)

Once connected, run these commands:

```bash
# Update system
sudo apt update
sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add docker to user group
sudo usermod -aG docker $USER

# Verify installation
docker --version

# Log out and back in for group to take effect
exit

# SSH back in
ssh -i madamani-strikers-key.pem ubuntu@your-ec2-public-ip
```

---

## Step 5: Deploy Your Application (10 minutes)

### 5.1 Clone Your Repository

```bash
# Install git
sudo apt install -y git

# Clone your repo (update URL)
git clone https://github.com/your-username/madamani-strikers-fc.git
cd madamani-strikers-fc/project
```

### 5.2 Create Environment Files

```bash
# Create .env.docker for Docker Compose
cat > .env.docker << 'EOF'
NODE_ENV=production
JWT_SECRET=NzAzNzgyMjMtZTNhZi00YmE2LWJiNzQtN2U3OTYwM2Y0YTI0ZjI4Njg1N2UtY2VmYy00NTQ5LWEwOGYtODg2NzdjZWY3ZWQw
ADMIN_EMAIL=admin@madamani.com
ADMIN_PASSWORD=your-strong-password-here
EOF

# Create frontend/.env.production for the React build
mkdir -p frontend
cat > frontend/.env.production << 'EOF'
REACT_APP_API_URL=/api
EOF

> Note: `docker-compose.yml` reads secrets from `.env.docker`. Use `frontend/.env.production` with `REACT_APP_API_URL=/api` when deploying the frontend and backend on the same domain behind Nginx. Use `backend/.env.production` only if running the backend directly without Docker.


### 5.3 Start Application with Docker Compose

```bash
# Build and start containers
docker-compose up --build -d

# Verify containers are running
docker-compose ps

# Check logs
docker-compose logs backend
```

Expected: Backend running on port 5000, frontend on port 3000

### 5.4 Test Your Application

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Expected response:
# {"status":"Server is running","timestamp":"2024-04-08T..."}
```

---

## Step 6: Install SSL Certificate (10 minutes)

### 6.1 Install Nginx and Certbot

```bash
# Install Nginx
sudo apt install -y nginx

# Install Certbot
sudo apt install -y certbot python3-certbot-nginx
```

### 6.2 Create Nginx Configuration

```bash
# Create nginx config
sudo nano /etc/nginx/sites-available/madamani

# Paste this (edit your domain):
```

```nginx
server {
    listen 80;
    server_name madamanistrikers.com www.madamanistrikers.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/madamani /etc/nginx/sites-enabled/

# Test nginx config
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

### 6.3 Get SSL Certificate

```bash
# Get free SSL certificate from Let's Encrypt
sudo certbot --nginx -d madamanistrikers.com -d www.madamanistrikers.com

# Follow prompts:
# - Enter email
# - Agree to terms
# - Auto-renewal should be set up

# Verify cert renewal will work
sudo certbot renew --dry-run
```

---

## Step 7: Connect Domain to AWS (5 minutes)

### If Using Route 53 (AWS Domain):

1. Go to [AWS Route 53](https://console.aws.amazon.com/route53)
2. Click "Hosted zones"
3. Click your domain `madamanistrikers.com`
4. Click "Create record"
5. Fill in:
   - Name: `madamanistrikers.com`
   - Type: `A`
   - Value: Your EC2 public IP (e.g., 54.123.45.67)
6. Create record
7. **Wait 5-10 minutes** for DNS to propagate

### If Using Namecheap:

1. Go to [Namecheap Dashboard](https://www.namecheap.com/dashboard)
2. Click your domain → Manage
3. Go to "Advanced DNS" tab
4. Edit the `A` record:
   - Host: `@`
   - Value: Your EC2 public IP
5. Save
6. **Wait 5-10 minutes** for DNS to propagate

---

## Step 8: Test Your Live App (5 minutes)

### Test from PowerShell:

```powershell
# Test health endpoint
curl https://madamanistrikers.com/api/health

# Test admin login
curl -X POST https://madamanistrikers.com/api/auth/login `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"email":"admin@madamani.com","password":"your-password"}'
```

### Open in Browser:
- Frontend: https://madamanistrikers.com
- Admin Panel: https://madamanistrikers.com (login)
- API Health: https://madamanistrikers.com/api/health

---

## Step 9: Set Up Monitoring & Backups (10 minutes)

### 9.1 Set Up CloudWatch Monitoring

1. Go to AWS Console → CloudWatch
2. Click "Alarms" → "Create alarm"
3. Select EC2 instance `madamani-strikers-server`
4. Set threshold: CPU > 80% or status check failed
5. Get email notifications

### 9.2 Enable Auto-Backups

```bash
# SSH to your server
ssh -i madamani-strikers-key.pem ubuntu@your-ec2-public-ip

# Back up MongoDB
docker-compose exec mongodb mongodump --uri="mongodb://mongodb:27017/madamani-fc" --out=/backup

# Copy to AWS S3
aws s3 cp /backup s3://your-backup-bucket/madamani-backup-$(date +%Y%m%d).tar
```

---

## Security Checklist

- [ ] Domain registered
- [ ] EC2 instance running
- [ ] SSL certificate installed
- [ ] Security group configured (ports 22, 80, 443, 5000)
- [ ] Environment variables set
- [ ] MongoDB Atlas cluster active
- [ ] Docker containers running
- [ ] Nginx proxy working
- [ ] DNS propagated
- [ ] App accessible via domain
- [ ] HTTPS working
- [ ] Health endpoint responding
- [ ] Admin login works
- [ ] Rate limiting active
- [ ] Monitoring alerts set

---

## Quick Troubleshooting

### "Server not reachable"
```bash
# Check if containers are running
docker-compose ps

# Check logs
docker-compose logs -f backend

# Restart containers
docker-compose restart
```

### "Can't connect to MongoDB"
- Verify MONGODB_URI is correct
- Check MongoDB Atlas IP whitelist includes your EC2 IP
- Test connection: `docker-compose logs mongodb`

### "Domain not resolving"
- Wait 10 minutes for DNS propagation
- Check DNS records in Route 53
- Flush DNS: `ipconfig /flushdns` (Windows)

### "SSL certificate error"
```bash
# Renew certificate manually
sudo certbot renew

# Check certificate status
sudo certbot certificates
```

---

## Keep Your Server Running

### Auto-restart containers on reboot:

```bash
# SSH to server
ssh -i madamani-strikers-key.pem ubuntu@your-ec2-ip

# Edit docker-compose to restart on failure (already set)
# In docker-compose.yml, ensure: restart: always

# Restart service
sudo systemctl restart docker
docker-compose up -d
```

### SSH into Server Anytime:

```powershell
ssh -i madamani-strikers-key.pem ubuntu@your-ec2-ip
```

---

## Estimated Costs (AWS)

**Free Tier (First Year)**:
- EC2: t3.micro = FREE (750 hours/month)
- Data transfer: FREE (limited)
- Route 53: ~$0.50/month for DNS

**After Free Tier**:
- EC2: t3.micro ~$8/month
- Data: ~$0.09/GB
- Route 53: ~$0.50/month
- **Total**: ~$10-15/month

---

## Next Steps

1. ✅ Register domain: madamanistrikers.com
2. ✅ Launch EC2 instance
3. ✅ Install Docker
4. ✅ Deploy application
5. ✅ Set up SSL
6. ✅ Connect domain
7. ✅ Test everything
8. ✅ Enable monitoring

**Your app will be LIVE!** 🚀

---

## Support

- AWS Issues: [AWS Support](https://console.aws.amazon.com/support)
- SSL Issues: [Certbot Docs](https://certbot.eff.org/)
- App Issues: Check `docker-compose logs`

---

**You're ready to deploy!** 🎉
