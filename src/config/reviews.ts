/**
 * Curated Google and Facebook reviews as of August 2026. Update rating/count when the listing changes.
 * Every quote was transcribed from the public listing — do not invent or paraphrase.
 */
export const googleReviews = {
	rating: 4.9,
	reviewCount: 178,
	source: 'Google',
	mapsUrl: 'https://www.google.com/maps?cid=3359166999766756865',
	reviewsUrl: 'https://www.google.com/maps?cid=3359166999766756865',
	placeId: 'ChIJjYhhdv8riIgRAe5PspYoni4',
	writeReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJjYhhdv8riIgRAe5PspYoni4',
} as const

/** Facebook recommendations as of August 2026. */
export const facebookReviews = {
	recommendPercent: 98,
	reviewCount: 29,
	source: 'Facebook',
	url: 'https://www.facebook.com/BetterWayPestControl/',
	reviewsUrl: 'https://www.facebook.com/BetterWayPestControl/reviews',
} as const

export type ReviewSource = 'google' | 'facebook'

export interface CustomerReview {
	author: string
	quote: string
	/** ISO date the review was posted, approximated from the platform's timestamp. */
	date: string
	source: ReviewSource
}

export const MAX_FEATURED_ON_PAGE = 6

const googleReviewQuotes: CustomerReview[] = [
	{
		author: 'John Stevens',
		date: '2026-07-18',
		source: 'google',
		quote: 'Always good service with a smile!',
	},
	{
		author: 'Patricia Moss-Langham',
		date: '2026-04-18',
		source: 'google',
		quote: 'Trenton Milligan is a great service provider. He takes great care of us. He actually feels like family!',
	},
	{
		author: 'Gracie Jenkins',
		date: '2026-02-18',
		source: 'google',
		quote:
			'I called yesterday afternoon and spoke with Trent about a pest problem I am having and he came out today and took care of it. He was very professional and knowledgeable. You can\'t beat their pricing. Thank you Trent!',
	},
	{
		author: 'Gail Delashaw',
		date: '2025-12-18',
		source: 'google',
		quote:
			'Parker called to inform us that our three month inspection was due to be done the following day. Parker came and did the inspection, sent us the results and our normal statement. Better Way was prompt, thorough and speedy as they usually are. Thanks for such good service.',
	},
	{
		author: 'Duane Brooks',
		date: '2025-12-18',
		source: 'google',
		quote:
			'Jeremiah is a very personable person who knows his business. And he always shows up, when we schedule things, right on time. I am very impressed with him, in this world, that\'s hard to count on anything being done appropriately.',
	},
	{
		author: 'Carolyn Letson',
		date: '2025-12-18',
		source: 'google',
		quote: 'Very friendly, great job.',
	},
	{
		author: 'Ray Cooper',
		date: '2025-11-18',
		source: 'google',
		quote: 'Always does a great job highly recommend',
	},
	{
		author: 'Tyronzia Duncan',
		date: '2025-10-18',
		source: 'google',
		quote:
			'Keith does amazing work. He is professional and always available when i need him. We had a wasp/hornets next that had been terrorizing me since summer. He made sure it was clear and knocked it down.',
	},
	{
		author: 'Tina Elton',
		date: '2024-08-18',
		source: 'google',
		quote:
			'Better Way Pest Control has been servicing our home for several months now and we\'re more than completely satisfied! Keith & the rest of the team are punctual, informative, responsive and professional every time!!! They are clearly the best!! Highly Recommend!!!!',
	},
	{
		author: 'Ainsley Tolentino',
		date: '2023-08-18',
		source: 'google',
		quote:
			'Very professional and knowledgeable. Great rates and no startup fees. Jeremiah was our tech and was just an awesome person. 10/10',
	},
	{
		author: 'Summar Ivy',
		date: '2023-08-18',
		source: 'google',
		quote:
			'He was absolutely amazing! I had no idea he was going to clean the webs out of my carport. He was on time and very approachable with every question I had. Mr. Milligan is the very best!',
	},
]

const facebookReviewQuotes: CustomerReview[] = [
	{
		author: 'Misty Schleifer',
		date: '2022-08-19',
		source: 'facebook',
		quote: 'This company goes above and beyond for their customers! Highly recommend!',
	},
	{
		author: 'Tammie Anders',
		date: '2022-05-20',
		source: 'facebook',
		quote:
			'This company is wonderful. I don’t know what my husband would have done without Him. You guys give him a try! U will not regret it!',
	},
	{
		author: 'Roger Cobb',
		date: '2020-09-16',
		source: 'facebook',
		quote: 'Honest Christian people. Enough said',
	},
	{
		author: 'Sarah Graham Arnette',
		date: '2020-03-30',
		source: 'facebook',
		quote:
			'Better Way sent someone out the same day I called. The service man was professional, courteous and answered all of my questions. I am so pleased!',
	},
	{
		author: 'William Jimmie Halbrooks',
		date: '2018-10-12',
		source: 'facebook',
		quote: 'Good guy-Good Service-Good friend-Good family-Good job-Totally satisfied.',
	},
	{
		author: 'Joyce Matthews Green',
		date: '2018-06-20',
		source: 'facebook',
		quote:
			'We are very pleased with the service we get from Better Way Pest Control. We enjoy working with Curt; he is very professional; he always lets us know the day before what time he will arrive and he is always prompt. We recommend you give Curt a call and have him come out and talk to you about the services Better Way has to offer.',
	},
	{
		author: 'Amanda Cecere',
		date: '2018-06-06',
		source: 'facebook',
		quote:
			'Super affordable!! Curt is very professional and answers any questions or concerns you may have. I recommend them for all your pest control needs!',
	},
	{
		author: 'Gary Wallace',
		date: '2018-05-09',
		source: 'facebook',
		quote: 'These folks know how to take care of their clients! Highly recommend their service',
	},
	{
		author: 'Danielle Jordan Dillon',
		date: '2017-07-04',
		source: 'facebook',
		quote:
			'Curt is a great guy. He is very knowledgeable about different pests and has excellent customer service!',
	},
	{
		author: 'Della Church',
		date: '2017-05-25',
		source: 'facebook',
		quote: 'Great customer service and very affordable!! Would highly recommend.',
	},
]

/** Every curated Google and Facebook review. The reviews page shows all of these. */
export const allReviews: CustomerReview[] = [...googleReviewQuotes, ...facebookReviewQuotes]

function byNewest(a: CustomerReview, b: CustomerReview) {
	return b.date.localeCompare(a.date)
}

/** Newest reviews first, capped so the homepage/about grid stays two rows of three. */
export function displayedReviews(reviews: readonly CustomerReview[] = allReviews) {
	return [...reviews].sort(byNewest).slice(0, MAX_FEATURED_ON_PAGE)
}

export function sortedReviews(reviews: readonly CustomerReview[] = allReviews) {
	return [...reviews].sort(byNewest)
}

export function reviewYear(review: CustomerReview) {
	return review.date.slice(0, 4)
}

export function reviewSourceLabel(review: CustomerReview) {
	return review.source === 'facebook' ? 'Facebook review' : 'Google review'
}
