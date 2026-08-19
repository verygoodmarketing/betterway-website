/**
 * Builds the default 1200×630 Open Graph card at public/og-default.jpg.
 *
 * Uses the real logo and hero photo so the share image matches the site,
 * not an approximation. Re-run after swapping those assets:
 *   node scripts/og-image.mjs
 */
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const WIDTH = 1200
const HEIGHT = 630

const hero = join(root, 'src/assets/images/hero.jpg')
const logoPath = join(root, 'src/assets/images/logo-dark.png')
const out = join(root, 'public/og-default.jpg')

const background = await sharp(hero)
	.resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
	.toBuffer()

const scrim = Buffer.from(`
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0b3d1f" stop-opacity="0.78"/>
      <stop offset="1" stop-color="#14532d" stop-opacity="0.92"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
</svg>
`)

const logo = await sharp(logoPath)
	.resize({ width: 760, withoutEnlargement: true })
	.toBuffer()
const logoMeta = await sharp(logo).metadata()
const logoLeft = Math.round((WIDTH - logoMeta.width) / 2)
const logoTop = Math.round((HEIGHT - logoMeta.height) / 2) - 36

const type = Buffer.from(`
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect x="${WIDTH / 2 - 48}" y="468" width="96" height="3" rx="1.5" fill="#fcd34d"/>
  <text x="50%" y="516" text-anchor="middle"
    font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
    font-size="26" font-weight="700" fill="#fcd34d" letter-spacing="0.5">
    Better Service · Better Results · Guaranteed
  </text>
  <text x="50%" y="558" text-anchor="middle"
    font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
    font-size="22" font-weight="600" fill="#ffffff" fill-opacity="0.92">
    Hartselle, Alabama · (256) 580-6181
  </text>
</svg>
`)

await sharp(background)
	.composite([
		{ input: scrim },
		{ input: logo, left: logoLeft, top: logoTop },
		{ input: type },
	])
	.jpeg({ quality: 86, mozjpeg: true })
	.toFile(out)

const meta = await sharp(out).metadata()
console.log(`wrote ${out} (${meta.width}×${meta.height}, ${Math.round((await sharp(out).toBuffer()).length / 1024)} KB)`)
