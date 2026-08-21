import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'

// Two halves that used to be mutually exclusive, and now must both hold.
//
// The English service slugs were once advertised under the FRENCH path through a broken
// hreflang, so those URLs may be indexed and have to keep redirecting. The previous
// implementation used routeRules — and a routeRules redirect key becomes a ROUTE, which
// @nuxtjs/i18n re-prefixes per locale. `/services/thermal-inspection` therefore also
// produced `/en/services/thermal-inspection`, colliding with the REAL English page, which
// the sitemap module then dropped. Measured: /services declared 7 French URLs against 3
// English, four real 41 KB pages missing from the registry.
//
// The redirects now live as hand-written files in public/, which are copied verbatim and
// create no route. This spec pins both halves, because fixing either one alone silently
// breaks the other.

const REDIRECTS = [
  { from: '/services/thermal-inspection/', to: '/services/audit-thermique' },
  { from: '/services/security-surveillance/', to: '/services/securite-surveillance' },
  { from: '/services/topography-mapping/', to: '/services/topographie-cartographie' },
  { from: '/services/infrastructure-inspection/', to: '/services/inspection-infrastructure' },
]

const EN_SERVICES = [
  'thermal-inspection',
  'infrastructure-inspection',
  'security-surveillance',
  'topography-mapping',
  'agriculture-viticulture',
  'video-cinema',
]

for (const { from, to } of REDIRECTS) {
  test(`the English slug on the French path still redirects: ${from}`, async ({ page }) => {
    await page.goto(from, { waitUntil: 'load' })
    await expect
      .poll(() => new URL(page.url()).pathname.replace(/\/$/, ''), {
        message: `${from} must land on ${to}, not 404 — it was advertised through hreflang for months`,
      })
      .toBe(to)
  })
}

test('every English service page is declared in the sitemap', () => {
  const sitemap = readFileSync('.output/public/sitemap.xml', 'utf8')
  const missing = EN_SERVICES.filter(
    slug => !sitemap.includes(`<loc>https://meridian-synergy.com/en/services/${slug}/</loc>`),
  )
  expect(
    missing,
    'an English service page missing here means a redirect was re-implemented as a routeRules '
      + 'entry — read public/services/README.md before "fixing" it',
  ).toEqual([])
})

// The redirect stubs must not compete with the pages they point at.
for (const { from } of REDIRECTS) {
  test(`the redirect stub is not indexable: ${from}`, () => {
    const file = `.output/public${from}index.html`
    const html = readFileSync(file, 'utf8')
    expect(html, `${from} must carry noindex`).toContain('noindex')
    expect(html, `${from} must declare the target as canonical`).toMatch(
      /<link rel="canonical" href="https:\/\/meridian-synergy\.com\/services\/[a-z-]+\/">/,
    )
  })
}
