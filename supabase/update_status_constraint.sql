-- ==========================================
-- UPDATE ORDERS CONSTRAINT FOR REJECTED STATUS
-- ==========================================

-- 1. DROP Existing Check Constraint
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_status_check;

-- 2. Add Updated Check Constraint including 'Rejected'
ALTER TABLE public.orders 
ADD CONSTRAINT orders_status_check 
CHECK (status IN (
    'Waiting for Approval', 
    'Food Getting Ready', 
    'Out for Delivery', 
    'Delivered/Completed', 
    'Cancelled',
    'Rejected',         -- Added Rejected status
    'pending',
    'confirmed',
    'preparing',
    'ready',
    'completed'
));
