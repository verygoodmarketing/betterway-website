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

type LeadPayload = {
	name: string
	phone: string
	email: string
	zip: string
	service: string
	submittedAt: string
}

type LeadProvider = 'formspree' | 'highlevel'

function leadProvider(): LeadProvider {
	const provider = env('LEAD_PROVIDER').toLowerCase().trim()
	if (provider === 'highlevel') return 'highlevel'
	return 'formspree'
}

async function sendViaFormspree(lead: LeadPayload) {
	const endpoint = env('FORMSPREE_ENDPOINT')
	if (!endpoint) {
		return {
			ok: false,
			status: 500,
			error: 'Formspree endpoint is not configured',
		}
	}

	const body = {
		name: lead.name,
		phone: lead.phone,
		email: lead.email || '(not given)',
		zip: lead.zip,
		service: serviceName(lead.service),
		source: 'Website request inspection form',
		submittedAt: `${lead.submittedAt} (${COMPANY.timezone})`,
	}

	const res = await fetch(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify(body),
	})

	if (!res.ok) {
		return { ok: false, status: 502, error: 'Unable to send Formspree submission' }
	}
	return { ok: true, status: 200 }
}

async function sendViaHighLevel(lead: LeadPayload) {
	const apiKey = env('HIGHLEVEL_API_KEY')
	const locationId = env('HIGHLEVEL_LOCATION_ID')
	const endpoint = env('HIGHLEVEL_ENDPOINT') || 'https://services.leadconnectorhq.com/contacts/upsert'

	if (!apiKey || !locationId) {
		return {
			ok: false,
			status: 500,
			error: 'HighLevel credentials are not configured',
		}
	}

	const body = {
		locationId,
		firstName: lead.name,
		phone: lead.phone,
		email: lead.email || undefined,
		source: 'Website request inspection form',
		tags: ['website', 'request-inspection'],
		customFields: [
			{ key: 'zip', field_value: lead.zip },
			{ key: 'service', field_value: serviceName(lead.service) },
			{ key: 'submitted_at', field_value: `${lead.submittedAt} (${COMPANY.timezone})` },
		],
	}

	const res = await fetch(endpoint, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			Version: '2021-07-28',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})

	if (!res.ok) {
		return { ok: false, status: 502, error: 'Unable to send HighLevel submission' }
	}
	return { ok: true, status: 200 }
}

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

		// Serverless runs in UTC. Stamp the lead in the company's own timezone so
		// "called at 7:15" in the CRM means what the office thinks it means.
		const submittedAt = new Date().toLocaleString('en-US', { timeZone: COMPANY.timezone })
		const lead: LeadPayload = { name, phone, email, zip, service, submittedAt }
		const provider = leadProvider()

		let result: { ok: boolean; status: number; error?: string }
		if (provider === 'highlevel') result = await sendViaHighLevel(lead)
		else result = await sendViaFormspree(lead)

		if (!result.ok) {
			console.warn(`[Request Inspection][${provider}]`, result.error || 'Submission failed')
			return new Response(JSON.stringify({ error: result.error || 'Submission failed' }), {
				status: result.status,
				headers: { 'content-type': 'application/json' },
			})
		}

		return new Response(JSON.stringify({ ok: true, provider }), {
			status: 200,
			headers: { 'content-type': 'application/json' },
		})
	} catch {
		return new Response(JSON.stringify({ error: 'Server error' }), {
			status: 500,
			headers: { 'content-type': 'application/json' },
		})
	}
}
