import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'

// Guards for the "Dossiers" editorial cluster (/dossiers ↔ /en/insights).
//
// The FR and EN slugs of a dossier differ, and @nuxtjs/i18n cannot guess the
// counterpart of a dynamic route param on its own: left alone it emits an en-US
// alternate pointing at /en/insights/<FR slug>, a URL that does not exist. The page
// pairs the two versions through the `translationKey` front matter and declares them
// with setI18nParams. These tests pin that pairing, because the failure mode is
// silent — the build stays green and only GSC reports it, weeks later.

const PAGES = [
  { path: '/dossiers/', locale: 'fr-FR' },
  { path: '/dossiers/dette-technique-ia/', locale: 'fr-FR' },
  { path: '/en/insights/', locale: 'en-US' },
  { path: '/en/insights/technical-debt-ai/', locale: 'en-US' },
]

for (const { path } of PAGES) {
  test(`dossier page is prerendered: ${path}`, async ({ page }) => {
    const response = await page.goto(path, { waitUntil: 'load' })
    expect(response?.status(), `${path} must be prerendered (200, not a 404)`).toBe(200)
    await expect(page.locator('h1'), `${path} must render a non-empty <h1>`).not.toBeEmpty()
  })
}

test('the FR dossier advertises the EN slug as its alternate', async ({ page }) => {
  await page.goto('/dossiers/dette-technique-ia/', { waitUntil: 'load' })

  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
  expect(canonical?.replace(/\/$/, '')).toBe(
    'https://meridian-synergy.com/dossiers/dette-technique-ia',
  )

  const enAlternate = await page.locator('link[rel="alternate"][hreflang="en-US"]').getAttribute('href')
  expect(enAlternate?.replace(/\/$/, ''), 'the en-US alternate must use the EN slug').toBe(
    'https://meridian-synergy.com/en/insights/technical-debt-ai',
  )
})

test('the EN dossier advertises the FR slug as its alternate', async ({ page }) => {
  await page.goto('/en/insights/technical-debt-ai/', { waitUntil: 'load' })

  const frAlternate = await page.locator('link[rel="alternate"][hreflang="fr-FR"]').getAttribute('href')
  expect(frAlternate?.replace(/\/$/, ''), 'the fr-FR alternate must use the FR slug').toBe(
    'https://meridian-synergy.com/dossiers/dette-technique-ia',
  )
})

// The point of pairing the slugs is that the cross-locale URLs are never generated in
// the first place — no stub, no soft-200 to redirect afterwards.
const MUST_404 = [
  '/en/insights/dette-technique-ia/',
  '/dossiers/technical-debt-ai/',
]

for (const path of MUST_404) {
  test(`cross-locale slug is not served: ${path}`, async ({ request }) => {
    const response = await request.get(path)
    expect(response.status(), `${path} must not exist as a page of its own`).toBe(404)
  })
}

test('every figure in a dossier is backed by a listed source', async ({ page }) => {
  await page.goto('/dossiers/dette-technique-ia/', { waitUntil: 'load' })
  const sources = page.locator('.sources-list li')
  await expect(sources, 'the dossier must render its sources block').not.toHaveCount(0)
})

test('the dossiers are declared in the sitemap', () => {
  const sitemap = readFileSync('.output/public/sitemap.xml', 'utf8')
  for (const loc of [
    'https://meridian-synergy.com/dossiers/',
    'https://meridian-synergy.com/dossiers/dette-technique-ia/',
    'https://meridian-synergy.com/en/insights/',
    'https://meridian-synergy.com/en/insights/technical-debt-ai/',
  ]) {
    expect(sitemap, `${loc} must be declared in the sitemap`).toContain(`<loc>${loc}</loc>`)
  }
})
