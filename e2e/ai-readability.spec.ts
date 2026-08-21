import { test, expect } from '@playwright/test'
import { existsSync, readFileSync } from 'node:fs'

// Enforcement for POC_PLAYBOOK/20-SEO-IA.md, on the two rules that apply site-wide.
//
// No AI crawler executes JavaScript — the Vercel/MERJ analysis over 500M+ GPTBot
// requests found no JS execution for GPTBot, ClaudeBot, PerplexityBot or Bytespider;
// Googlebot is the only major crawler that renders. A page whose content only appears
// after hydration therefore ranks fine on Google and is a blank page to ChatGPT,
// Claude and Perplexity. That failure is invisible without a guard: the build is
// green, the page looks right in a browser, and nothing reports the loss.

const BUILD = '.output/public'
const SITE = 'https://meridian-synergy.com'

// The thinnest real page in the build is /en/contact/ at ~770 characters. The floor is
// set below it: this guard catches a collapse to a client-rendered shell, not normal
// editorial variation.
const TEXT_FLOOR = 600

function visibleText(html: string): string {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#x?[0-9a-f]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function sitemapPages(): { loc: string; file: string }[] {
  const sitemap = readFileSync(`${BUILD}/sitemap.xml`, 'utf8')
  return [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
    const loc = match[1]
    const path = loc.replace(SITE, '').replace(/\/$/, '')
    return { loc, file: `${BUILD}${path}/index.html` }
  })
}

test('every page in the sitemap serves its content without JavaScript', () => {
  const pages = sitemapPages()
  expect(pages.length, 'the sitemap must not be empty').toBeGreaterThan(0)

  const tooThin = pages
    .map(({ loc, file }) => ({
      loc,
      chars: existsSync(file) ? visibleText(readFileSync(file, 'utf8')).length : -1,
    }))
    .filter((page) => page.chars < TEXT_FLOOR)

  expect(
    tooThin,
    `these sitemap pages serve less than ${TEXT_FLOOR} characters without JS — an AI ` +
      `crawler sees a blank page (-1 means the file is missing entirely)`,
  ).toEqual([])
})

// Ratchet. llms.txt is measurably inert: 408 hits out of 500M+ AI bot visits over 90
// days, no major vendor committed to reading it, and Google states it has no effect.
// This test exists so nobody adds one back "just in case".
test('no llms.txt is published', () => {
  for (const path of [`${BUILD}/llms.txt`, `${BUILD}/llms-full.txt`]) {
    expect(existsSync(path), `${path} must not exist — cf. POC_PLAYBOOK/20-SEO-IA.md`).toBe(false)
  }
})

// Search crawlers and training crawlers are independent settings for every vendor.
// Naming them keeps the intent readable, so a later blanket Disallow under
// `User-agent: *` cannot silently remove us from citation.
const NAMED_AGENTS = [
  'OAI-SearchBot', 'GPTBot', 'ChatGPT-User',
  'Claude-SearchBot', 'ClaudeBot', 'Claude-User',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'MistralAI-User', 'CCBot', 'Bytespider',
]

// Deliberately absent, and the omission needs a guard of its own: without one it reads
// as an oversight and someone "fixes" it. Googlebot carries AI Overviews and Microsoft
// publishes no Copilot-specific agent — Bingbot feeds that index. Giving either its own
// group would lift it out of the general search rules, since RFC 9309 makes a named
// group win over `*` for that token.
const MUST_STAY_UNDER_WILDCARD = ['Googlebot', 'Bingbot']

test('robots.txt names the AI search agents and blocks none of them', () => {
  const robots = readFileSync(`${BUILD}/robots.txt`, 'utf8')

  for (const agent of NAMED_AGENTS) {
    expect(robots, `${agent} must be named explicitly in robots.txt`).toContain(`User-agent: ${agent}`)
  }

  for (const agent of MUST_STAY_UNDER_WILDCARD) {
    expect(
      robots,
      `${agent} must NOT get its own group — it would be lifted out of the general ` +
        `search rules. Cf. POC_PLAYBOOK/20-SEO-IA.md.`,
    ).not.toContain(`User-agent: ${agent}`)
  }

  // A bare `Disallow: /` in any group would exclude that agent from retrieval, and
  // being excluded from retrieval means being excluded from citation.
  const blanketDisallow = robots
    .split(/\n\s*\n/)
    .filter((group) => /^\s*Disallow:\s*\/\s*$/m.test(group))

  expect(blanketDisallow, 'no agent group may carry a blanket `Disallow: /`').toEqual([])
})

// The /ai-instructions page only works if it is reachable and dated: an orphan page is
// not crawled, and an undated one is indistinguishable from stale content.
test('the AI instructions page is served, dated and declared', async ({ page }) => {
  const response = await page.goto('/en/ai-instructions/', { waitUntil: 'load' })
  expect(response?.status(), '/en/ai-instructions/ must be prerendered').toBe(200)

  const text = await page.locator('body').innerText()
  expect(text.length, 'the page must carry substantive content, not a stub').toBeGreaterThan(5000)
  expect(text, 'the page must state when it was last updated').toContain('Last updated')

  const sitemap = readFileSync(`${BUILD}/sitemap.xml`, 'utf8')
  expect(sitemap, 'the page must be declared in the sitemap').toContain(
    '<loc>https://meridian-synergy.com/en/ai-instructions/</loc>',
  )
})

// English-only by design: retrieval pivots through English, and a translated twin would
// only add a duplicate URL. `fr: false` in i18n.pages is what keeps it to one — and
// serving it on the English path is what makes <html lang> correct.
test('the AI instructions page has no localized duplicate', async ({ request }) => {
  const response = await request.get('/ai-instructions/')
  expect(response.status(), 'the French-path variant must not exist').toBe(404)
})

test('the AI instructions page is linked, not orphaned', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' })
  const link = page.locator('a[href*="/ai-instructions"]')
  await expect(link, 'the home page footer must link to /ai-instructions').not.toHaveCount(0)
})
