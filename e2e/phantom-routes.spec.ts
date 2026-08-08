import { test, expect } from '@playwright/test'
import { readdirSync, existsSync } from 'node:fs'

// Regression guard for the phantom-route trees removed by scripts/postbuild-prune.mjs.
//
// Each `redirect` key in routeRules becomes a stub ROUTE, which @nuxtjs/i18n then
// localizes like any other route — re-prefixing it per locale. '/en/cas-usage' thus
// also produced /en/en/cas-usage, prerendered as a FULL ~38 KB page, HTTP 200,
// canonical pointing at itself: indexable duplicate content, live in prod until now.
// Separately, strategy 'prefix_and_default' makes the default locale reachable at
// both / and /fr/, and the /fr/ copy is self-canonical — another duplicate set.
//
// GitHub Pages has no server middleware, so the fix is to delete the files: a missing
// file is a real 404. These tests assert both halves — nothing left on disk, and the
// host answering 404 — because a silent regression here is invisible until GSC
// reports duplicates weeks later.

const PRUNED_TREES = ['en/en', 'fr']

test('no phantom page survives in the build output', () => {
  for (const dir of PRUNED_TREES) {
    const abs = `.output/public/${dir}`
    if (!existsSync(abs)) continue
    const pages = readdirSync(abs, { recursive: true }).filter(
      (f) => typeof f === 'string' && f.endsWith('.html'),
    )
    expect(pages, `/${dir}/ must contain no prerendered page (found ${pages.length})`).toEqual([])
  }
})

const MUST_404 = [
  // i18n re-prefixed the routeRules redirect stubs.
  '/en/en/cas-usage/',
  '/en/en/cas-usage/solar-panels/',
  '/en/en/services/audit-thermique/',
  // Default locale duplicated under its own prefix.
  '/fr/',
  '/fr/a-propos/',
  '/fr/cas-usage/',
  // Cross-product of both bugs.
  '/fr/en/cas-usage/',
]

for (const path of MUST_404) {
  test(`phantom route is a real 404: ${path}`, async ({ page }) => {
    const response = await page.goto(path, { waitUntil: 'commit' })
    expect(response?.status(), `${path} must 404 — a 200 here is indexable duplicate content`).toBe(404)
  })
}
