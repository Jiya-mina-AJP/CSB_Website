# Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### 1. Supabase Setup (2 min)

1. Go to [supabase.com](https://supabase.com) → Create Project
2. Copy your **Project URL** and **anon key** from Settings → API
3. In SQL Editor, run `supabase/schema.sql`
4. (Optional) Run `supabase/seed.sql` for sample data

### 2. Local Development (2 min)

```bash
# Install dependencies
npm run install-all

# Set up environment variables
# backend/.env
SUPABASE_URL=your_project_url
SUPABASE_ANON_KEY=your_anon_key

# frontend/.env
REACT_APP_API_URL=http://localhost:5000/api

# Seed database (optional)
cd backend && npm run seed

# Run app
npm run dev
```

Visit: http://localhost:3000

### 3. Deploy to Vercel (1 min)

**Backend:**
```bash
cd backend
vercel
# Add env vars: SUPABASE_URL, SUPABASE_ANON_KEY
vercel --prod
```

**Frontend:**
```bash
cd frontend
# Update .env: REACT_APP_API_URL=https://your-backend.vercel.app/api
vercel
vercel --prod
```

Done! 🎉

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)





