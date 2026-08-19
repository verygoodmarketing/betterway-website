// @ts-check

import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'

import { COMPANY } from './src/config/company.ts'

// https://astro.build/config
export default defineConfig({
	// Canonical host. Must match COMPANY.url and the Sitemap: line in
	// public/robots.txt — a mismatch points crawlers at the wrong domain.
	site: COMPANY.url,
	trailingSlash: 'never',

	adapter: vercel({
		imageService: false,
	}),
	// Static by default; only /api/request-inspection opts out via
	// `export const prerender = false`.
	output: 'static',

	// There is deliberately no UI framework integration here. The only thing that
	// ever needed one was a nav dropdown, which is now ~40 lines of Astro plus a
	// details element — it shipped 250KB of JS to every phone to do that.
	integrations: [sitemap()],

	image: {
		// Hero and logo go through astro:assets so they emit AVIF/WebP at the
		// widths actually requested. Anything left in public/ is served
		// unoptimized at full size.
		responsiveStyles: true,
	},

	build: {
		// One stylesheet beats a request per page on a slow mobile connection.
		inlineStylesheets: 'auto',
	},

	vite: {
		plugins: [tailwindcss()],
		build: {
			cssMinify: 'lightningcss',
		},
	},

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
