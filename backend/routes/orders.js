const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          quantity,
          price,
          menu_item:menu_items (*)
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          quantity,
          price,
          menu_item:menu_items (*)
        )
      `)
      .eq('id', req.params.id)
      .single();
    
    if (error) throw error;
    
    if (!data) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new order
router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, items } = req.body;
    
    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Insert order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        total_amount: totalAmount,
        status: 'pending'
      }])
      .select()
      .single();
    
    if (orderError) throw orderError;
    
    // Insert order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      menu_item_id: item.menuItemId || item.id,
      quantity: item.quantity,
      price: item.price
    }));
    
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);
    
    if (itemsError) throw itemsError;
    
    // Fetch complete order with items
    const { data: completeOrder, error: fetchError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          quantity,
          price,
          menu_item:menu_items (*)
        )
      `)
      .eq('id', order.id)
      .single();
    
    if (fetchError) throw fetchError;
    
    res.status(201).json(completeOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update order status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', req.params.id)
      .select(`
        *,
        order_items (
          id,
          quantity,
          price,
          menu_item:menu_items (*)
        )
      `)
      .single();
    
    if (error) throw error;
    
    if (!data) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
