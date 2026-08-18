import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

/**
 * Contract test. The redirect list lives in two places — vercel.json (the real
 * edge 301s) and astro.config.mjs (static HTML fallbacks). This test is what
 * stops them drifting apart. No browser required.
 */

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')

const vercelConfig = JSON.parse(readFileSync(resolve(root, 'vercel.json'), 'utf8'))
const astroConfigSource = readFileSync(resolve(root, 'astro.config.mjs'), 'utf8')

test('vercel.json redirects are all permanent', () => {
	for (const redirect of vercelConfig.redirects) {
		expect(redirect.permanent, `${redirect.source} is not a 301`).toBe(true)
	}
})

test('every vercel redirect has an astro.config fallback', () => {
	for (const redirect of vercelConfig.redirects) {
		expect(
			astroConfigSource,
			`astro.config.mjs is missing a fallback for ${redirect.source}`,
		).toContain(`'${redirect.source}'`)
		expect(
			astroConfigSource,
			`astro.config.mjs has the wrong destination for ${redirect.source}`,
		).toContain(`'${redirect.destination}'`)
	}
})

test('trailingSlash agrees between vercel.json and astro.config', () => {
	expect(vercelConfig.trailingSlash).toBe(false)
	expect(astroConfigSource).toContain("trailingSlash: 'never'")
})

test('robots.txt sitemap points at the canonical host', () => {
	const robots = readFileSync(resolve(root, 'public/robots.txt'), 'utf8')
	expect(robots).toContain('https://betterwaypestcontrol.com/sitemap-index.xml')
})
