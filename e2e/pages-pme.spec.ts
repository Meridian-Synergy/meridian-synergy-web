import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'

// The offer page and its two entry guides are deliberately FRENCH-ONLY: the audience
// is a French SME owner, and an English twin would add a URL with no reader. That
// choice has a failure mode — with the English variant disabled, @nuxtjs/i18n falls
// back to the locale root and advertises the HOME PAGE as the English counterpart.
// These tests pin both halves: no /en/ duplicate, and alternates pointing at the page.

const PAGES = [
  '/audit-de-site/',
  '/guides/combien-coute-un-site-internet/',
  '/guides/site-invisible-sur-google/',
]

for (const path of PAGES) {
  test(`page is prerendered and declared: ${path}`, async ({ page }) => {
    const response = await page.goto(path, { waitUntil: 'load' })
    expect(response?.status(), `${path} must be prerendered`).toBe(200)
    await expect(page.locator('h1'), `${path} must render a non-empty <h1>`).not.toBeEmpty()

    const sitemap = readFileSync('.output/public/sitemap.xml', 'utf8')
    expect(sitemap, `${path} must be in the sitemap`).toContain(
      `<loc>https://meridian-synergy.com${path}</loc>`,
    )
  })

  test(`alternates point at the page itself, not the home page: ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'load' })
    const expected = `https://meridian-synergy.com${path}`.replace(/\/$/, '')
    for (const lang of ['fr-FR', 'en-US', 'x-default']) {
      const href = await page.locator(`link[rel="alternate"][hreflang="${lang}"]`).getAttribute('href')
      expect(href?.replace(/\/$/, ''), `the ${lang} alternate must not fall back to the home page`).toBe(expected)
    }
  })
}

const MUST_404 = ['/en/audit-de-site/', '/en/guides/combien-coute-un-site-internet/']

for (const path of MUST_404) {
  test(`no English duplicate is generated: ${path}`, async ({ request }) => {
    const response = await request.get(path)
    expect(response.status(), `${path} must not exist`).toBe(404)
  })
}

test('the offer page is linked from the site, not orphaned', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' })
  await expect(page.locator('a[href*="/audit-de-site"]')).not.toHaveCount(0)
})

test('each guide routes back to the offer page', async ({ page }) => {
  for (const path of PAGES.slice(1)) {
    await page.goto(path, { waitUntil: 'load' })
    await expect(page.locator('a[href*="/audit-de-site"]'), `${path} must link to the offer`).not.toHaveCount(0)
  }
})
