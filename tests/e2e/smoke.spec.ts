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

test.describe('@smoke', () => {
	test('home page renders with the right phone number', async ({ page }) => {
		await page.goto('/')
		await expect(page.locator('h1')).toHaveCount(1)
		await expect(page.locator(`a[href="tel:+1${COMPANY.phone}"]`).first()).toBeVisible()
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

	test('the lead form is present and has its required fields', async ({ page }) => {
		await page.goto('/request-inspection')
		const form = page.locator('form[data-lead-form]').first()
		await expect(form).toBeVisible()
		for (const field of ['name', 'phone', 'email', 'zip']) {
			await expect(form.locator(`[name="${field}"]`)).toHaveAttribute('required', '')
		}
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
			expect(body, `${path} still has placeholder copy`).not.toContain(
				'intentionally left blank',
			)
			expect(body, `${path} still has a scaffold button`).not.toContain('Tailwind Button')
		}
	})
})
