/**
 * JSON-LD builders. Everything here reads from company.ts — no business data
 * is written in this file.
 */
import {
	COMPANY,
	SERVICES,
	COUNTIES,
	SCHEMA_TYPE,
	BUSINESS_DESCRIPTION,
	SERVICE_AREAS,
	type Service,
	type ServiceArea,
} from '../config/company'
import { googleReviews } from '../config/reviews'

const abs = (path: string) => new URL(path, COMPANY.url).toString()

export function localBusinessSchema() {
	const social = Object.values(COMPANY.social).filter(Boolean)
	return {
		'@context': 'https://schema.org',
		'@type': SCHEMA_TYPE,
		'@id': `${COMPANY.url}/#business`,
		name: COMPANY.name,
		legalName: COMPANY.legalName,
		description: BUSINESS_DESCRIPTION,
		telephone: `+1${COMPANY.phone}`,
		url: COMPANY.url,
		image: abs(COMPANY.logo),
		logo: abs(COMPANY.logo),
		priceRange: '$$',
		address: {
			'@type': 'PostalAddress',
			streetAddress: COMPANY.address.streetAddress,
			addressLocality: COMPANY.address.locality,
			addressRegion: COMPANY.address.region,
			postalCode: COMPANY.address.postalCode,
			addressCountry: COMPANY.address.country,
		},
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: [
					'Monday',
					'Tuesday',
					'Wednesday',
					'Thursday',
					'Friday',
					'Saturday',
				],
				opens: '07:00',
				closes: '18:00',
			},
		],
		areaServed: [
			...SERVICE_AREAS.map(a => ({
				'@type': 'City',
				name: `${a.name}, ${COMPANY.address.region}`,
			})),
			...COUNTIES.map(c => ({
				'@type': 'AdministrativeArea',
				name: `${c} County, ${COMPANY.address.region}`,
			})),
		],
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: googleReviews.rating,
			reviewCount: googleReviews.reviewCount,
			bestRating: 5,
			worstRating: 1,
		},
		...(social.length ? { sameAs: social } : {}),
	}
}

export function serviceSchema(service: Service) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: service.name,
		description: service.metaDescription,
		serviceType: service.name,
		url: abs(`/services/${service.slug}`),
		provider: { '@id': `${COMPANY.url}/#business` },
		areaServed: SERVICE_AREAS.map(a => ({
			'@type': 'City',
			name: `${a.name}, ${COMPANY.address.region}`,
		})),
	}
}

export function faqSchema(faqs: { q: string; a: string }[]) {
	if (!faqs.length) return null
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map(f => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a },
		})),
	}
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
	if (!trail.length) return null
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: trail.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			item: abs(item.path),
		})),
	}
}

/**
 * Per-town Service schema. Naming the town, county, and zips explicitly is a
 * stronger local signal than the site-wide areaServed list alone, and it is the
 * part of an area page Google can actually verify against the address.
 */
export function areaServiceSchema(area: ServiceArea) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: `Pest Control in ${area.name}, ${COMPANY.address.region}`,
		description: area.metaDescription,
		serviceType: 'Pest Control',
		url: abs(`/${area.slug}-alabama`),
		provider: { '@id': `${COMPANY.url}/#business` },
		areaServed: [
			{
				'@type': 'City',
				name: `${area.name}, ${COMPANY.address.region}`,
				containedInPlace: {
					'@type': 'AdministrativeArea',
					name: `${area.county} County, ${COMPANY.address.region}`,
				},
			},
			...area.nearby.map(place => ({ '@type': 'Place', name: place })),
		],
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: `Pest control services in ${area.name}`,
			itemListElement: SERVICES.map(service => ({
				'@type': 'Offer',
				itemOffered: {
					'@type': 'Service',
					name: `${service.name} in ${area.name}, ${COMPANY.address.region}`,
					url: abs(`/services/${service.slug}`),
				},
			})),
		},
	}
}
