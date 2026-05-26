import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_mail/gmail/v1';
const TO_EMAIL = 'catalinarete@gmail.com';

function b64url(s: string) {
  return btoa(unescape(encodeURIComponent(s)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function buildRaw(subject: string, body: string) {
  const msg = [
    `To: ${TO_EMAIL}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset="UTF-8"',
    '',
    body,
  ].join('\r\n');
  return b64url(msg);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const GOOGLE_MAIL_API_KEY = Deno.env.get('GOOGLE_MAIL_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY missing');
    if (!GOOGLE_MAIL_API_KEY) throw new Error('GOOGLE_MAIL_API_KEY missing');

    const { name, email, attending, event, is_child } = await req.json();

    const status = attending ? '✓ attending' : '✗ declined';
    const subject = `New RSVP: ${name} (${status})`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Event: ${event}`,
      `Attending: ${attending ? 'Yes' : 'No'}`,
      `Child: ${is_child ? 'Yes' : 'No'}`,
    ].join('\n');

    const raw = buildRaw(subject, body);

    const res = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': GOOGLE_MAIL_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(`Gmail send failed [${res.status}]: ${JSON.stringify(data)}`);

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('notify-rsvp error:', err);
    const message = err instanceof Error ? err.message : 'unknown';
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});