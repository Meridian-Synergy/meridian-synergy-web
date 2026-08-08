// Post-build prune of the phantom route trees.
//
// Two families of pages are generated that must never be served:
//
//  1. /en/en/** — every `redirect` key in routeRules becomes a stub ROUTE, and
//     @nuxtjs/i18n then localizes that route like any other, re-prefixing it per
//     locale. A key such as '/en/cas-usage' therefore also yields /en/en/cas-usage,
//     which prerenders as a FULL page (~38 KB), HTTP 200, canonical pointing at
//     itself — i.e. indexable duplicate content. Observed live in GSC.
//  2. /fr/** — the i18n strategy is 'prefix_and_default', so the default locale is
//     reachable both at / and at /fr/. The /fr/ copy is self-canonical, so it is a
//     duplicate of the unprefixed page. It is already excluded from the sitemap;
//     removing the files makes GitHub Pages answer a real 404 instead of a 200.
//     (This also covers /fr/en/**, the cross-product of the two bugs.)
//
// GitHub Pages is a pure static host: there is no server middleware to redirect
// with, so deleting the files IS the fix — a missing file is a genuine 404.
//
// Guard: the script refuses to prune (exit 1, failing the build) if any surviving
// page still links into a pruned tree. That way, if someone later adds a real link
// to /fr/..., CI says so instead of silently shipping a broken link.
import { readdirSync, readFileSync, existsSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = '.output/public'
const PRUNE = ['en/en', 'fr']

if (!existsSync(ROOT)) {
  console.warn(`[postbuild-prune] ${ROOT} not found — skipping`)
  process.exit(0)
}

const inPruned = (rel) => PRUNE.some((d) => rel === d || rel.startsWith(`${d}/`))

const allFiles = readdirSync(ROOT, { recursive: true }).filter((f) => typeof f === 'string')
const survivingHtml = allFiles.filter((f) => f.endsWith('.html') && !inPruned(f))

// A surviving page must not reference a pruned tree in any URL-bearing attribute
// (href/src/content covers links, hreflang alternates, canonical and og:url).
const refs = PRUNE.map((dir) => ({
  dir,
  re: new RegExp(`(?:href|src|content)="(?:https://meridian-synergy\\.com)?/${dir}/`),
}))
const offenders = []
for (const rel of survivingHtml) {
  const html = readFileSync(join(ROOT, rel), 'utf8')
  for (const { dir, re } of refs) {
    if (re.test(html)) offenders.push(`${rel} → /${dir}/`)
  }
}

if (offenders.length) {
  console.error(
    `[postbuild-prune] ABORT — ${offenders.length} surviving page(s) link into a tree to prune:\n` +
      offenders.slice(0, 20).map((o) => `  ${o}`).join('\n') +
      (offenders.length > 20 ? `\n  … and ${offenders.length - 20} more` : ''),
  )
  process.exit(1)
}

let removedPages = 0
for (const dir of PRUNE) {
  const abs = join(ROOT, dir)
  if (!existsSync(abs)) {
    console.warn(`[postbuild-prune] ${dir}/ not present — nothing to prune`)
    continue
  }
  removedPages += readdirSync(abs, { recursive: true }).filter(
    (f) => typeof f === 'string' && f.endsWith('.html'),
  ).length
  rmSync(abs, { recursive: true, force: true })
}

const before = allFiles.filter((f) => f.endsWith('.html')).length
console.log(
  `[postbuild-prune] removed ${removedPages} phantom page(s) from ${PRUNE.map((d) => `/${d}/`).join(' + ')} — ${before - removedPages} page(s) remain`,
)
