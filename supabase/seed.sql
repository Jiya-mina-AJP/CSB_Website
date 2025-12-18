-- Seed data for CSB (Chai Sutta Bar) menu items
-- All prices in Indian Rupees

-- CHAI (70ML / 140ML)
INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Adrak Chai (70ML)', 'Ginger tea - 70ML', 15.00, 'Chai', false, true),
('Adrak Chai (140ML)', 'Ginger tea - 140ML', 30.00, 'Chai', false, true),
('Chocolate Chai (70ML)', 'Chocolate flavored tea - 70ML', 15.00, 'Chai', false, true),
('Chocolate Chai (140ML)', 'Chocolate flavored tea - 140ML', 30.00, 'Chai', false, true),
('Rose Chai (70ML)', 'Rose flavored tea - 70ML', 15.00, 'Chai', true, true),
('Rose Chai (140ML)', 'Rose flavored tea - 140ML', 30.00, 'Chai', false, true),
('Plain Chai (70ML)', 'Regular tea - 70ML', 15.00, 'Chai', false, true),
('Plain Chai (140ML)', 'Regular tea - 140ML', 30.00, 'Chai', false, true),
('Paan Chai (70ML)', 'Paan flavored tea - 70ML', 20.00, 'Chai', false, true),
('Paan Chai (140ML)', 'Paan flavored tea - 140ML', 40.00, 'Chai', false, true),
('Elaichi Chai (70ML)', 'Cardamom tea - 70ML', 25.00, 'Chai', false, true),
('Elaichi Chai (140ML)', 'Cardamom tea - 140ML', 50.00, 'Chai', false, true),
('Masala Chai (70ML)', 'Spiced tea - 70ML', 25.00, 'Chai', true, true),
('Masala Chai (140ML)', 'Spiced tea - 140ML', 50.00, 'Chai', false, true),
('Lemon Chai (70ML)', 'Lemon tea - 70ML', 25.00, 'Chai', false, true),
('Lemon Chai (140ML)', 'Lemon tea - 140ML', 50.00, 'Chai', false, true),
('Lemon Grass Chai (70ML)', 'Lemon grass tea - 70ML', 25.00, 'Chai', false, true),
('Lemon Grass Chai (140ML)', 'Lemon grass tea - 140ML', 50.00, 'Chai', false, true),
('Kesar Chai (70ML)', 'Saffron tea - 70ML', 25.00, 'Chai', false, true),
('Kesar Chai (140ML)', 'Saffron tea - 140ML', 50.00, 'Chai', false, true);

-- COLD COFFEE (300ML)
INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Plain Cold Coffee', 'Regular cold coffee - 300ML', 90.00, 'Cold Coffee', false, true),
('Choco Cold Coffee', 'Chocolate cold coffee - 300ML', 100.00, 'Cold Coffee', false, true),
('Strong Cold Coffee', 'Strong cold coffee - 300ML', 100.00, 'Cold Coffee', false, true),
('Strong Choco Cold Coffee', 'Strong chocolate cold coffee - 300ML', 110.00, 'Cold Coffee', false, true),
('Cold Coffee with Icecream', 'Cold coffee with ice cream - 300ML', 110.00, 'Cold Coffee', false, true),
('Cold Coffee with Ice Cream', 'Cold coffee with ice cream - 300ML', 120.00, 'Cold Coffee', false, true),
('Brownie Cold Coffee', 'Brownie cold coffee - 300ML', 130.00, 'Cold Coffee', false, true),
('Caramel Cold Coffee', 'Caramel cold coffee - 300ML', 140.00, 'Cold Coffee', false, true),
('CSB Special Cold Coffee', 'Special cold coffee - 300ML', 150.00, 'Cold Coffee', true, true);

-- HOT COFFEE
INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Hot Coffee (Regular)', 'Regular hot coffee', 20.00, 'Hot Coffee', false, true),
('Hot Coffee (Large)', 'Large hot coffee', 40.00, 'Hot Coffee', false, true),
('Strong Coffee (Regular)', 'Strong hot coffee', 25.00, 'Hot Coffee', false, true),
('Strong Coffee (Large)', 'Large strong hot coffee', 50.00, 'Hot Coffee', false, true),
('Chocolate Coffee (Regular)', 'Chocolate hot coffee', 25.00, 'Hot Coffee', false, true),
('Chocolate Coffee (Large)', 'Large chocolate hot coffee', 50.00, 'Hot Coffee', false, true),
('Strong Choco Coffee (Regular)', 'Strong chocolate hot coffee', 30.00, 'Hot Coffee', false, true),
('Strong Choco Coffee (Large)', 'Large strong chocolate hot coffee', 60.00, 'Hot Coffee', false, true),
('Black Coffee (Regular)', 'Black coffee', 30.00, 'Hot Coffee', false, true),
('Black Coffee (Large)', 'Large black coffee', 60.00, 'Hot Coffee', false, true);

-- MILK (300ML)
INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Hot Plain Milk', 'Hot plain milk - 300ML', 40.00, 'Milk', false, true),
('Hot Masala Milk', 'Hot spiced milk - 300ML', 60.00, 'Milk', false, true),
('Hot Chocolate Milk', 'Hot chocolate milk - 300ML', 60.00, 'Milk', false, true);

-- BURGER
INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Bunny Chow', 'Bunny chow burger', 55.00, 'Burger', false, true),
('Veg Burger', 'Vegetable burger', 60.00, 'Burger', false, true),
('Veg Cheese', 'Vegetable cheese burger', 75.00, 'Burger', false, true),
('Veg Paneer', 'Paneer burger', 80.00, 'Burger', false, true),
('Veg Salsa', 'Vegetable salsa burger', 85.00, 'Burger', false, true),
('Veg Mexican', 'Mexican style veg burger', 95.00, 'Burger', false, true),
('Paneer Streak', 'Paneer streak burger', 99.00, 'Burger', false, true),
('Veg Cheese Paneer', 'Vegetable cheese paneer burger', 100.00, 'Burger', false, true),
('Grilled Veg Mushroom & Cheese', 'Grilled vegetable mushroom cheese burger', 109.00, 'Burger', false, true),
('CSB Special Burger', 'CSB special burger', 115.00, 'Burger', true, true);

-- PASTA
INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Macroni', 'Macaroni pasta', 99.00, 'Pasta', false, true),
('Red Sauce Pasta', 'Pasta in red sauce', 130.00, 'Pasta', false, true),
('White Sauce Pasta', 'Pasta in white sauce', 150.00, 'Pasta', false, true),
('Corn Overloaded Pasta', 'Pasta with extra corn', 160.00, 'Pasta', false, true),
('Mix Sauce Pasta', 'Pasta with mixed sauce', 160.00, 'Pasta', false, true),
('Creamy Mushroom & Paneer Pasta', 'Creamy pasta with mushroom and paneer', 170.00, 'Pasta', false, true),
('Creamy Corn & Mushroom Pasta', 'Creamy pasta with corn and mushroom', 170.00, 'Pasta', false, true),
('Baked Cheese Pasta', 'Baked pasta with cheese', 180.00, 'Pasta', false, true),
('Mac & Cheese', 'Macaroni and cheese', 219.00, 'Pasta', true, true);

-- BITES
INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Maska Bun', 'Buttered bun', 35.00, 'Bites', false, true),
('Garlic Bun', 'Garlic flavored bun', 45.00, 'Bites', false, true),
('Plain Garlic Bread', 'Plain garlic bread', 45.00, 'Bites', false, true),
('French Fries Half', 'Half portion french fries', 55.00, 'Bites', false, true),
('Garlic Shots Half', 'Half portion garlic shots', 55.00, 'Bites', false, true),
('Peri Peri Fries Half', 'Half portion peri peri fries', 60.00, 'Bites', false, true),
('Cheese Shorts Half', 'Half portion cheese shots', 65.00, 'Bites', false, true),
('Cheese Garlic Bread', 'Cheese garlic bread', 70.00, 'Bites', false, true),
('French Fries Full', 'Full portion french fries', 90.00, 'Bites', false, true),
('Garlic Shots Full', 'Full portion garlic shots', 90.00, 'Bites', false, true),
('Peri Peri Fries Full', 'Full portion peri peri fries', 100.00, 'Bites', false, true),
('Cheese Shots Full', 'Full portion cheese shots', 110.00, 'Bites', false, true),
('Cheese Chilli Crostini', 'Cheese and chilli crostini', 120.00, 'Bites', false, true),
('Loaded Fries', 'Loaded french fries', 130.00, 'Bites', false, true),
('Corn Salt & Pepper', 'Corn with salt and pepper', 159.00, 'Bites', false, true);

-- SANDWICH
INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Corn Masala Sandwich', 'Corn masala sandwich', 70.00, 'Sandwich', false, true),
('Sev Onion Sandwich', 'Sev and onion sandwich', 70.00, 'Sandwich', false, true),
('Jam Sandwich', 'Jam sandwich', 70.00, 'Sandwich', false, true),
('Bombay Kaccha Sandwich', 'Bombay style raw sandwich', 70.00, 'Sandwich', false, true),
('Chilli Chatpata Sandwich', 'Spicy tangy sandwich', 80.00, 'Sandwich', false, true),
('Veggie Grill Sandwich', 'Grilled vegetable sandwich', 80.00, 'Sandwich', false, true),
('Cheese Chutney Sandwich', 'Cheese and chutney sandwich', 80.00, 'Sandwich', false, true),
('Chocolate Sandwich', 'Chocolate sandwich', 80.00, 'Sandwich', false, true),
('Corn Mayo Sandwich', 'Corn and mayonnaise sandwich', 80.00, 'Sandwich', false, true),
('Paneer Takatak Sandwich', 'Spicy paneer sandwich', 90.00, 'Sandwich', false, true),
('Tandoori Sandwich', 'Tandoori style sandwich', 90.00, 'Sandwich', false, true),
('Paneer Bhurji Sandwich', 'Paneer bhurji sandwich', 90.00, 'Sandwich', false, true),
('Paneer Special Sandwich', 'Special paneer sandwich', 100.00, 'Sandwich', true, true);

-- MAGGI
INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Plain Maggi', 'Plain maggi noodles', 55.00, 'Maggi', false, true),
('Double Masala Maggi', 'Double spiced maggi', 70.00, 'Maggi', false, true),
('Schezwan Maggi', 'Schezwan style maggi', 80.00, 'Maggi', false, true),
('Corn Cheese Maggi', 'Corn and cheese maggi', 100.00, 'Maggi', false, true),
('Vegetable Maggi', 'Vegetable maggi', 90.00, 'Maggi', false, true),
('Cheese Maggi', 'Cheese maggi', 90.00, 'Maggi', false, true),
('Tandoori Maggi', 'Tandoori style maggi', 90.00, 'Maggi', false, true),
('Cheese & Butter Maggi', 'Cheese and butter maggi', 100.00, 'Maggi', false, true),
('Paneer Maggi', 'Paneer maggi', 110.00, 'Maggi', false, true),
('Fry Maggi', 'Fried maggi', 110.00, 'Maggi', false, true),
('CSB Special Maggi', 'CSB special maggi', 130.00, 'Maggi', true, true);

-- HEALTHY FEAST
INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Vada Pav', 'Mumbai style vada pav', 50.00, 'Healthy Feast', false, true),
('Poha', 'Flattened rice poha', 55.00, 'Healthy Feast', false, true),
('Corn Chaat', 'Corn chaat', 60.00, 'Healthy Feast', false, true),
('Lemon Rice', 'Lemon flavored rice', 60.00, 'Healthy Feast', false, true),
('Nachos Chaat', 'Nachos chaat', 70.00, 'Healthy Feast', false, true),
('Dry Fruit Upma', 'Upma with dry fruits', 80.00, 'Healthy Feast', false, true),
('Pav Bhaji', 'Pav bhaji', 120.00, 'Healthy Feast', true, true);

-- PIZZA
INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Kullhad Pizza', 'Pizza in clay pot', 99.00, 'Pizza', false, true),
('Margherita Pizza', 'Classic margherita pizza', 119.00, 'Pizza', false, true),
('Onion Pizza', 'Onion pizza', 129.00, 'Pizza', false, true),
('Veggie Delight Pizza', 'Mixed vegetable pizza', 135.00, 'Pizza', false, true),
('Sweet Corn Pizza', 'Sweet corn pizza', 145.00, 'Pizza', false, true),
('Paneer Wrapped Pizza', 'Paneer wrapped pizza', 149.00, 'Pizza', false, true),
('Extra Cheese Loaded Pizza', 'Pizza with extra cheese', 149.00, 'Pizza', false, true),
('Mushroom Pizza', 'Mushroom pizza', 149.00, 'Pizza', false, true),
('Paneer Makhni Pizza', 'Paneer makhni pizza', 159.00, 'Pizza', false, true),
('CSB Special Pizza', 'CSB special pizza', 175.00, 'Pizza', true, true),
('Double Burst Overloaded Pizza', 'Double burst overloaded pizza', 209.00, 'Pizza', false, true);

-- CHAI COMBO
INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Plain Garlic Bread + Tea (R) 2 (A/R/C)', 'Garlic bread with 2 teas', 60.00, 'Chai Combo', false, true),
('1 Tea (R) (A/R/C) + Veg Burger', '1 tea with veg burger', 65.00, 'Chai Combo', false, true),
('2 Tea (A/R/C) + Poha', '2 teas with poha', 75.00, 'Chai Combo', false, true),
('2 Maska Bun + 2 Tea (R) (A/R/C)', '2 maska buns with 2 teas', 80.00, 'Chai Combo', false, true),
('2 Tea (A/R/C) + Dry Fruit Upma', '2 teas with dry fruit upma', 100.00, 'Chai Combo', false, true),
('French Fries + 2 Tea (R) (A/R/C)', 'French fries with 2 teas', 100.00, 'Chai Combo', true, true);

-- TOAST
INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Kadak Bread & Butter Toast', 'Crispy bread and butter toast', 40.00, 'Toast', false, true),
('Butter & Honey Toast', 'Butter and honey toast', 59.00, 'Toast', false, true),
('Creamy Buttery Toast', 'Creamy butter toast', 89.00, 'Toast', false, true);

-- MEAL COMBO
INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Veg Burger + French Fries + Strawberry Ice Crusher', 'Veg burger combo', 190.00, 'Meal Combo', false, true),
('Veg Cheese Burger + French Fries + Blue Lagoon Mojito', 'Veg cheese burger combo', 210.00, 'Meal Combo', false, true),
('Bombay Kaccha Sandwich + French Fries + Lemon Ice Tea', 'Bombay sandwich combo', 210.00, 'Meal Combo', false, true),
('Vegetable Maggi + Cheese Garlic Bread + Classic Mojito', 'Maggi combo', 210.00, 'Meal Combo', false, true),
('Double Masala Maggi + French Fries + Plain Cold Coffee', 'Double masala maggi combo', 220.00, 'Meal Combo', false, true),
('Cheese Chutney Sandwich + French Fries + Plain Cold Coffee', 'Cheese chutney sandwich combo', 230.00, 'Meal Combo', false, true),
('Veggie Delight Pizza + Corn Masala Sandwich + French Fries(H)', 'Pizza combo', 250.00, 'Meal Combo', true, true);

-- MONSOON DELIGHT
INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Onion Pakoda (8 PC)', 'Onion pakoda - 8 pieces', 60.00, 'Monsoon Delight', false, true),
('Aloo Bread Pakoda (8 PC)', 'Potato bread pakoda - 8 pieces', 60.00, 'Monsoon Delight', false, true),
('Mix Veg Pakoda (8 PC)', 'Mixed vegetable pakoda - 8 pieces', 80.00, 'Monsoon Delight', false, true),
('Paneer Pakoda (8 PC)', 'Paneer pakoda - 8 pieces', 120.00, 'Monsoon Delight', true, true);

-- ICE TEA
INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Plain Ice Tea', 'Plain iced tea', 70.00, 'Ice Tea', false, true),
('Lemon Ice Tea', 'Lemon iced tea', 80.00, 'Ice Tea', false, true),
('Classic Ice Tea', 'Classic iced tea', 90.00, 'Ice Tea', false, true),
('Peach Ice Tea', 'Peach iced tea', 95.00, 'Ice Tea', true, true);

-- MILK SHAKE
INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Vanilla Shake', 'Vanilla milkshake', 110.00, 'Milk Shake', false, true),
('Strawberry Shake', 'Strawberry milkshake', 110.00, 'Milk Shake', false, true),
('Bubblegum Shake', 'Bubblegum milkshake', 110.00, 'Milk Shake', false, true),
('Romance Candy Shake', 'Romance candy milkshake', 110.00, 'Milk Shake', false, true),
('Butter Scotch Shake', 'Butterscotch milkshake', 120.00, 'Milk Shake', false, true),
('Oreo Shake', 'Oreo milkshake', 130.00, 'Milk Shake', false, true),
('Kitkat Shake', 'Kitkat milkshake', 130.00, 'Milk Shake', false, true),
('Cream Jelly Shake', 'Cream jelly milkshake', 130.00, 'Milk Shake', false, true),
('Dairy Milk Shake', 'Dairy milk milkshake', 130.00, 'Milk Shake', false, true),
('Brownie Shake', 'Brownie milkshake', 130.00, 'Milk Shake', false, true),
('Black Currant Shake', 'Black currant milkshake', 130.00, 'Milk Shake', false, true),
('Ferrero Rocher Shake', 'Ferrero rocher milkshake', 180.00, 'Milk Shake', true, true);

-- ICE CRUSHER (300ML)
INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Strawberry Crusher', 'Strawberry ice crusher - 300ML', 65.00, 'Ice Crusher', false, true),
('Pineapple Crusher', 'Pineapple ice crusher - 300ML', 65.00, 'Ice Crusher', false, true),
('Orange Crusher', 'Orange ice crusher - 300ML', 65.00, 'Ice Crusher', false, true),
('Kiwi Crusher', 'Kiwi ice crusher - 300ML', 70.00, 'Ice Crusher', false, true),
('Blueberry Crusher', 'Blueberry ice crusher - 300ML', 70.00, 'Ice Crusher', true, true);

-- LEMONADE (300ML)
INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Strawberry Lemonade', 'Strawberry lemonade - 300ML', 80.00, 'Lemonade', false, true),
('Green Mint Lemonade', 'Green mint lemonade - 300ML', 80.00, 'Lemonade', false, true),
('Litchi Lemonade', 'Litchi lemonade - 300ML', 80.00, 'Lemonade', false, true),
('Orange Lemonade', 'Orange lemonade - 300ML', 80.00, 'Lemonade', false, true),
('Pineapple Lemonade', 'Pineapple lemonade - 300ML', 80.00, 'Lemonade', false, true),
('Kiwi Lemonade', 'Kiwi lemonade - 300ML', 80.00, 'Lemonade', false, true),
('Masala Lemonade', 'Spiced lemonade - 300ML', 80.00, 'Lemonade', false, true),
('Ginger Lemonade', 'Ginger lemonade - 300ML', 80.00, 'Lemonade', true, true);

-- SODA
INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Lime Soda', 'Lime soda', 40.00, 'Soda', false, true);

-- MOJITO (300ML)
INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Classic Mojito', 'Classic mojito - 300ML', 90.00, 'Mojito', false, true),
('Raspberry Mojito', 'Raspberry mojito - 300ML', 90.00, 'Mojito', false, true),
('Blue Lagoon', 'Blue lagoon mojito - 300ML', 90.00, 'Mojito', false, true),
('Passion Fruit Mojito', 'Passion fruit mojito - 300ML', 90.00, 'Mojito', false, true),
('Tamarind Mojito', 'Tamarind mojito - 300ML', 90.00, 'Mojito', false, true),
('Chatpata Virgin Mojito', 'Spicy tangy virgin mojito - 300ML', 100.00, 'Mojito', false, true),
('Mango Cool Burst', 'Mango cool burst - 300ML', 100.00, 'Mojito', false, true),
('Black Cobra', 'Black cobra mojito - 300ML', 100.00, 'Mojito', true, true);

-- DESSERT
INSERT INTO menu_items (name, description, price, category, featured, available) VALUES
('Brownie Hot Chocolate with Icecream', 'Brownie hot chocolate with ice cream', 80.00, 'Dessert', true, true);
