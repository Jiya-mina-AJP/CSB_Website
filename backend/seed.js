const supabase = require('./config/supabase');
const dotenv = require('dotenv');

dotenv.config();

const menuItems = [
  // Chains/Tea
  {
    name: 'Adarak Chai',
    description: 'Fresh ginger infused tea',
    price: 15.00,
    category: 'Tea',
    featured: true,
    available: true,
    image: '/images/menu/Adarak Chai_.jpg'
  },
  {
    name: 'Masala Chai',
    description: 'Traditional spiced tea',
    price: 20.00,
    category: 'Tea',
    featured: true,
    available: true,
    image: '/images/menu/Masala Chai_.jpg'
  },
  {
    name: 'Elaichi Chai',
    description: 'Cardamom flavored tea',
    price: 15.00,
    category: 'Tea',
    featured: false,
    available: true,
    image: '/images/menu/Elaichi Chai_.jpg'
  },
  {
    name: 'Chocolate Chai',
    description: 'Unique blend of chocolate and tea',
    price: 25.00,
    category: 'Tea',
    featured: true,
    available: true,
    image: '/images/menu/Chocolate Chai.jpg'
  },
  {
    name: 'Rose Chai',
    description: 'Aromatic rose flavored tea',
    price: 25.00,
    category: 'Tea',
    featured: false,
    available: true,
    image: '/images/menu/Rose Chai_.jpg'
  },
  {
    name: 'Paan Chai',
    description: 'Refresh your senses with Paan flavor',
    price: 25.00,
    category: 'Tea',
    featured: false,
    available: true,
    image: '/images/menu/Paan Chai.jpg'
  },
  // Coffee
  {
    name: 'Cold Coffee',
    description: 'Chilled coffee classic',
    price: 60.00,
    category: 'Coffee',
    featured: true,
    available: true,
    image: '/images/menu/Cold Coffee.jpg'
  },
  {
    name: 'CSB Special Cold Coffee',
    description: 'Our signature cold coffee blend',
    price: 80.00,
    category: 'Coffee',
    featured: true,
    available: true,
    image: '/images/menu/CSB Special Cold Coffee_.jpg'
  },
  {
    name: 'Chocolate Coffee',
    description: 'Coffee with a chocolate twist',
    price: 70.00,
    category: 'Coffee',
    featured: false,
    available: true,
    image: '/images/menu/Chocolate Coffee.jpg'
  },
  // Snacks
  {
    name: 'Muska Bun',
    description: 'Soft bun with generous butter',
    price: 40.00,
    category: 'Snacks',
    featured: true,
    available: true,
    image: '/images/menu/Muska Bun.jpg'
  },
  {
    name: 'Veggie Grilled Sandwich',
    description: 'Grilled sandwich loaded with fresh veggies',
    price: 80.00,
    category: 'Snacks',
    featured: false,
    available: true,
    image: '/images/menu/Veggie Grilled Sandwich_.jpg'
  },
  {
    name: 'Extra Loaded French Fries',
    description: 'Crispy fries with special toppings',
    price: 90.00,
    category: 'Snacks',
    featured: true,
    available: true,
    image: '/images/menu/Extra Loaded French Fries_.jpg'
  },
  {
    name: 'Cheesy Nuggets',
    description: 'Golden fried cheesy bites',
    price: 85.00,
    category: 'Snacks',
    featured: false,
    available: true,
    image: '/images/menu/Cheesy Nuggets_.jpg'
  },
  // Food
  {
    name: 'Margherita Pizza',
    description: 'Classic cheese pizza with basil',
    price: 150.00,
    category: 'Snacks',
    featured: false,
    available: true,
    image: '/images/menu/Margherita Pizza_.jpg'
  },
  {
    name: 'Red Sauce Pasta',
    description: 'Tangy tomato sauce pasta',
    price: 120.00,
    category: 'Snacks',
    featured: false,
    available: true,
    image: '/images/menu/Red Sauce Pasta.jpg'
  },
  // Beverages
  {
    name: 'Brownie Shake',
    description: 'Thick shake with brownie pieces',
    price: 100.00,
    category: 'Beverages',
    featured: true,
    available: true,
    image: '/images/menu/Brownie Shake_.jpg'
  },
  {
    name: 'Classic Ice Tea',
    description: 'Refreshing lemon ice tea',
    price: 60.00,
    category: 'Beverages',
    featured: false,
    available: true,
    image: '/images/menu/Classic Ice Tea.jpg'
  },
  {
    name: 'Kala Khata Ice Crusher',
    description: 'Tangy and sweet ice crusher',
    price: 50.00,
    category: 'Beverages',
    featured: false,
    available: true,
    image: '/images/menu/Kala Khata Ice Crusher_.jpg'
  },
  {
    name: 'Lemon Tea',
    description: 'Hot lemon tea',
    price: 20.00,
    category: 'Tea',
    featured: false,
    available: true,
    image: '/images/menu/Lemon Tea_.jpg'
  }
];

async function seedDatabase() {
  try {
    console.log('Starting database seed...');

    // Check connection
    const { data: testData, error: testError } = await supabase
      .from('menu_items')
      .select('count')
      .limit(1);

    if (testError) {
      throw new Error(`Supabase connection failed: ${testError.message}`);
    }

    console.log('Connected to Supabase');

    // Clear existing menu items (optional - comment out if you want to keep existing data)
    // const { error: deleteError } = await supabase
    //   .from('menu_items')
    //   .delete()
    //   .neq('id', '00000000-0000-0000-0000-000000000000');

    // if (deleteError) {
    //   console.warn('Warning: Could not clear existing items:', deleteError.message);
    // } else {
    //   console.log('Cleared existing menu items');
    // }

    // Insert new menu items
    const { data, error } = await supabase
      .from('menu_items')
      .insert(menuItems)
      .select();

    if (error) {
      throw error;
    }

    console.log(`Successfully inserted ${data.length} menu items`);
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
