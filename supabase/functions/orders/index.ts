import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        )

        // Helper to check admin role
        const checkAdmin = async () => {
            const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
            if (userError || !user) throw new Error('Unauthorized')

            const { data: profile, error: profileError } = await supabaseClient
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single()

            if (profileError || !profile || profile.role !== 'admin') {
                throw new Error('Forbidden: Admin access required')
            }
        }

        const url = new URL(req.url)
        const id = url.searchParams.get('id')

        if (req.method === 'GET') {
            if (id) {
                // Get single order
                const { data, error } = await supabaseClient
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
                    .eq('id', id)
                    .single()

                if (error) throw error
                if (!data) return new Response(JSON.stringify({ message: 'Order not found' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 })

                return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 })
            } else {
                // Get all orders - ADMIN ONLY
                try {
                    await checkAdmin()
                } catch (e) {
                    return new Response(JSON.stringify({ message: e.message }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 })
                }
                const { data, error } = await supabaseClient
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
                    .order('created_at', { ascending: false })

                if (error) throw error

                return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 })
            }
        }

        if (req.method === 'POST') {
            const body = await req.json()
            const { customerName, customerEmail, customerPhone, items } = body

            // Calculate total amount
            const totalAmount = items.reduce((sum: any, item: any) => sum + (item.price * item.quantity), 0)

            // Insert order
            const { data: order, error: orderError } = await supabaseClient
                .from('orders')
                .insert([{
                    customer_name: customerName,
                    customer_email: customerEmail,
                    customer_phone: customerPhone,
                    total_amount: totalAmount,
                    status: 'pending'
                }])
                .select()
                .single()

            if (orderError) throw orderError

            // Insert order items
            const orderItems = items.map((item: any) => ({
                order_id: order.id,
                menu_item_id: item.menuItemId || item.id,
                quantity: item.quantity,
                price: item.price
            }))

            const { error: itemsError } = await supabaseClient
                .from('order_items')
                .insert(orderItems)

            if (itemsError) throw itemsError

            // Fetch complete order with items
            const { data: completeOrder, error: fetchError } = await supabaseClient
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
                .single()

            if (fetchError) throw fetchError

            return new Response(JSON.stringify(completeOrder), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 201 })
        }

        if (req.method === 'PUT') {
            // Assuming this is for status update as per original code - ADMIN ONLY
            try {
                await checkAdmin()
            } catch (e) {
                return new Response(JSON.stringify({ message: e.message }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 })
            }
            const body = await req.json()
            const { status } = body

            if (!id) return new Response(JSON.stringify({ message: 'ID required' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 })

            const { data, error } = await supabaseClient
                .from('orders')
                .update({ status })
                .eq('id', id)
                .select(`
          *,
          order_items (
            id,
            quantity,
            price,
            menu_item:menu_items (*)
          )
        `)
                .single()

            if (error) throw error
            if (!data) return new Response(JSON.stringify({ message: 'Order not found' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 })

            return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 })
        }

        return new Response(JSON.stringify({ message: 'Method not allowed' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 405 })

    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 })
    }
})
