// Minimal static file server for the generated site (.output/public), used by the
// Playwright e2e (GitHub Pages serves the same static files, so this mirrors prod).
import http from 'node:http'
import { existsSync, statSync, createReadStream } from 'node:fs'
import { join, extname } from 'node:path'

const ROOT = '.output/public'
const PORT = Number(process.env.PORT ?? 3000)
const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.woff2': 'font/woff2', '.xml': 'application/xml', '.ico': 'image/x-icon', '.txt': 'text/plain',
}

http
  .createServer((req, res) => {
    let p = decodeURIComponent((req.url || '/').split('?')[0])
    if (p.endsWith('/')) p += 'index.html'
    let file = join(ROOT, p)
    if (!existsSync(file) && existsSync(file + '.html')) file += '.html'
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html')
    if (!existsSync(file)) { res.writeHead(404); return res.end('Not found') }
    res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' })
    createReadStream(file).pipe(res)
  })
  .listen(PORT, () => console.log(`static server on http://localhost:${PORT}`))
