import { test, expect } from '@playwright/test'
import {
	COMPANY,
	SERVICES,
	SERVICE_AREAS,
	SCHEMA_TYPE,
	NAV_LINKS,
	servicePath,
	areaPath,
} from '../../src/config/company'
import { googleReviews, facebookReviews } from '../../src/config/reviews'

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

test.describe('metadata', () => {
	for (const path of allPaths) {
		test(`${path} has exactly one h1 and sane metadata`, async ({ page }) => {
			await page.goto(path)
			await expect(page.locator('h1')).toHaveCount(1)

			const title = await page.title()
			expect(title.length, `${path} title is empty`).toBeGreaterThan(10)
			expect(title.length, `${path} title is over 70 chars: ${title}`).toBeLessThanOrEqual(70)

			const description = await page
				.locator('meta[name="description"]')
				.getAttribute('content')
			expect(description, `${path} has no description`).toBeTruthy()
			expect(
				(description ?? '').length,
				`${path} description is over 165 chars`,
			).toBeLessThanOrEqual(165)
		})
	}

	test('canonical URLs have no trailing slash', async ({ page }) => {
		for (const path of allPaths) {
			await page.goto(path)
			const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
			expect(canonical, `${path} has no canonical`).toBeTruthy()
			if (canonical !== `${COMPANY.url}/`) {
				expect(canonical, `${canonical} ends with a slash`).not.toMatch(/.\/$/)
			}
		}
	})
})

test.describe('structured data', () => {
	test('every page emits LocalBusiness JSON-LD of the right type', async ({ page }) => {
		await page.goto('/')
		const blocks = await page.locator('script[type="application/ld+json"]').allTextContents()
		const parsed = blocks.map(b => JSON.parse(b))
		const business = parsed.find(p => p['@type'] === SCHEMA_TYPE)
		expect(business, `no ${SCHEMA_TYPE} block found`).toBeTruthy()
		expect(business.telephone).toBe(`+1${COMPANY.phone}`)
		expect(business.address.postalCode).toBe(COMPANY.address.postalCode)
		expect(business.aggregateRating.ratingValue).toBe(googleReviews.rating)
		expect(business.aggregateRating.reviewCount).toBe(googleReviews.reviewCount)
	})

	test('area pages emit a town-scoped Service and FAQPage', async ({ page }) => {
		for (const area of SERVICE_AREAS) {
			await page.goto(areaPath(area.slug))
			const blocks = await page.locator('script[type="application/ld+json"]').allTextContents()
			const parsed = blocks.map(b => JSON.parse(b))
			const service = parsed.find(p => p['@type'] === 'Service')
			expect(service, `${area.slug} missing Service schema`).toBeTruthy()
			expect(service.name, `${area.slug} Service schema does not name the town`).toContain(area.name)
			expect(
				parsed.map(p => p['@type']),
				`${area.slug} missing FAQPage schema`,
			).toContain('FAQPage')
		}
	})

	test('service pages emit Service and FAQPage', async ({ page }) => {
		for (const service of SERVICES) {
			await page.goto(servicePath(service.slug))
			const blocks = await page.locator('script[type="application/ld+json"]').allTextContents()
			const types = blocks.map(b => JSON.parse(b)['@type'])
			expect(types, `${service.slug} missing Service schema`).toContain('Service')
			expect(types, `${service.slug} missing FAQPage schema`).toContain('FAQPage')
		}
	})
})

test.describe('navigation', () => {
	test('the footer links every service and every area', async ({ page }) => {
		await page.goto('/')
		for (const service of SERVICES) {
			await expect(
				page.locator(`footer a[href="${servicePath(service.slug)}"]`),
				`footer missing ${service.slug}`,
			).toHaveCount(1)
		}
		for (const area of SERVICE_AREAS) {
			await expect(
				page.locator(`footer a[href="${areaPath(area.slug)}"]`),
				`footer missing ${area.slug}`,
			).toHaveCount(1)
		}
	})

	test('every top-level nav destination resolves', async ({ page }) => {
		for (const link of NAV_LINKS) {
			const res = await page.goto(link.href)
			expect(res?.status(), `${link.href} did not return 200`).toBe(200)
		}
	})

	test('reviews pages expose Google listing, Facebook reviews, and write-review links', async ({ page }) => {
		await page.goto('/testimonials')
		await expect(page.locator('h1')).toContainText('What customers say')
		await expect(page.locator(`a[href="${googleReviews.reviewsUrl}"]`).first()).toBeVisible()
		await expect(page.locator(`a[href="${facebookReviews.reviewsUrl}"]`).first()).toBeVisible()

		await page.goto('/review')
		await expect(page.locator(`a[href="${googleReviews.writeReviewUrl}"]`).first()).toBeVisible()
	})
})

test.describe('lead api', () => {
	test('rejects a submission with missing fields', async ({ request }) => {
		const res = await request.post('/api/request-inspection', {
			form: { name: 'Test' },
		})
		expect(res.status()).toBe(400)
	})

	test('swallows honeypot submissions', async ({ request }) => {
		const res = await request.post('/api/request-inspection', {
			form: {
				name: 'Bot',
				email: 'bot@example.com',
				phone: '2565551234',
				zip: '35640',
				company: 'spam',
			},
		})
		expect(res.status()).toBe(204)
	})
})

test('unknown URLs 404', async ({ page }) => {
	const res = await page.goto('/this-page-does-not-exist')
	expect(res?.status()).toBe(404)
})
