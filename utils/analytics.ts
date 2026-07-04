export const GA_MEASUREMENT_ID = 'G-21HRF748F7'

// Loads GA4 (gtag.js) via an external <script src> — no inline script (CSP-safe). Called
// only once analytics consent is granted, so nothing loads or collects before consent.
// Idempotent.
export function loadAnalytics() {
  if (typeof window === 'undefined') return
  if (document.getElementById('ga-script')) return
  const w = window as any
  w.dataLayer = w.dataLayer || []
  w.gtag = w.gtag || function gtag() { w.dataLayer.push(arguments) }
  w.gtag('js', new Date())
  w.gtag('config', GA_MEASUREMENT_ID)
  const s = document.createElement('script')
  s.id = 'ga-script'
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(s)
}
