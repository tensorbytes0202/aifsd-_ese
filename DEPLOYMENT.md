# Deployment Guide

## MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new project

### Step 2: Create Cluster
1. Click "Build a Database"
2. Choose FREE tier (M0)
3. Select cloud provider and region
4. Name your cluster
5. Click "Create Cluster"

### Step 3: Configure Database Access
1. Go to "Database Access"
2. Click "Add New Database User"
3. Choose authentication method (Password)
4. Create username and password
5. Set user privileges to "Read and write to any database"
6. Click "Add User"

### Step 4: Configure Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with your database name

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/employee-analytics
```

---

## Render Deployment

### Backend Deployment

#### Step 1: Prepare Repository
1. Push code to GitHub
2. Ensure `.gitignore` excludes `.env` and `node_modules`

#### Step 2: Create Web Service
1. Go to [render.com](https://render.com)
2. Sign up/Login
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name:** employee-analytics-backend
   - **Region:** Choose closest to you
   - **Branch:** main
   - **Root Directory:** backend
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

#### Step 3: Add Environment Variables
Add these in Render dashboard:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
JWT_EXPIRE=7d
OPENROUTER_API_KEY=your_openrouter_api_key
AI_MODEL=openai/gpt-3.5-turbo
AI_API_URL=https://openrouter.ai/api/v1/chat/completions
FRONTEND_URL=https://your-frontend-url.onrender.com
```

#### Step 4: Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Note your backend URL (e.g., https://employee-analytics-backend.onrender.com)

### Frontend Deployment

#### Step 1: Create Static Site
1. Click "New +" → "Static Site"
2. Connect same repository
3. Configure:
   - **Name:** employee-analytics-frontend
   - **Branch:** main
   - **Root Directory:** frontend
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** dist

#### Step 2: Add Environment Variable
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

#### Step 3: Deploy
1. Click "Create Static Site"
2. Wait for deployment
3. Your app is live!

---

## Alternative: Vercel + Render

### Frontend on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Configure:
   - **Framework:** Vite
   - **Root Directory:** frontend
   - **Build Command:** `npm run build`
   - **Output Directory:** dist
4. Add environment variable: `VITE_API_URL`
5. Deploy

### Backend on Render
Follow backend deployment steps above

---

## Environment Variables Reference

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname

# JWT
JWT_SECRET=your_secret_key_minimum_32_characters_long
JWT_EXPIRE=7d

# AI API
OPENROUTER_API_KEY=sk-or-v1-xxxxx
AI_MODEL=openai/gpt-3.5-turbo
AI_API_URL=https://openrouter.ai/api/v1/chat/completions

# CORS
FRONTEND_URL=https://your-frontend-url.com
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com/api
```

---

## Post-Deployment Checklist

- [ ] Backend is accessible
- [ ] Frontend is accessible
- [ ] MongoDB connection working
- [ ] Authentication working
- [ ] Employee CRUD operations working
- [ ] AI recommendations working
- [ ] Charts rendering correctly
- [ ] Mobile responsive
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] Error handling working

---

## Troubleshooting

### Issue: CORS Error
**Solution:** Ensure `FRONTEND_URL` in backend matches your frontend URL

### Issue: MongoDB Connection Failed
**Solution:** 
- Check connection string
- Verify IP whitelist (0.0.0.0/0)
- Confirm database user credentials

### Issue: AI Recommendations Not Working
**Solution:**
- Verify OpenRouter API key
- Check API credits/quota
- Review error logs

### Issue: Build Failed
**Solution:**
- Check Node.js version compatibility
- Verify all dependencies in package.json
- Review build logs for specific errors

---

## Monitoring

### Render Dashboard
- View logs
- Monitor performance
- Check deployment status
- View metrics

### MongoDB Atlas
- Monitor database performance
- View connection metrics
- Check storage usage
- Review query performance

---

## Scaling Considerations

### Free Tier Limitations
- Render: Service sleeps after 15 min inactivity
- MongoDB Atlas: 512MB storage limit
- Cold start delays

### Upgrade Options
- Render: Paid plans for always-on service
- MongoDB Atlas: Paid tiers for more storage
- CDN for static assets
- Redis for caching

---

## Security Best Practices

1. **Never commit .env files**
2. **Use strong JWT secrets**
3. **Enable HTTPS only**
4. **Rotate API keys regularly**
5. **Monitor access logs**
6. **Keep dependencies updated**
7. **Use environment variables for secrets**
8. **Enable rate limiting**
9. **Implement request validation**
10. **Regular security audits**

---

## Maintenance

### Regular Tasks
- Monitor error logs
- Update dependencies
- Backup database
- Review performance metrics
- Check API usage
- Update documentation

### Updates
```bash
# Update dependencies
npm update

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

---

*Deployment guide complete. Your application is ready for production!*
