/**
 * Meridian Synergy — OG image generator
 *
 * Converts og-default.svg → public/og-default.png (1200×630)
 *
 * Run: pnpm install && pnpm generate
 *      OR: npx tsx generate.ts
 */

import sharp from 'sharp'
import { readFileSync } from 'fs'
import { join, dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = join(__dirname, 'og-default.svg')
const out = resolve(__dirname, '../../public/og-default.png')

const W = 1200
const H = 630

async function generate() {
  console.log('\nMeridian Synergy — OG image generator')
  console.log(`Source : ${src}`)
  console.log(`Output : ${out}\n`)

  const svg = readFileSync(src)
  await sharp(svg, { density: Math.ceil((Math.max(W, H) / 82) * 72), limitInputPixels: false })
    .resize(W, H, { fit: 'fill', kernel: 'lanczos3' })
    .png({ compressionLevel: 9, quality: 100 })
    .toFile(out)

  console.log(`  ✓  og-default.png  ${W}×${H}`)
  console.log('\nDone.\n')
}

generate()
