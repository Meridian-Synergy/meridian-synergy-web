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
