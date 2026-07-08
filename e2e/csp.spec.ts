import { test, expect, type Page } from '@playwright/test'

// The strict CSP is delivered via <meta> (GitHub Pages can't set HTTP headers), with
// sha256 hashes of Nuxt's inline scripts (see scripts/postbuild-csp.mjs). This guards
// against a build change that introduces an un-hashed inline script — which the strict
// policy would block, white-screening the page — and confirms GA4 still loads.
async function collectEnforced(page: Page): Promise<{ directive: string; blockedURI: string }[]> {
  const found: { directive: string; blockedURI: string }[] = []
  await page.exposeBinding('__csp', (_s, v: { directive: string; blockedURI: string }) => found.push(v))
  await page.addInitScript(() => {
    document.addEventListener('securitypolicyviolation', (e) => {
      if (e.disposition === 'enforce') {
        // @ts-expect-error injected binding
        window.__csp({ directive: e.violatedDirective, blockedURI: e.blockedURI })
      }
    })
  })
  return found
}

for (const path of ['/', '/conseil/', '/produits/', '/drones/', '/flotte/', '/services/']) {
  test(`strict CSP blocks nothing and the page renders on ${path}`, async ({ page }) => {
    const violations = await collectEnforced(page)
    const gtag: string[] = []
    page.on('request', (r) => { if (r.url().includes('gtag/js')) gtag.push(r.url()) })

    // GA4 is gated behind analytics consent — pre-grant it so the loader runs.
    await page.addInitScript(() => {
      localStorage.setItem('msy_consent', JSON.stringify({ analytics: true, expires: Date.now() + 10_000_000_000 }))
    })

    await page.goto(path, { waitUntil: 'load' })
    await page.waitForTimeout(1500)

    expect(violations, `enforced CSP must block nothing on ${path}`).toEqual([])
    expect((await page.locator('body').innerText()).trim().length, 'page must render (not white-screened)').toBeGreaterThan(0)
    expect(gtag.length, 'GA4 (gtag.js) loads under the strict CSP').toBeGreaterThan(0)
  })
}

test('cookie banner is shown and GA does not load before consent', async ({ page }) => {
  const gtag: string[] = []
  page.on('request', (r) => { if (r.url().includes('gtag/js')) gtag.push(r.url()) })
  await page.goto('/', { waitUntil: 'load' })
  await page.waitForTimeout(1500)
  await expect(page.getByRole('dialog')).toBeVisible()
  expect(gtag.length, 'GA must not load before consent is granted').toBe(0)
})
