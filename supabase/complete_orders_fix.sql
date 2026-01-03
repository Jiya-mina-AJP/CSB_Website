-- ==========================================
-- COMPLETE SYSTEM FIX (Status + Coupons)
-- ==========================================

-- 1. FIX ORDER STATUSES
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_status_check;
ALTER TABLE public.orders 
ADD CONSTRAINT orders_status_check 
CHECK (status IN (
    'Waiting for Approval', 
    'Food Getting Ready', 
    'Out for Delivery', 
    'Delivered/Completed', 
    'Cancelled',
    'Rejected',
    'pending', 'confirmed', 'preparing', 'ready', 'completed' -- Legacy support
));

-- 2. COUPON INCREMENT FUNCTION
-- This allows safe concurrent updates of usage counts
CREATE OR REPLACE FUNCTION public.increment_coupon_uses(coupon_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.coupons
  SET current_uses = COALESCE(current_uses, 0) + 1
  WHERE id = coupon_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. ENSURE RLS Policies allow updates
-- We need to ensure the public (via the RPC) can update the count, or the user can.
-- Since the RPC is SECURITY DEFINER, it bypasses RLS, which is perfect for this specific safe operation.
