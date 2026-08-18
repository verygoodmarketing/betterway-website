/**
 * Icon registry. Values are SVG path markup rendered inside a 24x24 viewBox
 * with `stroke="currentColor"`.
 *
 * Always resolve through getIcon(). A raw map lookup returns undefined for a
 * typo'd key, which renders an empty <svg> in dev and hard-crashes the
 * production build — the fallback here is what stops a one-character mistake in
 * company.ts from taking down a deploy.
 */
const icons: Record<string, string> = {
	shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
	home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
	droplet: '<path d="M12 2.7l5.3 5.3a7.5 7.5 0 1 1-10.6 0z"/>',
	bug: '<path d="M8 2l1.9 1.9"/><path d="M16 2l-1.9 1.9"/><path d="M9 7.1V6a3 3 0 1 1 6 0v1.1"/><path d="M12 20a6 6 0 0 0 6-6v-3a6 6 0 0 0-12 0v3a6 6 0 0 0 6 6z"/><path d="M6 13H2"/><path d="M22 13h-4"/><path d="M6.3 9L3 7"/><path d="M17.7 9L21 7"/><path d="M6.3 17L3 19"/><path d="M17.7 17L21 19"/>',
	alert: '<path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
	award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13.5L17 22l-5-3-5 3 1.5-8.5"/>',
	badge: '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z"/><path d="M9 12l2 2 4-4"/>',
	'map-pin': '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
	check: '<circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>',
	phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
	clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
}

/** Rendered when a key is missing, so a bad key degrades instead of crashing. */
const FALLBACK = icons.check

export function getIcon(key: string): string {
	return icons[key] ?? FALLBACK
}

export function hasIcon(key: string): boolean {
	return key in icons
}

export const iconKeys = Object.keys(icons)
