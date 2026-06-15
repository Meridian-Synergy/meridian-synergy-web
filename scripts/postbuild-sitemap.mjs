// Post-build sitemap fix. @nuxtjs/sitemap v8 strips the trailing slash from every
// <loc> and resists config + runtime hooks, but GitHub Pages serves directory URLs
// WITH a trailing slash (301s the no-slash form). So normalise the final file on
// disk: every <loc> (except the root) gets a trailing slash, matching the served /
// canonical URL — otherwise every sitemap entry points at a redirecting URL.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const FILE = '.output/public/sitemap.xml'

if (!existsSync(FILE)) {
  console.warn(`[postbuild-sitemap] ${FILE} not found — skipping`)
  process.exit(0)
}

const xml = readFileSync(FILE, 'utf8')
const total = (xml.match(/<loc>/g) || []).length

// 1) Add a trailing slash to any loc that doesn't already end with one (root ends
//    with "/" already, so it's left untouched).
const slashed = xml.replace(
  /<loc>(https:\/\/meridian-synergy\.com\/[^<]*[^/])<\/loc>/g,
  '<loc>$1/</loc>',
)

// 2) Drop duplicate <url> blocks (the i18n integration re-injects the localized-slug
//    hubs that are already declared explicitly). Keep the first occurrence per loc —
//    that's the explicit entry, which carries priority/changefreq.
const seen = new Set()
let removed = 0
const deduped = slashed.replace(/ {4}<url>[\s\S]*?<\/url>\n/g, (block) => {
  const loc = (block.match(/<loc>([^<]*)<\/loc>/) || [])[1]
  if (loc && seen.has(loc)) { removed++; return '' }
  if (loc) seen.add(loc)
  return block
})

writeFileSync(FILE, deduped)

const remaining = (deduped.match(/<loc>https:\/\/meridian-synergy\.com\/[^<]*[^/]<\/loc>/g) || []).length
console.log(`[postbuild-sitemap] ${total} <loc> processed — trailing-slash fixed, ${removed} duplicate(s) removed, remaining no-slash: ${remaining}`)
