// Post-build CSP for the static site. GitHub Pages can't set HTTP headers, so we inject
// a <meta http-equiv="Content-Security-Policy"> into every generated page. gtag.js (GA4)
// loads from an allowlisted host; the only executable inline script Nuxt emits is its
// config bootstrap. We hash every executable inline script found in the actual output
// (so a hash can never drift) and allow it by hash — no 'unsafe-inline' on script-src.
//
// Note: frame-ancestors / X-Frame-Options can't be delivered via <meta> (header-only),
// so clickjacking protection isn't available on GitHub Pages — out of scope here.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join } from 'node:path'

const ROOT = '.output/public'
if (!existsSync(ROOT)) {
  console.warn(`[postbuild-csp] ${ROOT} not found — skipping`)
  process.exit(0)
}

const htmlFiles = readdirSync(ROOT, { recursive: true })
  .filter((f) => typeof f === 'string' && f.endsWith('.html'))
  .map((f) => join(ROOT, f))

// Collect the sha256 of every EXECUTABLE inline <script> (no src; type absent or JS).
const scriptTag = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi
const hashes = new Set()
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8')
  let m
  while ((m = scriptTag.exec(html))) {
    const attrs = m[1]
    const body = m[2]
    if (/\bsrc=/i.test(attrs)) continue
    const type = (attrs.match(/\btype=["']?([^"'\s>]+)/i)?.[1] || '').toLowerCase()
    if (type && type !== 'text/javascript' && type !== 'module') continue
    if (body.trim() === '') continue
    hashes.add(`'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`)
  }
}

const csp = [
  "default-src 'self'",
  `script-src 'self' ${[...hashes].join(' ')} https://www.googletagmanager.com https://www.google-analytics.com`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com",
  "base-uri 'self'",
  "object-src 'none'",
].join('; ')

const meta = `<meta http-equiv="Content-Security-Policy" content="${csp}">`

let injected = 0
for (const file of htmlFiles) {
  let html = readFileSync(file, 'utf8')
  if (html.includes('http-equiv="Content-Security-Policy"')) continue
  if (!/<head[^>]*>/i.test(html)) continue
  html = html.replace(/<head[^>]*>/i, (open) => `${open}${meta}`)
  writeFileSync(file, html)
  injected++
}

console.log(`[postbuild-csp] ${hashes.size} inline script hash(es); CSP injected into ${injected}/${htmlFiles.length} page(s)`)
