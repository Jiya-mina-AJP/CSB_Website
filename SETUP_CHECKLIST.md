# Setup Checklist - Step by Step Guide

## ✅ Step 1: Create Supabase Account & Project

1. **Go to [supabase.com](https://supabase.com)** and sign up (free account)
2. **Create a new project:**
   - Click "New Project"
   - **Name**: `csb` (or your preferred name)
   - **Database Password**: Choose a strong password (SAVE THIS - you'll need it!)
   - **Region**: Choose closest to your location
   - Click "Create new project"
   - Wait 2-3 minutes for setup to complete

3. **Get your API credentials:**
   - Go to **Settings** → **API** (in left sidebar)
   - Copy these two values (you'll need them soon):
     - **Project URL** (looks like: `https://xxxxx.supabase.co`)
     - **anon public key** (long string starting with `eyJ...`)

4. **Set up database schema:**
   - Go to **SQL Editor** (in left sidebar)
   - Click "New query"
   - Copy the ENTIRE contents of `supabase/schema.sql` from your project
   - Paste into the SQL Editor
   - Click "Run" (or press Ctrl+Enter)
   - You should see "Success. No rows returned"

5. **Verify tables were created:**
   - Go to **Table Editor** (in left sidebar)
   - You should see 3 tables: `menu_items`, `orders`, `order_items`

6. **(Optional) Add sample data:**
   - Go back to **SQL Editor**
   - Create a new query
   - Copy contents of `supabase/seed.sql`
   - Paste and run it
   - Check `menu_items` table to see sample data

---

## ✅ Step 2: Create Vercel Account

1. **Go to [vercel.com](https://vercel.com)** and sign up (free account)
   - You can sign up with GitHub (recommended) or email

2. **That's it for now!** You'll use this account later for deployment.

---

## ✅ Step 3: Set Up Local Environment Variables

1. **Create `backend/.env` file:**
   - Copy `backend/env.example` to `backend/.env`
   - Replace the placeholder values:
     ```
     PORT=5000
     SUPABASE_URL=your_actual_supabase_url_here
     SUPABASE_ANON_KEY=your_actual_anon_key_here
     NODE_ENV=development
     ```

2. **Create `frontend/.env` file:**
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

---

## ✅ Step 4: Test Locally

1. **Install dependencies:**
   ```bash
   npm run install-all
   ```

2. **Test the backend connection:**
   ```bash
   cd backend
   npm run seed  # Optional: adds sample data
   npm start
   ```

3. **Test the frontend:**
   - Open a new terminal
   ```bash
   cd frontend
   npm start
   ```

4. **Visit http://localhost:3000** - Your app should work!

---

## ✅ Step 5: Deploy to Vercel (After Local Testing Works)

### Deploy Backend First:

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
   - Follow prompts (say "Yes" to setup, "No" to link existing project)
   - Project name: `csb-backend` (or your choice)

4. **Add environment variables:**
   ```bash
   vercel env add SUPABASE_URL
   # Paste your Supabase URL when prompted
   
   vercel env add SUPABASE_ANON_KEY
   # Paste your Supabase anon key when prompted
   
   vercel env add NODE_ENV production
   ```

5. **Deploy to production:**
   ```bash
   vercel --prod
   ```

6. **Copy your backend URL** (e.g., `https://csb-backend.vercel.app`)

### Deploy Frontend:

1. **Update frontend environment:**
   - Update `frontend/.env` or add to Vercel:
     ```
     REACT_APP_API_URL=https://your-backend-url.vercel.app/api
     ```

2. **Deploy frontend:**
   ```bash
   cd frontend
   vercel
   vercel env add REACT_APP_API_URL
   # Enter: https://your-backend-url.vercel.app/api
   vercel --prod
   ```

---

## 🎉 You're Done!

Your website should now be live on Vercel!

---

## Quick Reference

- **Supabase Dashboard**: https://supabase.com/dashboard
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Local Frontend**: http://localhost:3000
- **Local Backend**: http://localhost:5000

## Need Help?

- Check `DEPLOYMENT.md` for detailed deployment instructions
- Check `QUICKSTART.md` for quick reference
- Verify all environment variables are set correctly
- Check Supabase project is active (not paused)

