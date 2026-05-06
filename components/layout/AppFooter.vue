<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-main">
        <div class="footer-brand">
          <NuxtLink :to="localePath('/')" class="footer-logo" aria-label="Meridian Synergy">
            <svg width="26" height="26" viewBox="0 0 82 82" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
              <defs><clipPath id="ms-logo-f"><circle cx="41" cy="41" r="36.5"/></clipPath></defs>
              <g clip-path="url(#ms-logo-f)">
                <ellipse cx="41" cy="41" rx="14" ry="36.5" stroke="white" stroke-width="2.0" transform="rotate(0,41,41)"/>
                <ellipse cx="41" cy="41" rx="14" ry="36.5" stroke="white" stroke-width="2.0" transform="rotate(60,41,41)"/>
                <ellipse cx="41" cy="41" rx="14" ry="36.5" stroke="white" stroke-width="2.0" transform="rotate(120,41,41)"/>
                <ellipse cx="41" cy="41" rx="36.5" ry="7" stroke="white" stroke-width="2.0"/>
                <line x1="41" y1="4.5" x2="41" y2="77.5" stroke="var(--ms-color-gold)" stroke-width="2.8"/>
              </g>
              <circle cx="41" cy="41" r="36.5" stroke="white" stroke-width="2.7"/>
            </svg>
            <span class="footer-brand-name">Meridian Synergy</span>
          </NuxtLink>
          <p class="footer-tagline">{{ t('footer.tagline') }}</p>

          <div class="social-links" role="navigation" aria-label="Réseaux sociaux">
            <a href="https://www.instagram.com/meridian.synergy" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" stroke-width="1.75"/>
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.75"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/meridian-synergy/" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" stroke-width="1.75"/>
                <path d="M7 10v7M7 7.5v.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
                <path d="M11 17v-4c0-1.657 1.343-3 3-3s3 1.343 3 3v4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
                <path d="M11 10v7" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@meridian.synergy" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="TikTok">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@meridian.synergy" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" stroke-width="1.75"/>
                <path d="M10 9.5l5 2.5-5 2.5V9.5z" fill="currentColor"/>
              </svg>
            </a>
            <a href="https://wa.me/33766974874" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.22-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.23-1.44l-.37-.22-3.87 1.02 1.03-3.78-.24-.39A9.93 9.93 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.44-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.19-.24-.58-.48-.5-.67-.51H7.5c-.17 0-.45.06-.69.3C6.57 8.1 6 8.7 6 9.93c0 1.23.91 2.42 1.04 2.59.13.17 1.8 2.74 4.36 3.84.61.26 1.08.42 1.45.54.61.19 1.16.16 1.6.1.49-.07 1.5-.61 1.71-1.2.21-.59.21-1.1.15-1.2-.07-.1-.27-.17-.57-.32z" fill="currentColor"/>
              </svg>
            </a>
            <a href="mailto:contact@meridian-synergy.com" class="social-link" aria-label="Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" stroke-width="1.75"/>
                <path d="M2 8l10 7 10-7" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        <nav class="footer-nav" aria-label="Liens du pied de page">
          <NuxtLink :to="localePath('/services')">{{ t('nav.services') }}</NuxtLink>
          <NuxtLink :to="localePath('/drones')">{{ t('nav.drones') }}</NuxtLink>
          <NuxtLink :to="localePath('/a-propos')">{{ t('nav.about') }}</NuxtLink>
          <NuxtLink :to="localePath('/contact')">{{ t('nav.contact') }}</NuxtLink>
          <NuxtLink :to="localePath('/mentions-legales')">{{ t('footer.legal') }}</NuxtLink>
        </nav>
      </div>

      <div class="footer-bottom">
        <p class="footer-copy">{{ t('footer.copyright', { year }) }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--ms-color-navy);
  color: var(--ms-color-white);
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-main {
  padding: 40px 0 32px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}
@media (min-width: 768px) {
  .footer-main {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  margin-bottom: 8px;
}
.footer-brand-name {
  font-family: var(--ms-font-display);
  font-weight: 700;
  font-size: 15px;
  color: var(--ms-color-white);
  letter-spacing: -0.02em;
}
.footer-tagline {
  font-size: 13px;
  color: rgba(255,255,255,0.45);
  line-height: 1.55;
  max-width: 280px;
  margin-bottom: 16px;
}

.social-links {
  display: flex;
  gap: 8px;
}
.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--ms-radius-md);
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  transition: color var(--ms-transition-fast), border-color var(--ms-transition-fast), background-color var(--ms-transition-fast);
}
.social-link:hover {
  color: var(--ms-color-white);
  border-color: rgba(255,255,255,0.35);
  background: rgba(255,255,255,0.06);
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
}
.footer-nav a {
  font-size: 14px;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  transition: color var(--ms-transition-fast);
}
.footer-nav a:hover { color: var(--ms-color-white); }

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding: 16px 0;
}
.footer-copy {
  font-family: var(--ms-font-condensed);
  font-size: 12px;
  letter-spacing: 0.03em;
  color: rgba(255,255,255,0.3);
}
</style>
