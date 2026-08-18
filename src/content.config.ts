import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

/**
 * NOTE: this file must live at `src/content.config.ts` and use a `loader`.
 * The legacy `src/content/config.ts` + `type: 'content'` form is removed in
 * current Astro and will not build.
 *
 * Only real, permissioned reviews belong in this collection. Every entry here
 * was transcribed from the published site.
 */
const testimonials = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
	schema: z.object({
		name: z.string(),
		location: z.string().optional(),
		text: z.string(),
		/** Featured reviews surface on the home page. */
		featured: z.boolean().optional(),
		rating: z.number().min(1).max(5).optional(),
		/** Source the review was transcribed from, for provenance. */
		source: z.string().optional(),
		date: z.union([z.string(), z.date()]).transform(val =>
			val instanceof Date ? val.toISOString().split('T')[0] : val,
		),
	}),
})

export const collections = { testimonials }
