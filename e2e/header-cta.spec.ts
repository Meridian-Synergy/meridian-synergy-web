import { test, expect } from '@playwright/test'

// The header CTA read "Nous contacter" while navigating to /conseil for a month.
// It went unnoticed because the CTA was a <button> driven by a click handler: with
// no href, the destination was invisible to the link checker and to any review of
// the generated HTML. It now renders as a real link (MsButton `as`), so these tests
// assert both the static href and the actual navigation.
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

    async function expectCta(cta: import('@playwright/test').Locator) {
      await expect(cta).toHaveText(label)
      // A real anchor: middle-click, open-in-new-tab and crawlers all work.
      await expect(cta, 'the CTA must be a link, not a button').toHaveJSProperty('tagName', 'A')
      const href = await cta.getAttribute('href')
      expect(href?.replace(/\/$/, ''), `the "${label}" CTA must link to ${target}`).toBe(target)
    }

    async function expectLandsOnContact(page: import('@playwright/test').Page) {
      await expect
        .poll(() => new URL(page.url()).pathname.replace(/\/$/, ''), {
          message: `the "${label}" CTA must land on ${target}`,
        })
        .toBe(target)
    }

    test(`desktop CTA reads "${label}" and links to the contact page`, async ({ page }) => {
      await page.goto(home, { waitUntil: 'load' })
      const cta = page.locator('header .actions .ms-btn')
      await expectCta(cta)
      await cta.click()
      await expectLandsOnContact(page)
    })

    test(`mobile drawer CTA reads "${label}" and links to the contact page`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 })
      await page.goto(home, { waitUntil: 'load' })
      await page.locator('.burger').click()
      const cta = page.locator('.drawer-foot .ms-btn')
      await expectCta(cta)
      await cta.click()
      await expectLandsOnContact(page)
    })
  })
}
