const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/menu', require('./routes/menu'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/auth', require('./routes/auth'));

// Test Supabase connection
const supabase = require('./config/supabase');
supabase.from('menu_items').select('count').limit(1)
  .then(() => console.log('Supabase Connected'))
  .catch(err => console.error('Supabase connection error:', err));

const PORT = process.env.PORT || 5000;

// For Vercel, export the app instead of listening
if (process.env.VERCEL) {
  module.exports = app;
} else {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'PlayCafe API is running!' });
});

