const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    
    let query = supabase
      .from('menu_items')
      .select('*')
      .eq('available', true);
    
    if (category) {
      query = query.eq('category', category);
    }
    
    if (featured === 'true') {
      query = query.eq('featured', true);
    }
    
    query = query.order('created_at', { ascending: false });
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single menu item
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('id', req.params.id)
      .single();
    
    if (error) throw error;
    
    if (!data) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create menu item (Admin only - add auth middleware later)
router.post('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .insert([req.body])
      .select()
      .single();
    
    if (error) throw error;
    
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update menu item
router.put('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single();
    
    if (error) throw error;
    
    if (!data) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete menu item
router.delete('/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', req.params.id);
    
    if (error) throw error;
    
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
