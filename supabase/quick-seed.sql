-- QUICK SEED - Run this in Supabase SQL Editor to get menu items showing
-- This adds 20 popular items to test your website

INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Masala Chai (70ML)', 'Traditional spiced tea served in kulhad', 25.00, 'Chai', true, true),
('Masala Chai (140ML)', 'Traditional spiced tea - Large size', 50.00, 'Chai', false, true),
('Adrak Chai (70ML)', 'Ginger tea in kulhad', 15.00, 'Chai', false, true),
('Rose Chai (70ML)', 'Rose flavored tea', 15.00, 'Chai', false, true),
('Plain Chai (70ML)', 'Regular tea', 15.00, 'Chai', false, true),
('Plain Cold Coffee', 'Cold coffee - 300ML', 90.00, 'Cold Coffee', true, true),
('Choco Cold Coffee', 'Chocolate cold coffee - 300ML', 100.00, 'Cold Coffee', false, true),
('CSB Special Cold Coffee', 'Special cold coffee - 300ML', 150.00, 'Cold Coffee', false, true),
('Hot Coffee (Regular)', 'Hot coffee', 20.00, 'Hot Coffee', false, true),
('Strong Coffee (Regular)', 'Strong hot coffee', 25.00, 'Hot Coffee', false, true),
('Veg Burger', 'Vegetable burger', 60.00, 'Burger', false, true),
('Veg Cheese Burger', 'Vegetable cheese burger', 75.00, 'Burger', false, true),
('CSB Special Burger', 'CSB special burger', 115.00, 'Burger', true, true),
('Red Sauce Pasta', 'Pasta in red sauce', 130.00, 'Pasta', false, true),
('White Sauce Pasta', 'Pasta in white sauce', 150.00, 'Pasta', false, true),
('Loaded Fries', 'Loaded french fries', 130.00, 'Bites', false, true),
('French Fries Full', 'Full portion french fries', 90.00, 'Bites', false, true),
('Paneer Special Sandwich', 'Special paneer sandwich', 100.00, 'Sandwich', false, true),
('CSB Special Maggi', 'CSB special maggi', 130.00, 'Maggi', false, true),
('Margherita Pizza', 'Classic margherita pizza', 119.00, 'Pizza', false, true)
ON CONFLICT DO NOTHING;

-- Verify the data was inserted
SELECT COUNT(*) as total_items FROM menu_items;

