// @ts-check

import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'

import { COMPANY } from './src/config/company.ts'

// https://astro.build/config
export default defineConfig({
	// Canonical host. Must match COMPANY.url and the Sitemap: line in
	// public/robots.txt — a mismatch points crawlers at the wrong domain.
	site: COMPANY.url,
	trailingSlash: 'never',

	adapter: vercel(),
	// Static by default; only /api/request-inspection opts out via
	// `export const prerender = false`.
	output: 'static',

	vite: {
		plugins: [tailwindcss()],
	},

	integrations: [react(), sitemap()],

	// The dev toolbar renders its own headings inside an open shadow root, which
	// Playwright pierces — it makes "exactly one <h1>" assertions flaky. The E2E
	// suite runs against `astro dev`, so switch it off there.
	devToolbar: { enabled: !process.env.PLAYWRIGHT },

	// Static HTML fallbacks. The real edge 301s live in vercel.json, and
	// tests/e2e/redirects.spec.ts enforces the two agree.
	redirects: {
		'/index.html': '/',
		'/home': '/',
		'/services/pest-control': '/services/residential-commercial-pest-control',
		'/service-areas': '/',
	},
})
