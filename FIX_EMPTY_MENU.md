# 🔧 FIX: Menu Items Not Showing

## The Problem
Your website shows "No items found in this category" because **your Supabase database is empty**.

## ✅ Quick Fix (3 Steps)

### Step 1: Run Schema in Supabase
1. Go to https://supabase.com/dashboard
2. Select project **"Csbbihta"**
3. Click **SQL Editor** (left sidebar)
4. Click **"New query"**
5. Copy **ALL** content from `supabase/schema.sql` file
6. Paste in SQL Editor
7. Click **"Run"** (or press Ctrl+Enter)
8. Should see: "Success. No rows returned"

### Step 2: Add Menu Data
1. In SQL Editor, click **"New query"** again
2. Copy **ALL** content from `supabase/quick-seed.sql`
3. Paste and click **"Run"**
4. Should see: "Success. 20 rows inserted"

### Step 3: Verify Data
1. Go to **Table Editor** (left sidebar)
2. Click on **`menu_items`** table
3. You should see 20 items with names and prices

### Step 4: Test Your Website
1. Make sure backend is running:
   ```bash
   cd backend
   npm start
   ```
   Should see: "Supabase Connected" and "Server running on port 5000"

2. Make sure frontend is running (in another terminal):
   ```bash
   cd frontend
   npm start
   ```

3. Open http://localhost:3000/menu
4. **You should now see menu items!** ✅

---

## 🧪 Test Database Connection

To verify your backend can connect to Supabase:

```bash
cd backend
npm run test-connection
```

This will tell you:
- ✅ If connection works
- ⚠️ If database is empty
- ❌ If there's a connection error

---

## ❌ Still Not Working?

### Check 1: Backend Environment Variables
Open `backend/.env` and verify:
```
SUPABASE_URL=https://wudakcftuyfyqwgbfgou.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Check 2: Backend is Running
- Open http://localhost:5000/api/menu in browser
- Should return JSON array with menu items
- If error, check backend console for messages

### Check 3: Frontend Environment
Open `frontend/.env` and verify:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Check 4: Browser Console
- Press F12 in browser
- Go to **Console** tab
- Look for errors (red text)
- Go to **Network** tab
- Refresh page
- Click on `/api/menu` request
- Check if it returns data

---

## 📝 Full Menu Data

Once the quick seed works, you can add ALL menu items:

1. In Supabase SQL Editor
2. Copy content from `supabase/seed.sql` (the full file)
3. Paste and Run
4. This adds 200+ menu items from your CSB menu

---

## ✅ Success Checklist

- [ ] Schema.sql run in Supabase
- [ ] Quick-seed.sql run in Supabase  
- [ ] Table Editor shows menu_items with data
- [ ] Backend shows "Supabase Connected"
- [ ] http://localhost:5000/api/menu returns JSON
- [ ] Frontend shows menu items on /menu page

