# ⚠️ IMPORTANT: Database Setup Required

Your menu is showing "No items found" because the database is empty. Follow these steps:

## Step 1: Run Database Schema in Supabase

1. **Go to Supabase Dashboard:**
   - Visit: https://supabase.com/dashboard
   - Login and select your project "Csbbihta"

2. **Open SQL Editor:**
   - Click "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run Schema:**
   - Copy ALL content from `supabase/schema.sql` file
   - Paste into SQL Editor
   - Click "Run" (or press Ctrl+Enter)
   - Wait for "Success" message

4. **Verify Tables Created:**
   - Go to "Table Editor" in left sidebar
   - You should see 3 tables: `menu_items`, `orders`, `order_items`

## Step 2: Insert Menu Data

1. **Back in SQL Editor:**
   - Click "New query" again
   - Copy ALL content from `supabase/seed.sql` file
   - Paste into SQL Editor
   - Click "Run"
   - Wait for "Success" message

2. **Verify Data:**
   - Go to "Table Editor"
   - Click on `menu_items` table
   - You should see all your menu items with prices!

## Step 3: Restart Your Server

After adding data:

```bash
# Stop your current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 4: Refresh Browser

- Go to http://localhost:3000/menu
- You should now see all menu items with prices!

---

## Quick Check: Is Backend Running?

Make sure your backend is running on port 5000:

```bash
# In a terminal, check if backend is running:
cd backend
npm start
```

You should see: "Server running on port 5000"

---

## Still Not Working?

1. **Check Browser Console:**
   - Press F12 in browser
   - Look for errors in Console tab
   - Share any error messages

2. **Check Backend Logs:**
   - Look at terminal where backend is running
   - Check for any error messages

3. **Test API Directly:**
   - Open: http://localhost:5000/api/menu
   - Should show JSON with menu items
   - If empty array `[]`, database is still empty - run seed.sql again

---

**The most common issue:** Database is empty. Make sure you run BOTH schema.sql AND seed.sql in Supabase!

