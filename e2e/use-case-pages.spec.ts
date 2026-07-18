import { test, expect } from '@playwright/test'
import { readdirSync } from 'node:fs'

// Regression guard for the silent-404 incident (fix #39): a crash during prerender
// (e.g. defineOgImage → nuxt-og-image) combined with prerender.failOnError:false made
// the build "succeed" while emitting NO html for every use-case detail page — so they
// 404'd in prod with a green CI and a sitemap that still advertised them.
//
// The static server (scripts/serve-static.mjs, mirroring GitHub Pages) returns 404 when
// an index.html was never generated, so asserting a 200 navigation status catches the
// regression directly. Slugs are read from the content dir so new pages are covered
// automatically and the two locales stay in sync with nuxt.config's route map.
function slugs(dir: string): string[] {
  return readdirSync(dir).filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, ''))
}

// FR content lives under /cas-usage/<slug>/, EN under /en/use-case/<slug>/.
const pages = [
  ...slugs('content/fr/cas-usage').map(s => `/cas-usage/${s}/`),
  ...slugs('content/en/cas-usage').map(s => `/en/use-case/${s}/`),
]

test('sanity: use-case content exists for both locales', () => {
  expect(slugs('content/fr/cas-usage').length).toBeGreaterThan(0)
  expect(slugs('content/en/cas-usage').length).toBeGreaterThan(0)
})

for (const path of pages) {
  test(`use-case detail page is generated and renders: ${path}`, async ({ page }) => {
    const response = await page.goto(path, { waitUntil: 'load' })

    // The prerendered html must exist — a missing file means the page silently
    // dropped out of the build (the #39 regression).
    expect(response?.status(), `${path} must be prerendered (200, not a 404)`).toBe(200)

    // And it must be the real content page, not a blank/error render.
    await expect(page.locator('h1'), `${path} must render a non-empty <h1>`).not.toBeEmpty()
    expect((await page.title()).trim().length, `${path} must have a <title>`).toBeGreaterThan(0)
  })
}
