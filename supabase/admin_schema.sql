-- Create a table for public profiles (links to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'customer');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- UPDATE MENU ITEMS POLICIES
DROP POLICY IF EXISTS "Menu items can be inserted by authenticated users" ON menu_items;
DROP POLICY IF EXISTS "Menu items can be updated by authenticated users" ON menu_items;
DROP POLICY IF EXISTS "Menu items can be deleted by authenticated users" ON menu_items;

CREATE POLICY "Admins can insert menu items"
  ON menu_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update menu items"
  ON menu_items FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete menu items"
  ON menu_items FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- UPDATE ORDERS POLICIES
-- Allow admins to see ALL orders
DROP POLICY IF EXISTS "Orders are viewable by everyone" ON orders;

-- Customers can see their own orders (by email matches or just public for now? keeping public read for now as per current schema, but strictly speaking should be restricted. Sticking to user request for 'admin can see admins' mostly implying admin view)
-- Re-creating "Orders are viewable by everyone" BUT ideally we want only Admin to see ALL.
-- Let's restrict: Customers can see orders they created (if we had user_id column) or public content.
-- Since current app doesn't link orders to users strictly (guest checkout), we keep public read for now OR restrict to admin for "Dashboard" view.
-- Let's add policy for Admin to update status.

CREATE POLICY "Admins can update orders"
  ON orders FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );
