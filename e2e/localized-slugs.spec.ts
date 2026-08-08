import { test, expect } from '@playwright/test'

// About and Legal notice shipped without an entry in nuxt.config's `i18n.pages`, so
// the EN versions were served under the FRENCH slug — /en/a-propos/ and
// /en/mentions-legales/ — and Google indexed them that way (spotted in GSC).
// The EN slugs now match the CTA labels already in i18n/en.json: nav.about "About"
// and footer.legal "Legal notice".
//
// These tests pin the pair (page reachable at the localized slug) + (old indexed URL
// still resolves, via the prerendered meta-refresh stub that routeRules emits — the
// only redirect mechanism a static GitHub Pages host allows).

const LOCALIZED = [
  { path: '/a-propos/',        locale: 'fr-FR' },
  { path: '/mentions-legales/', locale: 'fr-FR' },
  { path: '/en/about/',         locale: 'en-US' },
  { path: '/en/legal-notice/',  locale: 'en-US' },
]

for (const { path, locale } of LOCALIZED) {
  test(`page is prerendered at its localized slug: ${path}`, async ({ page }) => {
    const response = await page.goto(path, { waitUntil: 'load' })
    expect(response?.status(), `${path} must be prerendered (200, not a 404)`).toBe(200)
    await expect(page.locator('h1'), `${path} must render a non-empty <h1>`).not.toBeEmpty()
  })
}

// The FR slug under /en/ must no longer serve a page of its own: it redirects to the
// localized one. Playwright follows the meta refresh, so asserting the landing URL
// covers the whole chain.
const REDIRECTED = [
  { from: '/en/a-propos/',          to: '/en/about' },
  { from: '/en/mentions-legales/',  to: '/en/legal-notice' },
]

for (const { from, to } of REDIRECTED) {
  test(`indexed FR-slug URL redirects to the EN slug: ${from} → ${to}`, async ({ page }) => {
    await page.goto(from, { waitUntil: 'load' })
    await expect
      .poll(() => new URL(page.url()).pathname.replace(/\/$/, ''), {
        message: `${from} must land on ${to}, not serve a page of its own`,
      })
      .toBe(to)
  })
}

// hreflang/canonical must advertise the localized slug — otherwise the old URL keeps
// being the one Google consolidates on, and the rename buys nothing.
test.describe('EN about page head', () => {
  test.use({ locale: 'en-US' })

  test('canonical and hreflang point at the localized EN slug', async ({ page }) => {
    await page.goto('/en/about/', { waitUntil: 'load' })

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(canonical?.replace(/\/$/, ''), 'canonical must use the EN slug').toBe(
      'https://meridian-synergy.com/en/about',
    )

    const enAlternate = await page.locator('link[rel="alternate"][hreflang="en-US"]').getAttribute('href')
    expect(enAlternate?.replace(/\/$/, ''), 'the en-US alternate must use the EN slug').toBe(
      'https://meridian-synergy.com/en/about',
    )

    const frAlternate = await page.locator('link[rel="alternate"][hreflang="fr-FR"]').getAttribute('href')
    expect(frAlternate?.replace(/\/$/, ''), 'the fr-FR alternate must use the FR slug').toBe(
      'https://meridian-synergy.com/a-propos',
    )
  })
})
