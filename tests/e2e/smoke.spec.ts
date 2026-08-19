import { test, expect } from '@playwright/test'
import {
	COMPANY,
	SERVICES,
	SERVICE_AREAS,
	servicePath,
	areaPath,
} from '../../src/config/company'

/**
 * The minimum for the site to earn money: pages render, the phone number is
 * right, and every service and area page exists and is reachable.
 *
 * Assertions read from company.ts, never from page copy — a copy tweak should
 * not turn the build red.
 */

const telSelector = `a[href="tel:+1${COMPANY.phone}"]`

test.describe('@smoke', () => {
	test('home page renders with the right phone number', async ({ page }) => {
		await page.goto('/')
		await expect(page.locator('h1')).toHaveCount(1)
		await expect(page.locator(telSelector).first()).toBeVisible()
	})

	test('every service page loads and has one h1', async ({ page }) => {
		for (const service of SERVICES) {
			const res = await page.goto(servicePath(service.slug))
			expect(res?.status(), `${servicePath(service.slug)} should return 200`).toBe(200)
			await expect(page.locator('h1')).toHaveCount(1)
			await expect(page.locator('h1')).toContainText(service.name)
		}
	})

	test('every service area page loads and has one h1', async ({ page }) => {
		for (const area of SERVICE_AREAS) {
			const res = await page.goto(areaPath(area.slug))
			expect(res?.status(), `${areaPath(area.slug)} should return 200`).toBe(200)
			await expect(page.locator('h1')).toHaveCount(1)
			await expect(page.locator('h1')).toContainText(area.name)
		}
	})

	test('the lead form asks for the minimum and no more', async ({ page }) => {
		await page.goto('/request-inspection')
		const form = page.locator('form[data-lead-form]').first()
		await expect(form).toBeVisible()

		// Required: enough to call someone back and confirm they are in range.
		for (const field of ['name', 'phone', 'zip']) {
			await expect(form.locator(`[name="${field}"]`)).toHaveAttribute('required', '')
		}
		// Email must stay optional — every required field costs completions.
		await expect(form.locator('[name="email"]')).not.toHaveAttribute('required', '')
	})

	test('no page still carries the scaffold placeholder', async ({ page }) => {
		const paths = [
			'/',
			'/about',
			'/guarantee',
			'/request-inspection',
			'/services',
			...SERVICES.map(s => servicePath(s.slug)),
			...SERVICE_AREAS.map(a => areaPath(a.slug)),
		]
		for (const path of paths) {
			await page.goto(path)
			const body = await page.locator('body').innerText()
			expect(body, `${path} still has placeholder copy`).not.toContain('intentionally left blank')
			expect(body, `${path} still has a scaffold button`).not.toContain('Tailwind Button')
		}
	})
})
