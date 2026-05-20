import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

// Reveal: midnight NL time after the NL celebration (Sep 5, 2026 -> reveal Sep 6 00:00 Europe/Amsterdam = +02:00)
const REVEAL_AT_NL = new Date('2026-09-06T00:00:00+02:00')

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const now = new Date()
  const url = new URL(req.url)
  const previewCode = url.searchParams.get('preview')
  const expectedCode = Deno.env.get('PHOTO_DELETE_CODE')
  const previewUnlock = !!previewCode && !!expectedCode && previewCode === expectedCode
  const revealed = now >= REVEAL_AT_NL || previewUnlock

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  if (!revealed) {
    return new Response(
      JSON.stringify({ revealed: false, revealAt: REVEAL_AT_NL.toISOString(), photos: [] }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const { data, error } = await supabase
    .from('photos')
    .select('id, uploader_name, storage_path, created_at')
    .eq('event', 'netherlands')
    .order('created_at', { ascending: false })

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const bucket = 'wedding-photos-nl'
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const photos = (data ?? []).map((p) => ({
    id: p.id,
    uploader_name: p.uploader_name,
    created_at: p.created_at,
    url: `${supabaseUrl}/storage/v1/object/public/${bucket}/${p.storage_path}`,
  }))

  return new Response(
    JSON.stringify({ revealed: true, revealAt: REVEAL_AT_NL.toISOString(), photos }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
})