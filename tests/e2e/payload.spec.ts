import { test, expect } from '@playwright/test'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join, extname } from 'node:path'

/**
 * Payload contract. No browser: the E2E suite runs against `astro dev`, which
 * serves every module over HTTP, so a network-based "did we ship a JS bundle"
 * assertion can never pass there. These read the source and the build output
 * instead, which is what actually reaches a phone.
 */

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')

function walk(dir: string, out: string[] = []): string[] {
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry)
		if (statSync(full).isDirectory()) walk(full, out)
		else out.push(full)
	}
	return out
}

test('no client-side framework islands are used', () => {
	// A single `client:load` would pull a framework runtime back onto every page
	// that renders the component. If one is ever needed, it should be a decision
	// someone makes deliberately by deleting this test.
	const offenders = walk(resolve(root, 'src'))
		.filter(f => ['.astro', '.md'].includes(extname(f)))
		.filter(f => /client:(load|idle|visible|media|only)/.test(readFileSync(f, 'utf8')))
		.map(f => f.replace(`${root}/`, ''))

	expect(offenders, `client directives found in: ${offenders.join(', ')}`).toEqual([])
})

test('no UI framework integration is configured', () => {
	const config = readFileSync(resolve(root, 'astro.config.mjs'), 'utf8')
	for (const pkg of ['@astrojs/react', '@astrojs/preact', '@astrojs/svelte', '@astrojs/vue']) {
		expect(config, `${pkg} is back in astro.config.mjs`).not.toContain(pkg)
	}
})

test('no UI framework is in package.json dependencies', () => {
	const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
	const deps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies })
	for (const banned of ['react', 'react-dom', '@astrojs/react', 'vue', 'svelte']) {
		expect(deps, `${banned} is back in package.json`).not.toContain(banned)
	}
})

test('no web font files are committed or referenced', () => {
	const fontExts = ['.woff', '.woff2', '.ttf', '.otf', '.eot']
	const fontFiles = walk(resolve(root, 'public')).filter(f => fontExts.includes(extname(f)))
	expect(fontFiles, 'web font files found in public/').toEqual([])

	const css = readFileSync(resolve(root, 'src/styles/global.css'), 'utf8')
	expect(css, 'global.css imports a remote font').not.toMatch(/@import\s+url\(/)
	expect(css, 'global.css declares an @font-face').not.toContain('@font-face')
})

test('public/ carries no unoptimized large images', () => {
	// Anything in public/ is served at full size, unoptimized. Photos belong in
	// src/assets/ so astro:assets can emit AVIF/WebP at the requested widths.
	const LIMIT = 100 * 1024
	const heavy = walk(resolve(root, 'public'))
		.filter(f => ['.jpg', '.jpeg', '.png', '.gif'].includes(extname(f).toLowerCase()))
		.map(f => ({ file: f.replace(`${root}/`, ''), bytes: statSync(f).size }))
		.filter(f => f.bytes > LIMIT)

	expect(
		heavy,
		`move these into src/assets/ and render them through astro:assets: ${JSON.stringify(heavy)}`,
	).toEqual([])
})
