import type { APIRoute } from 'astro'
import { COMPANY, SERVICES } from '../../config/company'

export const prerender = false

/**
 * Read from both sources. Vite inlines `import.meta.env` at build time, while
 * Vercel injects real secrets into `process.env` at runtime — reading only one
 * gives you a value that works locally and is undefined in production.
 */
function env(key: string): string {
	const fromProcess = typeof process !== 'undefined' ? process.env?.[key] : undefined
	const fromMeta = (import.meta as any).env?.[key]
	return (fromProcess || fromMeta || '').toString()
}

const serviceName = (slug: string) =>
	SERVICES.find(s => s.slug === slug)?.name || slug || 'Not specified'

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

		// Honeypot: a real user never sees this field, so anything in it is a bot.
		// Return 204 rather than an error so the bot cannot tell it was caught.
		if ((data.company || '').toString().trim() !== '') {
			return new Response(null, { status: 204 })
		}

		const email = (data.email || '').toString().trim()
		const name = (data.name || '').toString().trim()
		const zip = (data.zip || '').toString().trim()
		const phone = (data.phone || '').toString().trim()
		const service = (data.service || '').toString().trim()

		// Email is deliberately not required — see FormRequestInspection.astro.
		// The office calls leads back, so a phone number is the only hard need.
		if (!name || !zip || !phone) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), {
				status: 400,
				headers: { 'content-type': 'application/json' },
			})
		}

		const RESEND_API_KEY = env('RESEND_API_KEY')
		const RESEND_TO_EMAIL = env('RESEND_TO_EMAIL')
		const FROM_EMAIL = env('RESEND_FROM_EMAIL') || 'no-reply@betterwaypestcontrol.com'

		// Serverless runs in UTC. Stamp the lead in the company's own timezone so
		// "called at 7:15" in the CRM means what the office thinks it means.
		const submittedAt = new Date().toLocaleString('en-US', { timeZone: COMPANY.timezone })

		if (RESEND_API_KEY && RESEND_TO_EMAIL) {
			const subject = `New Inspection Request — ${name}`
			const text = [
				'New inspection request',
				'',
				`Name:     ${name}`,
				`Phone:    ${phone}`,
				`Email:    ${email || '(not given)'}`,
				`Zip:      ${zip}`,
				`Service:  ${serviceName(service)}`,
				`Received: ${submittedAt} (${COMPANY.timezone})`,
			].join('\n')

			const res = await fetch('https://api.resend.com/emails', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${RESEND_API_KEY}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ from: FROM_EMAIL, to: RESEND_TO_EMAIL, subject, text }),
			})

			if (!res.ok) {
				console.warn('Resend email failed', await res.text())
				return new Response(JSON.stringify({ error: 'Unable to send email' }), {
					status: 502,
					headers: { 'content-type': 'application/json' },
				})
			}
			return new Response(JSON.stringify({ ok: true }), {
				status: 200,
				headers: { 'content-type': 'application/json' },
			})
		}

		// No mail provider configured yet — accept the lead so the form still works,
		// and log it so it is at least recoverable from the Vercel function logs.
		console.log('[Request Inspection][No Email Config]', {
			name,
			phone,
			email,
			zip,
			service: serviceName(service),
			submittedAt,
		})
		return new Response(JSON.stringify({ ok: true, emailSent: false }), {
			status: 202,
			headers: { 'content-type': 'application/json' },
		})
	} catch {
		return new Response(JSON.stringify({ error: 'Server error' }), {
			status: 500,
			headers: { 'content-type': 'application/json' },
		})
	}
}
