import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'

// The offer page and its guides are published in BOTH locales, for site coherence —
// even where the English version has no audience of its own. Only /en/ai-instructions
// is a deliberate single-language page, guarded in ai-readability.spec.ts.
//
// The guides are a dynamic route whose slugs differ per locale, so they need the
// translationKey pairing; the offer page is a static route with a localised slug,
// which i18n resolves on its own. Both are pinned here because the failure mode is
// the same and silent: an alternate pointing at a URL that was never generated.

const PAIRS = [
  { fr: '/audit-de-site/', en: '/en/website-audit/' },
  { fr: '/guides/combien-coute-un-site-internet/', en: '/en/guides/website-cost/' },
  { fr: '/guides/site-invisible-sur-google/', en: '/en/guides/site-not-showing-on-google/' },
  { fr: '/guides/fiche-google-entreprise/', en: '/en/guides/google-business-profile/' },
]

const SITE = 'https://meridian-synergy.com'

for (const { fr, en } of PAIRS) {
  for (const path of [fr, en]) {
    test(`page is prerendered and declared: ${path}`, async ({ page }) => {
      const response = await page.goto(path, { waitUntil: 'load' })
      expect(response?.status(), `${path} must be prerendered`).toBe(200)
      await expect(page.locator('h1'), `${path} must render a non-empty <h1>`).not.toBeEmpty()

      const sitemap = readFileSync('.output/public/sitemap.xml', 'utf8')
      expect(sitemap, `${path} must be in the sitemap`).toContain(`<loc>${SITE}${path}</loc>`)
    })

    test(`alternates point at the real counterpart: ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'load' })
      const frAlt = await page.locator('link[rel="alternate"][hreflang="fr-FR"]').getAttribute('href')
      const enAlt = await page.locator('link[rel="alternate"][hreflang="en-US"]').getAttribute('href')
      expect(frAlt?.replace(/\/$/, ''), 'the fr-FR alternate must be the French page').toBe(
        `${SITE}${fr}`.replace(/\/$/, ''),
      )
      expect(enAlt?.replace(/\/$/, ''), 'the en-US alternate must be the English page').toBe(
        `${SITE}${en}`.replace(/\/$/, ''),
      )
    })
  }
}

// Cross-locale slugs were never generated, so no stub has to redirect them afterwards.
const MUST_404 = [
  '/en/guides/combien-coute-un-site-internet/',
  '/guides/website-cost/',
  '/en/audit-de-site/',
]

for (const path of MUST_404) {
  test(`cross-locale slug is not served: ${path}`, async ({ request }) => {
    const response = await request.get(path)
    expect(response.status(), `${path} must not exist as a page of its own`).toBe(404)
  })
}

test('the offer page is linked from both home pages, not orphaned', async ({ page }) => {
  for (const [home, href] of [['/', '/audit-de-site'], ['/en/', '/en/website-audit']]) {
    await page.goto(home, { waitUntil: 'load' })
    await expect(page.locator(`a[href*="${href}"]`), `${home} must link to the offer`).not.toHaveCount(0)
  }
})

test('each guide routes back to the offer page in its own locale', async ({ page }) => {
  for (const { fr, en } of PAIRS.slice(1)) {
    await page.goto(fr, { waitUntil: 'load' })
    await expect(page.locator('a[href*="/audit-de-site"]'), `${fr} must link to the FR offer`).not.toHaveCount(0)
    await page.goto(en, { waitUntil: 'load' })
    await expect(page.locator('a[href*="/en/website-audit"]'), `${en} must link to the EN offer`).not.toHaveCount(0)
  }
})
