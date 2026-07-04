const CONSENT_KEY = 'msy_consent'
const CONSENT_TTL = 6 * 30 * 24 * 60 * 60 * 1000 // 6 months

interface ConsentRecord {
  analytics: boolean
  expires: number
}

const analyticsConsent = ref<boolean | null>(null)
const bannerVisible = ref(false)

export function useCookieConsent() {
  function load() {
    if (typeof window === 'undefined') return
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) {
      bannerVisible.value = true
      return
    }
    try {
      const record: ConsentRecord = JSON.parse(raw)
      if (record.expires < Date.now()) {
        localStorage.removeItem(CONSENT_KEY)
        bannerVisible.value = true
        return
      }
      analyticsConsent.value = record.analytics
    } catch {
      localStorage.removeItem(CONSENT_KEY)
      bannerVisible.value = true
    }
  }

  function save(analytics: boolean) {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      analytics,
      expires: Date.now() + CONSENT_TTL,
    } satisfies ConsentRecord))
    analyticsConsent.value = analytics
    bannerVisible.value = false
  }

  function acceptAll() { save(true) }
  function declineAll() { save(false) }

  function revoke() {
    localStorage.removeItem(CONSENT_KEY)
    analyticsConsent.value = null
    bannerVisible.value = true
  }

  return { analyticsConsent, bannerVisible, load, acceptAll, declineAll, revoke }
}
