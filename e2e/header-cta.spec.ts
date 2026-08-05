import { test, expect } from '@playwright/test'

// The header CTA is a <button> driven by a click handler, not an <a href>, so its
// destination is invisible to HTML review, to the link checker and to any grep of the
// generated output. It silently pointed at /conseil for a month while reading
// "Nous contacter". These tests perform the real click and assert where it lands.
//
// The locale is pinned explicitly: headless Chrome sends en-US, so an unpinned run
// renders the English label on the French home and would assert the wrong pair.

const CASES = [
  { locale: 'fr-FR', home: '/',    label: 'Nous contacter', target: '/contact' },
  { locale: 'en-US', home: '/en/', label: 'Contact us',     target: '/en/contact' },
]

for (const { locale, home, label, target } of CASES) {
  test.describe(`header CTA — ${locale}`, () => {
    test.use({ locale })

    test.beforeEach(async ({ page }) => {
      // Seed consent: without it the cookie overlay intercepts the click.
      await page.addInitScript(() => {
        localStorage.setItem('msy_consent', JSON.stringify({ analytics: false, expires: Date.now() + 10_000_000_000 }))
      })
    })

    async function expectLandsOnContact(page: import('@playwright/test').Page) {
      await expect
        .poll(() => new URL(page.url()).pathname.replace(/\/$/, ''), {
          message: `the "${label}" CTA must land on ${target}`,
        })
        .toBe(target)
    }

    test(`desktop CTA reads "${label}" and opens the contact page`, async ({ page }) => {
      await page.goto(home, { waitUntil: 'load' })
      const cta = page.locator('header .actions button.ms-btn')
      await expect(cta).toHaveText(label)
      await cta.click()
      await expectLandsOnContact(page)
    })

    test(`mobile drawer CTA reads "${label}" and opens the contact page`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 })
      await page.goto(home, { waitUntil: 'load' })
      await page.locator('.burger').click()
      const cta = page.locator('.drawer-foot button.ms-btn')
      await expect(cta).toHaveText(label)
      await cta.click()
      await expectLandsOnContact(page)
    })
  })
}
