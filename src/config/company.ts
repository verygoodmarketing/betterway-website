/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH
 * ─────────────────────────────────────────────────────────────────────────────
 * Every business detail lives here. Pages, nav, footer, sitemap entries, and
 * structured data all generate from this file.
 *
 * Rule: no company detail (phone, email, town, service name) is ever hard-coded
 * in a component or page. If you catch yourself typing a phone number into an
 * .astro file, it belongs here instead.
 *
 * Content in this file was transcribed from the published site at
 * https://betterwaypestcontrol.com — do not add claims that are not on it.
 */

export const COMPANY = {
	name: 'Better Way Pest Control',
	legalName: 'Better Way Pest Control',
	tagline: 'Better Service...Better Results...Guaranteed!',
	/** Digits only — telHref() and the schema builder format it. */
	phone: '2565806181',
	phoneFormatted: '(256) 580-6181',
	/** No email is published on the live site. Empty string hides email links. */
	email: '',
	/** Canonical host. Must match `site` in astro.config.mjs. No trailing slash. */
	url: 'https://betterwaypestcontrol.com',
	logo: '/logo.png',
	address: {
		streetAddress: '209 Sparkman St SW',
		locality: 'Hartselle',
		region: 'AL',
		postalCode: '35640',
		country: 'US',
	},
	openingHours: 'Mo-Sa 07:00-18:00',
	/** Human-readable hours for the footer and contact blocks. */
	hoursDisplay: [
		{ days: 'Monday – Saturday', hours: '7:00am – 6:00pm' },
		{ days: 'Sunday', hours: 'Closed' },
	],
	/** IANA zone. Serverless runs in UTC — this is what makes lead timestamps readable. */
	timezone: 'America/Chicago',
	social: {
		facebook: 'https://www.facebook.com/BetterWayPestControl/',
		yelp: 'https://www.yelp.com/biz/better-way-pest-control-hartselle',
		google: 'https://goo.gl/maps/c3yoeyEDwTn',
	},
} as const

/**
 * Counties named on the live site. Used in the hero sub and the areaServed
 * portion of the LocalBusiness schema.
 */
export const COUNTIES = ['Morgan', 'Lawrence', 'Limestone', 'Madison'] as const

/**
 * Towns to rank for. Each generates /<slug>-alabama, matching the URL structure
 * the published site already hands out — do not change these slugs without
 * adding redirects.
 *
 * `blurb` is real page copy, not a label. Each is written to say something true
 * and specific about that town; near-identical blurbs read as doorway pages.
 */
export interface ServiceArea {
	slug: string
	name: string
	county: string
	blurb: string
	/** Second paragraph of the area page. */
	detail: string
}

export const SERVICE_AREAS: ServiceArea[] = [
	{
		slug: 'hartselle',
		name: 'Hartselle',
		county: 'Morgan',
		blurb:
			'Hartselle is home — our office sits on Sparkman Street, a few minutes from most of the addresses we service.',
		detail:
			'Being based in town means a Hartselle call rarely waits. We know which neighborhoods sit on slab and which have crawl spaces, and we treat a lot of the older homes near downtown where moisture under the house is the real story behind a recurring bug problem.',
	},
	{
		slug: 'decatur',
		name: 'Decatur',
		county: 'Morgan',
		blurb:
			'Decatur is our largest service area outside Hartselle, covering both homes and the commercial accounts along the river.',
		detail:
			'Decatur mixes established neighborhoods with restaurants, warehouses, and manufacturing along the Tennessee River. Those are two different pest problems — a kitchen on a health inspection schedule needs a different plan than a house with an ant trail on the patio, and we run both out of the same office.',
	},
	{
		slug: 'moulton',
		name: 'Moulton',
		county: 'Lawrence',
		blurb:
			'Moulton and the surrounding Lawrence County properties, including homes well outside the city limits.',
		detail:
			'A lot of Moulton work is rural — properties backing up to woods and fields, where mice come indoors as soon as the weather turns and brown recluse have plenty of undisturbed places to live. Those homes usually need exclusion work, not just a spray.',
	},
	{
		slug: 'athens',
		name: 'Athens',
		county: 'Limestone',
		blurb:
			'Athens and Limestone County, where new construction keeps pushing into what used to be farmland.',
		detail:
			'Newer subdivisions around Athens sit on ground that was recently open field, and the pests that lived there do not leave when the houses go up. Getting a termite baiting system in early on a new build is far cheaper than dealing with damage later.',
	},
	{
		slug: 'madison',
		name: 'Madison',
		county: 'Madison',
		blurb:
			'Madison homeowners who want a regular schedule rather than a phone call every time something shows up.',
		detail:
			'Most of our Madison customers are on a year-round program — they would rather we come out on a set rotation than react to a problem. Mosquito treatment is the other common ask here, on properties where the yard is the whole point of the house.',
	},
	{
		slug: 'huntsville',
		name: 'Huntsville',
		county: 'Madison',
		blurb:
			'Huntsville is the far end of our territory, and we hold the same response times there as we do at home.',
		detail:
			'We are a Hartselle company working in Huntsville, not a national brand with a call center. You get the same technicians on every visit, and the person who answers the phone knows which house is yours.',
	},
]

export interface Service {
	slug: string
	name: string
	/** Short label for nav, cards, footer, and the lead-form dropdown. */
	shortName: string
	/** <title> for the service page. Keep the rendered title under 70 chars. */
	metaTitle: string
	/** Key in the registry in src/lib/icons.ts — always resolved via getIcon(). */
	icon: string
	excerpt: string
	metaDescription: string
	/** Featured services appear on the home page; all appear on /services. */
	featured: boolean
	/** Body copy for the service page — one string per paragraph. */
	body: string[]
	/** Four short pills for the service card. */
	chips: string[]
	/** Full "What's included" list on the service page. */
	features: string[]
	faqs: { q: string; a: string }[]
}

export const SERVICES: Service[] = [
	{
		slug: 'residential-commercial-pest-control',
		name: 'Residential & Commercial Pest Control',
		shortName: 'Pest Control',
		metaTitle: 'Pest Control for Homes & Businesses',
		icon: 'shield',
		excerpt:
			'Year-round protection for your home or business, built around what actually shows up on your property — not a one-size package.',
		metaDescription:
			'Pest control for homes and businesses across North Alabama. Safe, eco-friendly treatment and free inspections. Call (256) 580-6181.',
		featured: true,
		body: [
			'Most people call us because something crossed the kitchen floor. Ants along the counter, roaches behind the dishwasher, spiders in the garage — the specific pest matters less than the fact that it keeps coming back after you spray it yourself.',
			'We use safe and ecologically-friendly products, and we treat the way the pest actually gets in rather than just the room you saw it in. That means walking the outside of the house, finding the entry points, and setting up a schedule that keeps the barrier intact through the season it matters most.',
			'On the commercial side, every industry has its own version of this problem. A restaurant on a health-inspection schedule, a warehouse with open dock doors, and an office suite are three different jobs. We handle single locations and multi-location accounts across North Alabama.',
			'The inspection is free, and we will tell you if you do not need us. Call and we will come look at it.',
		],
		chips: ['Free Inspection', 'Homes & Businesses', 'Eco-Friendly Products', 'Year-Round Plans'],
		features: [
			'Free inspection before any treatment is quoted',
			'Year-round protection plans built to your property, not a package tier',
			'Safe, ecologically-friendly products',
			'Interior and exterior treatment, including entry points you cannot see',
			'Bed bug treatment',
			'Crawl space and moisture management',
			'Commercial service for restaurants, warehouses, manufacturing, and offices',
			'Single and multi-location commercial accounts',
		],
		faqs: [
			{
				q: 'How much does pest control cost?',
				a: 'It depends on the size of the property, what we find during the inspection, and whether you want a one-time treatment or an ongoing plan. We quote after we look, not over the phone from a script, and the inspection itself is free.',
			},
			{
				q: 'Are the products safe around kids and pets?',
				a: 'We use safe and ecologically-friendly products and apply them so that treated areas are not a problem for your family. Tell the technician about pets, small children, or anyone in the house with sensitivities, and we will plan the treatment around it.',
			},
			{
				q: 'How often do you need to come out?',
				a: 'Most homes do best on a regular year-round schedule, because the pressure changes with the season rather than stopping. We will tell you what rotation your property actually needs after the inspection.',
			},
			{
				q: 'Do you treat businesses as well as homes?',
				a: 'Yes. We service manufacturing plants, restaurants, warehouses, and offices, for both single locations and multi-location operations.',
			},
		],
	},
	{
		slug: 'termite-control',
		name: 'Termite Control',
		shortName: 'Termite Control',
		metaTitle: 'Termite Control in North Alabama',
		icon: 'home',
		excerpt:
			'Termites feast 24/7 and can strike your home at any time. We install baiting systems and check the stations quarterly so you find out early, not at closing.',
		metaDescription:
			'Termite control and free inspections across North Alabama. Baiting systems with quarterly station checks. Call (256) 580-6181.',
		featured: true,
		body: [
			'Termite damage is almost never discovered by the homeowner. It gets discovered by an inspector during a sale, years after it started, which is what makes it expensive.',
			'Termites feast 24/7 and can strike your home at any time, so the useful protection is the kind that is already in place before there is a problem. We install a baiting system around the structure and inspect the stations quarterly — that quarterly check is the whole point, because it is what tells you there is activity while it is still cheap to deal with.',
			'If there is already an active infestation, we remove it first, then leave the preventative system in place so the same thing does not happen again.',
			'We recommend an annual inspection of your home whether or not you use us. The termite inspection is free — call and we will come out.',
		],
		chips: ['Free Inspection', 'Baiting Systems', 'Quarterly Checks', 'Active & Preventative'],
		features: [
			'Free termite inspection',
			'Baiting system installed around the structure',
			'Quarterly inspection of every baiting station',
			'Removal of active infestations',
			'Ongoing preventative protection after treatment',
			'Annual whole-home inspection recommended and available',
			'Coverage for new construction before the problem starts',
		],
		faqs: [
			{
				q: 'How much does termite treatment cost?',
				a: 'It depends on the size of the structure and whether you have an active infestation or want preventative protection. Active infestations cost more than prevention, which is the argument for getting a system in early. The inspection is free.',
			},
			{
				q: 'How do I know if I have termites?',
				a: 'Usually you do not, which is the problem — the damage happens inside the wood, out of sight. Mud tubes on foundation walls, discarded wings near windows, and wood that sounds hollow are the signs people notice. An inspection is the reliable answer.',
			},
			{
				q: 'How often should my home be inspected for termites?',
				a: 'Annually. Termites are active year-round in North Alabama, and a yearly inspection is what keeps a small problem from becoming a structural one.',
			},
			{
				q: 'What happens after the baiting system goes in?',
				a: 'We come back quarterly and inspect the stations. If there is activity, we deal with it then, while it is still contained.',
			},
		],
	},
	{
		slug: 'mosquito-control',
		name: 'Mosquito Control',
		shortName: 'Mosquito Control',
		metaTitle: 'Mosquito Control in North Alabama',
		icon: 'droplet',
		excerpt:
			'Monthly treatment so you can use your own yard — pool, patio, deck — without going inside at dusk.',
		metaDescription:
			'Monthly mosquito control for homes and businesses across North Alabama. Free inspection. Call (256) 580-6181.',
		featured: true,
		body: [
			'You built the deck, you put in the pool, and then you stop going out there after about six in the evening. That is the actual complaint behind most mosquito calls.',
			'We treat monthly, targeting where mosquitoes rest and breed on your property rather than fogging the air and hoping. Monthly is the interval that matters — a single treatment thins them out for a couple of weeks and then you are back where you started.',
			'Most people assume mosquito season is a summer problem. It is not. Mosquitoes stay active well into fall and start again in spring, and the plans that work are the ones that cover the whole stretch. They also carry real health risk, West Nile virus among them, which is a better reason to stay ahead of them than the itching.',
			'We treat residential and commercial properties. The inspection is free.',
		],
		chips: ['Free Inspection', 'Monthly Treatment', 'Homes & Businesses', 'Spring Through Fall'],
		features: [
			'Free mosquito inspection',
			'Monthly treatment plans for residential and commercial properties',
			'Treatment targeted at resting and breeding sites, not just open air',
			'Coverage through fall and spring, not just peak summer',
			'Standing-water and harborage points identified during the inspection',
			'Yard, pool, patio, and deck areas treated',
		],
		faqs: [
			{
				q: 'How much does mosquito control cost?',
				a: 'It depends on the size of the property and how much of it you actually use — treating a fenced back yard is different from treating two acres. We quote after a free inspection.',
			},
			{
				q: 'When should I start mosquito treatment?',
				a: 'Earlier than most people think. Mosquitoes are active through fall and back again in spring, so starting before you notice them is what keeps the season comfortable rather than trying to catch up mid-summer.',
			},
			{
				q: 'Why monthly instead of one treatment?',
				a: 'A single treatment reduces the population for a few weeks and then it rebuilds. Monthly service is what holds it down across the season.',
			},
			{
				q: 'Is it safe to use the yard after treatment?',
				a: 'Yes — the technician will tell you how long to wait before letting kids and pets back out, and it is a short window, not a day.',
			},
		],
	},
	{
		slug: 'rodent-control',
		name: 'Rodent Control',
		shortName: 'Rodent Control',
		metaTitle: 'Rodent Control in North Alabama',
		icon: 'bug',
		excerpt:
			'Removal, then exclusion, then cleanup. Getting the mice out is the easy part — keeping them out is the job.',
		metaDescription:
			'Rodent control across North Alabama. Mice and rat removal, exclusion, and attic cleanup. Free inspection. Call (256) 580-6181.',
		featured: true,
		body: [
			'Mice and rats are common in the south, and they get into your home or business through openings far smaller than you would guess. Once they are in the wall or the attic, you hear them before you see them.',
			'They are not just a nuisance. Rodents carry disease and leave conditions behind them that are genuinely unsanitary, which is why we treat the cleanup as part of the job rather than an upsell.',
			'The work runs in three stages. We remove what is in the structure. Then we do the exclusion work — sealing and barriering the entry points — because trapping without exclusion just opens a vacancy for the next one. Rodents chew wiring and insulation, so the exclusion step is usually the part that saves real money.',
			'Last, we clean up: feces and nesting material removed, odor treated, and hard-to-reach spaces like attics restored. Call for a free inspection.',
		],
		chips: ['Free Inspection', 'Removal & Exclusion', 'Attic Cleanup', 'Odor Treatment'],
		features: [
			'Free inspection to find entry points and active runs',
			'Mice and rat removal from homes and businesses',
			'Exclusion work — entry points sealed so they cannot get back in',
			'Barriers installed to prevent re-infestation',
			'Feces and nesting material removed',
			'Odor removal',
			'Restoration of hard-to-access areas such as attics',
		],
		faqs: [
			{
				q: 'How much does rodent control cost?',
				a: 'It depends on how far the infestation has gone and how much exclusion and cleanup the structure needs. Removal alone is the cheapest and least durable option; the quote reflects which of the three stages your property actually needs.',
			},
			{
				q: 'Can I not just set traps myself?',
				a: 'You can, and it will catch some. What it will not do is close the opening they came in through, so the population replaces itself. Exclusion is what ends it.',
			},
			{
				q: 'How small an opening can a mouse use?',
				a: 'Smaller than you would expect — mice get through gaps most people would not think twice about. Part of the inspection is finding the ones you cannot see from inside.',
			},
			{
				q: 'Do you clean up after the rodents are gone?',
				a: 'Yes. We remove feces and nesting material, treat the odor, and restore areas that are hard to get to, attics in particular.',
			},
		],
	},
	{
		slug: 'brown-recluse-control',
		name: 'Brown Recluse Control',
		shortName: 'Brown Recluse',
		metaTitle: 'Brown Recluse Control',
		icon: 'alert',
		excerpt:
			'Brown recluse do not respond to general pest treatment. Clearing them out takes a thorough, separate service.',
		metaDescription:
			'Brown recluse spider control across North Alabama. Specialized treatment and free inspection. Call (256) 580-6181.',
		featured: true,
		body: [
			'If you have brown recluse and you are on a general pest plan, you will keep seeing them. They do not respond to general treatment the way other spiders do, and that surprises people who assume their regular service already covers it.',
			'Worth saying plainly: the reputation is worse than the animal. Most of what people believe about brown recluse is myth and legend. Bites are rare, and they generally happen when the spider gets pressed against skin — a shoe that has been sitting in the closet, bedding that has not been moved. That is not a reason to ignore an infestation, but it is a reason not to panic about one.',
			'Clearing them requires a very thorough treatment, more involved than a standard service visit. Once the spiders are actually removed, regular maintenance keeps new infestations from taking hold.',
			'The inspection is free. If what you have is a different spider, we will tell you that too.',
		],
		chips: ['Free Inspection', 'Specialized Treatment', 'Thorough Clear-Out', 'Ongoing Maintenance'],
		features: [
			'Free brown recluse inspection',
			'Identification — confirming what you actually have before treating',
			'Specialized treatment separate from general pest service',
			'Thorough clear-out of harborage areas',
			'Maintenance plan to keep new infestations from establishing',
			'Guidance on the storage and clutter areas they favor',
		],
		faqs: [
			{
				q: 'How much does brown recluse treatment cost?',
				a: 'More than a routine service visit, because it takes a much more thorough treatment to actually clear them. The exact number depends on the size of the structure and how established the population is. The inspection is free.',
			},
			{
				q: 'Is my regular pest control plan already covering this?',
				a: 'No. Brown recluse spiders do not respond to general treatment and require an additional, specialized service.',
			},
			{
				q: 'How dangerous are brown recluse bites?',
				a: 'Less common than the reputation suggests — much of what is said about them is myth and legend. Bites are rare and usually happen when the spider is compressed against skin, such as inside a shoe or in bedding.',
			},
			{
				q: 'Will they come back after treatment?',
				a: 'Once the spiders are removed, regular maintenance keeps new infestations from occurring. The clear-out is the hard part; holding it is routine.',
			},
		],
	},
]

/**
 * Four checkable claims. Each one is verifiable on the published site — do not
 * add a differentiator the business cannot stand behind.
 */
export const DIFFERENTIATORS = [
	{
		title: '40+ Years Combined Experience',
		text: 'Our technicians bring more than forty years of combined pest control experience to North Alabama properties.',
		icon: 'award',
	},
	{
		title: 'Better Bee Guarantee',
		text: 'If you are not completely satisfied with the services provided by our team, we will give you back your money.',
		icon: 'shield',
	},
	{
		title: 'BBB A+ Rated',
		text: 'Accredited with an A+ rating from the Better Business Bureau.',
		icon: 'badge',
	},
	{
		title: 'Locally Owned & Operated',
		text: 'A family business based in Hartselle, built one customer at a time with honesty and integrity.',
		icon: 'map-pin',
	},
] as const

/** The four-step process shown on the home page. */
export const PROCESS_STEPS = [
	{
		title: 'Free Inspection',
		description:
			'We walk the property and find what is actually going on — including the entry points you cannot see from inside.',
	},
	{
		title: 'Custom Treatment Plan',
		description:
			'You get a plan built for your property and your quote before any work starts. If you do not need us, we will say so.',
	},
	{
		title: 'Professional Service',
		description:
			'Our technicians apply safe, ecologically-friendly treatments with as little disruption to your day as possible.',
	},
	{
		title: 'Ongoing Protection',
		description:
			'Scheduled return visits keep the barrier intact through the seasons when pressure is highest.',
	},
] as const

/**
 * schema.org type. PestControlService is the most specific match and is a real
 * local-search signal — do not downgrade this to LocalBusiness.
 */
export const SCHEMA_TYPE = 'PestControlService'

/** One paragraph for JSON-LD. Not rendered on-page. */
export const BUSINESS_DESCRIPTION =
	'Better Way Pest Control is a family owned pest control company based in Hartselle, Alabama, serving homes and businesses across Morgan, Lawrence, Limestone, and Madison counties. Services include residential and commercial pest control, termite control, mosquito control, rodent control, and brown recluse treatment, all backed by a satisfaction guarantee.'

/** The guarantee, in the company's own words, as published on /guarantee. */
export const GUARANTEE = {
	name: 'Better Bee Guarantee',
	promise:
		"If you're not completely satisfied with the services provided by our team, we'll give you back your money!",
} as const

export const GA_ID = (import.meta as any).env?.PUBLIC_GA_ID || ''

/** Master switch. Set false to ship a call-only site; every form hides itself. */
export const LEAD_FORM_ENABLED = true

export interface NavLink {
	href: string
	label: string
	dropdown?: boolean
}

export const NAV_LINKS: readonly NavLink[] = [
	{ href: '/services', label: 'Services', dropdown: true },
	{ href: '/about', label: 'About' },
	{ href: '/guarantee', label: 'Guarantee' },
	{ href: '/request-inspection', label: 'Request Inspection' },
]

export function telHref() {
	return `tel:+1${COMPANY.phone}`
}

export function mailtoHref() {
	return COMPANY.email ? `mailto:${COMPANY.email}` : ''
}

/** Single-line address for display. */
export function formatAddress() {
	const a = COMPANY.address
	return `${a.streetAddress}, ${a.locality}, ${a.region} ${a.postalCode}`
}

/** Multi-line address: [street, "City, ST ZIP"]. */
export function addressLines() {
	const a = COMPANY.address
	return [a.streetAddress, `${a.locality}, ${a.region} ${a.postalCode}`] as const
}

export function serviceAreaNames() {
	return SERVICE_AREAS.map(a => a.name).join(', ')
}

export function countyNames() {
	return COUNTIES.join(', ')
}

/** URL path for an area page. Matches the published site's structure. */
export function areaPath(slug: string) {
	return `/${slug}-alabama`
}

/** URL path for a service page. */
export function servicePath(slug: string) {
	return `/services/${slug}`
}

export function getService(slug: string) {
	return SERVICES.find(s => s.slug === slug)
}

export function getArea(slug: string) {
	return SERVICE_AREAS.find(a => a.slug === slug)
}
