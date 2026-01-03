import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        if (req.method === 'POST') {
            const url = new URL(req.url)
            // Check if path ends with /login (optional as it's the only helper right now)
            return new Response(JSON.stringify({ message: 'Auth endpoint - to be implemented' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 })
        }

        return new Response(JSON.stringify({ message: 'Method not allowed' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 405 })

    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 })
    }
})
