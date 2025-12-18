# How to Get Your Supabase Credentials

You have your Supabase project name (**Csbbihta**) and password. Now you need to get the API credentials to fill in `backend/.env`.

## Steps:

1. **Go to [supabase.com/dashboard](https://supabase.com/dashboard)**
   - Log in with your account

2. **Select your project** (Csbbihta)

3. **Go to Settings → API** (in the left sidebar)

4. **You'll see two important values:**

   a. **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
      - Copy this entire URL
      - Paste it in `backend/.env` as `SUPABASE_URL`

   b. **anon public key** (long string starting with `eyJ...`)
      - This is under "Project API keys" section
      - Copy the entire key (it's very long)
      - Paste it in `backend/.env` as `SUPABASE_ANON_KEY`

5. **Also make sure your database schema is set up:**
   - Go to **SQL Editor** (left sidebar)
   - Click "New query"
   - Copy the entire contents of `supabase/schema.sql` from your project
   - Paste and click "Run"
   - You should see "Success. No rows returned"

6. **(Optional) Add sample data:**
   - In SQL Editor, create a new query
   - Copy contents of `supabase/seed.sql`
   - Paste and run it

## After getting credentials:

1. Open `backend/.env`
2. Replace `your_supabase_project_url_here` with your actual Project URL
3. Replace `your_supabase_anon_key_here` with your actual anon key
4. Save the file

## Test your setup:

```bash
# Install dependencies (if not done)
npm run install-all

# Test backend connection
cd backend
npm start
```

If you see the server running without errors, your Supabase connection is working! ✅

