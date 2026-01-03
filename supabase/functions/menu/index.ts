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
        const { pathname } = url
        // pathname will be something like /menu or /menu/123 if deployed at /menu
        // But locally it might be complicated. Let's assume standard REST pattern mapping.
        // If the function is invoked as "menu", then the path inside might just be "/" or "/123" depending on invocation.
        // However, with Edge Functions, usually one function handles one "route prefix".
        // Let's implement logic based on method and optional ID parameter if passed via query or path.
        // To keep it simple and similar to Express, I'll parse the URL path locally.
        // Note: In Supabase Edge Functions, `req.url` gives the full URL.

        // We'll use a simple routing mechanism based on HTTP method.

        const id = url.searchParams.get('id') // Support ?id=... for individual items if convenient, or parse path.

        if (req.method === 'GET') {
            if (id) {
                // Get single menu item
                const { data, error } = await supabaseClient
                    .from('menu_items')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (error) throw error
                if (!data) return new Response(JSON.stringify({ message: 'Menu item not found' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 })

                return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 })
            } else {
                // Get all menu items
                const category = url.searchParams.get('category')
                const featured = url.searchParams.get('featured')

                let query = supabaseClient
                    .from('menu_items')
                    .select('*')
                    .eq('available', true)

                if (category && category !== 'All') {
                    query = query.eq('category', category)
                }

                if (featured === 'true') {
                    query = query.eq('featured', true)
                }

                query = query.order('created_at', { ascending: false })

                const { data, error } = await query

                if (error) throw error

                return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 })
            }
        }

        if (req.method === 'POST') {
            await checkAdmin()
            const body = await req.json()
            const { data, error } = await supabaseClient
                .from('menu_items')
                .insert([body])
                .select()
                .single()

            if (error) throw error

            return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 201 })
        }

        if (req.method === 'PUT') {
            await checkAdmin()
            if (!id) return new Response(JSON.stringify({ message: 'ID required' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 })

            const body = await req.json()
            const { data, error } = await supabaseClient
                .from('menu_items')
                .update(body)
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            if (!data) return new Response(JSON.stringify({ message: 'Menu item not found' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 })

            return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 })
        }

        if (req.method === 'DELETE') {
            await checkAdmin()
            if (!id) return new Response(JSON.stringify({ message: 'ID required' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 })

            const { error } = await supabaseClient
                .from('menu_items')
                .delete()
                .eq('id', id)

            if (error) throw error

            return new Response(JSON.stringify({ message: 'Menu item deleted successfully' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 })
        }

        return new Response(JSON.stringify({ message: 'Method not allowed' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 405 })

    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 })
    }
})
