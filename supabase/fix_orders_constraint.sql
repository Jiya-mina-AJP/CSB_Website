-- ==========================================
-- FIX ORDERS CONSTRAINT & ADMIN SETUP
-- ==========================================

-- 1. DROP Existing Check Constraint on Status
-- We need to drop it because it likely restricts values to 'pending', etc.
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_status_check;

-- 2. Add Updated Check Constraint
-- Allows: 'Waiting for Approval', 'Food Getting Ready', 'Out for Delivery', 'Delivered/Completed', 'Cancelled'
ALTER TABLE public.orders 
ADD CONSTRAINT orders_status_check 
CHECK (status IN (
    'Waiting for Approval', 
    'Food Getting Ready', 
    'Out for Delivery', 
    'Delivered/Completed', 
    'Cancelled',
    'pending',      -- Keep for backward compatibility if needed
    'confirmed',
    'preparing',
    'ready',
    'completed'
));

-- 3. Ensure other columns are correct (Safety)
ALTER TABLE public.orders ALTER COLUMN status SET DEFAULT 'Waiting for Approval';
