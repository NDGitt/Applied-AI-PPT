# Railway Deployment Guide

This guide will help you deploy your Applied AI Presentation System to Railway for easy sharing and collaboration.

## Prerequisites

1. **GitHub Account** - Your code needs to be in a GitHub repository
2. **Railway Account** - Sign up at [railway.app](https://railway.app)
3. **Node.js Project** - This project is already set up correctly

## Step 1: Prepare Your Repository

### 1.1 Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit - Applied AI Presentation System"
```

### 1.2 Create GitHub Repository
1. Go to [GitHub](https://github.com)
2. Click "New repository"
3. Name it something like `applied-ai-presentation`
4. Make it public or private (your choice)
5. Don't initialize with README (we already have one)

### 1.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/applied-ai-presentation.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy on Railway

### 2.1 Connect Railway to GitHub
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub account
5. Select your `applied-ai-presentation` repository

### 2.2 Configure the Deployment
Railway will automatically:
- ✅ Detect it's a Node.js project
- ✅ Install dependencies from `package.json`
- ✅ Use the `start` script to run the server
- ✅ Set the `PORT` environment variable

### 2.3 Wait for Deployment
- Railway will build and deploy your app
- You'll see logs in real-time
- Deployment typically takes 2-5 minutes

## Step 3: Access Your App

### 3.1 Get Your App URL
1. In Railway dashboard, click on your project
2. Go to the "Settings" tab
3. Copy the "Domain" URL (e.g., `https://your-app-name.railway.app`)

### 3.2 Test Your App
1. Open the URL in your browser
2. You should see the presentation viewer
3. Test navigation between slides
4. Test PDF export functionality

## Step 4: Share with Your Team

### 4.1 Share the URL
- Send the Railway URL to your team members
- They can access the presentation immediately
- No installation required

### 4.2 Collaboration Workflow
**For non-technical team members:**
- Access the web interface
- View and navigate slides
- Export PDFs as needed

**For developers:**
- Clone the repository
- Make changes locally
- Push to GitHub
- Railway auto-deploys changes

## Step 5: Custom Domain (Optional)

### 5.1 Add Custom Domain
1. In Railway dashboard, go to "Settings"
2. Click "Add Domain"
3. Enter your custom domain
4. Update DNS records as instructed

## Troubleshooting

### Common Issues

**Build fails:**
- Check that `package.json` has correct scripts
- Ensure all dependencies are listed
- Verify Node.js version (18+)

**App won't start:**
- Check Railway logs for errors
- Verify `PORT` environment variable is set
- Ensure `start` script exists in `package.json`

**PDF export doesn't work:**
- Railway supports Puppeteer out of the box
- Check that slide files exist
- Verify file permissions

### Getting Help

1. **Check Railway Logs**
   - Go to your project in Railway dashboard
   - Click "Deployments" tab
   - View logs for any errors

2. **Railway Documentation**
   - Visit [docs.railway.app](https://docs.railway.app)
   - Search for specific issues

3. **Community Support**
   - Railway Discord: [discord.gg/railway](https://discord.gg/railway)
   - GitHub Issues: Create an issue in your repository

## Environment Variables

Railway automatically sets:
- `PORT` - The port your app should listen on
- `NODE_ENV` - Set to "production"

You can add custom environment variables in Railway dashboard if needed.

## Monitoring

### 5.1 View Metrics
- Railway provides basic metrics
- Monitor CPU, memory usage
- Check request logs

### 5.2 Set Up Alerts
- Configure alerts for downtime
- Monitor error rates
- Set up notifications

## Cost Management

### 5.1 Railway Pricing
- Free tier available for small projects
- Pay-as-you-go pricing
- Automatic scaling

### 5.2 Optimize Costs
- Use free tier for development
- Scale down when not in use
- Monitor usage regularly

## Security

### 5.1 Best Practices
- Keep dependencies updated
- Use HTTPS (automatic on Railway)
- Don't commit sensitive data
- Use environment variables for secrets

### 5.2 Access Control
- Control who can access your Railway project
- Use GitHub integration for deployment
- Monitor deployment logs

---

## Quick Commands Reference

```bash
# Local development
npm install
npm run dev

# Export PDFs locally
npm run export-all
npm run export-slide 5

# Deploy to Railway
git add .
git commit -m "Update presentation"
git push origin main
# Railway auto-deploys!
```

**Your app is now live and ready for collaboration! 🚀** 