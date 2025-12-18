// Quick test script to check Supabase connection
const supabase = require('./config/supabase');

async function testConnection() {
  console.log('Testing Supabase connection...\n');
  
  try {
    // Test 1: Check if we can query the table
    console.log('1. Testing table connection...');
    const { data, error, count } = await supabase
      .from('menu_items')
      .select('*', { count: 'exact' })
      .limit(5);
    
    if (error) {
      console.error('❌ Error:', error.message);
      return;
    }
    
    console.log(`✅ Connected! Found ${count || 0} items in database\n`);
    
    if (count === 0) {
      console.log('⚠️  Database is EMPTY! You need to run seed.sql in Supabase SQL Editor.\n');
      console.log('Go to: https://supabase.com/dashboard → Your Project → SQL Editor');
      console.log('Copy and run the content from supabase/seed.sql\n');
    } else {
      console.log('Sample items:');
      data.forEach(item => {
        console.log(`  - ${item.name}: ₹${item.price}`);
      });
    }
    
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    console.log('\nCheck your backend/.env file has:');
    console.log('  SUPABASE_URL=your_url');
    console.log('  SUPABASE_ANON_KEY=your_key');
  }
}

testConnection();

