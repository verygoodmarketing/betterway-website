import type { APIRoute } from 'astro'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || ''
    let data: Record<string, string> = {}
    if (contentType.includes('application/json')) {
      data = await request.json()
    } else {
      const form = await request.formData()
      data = Object.fromEntries(form.entries()) as Record<string, string>
    }

    // Honeypot check
    if ((data.company || '').toString().trim() !== '') {
      return new Response(null, { status: 204 })
    }

    const email = (data.email || '').toString().trim()
    const name = (data.name || '').toString().trim()
    const zip = (data.zip || '').toString().trim()
    const phone = (data.phone || '').toString().trim()

    if (!email || !name || !zip || !phone) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
    }

    // Attempt to send via Resend if configured
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const RESEND_TO_EMAIL = process.env.RESEND_TO_EMAIL
    const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'no-reply@betterway.local'

    if (RESEND_API_KEY && RESEND_TO_EMAIL) {
      const subject = `New Inspection Request — ${name}`
      const text = `New request inspection\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nZip: ${zip}`

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: RESEND_TO_EMAIL,
          subject,
          text,
        }),
      })

      if (!res.ok) {
        console.warn('Resend email failed', await res.text())
        return new Response(JSON.stringify({ error: 'Unable to send email' }), { status: 502 })
      }
      return new Response(JSON.stringify({ ok: true }), { status: 200 })
    }

    // Fallback: accept the submission without email if not configured
    console.log('[Request Inspection][No Email Config]', { email, name, zip, phone })
    return new Response(JSON.stringify({ ok: true, emailSent: false }), { status: 202 })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}


