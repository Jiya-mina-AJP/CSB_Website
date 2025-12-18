# QUICK FIX - Get Menu Items Showing

## Problem: "No items found in this category" 

Your database is empty! You need to add data to Supabase.

## Steps to Fix:

### 1. Go to Supabase Dashboard
- Open https://supabase.com/dashboard
- Select your project "Csbbihta"

### 2. Run Schema (if not done)
- Go to **SQL Editor**
- Click "New query"
- Copy ALL content from `supabase/schema.sql`
- Paste and click **Run**

### 3. Add Menu Data
- In SQL Editor, create a **New query**
- Copy the content below and paste it
- Click **Run**

```sql
-- Quick test data - Add a few items to see if it works
INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Masala Chai (70ML)', 'Traditional spiced tea in kulhad', 25.00, 'Chai', true, true),
('Masala Chai (140ML)', 'Traditional spiced tea in kulhad - Large', 50.00, 'Chai', false, true),
('Rose Chai (70ML)', 'Rose flavored tea', 15.00, 'Chai', false, true),
('Plain Cold Coffee', 'Cold coffee - 300ML', 90.00, 'Cold Coffee', true, true),
('CSB Special Cold Coffee', 'Special cold coffee - 300ML', 150.00, 'Cold Coffee', false, true),
('Veg Burger', 'Vegetable burger', 60.00, 'Burger', false, true),
('Veg Cheese Burger', 'Vegetable cheese burger', 75.00, 'Burger', false, true),
('Red Sauce Pasta', 'Pasta in red sauce', 130.00, 'Pasta', false, true),
('Loaded Fries', 'Loaded french fries', 130.00, 'Bites', false, true),
('Paneer Special Sandwich', 'Special paneer sandwich', 100.00, 'Sandwich', false, true);
```

### 4. Verify Data
- Go to **Table Editor** → `menu_items`
- You should see 10 items

### 5. Test Your Website
- Make sure backend is running: `cd backend && npm start`
- Make sure frontend is running: `cd frontend && npm start`
- Go to http://localhost:3000/menu
- You should now see menu items!

## If Still Not Working:

1. **Check Backend Console:**
   - Look for "Supabase Connected" message
   - Check for any error messages

2. **Check Browser Console:**
   - Press F12
   - Look for errors in Console tab
   - Check Network tab - is `/api/menu` returning data?

3. **Verify Environment Variables:**
   - Check `backend/.env` has correct Supabase URL and key
   - Restart backend after changing .env

4. **Test API Directly:**
   - Open http://localhost:5000/api/menu in browser
   - Should return JSON with menu items

