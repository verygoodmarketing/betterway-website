import { test, expect, devices } from '@playwright/test'
import { COMPANY, SERVICES, SERVICE_AREAS, servicePath, areaPath } from '../../src/config/company'

/**
 * Conversion surface tests. These guard the things that actually decide whether
 * a visitor calls: is the phone reachable without scrolling, is the sticky bar
 * there, are the tap targets big enough for a thumb.
 *
 * They assert structure and geometry, never copy.
 */

const telSelector = `a[href="tel:+1${COMPANY.phone}"]`

const allPaths = [
	'/',
	'/about',
	'/guarantee',
	'/testimonials',
	'/review',
	'/request-inspection',
	'/services',
	...SERVICES.map(s => servicePath(s.slug)),
	...SERVICE_AREAS.map(a => areaPath(a.slug)),
]

test.describe('call-first', () => {
	for (const path of allPaths) {
		test(`${path} has a tap-to-call link in the first viewport`, async ({ page }) => {
			await page.setViewportSize({ width: 390, height: 844 })
			await page.goto(path)

			const calls = page.locator(telSelector)
			await expect(calls.first()).toBeVisible()

			// At least one call link must sit within the initial viewport without
			// scrolling — a phone number below the fold is a phone number nobody taps.
			const boxes = await calls.evaluateAll(nodes =>
				nodes.map(n => n.getBoundingClientRect().top),
			)
			expect(
				boxes.some(top => top >= 0 && top < 844),
				`${path} has no call link above the fold on a 390x844 screen`,
			).toBe(true)
		})
	}

	test('the sticky call bar is present on mobile and hidden on desktop', async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 })
		await page.goto('/')
		const sticky = page.locator('.sticky-cta')
		await expect(sticky).toBeVisible()
		await expect(sticky.locator(telSelector)).toHaveCount(1)

		await page.setViewportSize({ width: 1280, height: 900 })
		await expect(sticky).toBeHidden()
	})

	test('the sticky bar never covers the last of the page content', async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 })
		await page.goto('/')
		const mainPad = await page
			.locator('main')
			.evaluate(el => parseFloat(getComputedStyle(el).paddingBottom))
		const stickyHeight = await page
			.locator('.sticky-cta')
			.evaluate(el => el.getBoundingClientRect().height)
		expect(mainPad).toBeGreaterThanOrEqual(stickyHeight)
	})

	test('every page offers a lead form or a route to one', async ({ page }) => {
		for (const path of allPaths) {
			await page.goto(path)
			const forms = await page.locator('form[data-lead-form]').count()
			const formLinks = await page.locator('a[href="/request-inspection"]').count()
			expect(forms + formLinks, `${path} has no path to the lead form`).toBeGreaterThan(0)
		}
	})
})

test.describe('mobile ergonomics', () => {
	test('primary tap targets are at least 44px tall', async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 })
		await page.goto('/')

		const small = await page.locator('a.btn, button.btn, .nav-toggle').evaluateAll(nodes =>
			nodes
				.filter(n => (n as HTMLElement).offsetParent !== null)
				.map(n => ({ h: n.getBoundingClientRect().height, text: (n.textContent || '').trim().slice(0, 40) }))
				.filter(item => item.h > 0 && item.h < 44),
		)
		expect(small, `these tap targets are under 44px: ${JSON.stringify(small)}`).toEqual([])
	})

	test('form inputs use a 16px font so iOS does not zoom on focus', async ({ page }) => {
		await page.goto('/request-inspection')
		const sizes = await page
			.locator('form[data-lead-form] input, form[data-lead-form] select')
			.evaluateAll(nodes => nodes.map(n => parseFloat(getComputedStyle(n).fontSize)))
		for (const size of sizes) expect(size).toBeGreaterThanOrEqual(16)
	})
})

test.describe('payload', () => {
	test('no web fonts are requested', async ({ page }) => {
		const fontRequests: string[] = []
		page.on('request', req => {
			if (req.resourceType() === 'font') fontRequests.push(req.url())
		})
		await page.goto('/', { waitUntil: 'load' })
		expect(fontRequests).toEqual([])
	})
})
