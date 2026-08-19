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
	/** <title> for the area page. Keep the rendered title under 70 chars. */
	metaTitle: string
	metaDescription: string
	/** Lead paragraph under the H1. */
	blurb: string
	/** Second paragraph — the local specifics that stop this reading as a template. */
	detail: string
	/** Nearby communities and landmarks this page should also rank for. */
	nearby: string[]
	/** Zip codes covered, for the LocalBusiness areaServed and on-page copy. */
	zips: string[]
	/**
	 * What actually drives calls in this town, in priority order. Each becomes an
	 * H3 on the area page tied to the matching service, so no two area pages have
	 * the same section order or the same reasoning.
	 */
	localPressures: { serviceSlug: string; heading: string; body: string }[]
	/** Town-specific FAQs. These render as FAQPage schema per area page. */
	faqs: { q: string; a: string }[]
}

export const SERVICE_AREAS: ServiceArea[] = [
	{
		slug: 'hartselle',
		name: 'Hartselle',
		county: 'Morgan',
		metaTitle: 'Pest Control Hartselle, AL',
		metaDescription:
			'Local pest, termite, mosquito, and rodent control in Hartselle, AL. Our office is on Sparkman St SW. Free inspections. Call (256) 580-6181.',
		blurb:
			'Hartselle is home. Our office is on Sparkman Street SW, which means most Hartselle addresses are a few minutes from our front door.',
		detail:
			'Being based in town changes what we can promise. A Hartselle call does not get slotted around a drive from another county, and the technician who comes out is one you will see again on the next visit. We work the older homes around downtown and Sparkman Street, the subdivisions off Highway 31, and the properties out toward Flint and Union Hill.',
		nearby: ['Falkville', 'Priceville', 'Somerville', 'Flint', 'Union Hill'],
		zips: ['35640'],
		localPressures: [
			{
				serviceSlug: 'residential-commercial-pest-control',
				heading: 'Crawl spaces under the older homes',
				body:
					'A lot of Hartselle housing stock predates slab construction, and a recurring bug problem in one of those homes is usually a moisture problem underneath it. We check the crawl space before we quote a treatment plan, because spraying the kitchen every quarter does not fix what is happening under the floor.',
			},
			{
				serviceSlug: 'termite-control',
				heading: 'Termite pressure on established lots',
				body:
					'Mature trees, old stumps, and decades of leaf litter give termites a foothold long before they reach the house. On established Hartselle lots we install baiting stations around the structure and check them quarterly, which is what catches activity while it is still in the yard.',
			},
			{
				serviceSlug: 'mosquito-control',
				heading: 'Standing water after a Morgan County storm',
				body:
					'Yards here hold water in the low spots for days after a heavy rain, and that is all it takes. Monthly treatment through spring and fall targets where mosquitoes actually rest — under decks, in dense shrubs, along fence lines — instead of fogging the open air.',
			},
		],
		faqs: [
			{
				q: 'Where is your Hartselle office?',
				a: '209 Sparkman St SW, Hartselle, AL 35640. We are open Monday through Saturday, 7am to 6pm, and closed Sundays.',
			},
			{
				q: 'How fast can you get to a Hartselle address?',
				a: 'Faster than anywhere else we serve, because this is where we are based. Call and we will tell you honestly what the schedule looks like that week rather than promising a window we cannot hold.',
			},
			{
				q: 'Do you treat homes with crawl spaces?',
				a: 'Yes, and in Hartselle that comes up often. Crawl space and moisture management is part of our residential work, because moisture underneath is frequently the reason a pest problem keeps coming back.',
			},
		],
	},
	{
		slug: 'decatur',
		name: 'Decatur',
		county: 'Morgan',
		metaTitle: 'Pest Control Decatur, AL',
		metaDescription:
			'Pest, termite, mosquito, and rodent control for Decatur, AL homes and businesses. Restaurant and warehouse accounts welcome. Call (256) 580-6181.',
		blurb:
			'Decatur is our largest service area outside Hartselle, and it is split almost evenly between homes and commercial accounts.',
		detail:
			'The city runs from established residential neighborhoods to the restaurants downtown and the warehouses and plants along the Tennessee River. Those are genuinely different jobs: a kitchen working against a health inspection schedule needs documentation and an off-hours visit, while a house with an ant trail on the patio needs someone to find where they are coming in. We run both out of the same Hartselle office, fifteen minutes south.',
		nearby: ['Priceville', 'Trinity', 'Somerville', 'Flint City'],
		zips: ['35601', '35603', '35609'],
		localPressures: [
			{
				serviceSlug: 'residential-commercial-pest-control',
				heading: 'Commercial accounts along the river corridor',
				body:
					'Manufacturing plants, warehouses, and restaurants each have their own pressure points — dock doors that stand open, floor drains, dry storage. We service single locations and multi-location operations, and we work around your hours rather than expecting you to work around ours.',
			},
			{
				serviceSlug: 'mosquito-control',
				heading: 'River-adjacent mosquito pressure',
				body:
					'Decatur sits on the Tennessee River next to the Wheeler National Wildlife Refuge wetlands. That is excellent for the birding and hard on anyone trying to use their back yard in July. Properties on the north side of town carry noticeably more mosquito pressure than the same house would five miles inland, and monthly treatment is what makes the difference.',
			},
			{
				serviceSlug: 'rodent-control',
				heading: 'Rodents in commercial storage',
				body:
					'Warehouses and restaurant stockrooms give rodents everything they need, and a single sighting in a commercial kitchen is a problem with a deadline attached. We remove what is there, seal the entry points so the population cannot replace itself, and clean up behind it.',
			},
		],
		faqs: [
			{
				q: 'Do you service commercial properties in Decatur?',
				a: 'Yes — manufacturing plants, restaurants, warehouses, and offices, for both single and multi-location operations. Call and we will walk the facility before quoting anything.',
			},
			{
				q: 'Why are mosquitoes so bad on the north side of Decatur?',
				a: 'The river and the Wheeler refuge wetlands sit right there, and mosquitoes breed in standing water. It does not mean you cannot use your yard — it means treatment needs to be monthly through the season rather than one visit in June.',
			},
			{
				q: 'How far is Decatur from your office?',
				a: 'About fifteen minutes north of our Hartselle office on Highway 31, so Decatur is well inside our regular service rotation.',
			},
		],
	},
	{
		slug: 'moulton',
		name: 'Moulton',
		county: 'Lawrence',
		metaTitle: 'Pest Control Moulton, AL',
		metaDescription:
			'Pest, rodent, and brown recluse control for Moulton and Lawrence County, AL. Rural properties and exclusion work. Call (256) 580-6181.',
		blurb:
			'Moulton and the surrounding Lawrence County properties, including the homes well outside the city limits that most companies will not drive to.',
		detail:
			'A lot of our Moulton work is rural. These are properties backing onto woods and fields, many of them near the Bankhead National Forest, with outbuildings, barns, and detached garages that give pests somewhere to establish before they ever reach the house. That changes the job: on a rural property, exclusion work matters more than spray volume, because there is an unlimited supply of mice and spiders in the tree line waiting to replace whatever you removed.',
		nearby: ['Courtland', 'Town Creek', 'Hillsboro', 'Mount Hope', 'Bankhead National Forest'],
		zips: ['35650'],
		localPressures: [
			{
				serviceSlug: 'rodent-control',
				heading: 'Mice moving indoors when the weather turns',
				body:
					'On a rural Lawrence County property the first cold snap sends field mice looking for somewhere warm, and they find the gaps you cannot see from inside. Trapping alone just opens a vacancy. We seal the entry points, then clean up the feces and nesting material and treat the odor.',
			},
			{
				serviceSlug: 'brown-recluse-control',
				heading: 'Brown recluse in outbuildings and storage',
				body:
					'Undisturbed space is exactly what brown recluse want, and rural properties have plenty of it — barns, sheds, garages, boxes that have not moved in years. They do not respond to general pest treatment, so if you are on a regular plan and still seeing them, that is why.',
			},
			{
				serviceSlug: 'termite-control',
				heading: 'Wooded lot lines and termite risk',
				body:
					'Property backing onto forest means dead wood, stumps, and debris close to the structure. We install baiting systems and inspect the stations quarterly so activity gets caught in the yard rather than in your floor joists.',
			},
		],
		faqs: [
			{
				q: 'Do you come out to properties outside Moulton city limits?',
				a: 'Yes. A good part of our Lawrence County work is on rural properties well outside town. Call with your address and we will tell you straight whether you are in our range.',
			},
			{
				q: 'I keep finding brown recluse even though I have pest control. Why?',
				a: 'Brown recluse do not respond to general pest treatment — they need a separate, much more thorough service. That is a common surprise for people who assumed their regular plan covered it.',
			},
			{
				q: 'What does exclusion work involve on a rural property?',
				a: 'Finding and sealing the openings rodents are actually using, then installing barriers so the next ones cannot get in. On a property next to woods this is the part that ends the problem, rather than trapping the same mice over and over.',
			},
		],
	},
	{
		slug: 'athens',
		name: 'Athens',
		county: 'Limestone',
		metaTitle: 'Pest Control Athens, AL',
		metaDescription:
			'Pest, termite, and mosquito control in Athens and Limestone County, AL. New construction termite protection. Call (256) 580-6181.',
		blurb:
			'Athens and Limestone County, where new construction keeps pushing out into what was recently farmland.',
		detail:
			'Limestone County has been one of the fastest-growing counties in Alabama, and the subdivisions going up around Athens sit on ground that was open field a few years ago. The pests that lived on that land do not leave when the houses arrive — they just find better shelter. There is also a steady rental population around Athens State University, where turnover between tenants is when problems tend to surface.',
		nearby: ['Elkmont', 'Ardmore', 'Tanner', 'Mooresville', 'Athens State University'],
		zips: ['35611', '35613', '35614'],
		localPressures: [
			{
				serviceSlug: 'termite-control',
				heading: 'Protect a new build before there is a problem',
				body:
					'The cheapest termite work you will ever buy is the system you install on a house that does not have termites yet. On new construction around Athens we put the baiting system in early and inspect the stations quarterly, which costs a fraction of repairing damage found during a future sale.',
			},
			{
				serviceSlug: 'residential-commercial-pest-control',
				heading: 'Fields turning into subdivisions',
				body:
					'When a development goes in on former farmland, the ants, spiders, and field mice that were already there move into the nearest structure. New homes get more pest pressure than owners expect in the first few years, and a year-round plan through that period is what settles it down.',
			},
			{
				serviceSlug: 'mosquito-control',
				heading: 'Drainage in newer developments',
				body:
					'Retention ponds and fresh grading mean standing water sits in places it will not sit once the landscaping matures. Monthly treatment targets those breeding sites directly rather than waiting for the yard to establish.',
			},
		],
		faqs: [
			{
				q: 'Should I get termite protection on a brand new house?',
				a: 'Yes, and it is the best value in this business. Preventative protection on a new build costs a fraction of treating an active infestation and repairing the damage, and Limestone County has plenty of new construction on ground that was field.',
			},
			{
				q: 'Do you work with rental properties in Athens?',
				a: 'Yes. Turnover between tenants is a natural point to inspect and treat, and we can work with either the owner or the management company.',
			},
			{
				q: 'How far into Limestone County do you go?',
				a: 'We cover Limestone County as part of our regular North Alabama service area, including the communities around Athens. Call with your address and we will confirm.',
			},
		],
	},
	{
		slug: 'madison',
		name: 'Madison',
		county: 'Madison',
		metaTitle: 'Pest Control Madison, AL',
		metaDescription:
			'Year-round pest control and mosquito treatment for Madison, AL homes. Scheduled service, same technicians. Call (256) 580-6181.',
		blurb:
			'Madison homeowners who would rather be on a schedule than make a phone call every time something shows up.',
		detail:
			'Most of our Madison customers are on a year-round program, and that is a specific preference rather than an upsell — these are households that want the service to happen on a rotation without anyone having to think about it. The other common request here is mosquito treatment, on properties where the back yard is a significant part of why the house was bought in the first place.',
		nearby: ['Triana', 'Harvest', 'Monrovia', 'Bridge Street', 'Research Park'],
		zips: ['35756', '35757', '35758'],
		localPressures: [
			{
				serviceSlug: 'mosquito-control',
				heading: 'Getting the back yard back',
				body:
					'Pools, patios, and decks in Madison get built for evening use and then go unused after six because of mosquitoes. Monthly treatment through spring, summer, and fall targets resting and breeding sites on the property so the yard is usable at the hours you actually want it.',
			},
			{
				serviceSlug: 'residential-commercial-pest-control',
				heading: 'Year-round plans on a set rotation',
				body:
					'Pest pressure changes with the season rather than stopping, which is why one-off treatments feel like they wore off. A year-round plan puts us on your property on a set rotation, ahead of each season instead of after it.',
			},
			{
				serviceSlug: 'termite-control',
				heading: 'Termite inspections before a sale',
				body:
					'Madison turns over houses regularly, and termite damage is most often discovered by an inspector during a sale — years after it started. An annual inspection is what keeps that from becoming a closing-table problem.',
			},
		],
		faqs: [
			{
				q: 'What does a year-round plan actually include?',
				a: 'Scheduled return visits on a rotation built for your property, with interior and exterior treatment and the entry points handled rather than just the room where you saw something. We set the rotation after the free inspection.',
			},
			{
				q: 'When should I start mosquito treatment in Madison?',
				a: 'Before you start noticing them. Mosquitoes are active well into fall and again in spring, so starting early keeps the season comfortable instead of spending it catching up.',
			},
			{
				q: 'Will I get the same technician each visit?',
				a: 'That is the intent. We are a family owned company working Madison out of Hartselle, not a national brand routing whoever is closest — continuity is part of what you are paying for.',
			},
		],
	},
	{
		slug: 'huntsville',
		name: 'Huntsville',
		county: 'Madison',
		metaTitle: 'Pest Control Huntsville, AL',
		metaDescription:
			'Pest, termite, mosquito, and rodent control in Huntsville, AL from a locally owned Hartselle company. Free inspections. Call (256) 580-6181.',
		blurb:
			'Huntsville is the far end of our territory, and we hold the same response standard there that we hold at home.',
		detail:
			'Huntsville has grown quickly and it shows in the housing: historic homes in the older districts, decades of mid-century stock in between, and new construction pushing out in every direction. Each of those has a different pest profile, which is the argument against a one-size treatment package. We are a Hartselle company working Huntsville — you get the same technicians on every visit, and the person answering the phone knows which house is yours.',
		nearby: ['Meridianville', 'Hazel Green', 'Owens Cross Roads', 'Big Cove', 'Monte Sano'],
		zips: ['35801', '35802', '35803', '35805', '35806', '35810', '35811'],
		localPressures: [
			{
				serviceSlug: 'termite-control',
				heading: 'Older housing stock and long-running damage',
				body:
					'In the established Huntsville neighborhoods the structures have had decades for termites to work quietly, and the damage is inside the wood where nobody sees it. An annual inspection on an older home is not a formality — it is the only reliable way to find out.',
			},
			{
				serviceSlug: 'brown-recluse-control',
				heading: 'Brown recluse in basements and attics',
				body:
					'Older homes come with the storage spaces brown recluse prefer: basements, attics, closets full of boxes nobody has moved. Clearing them takes a much more thorough treatment than a standard service visit, and general pest plans do not cover it.',
			},
			{
				serviceSlug: 'mosquito-control',
				heading: 'Wooded lots on the mountain side',
				body:
					'Properties backing onto the wooded slopes hold shade and moisture, which is exactly what mosquitoes rest in through the heat of the day. Treating those harborage areas monthly does more than treating open lawn.',
			},
		],
		faqs: [
			{
				q: 'You are based in Hartselle — do you actually service Huntsville?',
				a: 'Yes, regularly. Huntsville is the far end of our territory and we hold the same response standard there. The tradeoff people like is that you get a small local company rather than a call center.',
			},
			{
				q: 'My house is from the 1950s. Does that change anything?',
				a: 'It changes what we look for. Older Huntsville homes have had longer for termite activity to develop out of sight, and they tend to have the basements, attics, and storage areas that brown recluse favor. The inspection accounts for both.',
			},
			{
				q: 'Do you charge extra for the drive to Huntsville?',
				a: 'Call and ask — we will give you a straight answer with your quote rather than surprising you with it. The free inspection is free either way.',
			},
		],
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
