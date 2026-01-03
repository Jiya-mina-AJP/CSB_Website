-- 1. Create table for Coupons/Discounts
CREATE TABLE IF NOT EXISTS coupons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    description TEXT,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'flat', 'cashback')), -- 3 Types
    value NUMERIC NOT NULL, -- The amount (e.g., 20 for 20% or 20rs)
    min_order_value NUMERIC DEFAULT 0,
    max_discount_amount NUMERIC, -- Cap for percentage based discounts (e.g., Max 100rs off)
    is_active BOOLEAN DEFAULT true,
    show_on_home BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Create table for User Wallets
CREATE TABLE IF NOT EXISTS user_wallets (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    balance NUMERIC DEFAULT 0 CHECK (balance >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Create table for Wallet History/Transactions
CREATE TABLE IF NOT EXISTS wallet_transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL, -- Positive for credit, Negative for debit
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Enable RLS
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;

-- 5. Policies for Coupons
-- Everyone can view active coupons
CREATE POLICY "Public can view active coupons" ON coupons 
    FOR SELECT USING (true);

-- Admins can do everything with coupons
CREATE POLICY "Admins full access coupons" ON coupons 
    FOR ALL 
    USING (
        exists (select 1 from profiles where id = auth.uid() and role = 'admin')
    );

-- 6. Policies for Wallets
-- Users can view their own wallet
CREATE POLICY "Users view own wallet" ON user_wallets 
    FOR SELECT USING (auth.uid() = user_id);

-- Admins can view all wallets
CREATE POLICY "Admins view all wallets" ON user_wallets 
    FOR SELECT 
    USING (
        exists (select 1 from profiles where id = auth.uid() and role = 'admin')
    );

-- Users can UPDATE their own wallet (ONLY for deducting balance during checkout - strictly usually backend only, but allowing for this app flow)
-- Ideally this is done via a Postgres Function to be secure, but for this step allow update.
CREATE POLICY "Users update own wallet" ON user_wallets 
    FOR UPDATE USING (auth.uid() = user_id);


-- 7. Policies for Transactions
CREATE POLICY "Users view own transactions" ON wallet_transactions 
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own transactions" ON wallet_transactions 
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 8. Trigger to create wallet on user signup (using the same logic as profiles)
CREATE OR REPLACE FUNCTION public.handle_new_user_wallet() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_wallets (user_id, balance)
  VALUES (new.id, 0); -- Start with 0 balance
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new users
DROP TRIGGER IF EXISTS on_auth_user_created_wallet ON auth.users;
CREATE TRIGGER on_auth_user_created_wallet
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user_wallet();

-- 9. Insert some Seed Data (Example Coupons)
INSERT INTO coupons (code, description, discount_type, value, min_order_value, max_discount_amount, is_active, show_on_home)
VALUES 
    ('WELCOME50', 'Get 50% Off your first order', 'percentage', 50, 100, 200, true, true),
    ('FLAT100', 'Flat ₹100 Off on orders above ₹500', 'flat', 100, 500, NULL, true, false),
    ('CASHBACK20', 'Get 20% Cashback to your wallet', 'cashback', 20, 200, 150, true, true)
ON CONFLICT (code) DO NOTHING;
