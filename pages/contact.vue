<script setup lang="ts">
import { MsBadge, MsBreadcrumb } from '@meridian-synergy/ui'

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('contactPage.meta.title'),
  description: () => t('contactPage.meta.description'),
})

const socials = [
  {
    label: 'Instagram',
    handle: '@meridian.synergy',
    href: 'https://www.instagram.com/meridian.synergy',
    icon: 'instagram',
  },
  {
    label: 'LinkedIn',
    handle: 'meridian-synergy',
    href: 'https://www.linkedin.com/company/meridian-synergy/',
    icon: 'linkedin',
  },
  {
    label: 'TikTok',
    handle: '@meridian.synergy',
    href: 'https://www.tiktok.com/@meridian.synergy',
    icon: 'tiktok',
  },
  {
    label: 'YouTube',
    handle: '@meridian.synergy',
    href: 'https://www.youtube.com/@meridian.synergy',
    icon: 'youtube',
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <MsBreadcrumb :crumbs="[{ label: t('breadcrumb.home'), href: localePath('/') }, { label: t('nav.contact') }]" />
        <MsBadge :label="t('contactPage.hero.badge')" variant="sky" />
        <h1 class="hero-title">{{ t('contactPage.hero.title') }}</h1>
        <p class="hero-subtitle">{{ t('contactPage.hero.subtitle') }}</p>
      </div>
    </section>

    <!-- Direct contact -->
    <section class="contact-section">
      <div class="container">
        <h2 class="section-title">{{ t('contactPage.direct.title') }}</h2>
        <div class="channels">
          <!-- WhatsApp -->
          <a href="https://wa.me/33766974874" target="_blank" rel="noopener noreferrer" class="channel-card channel-whatsapp">
            <div class="channel-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.22-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.23-1.44l-.37-.22-3.87 1.02 1.03-3.78-.24-.39A9.93 9.93 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.44-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.19-.24-.58-.48-.5-.67-.51H7.5c-.17 0-.45.06-.69.3C6.57 8.1 6 8.7 6 9.93c0 1.23.91 2.42 1.04 2.59.13.17 1.8 2.74 4.36 3.84.61.26 1.08.42 1.45.54.61.19 1.16.16 1.6.1.49-.07 1.5-.61 1.71-1.2.21-.59.21-1.1.15-1.2-.07-.1-.27-.17-.57-.32z" fill="currentColor"/>
              </svg>
            </div>
            <div class="channel-body">
              <span class="channel-label">{{ t('contactPage.direct.whatsappLabel') }}</span>
              <span class="channel-value">07 66 97 48 74</span>
              <span class="channel-desc">{{ t('contactPage.direct.whatsappDesc') }}</span>
            </div>
            <span class="channel-cta">{{ t('contactPage.direct.whatsappBtn') }} →</span>
          </a>

          <!-- Email -->
          <a href="mailto:contact@meridian-synergy.com" class="channel-card channel-email">
            <div class="channel-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" stroke-width="1.75"/>
                <path d="M2 8l10 7 10-7" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="channel-body">
              <span class="channel-label">{{ t('contactPage.direct.emailLabel') }}</span>
              <span class="channel-value">contact@meridian-synergy.com</span>
              <span class="channel-desc">{{ t('contactPage.direct.emailDesc') }}</span>
            </div>
            <span class="channel-cta">{{ t('contactPage.direct.emailBtn') }} →</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Social networks -->
    <section class="social-section">
      <div class="container">
        <h2 class="section-title">{{ t('contactPage.social.title') }}</h2>
        <div class="socials-grid">
          <a
            v-for="s in socials"
            :key="s.label"
            :href="s.href"
            target="_blank"
            rel="noopener noreferrer"
            class="social-card"
          >
            <div class="social-icon">
              <!-- Instagram -->
              <svg v-if="s.icon === 'instagram'" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" stroke-width="1.75"/>
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.75"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
              </svg>
              <!-- LinkedIn -->
              <svg v-else-if="s.icon === 'linkedin'" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" stroke-width="1.75"/>
                <path d="M7 10v7M7 7.5v.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
                <path d="M11 17v-4c0-1.657 1.343-3 3-3s3 1.343 3 3v4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
                <path d="M11 10v7" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
              </svg>
              <!-- TikTok -->
              <svg v-else-if="s.icon === 'tiktok'" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <!-- YouTube -->
              <svg v-else-if="s.icon === 'youtube'" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" stroke-width="1.75"/>
                <path d="M10 9.5l5 2.5-5 2.5V9.5z" fill="currentColor"/>
              </svg>
            </div>
            <div class="social-info">
              <span class="social-label">{{ s.label }}</span>
              <span class="social-handle">{{ s.handle }}</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ── Hero ── */
.hero {
  background: var(--ms-color-bg);
  padding: 56px 0;
  border-bottom: 1px solid var(--ms-color-border);
}
.hero-title {
  font-family: var(--ms-font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--ms-color-navy);
  letter-spacing: -0.03em;
  margin: 16px 0 8px;
}
.hero-subtitle { font-size: 1.0625rem; color: var(--ms-color-muted); max-width: 520px; line-height: 1.7; margin: 0; }

/* ── Section title ── */
.section-title {
  font-family: var(--ms-font-display);
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 800;
  color: var(--ms-color-navy);
  letter-spacing: -0.02em;
  margin: 0 0 28px;
}

/* ── Direct contact ── */
.contact-section { padding: 64px 0; background: var(--ms-color-white); }
.channels {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
@media (min-width: 640px) { .channels { grid-template-columns: repeat(2, 1fr); } }

.channel-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 28px;
  border: 1px solid var(--ms-color-border);
  border-radius: var(--ms-radius-lg);
  text-decoration: none;
  transition: border-color var(--ms-transition-fast), box-shadow var(--ms-transition-fast), transform var(--ms-transition-fast);
}
.channel-card:hover { transform: translateY(-2px); box-shadow: var(--ms-shadow-md); }

.channel-whatsapp:hover { border-color: #25D366; }
.channel-email:hover { border-color: var(--ms-color-sky); }

.channel-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--ms-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}
.channel-whatsapp .channel-icon { background: rgba(37, 211, 102, 0.1); color: #25D366; }
.channel-email .channel-icon { background: rgba(0, 170, 239, 0.1); color: var(--ms-color-sky); }

.channel-body { display: flex; flex-direction: column; gap: 3px; flex: 1; }
.channel-label { font-family: var(--ms-font-condensed); font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ms-color-muted); }
.channel-value { font-size: 1.0625rem; font-weight: 700; color: var(--ms-color-navy); }
.channel-desc { font-size: 0.875rem; color: var(--ms-color-muted); line-height: 1.5; }

.channel-cta { font-size: 13px; font-weight: 600; }
.channel-whatsapp .channel-cta { color: #25D366; }
.channel-email .channel-cta { color: var(--ms-color-sky); }

/* ── Social networks ── */
.social-section { padding: 64px 0; background: var(--ms-color-bg); }
.socials-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
@media (min-width: 768px) { .socials-grid { grid-template-columns: repeat(4, 1fr); } }

.social-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px;
  background: var(--ms-color-white);
  border: 1px solid var(--ms-color-border);
  border-radius: var(--ms-radius-lg);
  text-decoration: none;
  transition: border-color var(--ms-transition-fast), transform var(--ms-transition-fast);
}
.social-card:hover { border-color: var(--ms-color-sky); transform: translateY(-2px); }

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--ms-radius-md);
  background: rgba(0, 170, 239, 0.08);
  color: var(--ms-color-navy);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.social-card:hover .social-icon { background: rgba(0, 170, 239, 0.14); color: var(--ms-color-sky); }

.social-info { display: flex; flex-direction: column; gap: 2px; }
.social-label { font-size: 14px; font-weight: 700; color: var(--ms-color-navy); }
.social-handle { font-size: 12px; color: var(--ms-color-muted); }
</style>
