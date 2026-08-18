import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	testDir: './tests/e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	reporter: process.env.CI ? 'github' : [['list'], ['html', { open: 'never' }]],
	use: {
		baseURL: 'http://localhost:4321',
		trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure',
		screenshot: 'only-on-failure',
	},
	projects: [
		{ name: 'desktop-chrome', use: { ...devices['Desktop Chrome'] } },
		{ name: 'mobile-chrome', use: { ...devices['Pixel 7'] } },
	],
	webServer: {
		// @astrojs/vercel does not support `astro preview`, so the dev server backs
		// the E2E run. Pages are static; the API route still works in dev.
		command: 'pnpm astro dev --port 4321 --host 127.0.0.1',
		url: 'http://127.0.0.1:4321',
		reuseExistingServer: true,
		timeout: 180_000,
		env: { PLAYWRIGHT: '1' },
	},
})
