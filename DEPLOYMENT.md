# Deployment Guide for PlayCafe

This guide will walk you through deploying PlayCafe to Vercel with Supabase as the database.

## Prerequisites

- GitHub account
- Supabase account ([sign up here](https://supabase.com))
- Vercel account ([sign up here](https://vercel.com))

## Step 1: Set Up Supabase

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in:
   - **Name**: playcafe (or your preferred name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your users
4. Click "Create new project"
5. Wait for project to be ready (2-3 minutes)

### 1.2 Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `supabase/schema.sql`
4. Click "Run" (or press Ctrl+Enter)
5. Verify tables are created in **Table Editor**

### 1.3 Seed Database (Optional)

1. In SQL Editor, create a new query
2. Copy and paste the contents of `supabase/seed.sql`
3. Click "Run"
4. Verify data in **Table Editor** → `menu_items` table

### 1.4 Get API Credentials

1. Go to **Settings** → **API**
2. Copy these values (you'll need them later):
   - **Project URL** (SUPABASE_URL)
   - **anon/public key** (SUPABASE_ANON_KEY)

## Step 2: Prepare Your Code

### 2.1 Update Environment Files

Create `backend/.env`:
```env
SUPABASE_URL=your_project_url_here
SUPABASE_ANON_KEY=your_anon_key_here
NODE_ENV=production
PORT=5000
```

Create `frontend/.env`:
```env
REACT_APP_API_URL=https://your-backend.vercel.app/api
```

**Note**: You'll update the frontend URL after deploying the backend.

### 2.2 Test Locally

```bash
# Install dependencies
npm run install-all

# Seed database (optional)
cd backend
npm run seed

# Run locally
npm run dev
```

Verify everything works at http://localhost:3000

## Step 3: Deploy Backend to Vercel

### Option A: Deploy via Vercel CLI

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy backend:**
```bash
cd backend
vercel
```

4. **Follow prompts:**
   - Set up and deploy? **Yes**
   - Which scope? **Your account**
   - Link to existing project? **No**
   - Project name: **playcafe-backend**
   - Directory: **./backend**
   - Override settings? **No**

5. **Add environment variables:**
```bash
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
vercel env add NODE_ENV production
```

6. **Redeploy:**
```bash
vercel --prod
```

### Option B: Deploy via GitHub + Vercel Dashboard

1. **Push code to GitHub:**
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

2. **Import to Vercel:**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Other
     - **Root Directory**: `backend`
     - **Build Command**: (leave empty)
     - **Output Directory**: (leave empty)
     - **Install Command**: `npm install`
   - Click "Deploy"

3. **Add environment variables:**
   - Go to Project Settings → Environment Variables
   - Add:
     - `SUPABASE_URL` = your Supabase project URL
     - `SUPABASE_ANON_KEY` = your Supabase anon key
     - `NODE_ENV` = production
   - Click "Save"
   - Redeploy (Deployments → ... → Redeploy)

4. **Copy your backend URL:**
   - It will be something like: `https://playcafe-backend.vercel.app`
   - Save this URL!

## Step 4: Deploy Frontend to Vercel

### 4.1 Update Frontend Environment

Update `frontend/.env`:
```env
REACT_APP_API_URL=https://your-backend-url.vercel.app/api
```

Replace `your-backend-url` with your actual backend URL from Step 3.

### 4.2 Deploy Frontend

**Option A: Via CLI**

```bash
cd frontend
vercel
```

Add environment variable:
```bash
vercel env add REACT_APP_API_URL
# Enter: https://your-backend-url.vercel.app/api
vercel --prod
```

**Option B: Via Dashboard**

1. Create a new Vercel project
2. Import same GitHub repository
3. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`
4. Add environment variable:
   - `REACT_APP_API_URL` = `https://your-backend-url.vercel.app/api`
5. Click "Deploy"

## Step 5: Configure Supabase CORS

1. Go to Supabase Dashboard → **Settings** → **API**
2. Scroll to "CORS Configuration"
3. Add your frontend Vercel URL to allowed origins:
   - Example: `https://playcafe-frontend.vercel.app`
4. Click "Save"

## Step 6: Test Your Deployment

1. Visit your frontend URL (e.g., `https://playcafe-frontend.vercel.app`)
2. Test features:
   - Browse menu items
   - Add items to cart
   - Place an order
   - Check backend API: `https://your-backend.vercel.app/api/menu`

## Troubleshooting

### Backend Not Working

- Check Vercel function logs: Project → Deployments → Click deployment → Functions tab
- Verify environment variables are set correctly
- Check Supabase connection (test locally first)

### Frontend Can't Connect to Backend

- Verify `REACT_APP_API_URL` is correct in Vercel environment variables
- Check browser console for CORS errors
- Ensure backend URL is accessible

### Database Errors

- Verify Supabase project is active
- Check RLS policies allow operations
- Verify schema was created correctly
- Check Supabase logs in dashboard

### Build Errors

- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

## Updating Your Deployment

After making changes:

1. **Push to GitHub:**
```bash
git add .
git commit -m "Your changes"
git push origin main
```

2. **Vercel will auto-deploy** (if connected to GitHub)
   - Or manually redeploy from Vercel dashboard

3. **Update environment variables** if needed:
   - Go to Project Settings → Environment Variables
   - Update values
   - Redeploy

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Vercel will handle SSL automatically

## Monitoring

- **Vercel Analytics**: Built-in analytics in dashboard
- **Supabase Logs**: Check in Supabase dashboard → Logs
- **Error Tracking**: Consider adding Sentry or similar

---

Congratulations! Your PlayCafe website is now live! 🎉





