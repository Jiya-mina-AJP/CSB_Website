-- ==========================================
-- ORDERS & COUPON USAGE UPDATE (ROBUST FIX)
-- ==========================================

-- 1. Create ORDERS table (safe check)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Ensure Columns Exist (Fix for "column does not exist" error)
-- If the table existed from an old version without these columns, this adds them.
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_name TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_email TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_phone TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS total_amount DECIMAL(10, 2);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS discount_amount DECIMAL(10, 2) DEFAULT 0;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Waiting for Approval';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS items JSONB;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';

-- 3. Update COUPONS table for Usage Limits
ALTER TABLE public.coupons ADD COLUMN IF NOT EXISTS max_uses INTEGER DEFAULT NULL;
ALTER TABLE public.coupons ADD COLUMN IF NOT EXISTS current_uses INTEGER DEFAULT 0;

-- 4. Create COUPON_USAGES table
CREATE TABLE IF NOT EXISTS public.coupon_usages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    coupon_id UUID REFERENCES public.coupons(id),
    user_id UUID REFERENCES auth.users(id),
    order_id UUID REFERENCES public.orders(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. RLS Policies (Safe Drops)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_usages ENABLE ROW LEVEL SECURITY;

-- Orders Policies
DROP POLICY IF EXISTS "Users view own orders" ON orders;
CREATE POLICY "Users view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins view all orders" ON orders;
CREATE POLICY "Admins view all orders" ON orders FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

DROP POLICY IF EXISTS "Users can insert orders" ON orders;
CREATE POLICY "Users can insert orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins update orders" ON orders;
CREATE POLICY "Admins update orders" ON orders FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Coupon Usages Policies
DROP POLICY IF EXISTS "Users view own coupon usages" ON coupon_usages;
CREATE POLICY "Users view own coupon usages" ON coupon_usages FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert coupon usages" ON coupon_usages;
CREATE POLICY "Users insert coupon usages" ON coupon_usages FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins view all coupon usages" ON coupon_usages;
CREATE POLICY "Admins view all coupon usages" ON coupon_usages FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
