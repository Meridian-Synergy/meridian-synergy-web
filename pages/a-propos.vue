<script setup lang="ts">
import { MsButton, MsBadge } from '@meridian-synergy/ui'

const { t, locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('about.meta.title'),
  description: () => t('about.meta.description'),
})

const certifications = [
  { label: 'A1 / A3', variant: 'navy' as const },
  { label: 'A2', variant: 'navy' as const },
  { label: 'CATS', variant: 'navy' as const },
  { label: 'Certiphyto', variant: 'sky' as const },
  { label: 'CertiBioci', variant: 'sky' as const },
]

const departments = [
  { num: '58', name: 'Nièvre' },
  { num: '21', name: 'Côte-d\'Or' },
  { num: '71', name: 'Saône-et-Loire' },
  { num: '89', name: 'Yonne' },
  { num: '18', name: 'Cher' },
  { num: '45', name: 'Loiret' },
  { num: '03', name: 'Allier' },
]

const values = [
  { key: 'v1', icon: 'shield' },
  { key: 'v2', icon: 'map-pin' },
  { key: 'v3', icon: 'cpu' },
  { key: 'v4', icon: 'check-badge' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <nav class="breadcrumb" aria-label="Fil d'Ariane">
          <NuxtLink :to="localePath('/')" class="bc-link">{{ t('breadcrumb.home') }}</NuxtLink>
          <span class="bc-sep" aria-hidden="true">›</span>
          <span class="bc-current">{{ t('nav.about') }}</span>
        </nav>
        <MsBadge :label="t('about.hero.badge')" variant="sky" />
        <h1 class="hero-title">{{ t('about.hero.title') }}</h1>
        <p class="hero-subtitle">{{ t('about.hero.subtitle') }}</p>
      </div>
    </section>

    <!-- Story -->
    <section class="story-section">
      <div class="container story-grid">
        <div class="story-text">
          <h2 class="section-title">{{ t('about.story.title') }}</h2>
          <p class="story-p">{{ t('about.story.p1') }}</p>
          <p class="story-p">{{ t('about.story.p2') }}</p>
        </div>
        <div class="story-visual" aria-hidden="true">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs><clipPath id="ap-logo-clip"><circle cx="100" cy="100" r="88"/></clipPath></defs>
            <g clip-path="url(#ap-logo-clip)" opacity="0.12">
              <ellipse cx="100" cy="100" rx="34" ry="88" stroke="var(--ms-color-navy)" stroke-width="3" transform="rotate(0,100,100)"/>
              <ellipse cx="100" cy="100" rx="34" ry="88" stroke="var(--ms-color-navy)" stroke-width="3" transform="rotate(60,100,100)"/>
              <ellipse cx="100" cy="100" rx="34" ry="88" stroke="var(--ms-color-navy)" stroke-width="3" transform="rotate(120,100,100)"/>
              <ellipse cx="100" cy="100" rx="88" ry="17" stroke="var(--ms-color-navy)" stroke-width="3"/>
              <line x1="100" y1="12" x2="100" y2="188" stroke="var(--ms-color-gold)" stroke-width="5"/>
            </g>
            <circle cx="100" cy="100" r="88" stroke="var(--ms-color-navy)" stroke-width="3" opacity="0.12"/>
            <circle cx="100" cy="100" r="6" fill="var(--ms-color-sky)" opacity="0.6"/>
            <circle cx="100" cy="100" r="3" fill="var(--ms-color-sky)"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="values-section">
      <div class="container">
        <h2 class="section-title centered">{{ t('about.values.title') }}</h2>
        <div class="values-grid">
          <div v-for="v in values" :key="v.key" class="value-card">
            <div class="value-icon">
              <!-- Shield -->
              <svg v-if="v.icon === 'shield'" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2L3 6v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V6l-9-4z" stroke="var(--ms-color-sky)" stroke-width="1.75" stroke-linejoin="round"/>
                <path d="M9 12l2 2 4-4" stroke="var(--ms-color-sky)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <!-- Map pin -->
              <svg v-else-if="v.icon === 'map-pin'" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="var(--ms-color-sky)" stroke-width="1.75"/>
                <circle cx="12" cy="9" r="2.5" stroke="var(--ms-color-sky)" stroke-width="1.75"/>
              </svg>
              <!-- CPU / chip -->
              <svg v-else-if="v.icon === 'cpu'" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="7" y="7" width="10" height="10" rx="1.5" stroke="var(--ms-color-sky)" stroke-width="1.75"/>
                <path d="M9 7V4M12 7V4M15 7V4M9 20v-3M12 20v-3M15 20v-3M7 9H4M7 12H4M7 15H4M20 9h-3M20 12h-3M20 15h-3" stroke="var(--ms-color-sky)" stroke-width="1.75" stroke-linecap="round"/>
              </svg>
              <!-- Check badge -->
              <svg v-else-if="v.icon === 'check-badge'" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 12l2 2 4-4" stroke="var(--ms-color-sky)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 2l2.09 1.26L17 2.5l1 2.77L20.5 7l-.74 2.91L21 12l-1.24 2.09L20.5 17l-2.77 1-1.74 2.5L13 19.74 12 22l-2.09-1.26L7 21.5l-1-2.77L3.5 17l.74-2.91L3 12l1.24-2.09L3.5 7l2.77-1L8 3.5 10.91 2.26 12 2z" stroke="var(--ms-color-sky)" stroke-width="1.75" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="value-title">{{ t(`about.values.${v.key}.title`) }}</h3>
            <p class="value-desc">{{ t(`about.values.${v.key}.desc`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Certifications -->
    <section class="certs-section">
      <div class="container">
        <h2 class="section-title centered">{{ t('about.certs.title') }}</h2>
        <div class="certs-list">
          <MsBadge
            v-for="cert in certifications"
            :key="cert.label"
            :label="cert.label"
            :variant="cert.variant"
            :dot="false"
          />
        </div>
      </div>
    </section>

    <!-- Zone d'intervention -->
    <section class="zone-section">
      <div class="container">
        <h2 class="section-title centered">{{ t('about.zone.title') }}</h2>
        <p class="zone-intro">{{ t('about.zone.intro') }}</p>
        <div class="dept-grid">
          <div
            v-for="dept in departments"
            :key="dept.num"
            class="dept-card"
            :class="{ 'dept-home': dept.num === '58' }"
          >
            <span class="dept-num">{{ dept.num }}</span>
            <span class="dept-name">{{ dept.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section class="contact-section">
      <div class="container contact-inner">
        <div class="contact-text">
          <h2 class="contact-title">{{ t('about.contact.title') }}</h2>
          <p class="contact-desc">{{ t('about.contact.desc') }}</p>
        </div>
        <div class="contact-actions">
          <a
            href="https://wa.me/33766974874"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-contact btn-whatsapp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.22-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.23-1.44l-.37-.22-3.87 1.02 1.03-3.78-.24-.39A9.93 9.93 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.44-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.19-.24-.58-.48-.5-.67-.51H7.5c-.17 0-.45.06-.69.3C6.57 8.1 6 8.7 6 9.93c0 1.23.91 2.42 1.04 2.59.13.17 1.8 2.74 4.36 3.84.61.26 1.08.42 1.45.54.61.19 1.16.16 1.6.1.49-.07 1.5-.61 1.71-1.2.21-.59.21-1.1.15-1.2-.07-.1-.27-.17-.57-.32z" fill="currentColor"/>
            </svg>
            {{ t('about.contact.whatsapp') }}
          </a>
          <a
            href="mailto:contact@meridian-synergy.com"
            class="btn-contact btn-email"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" stroke-width="1.75"/>
              <path d="M2 8l10 7 10-7" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
            </svg>
            {{ t('about.contact.email') }}
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
.breadcrumb { display: flex; align-items: center; gap: 8px; margin-bottom: 24px; }
.bc-link { font-size: 13px; color: var(--ms-color-muted); text-decoration: none; transition: color var(--ms-transition-fast); }
.bc-link:hover { color: var(--ms-color-navy); }
.bc-sep { color: var(--ms-color-border); font-size: 14px; }
.bc-current { font-size: 13px; color: var(--ms-color-navy); font-weight: 500; }
.hero-title {
  font-family: var(--ms-font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--ms-color-navy);
  letter-spacing: -0.03em;
  margin: 16px 0 8px;
}
.hero-subtitle { font-size: 1.0625rem; color: var(--ms-color-muted); max-width: 560px; line-height: 1.7; margin: 0; }

/* ── Story ── */
.story-section { padding: 72px 0; background: var(--ms-color-white); }
.story-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;
}
@media (min-width: 768px) { .story-grid { grid-template-columns: 1fr 260px; } }

.section-title {
  font-family: var(--ms-font-display);
  font-size: clamp(1.375rem, 2.5vw, 1.75rem);
  font-weight: 800;
  color: var(--ms-color-navy);
  letter-spacing: -0.02em;
  margin: 0 0 24px;
}
.section-title.centered { text-align: center; margin-bottom: 32px; }

.story-p { font-size: 0.9375rem; color: var(--ms-color-muted); line-height: 1.75; margin: 0 0 16px; }
.story-p:last-child { margin-bottom: 0; }

.story-visual { display: flex; justify-content: center; align-items: center; }
.story-visual svg { width: 100%; max-width: 200px; height: auto; }

/* ── Values ── */
.values-section { padding: 72px 0; background: var(--ms-color-bg); }
.values-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
@media (min-width: 640px) { .values-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .values-grid { grid-template-columns: repeat(4, 1fr); } }

.value-card {
  background: var(--ms-color-white);
  border: 1px solid var(--ms-color-border);
  border-radius: var(--ms-radius-lg);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.value-icon {
  width: 40px;
  height: 40px;
  background: rgba(0, 170, 239, 0.08);
  border-radius: var(--ms-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}
.value-title {
  font-family: var(--ms-font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--ms-color-navy);
  margin: 0;
}
.value-desc { font-size: 0.875rem; color: var(--ms-color-muted); line-height: 1.65; margin: 0; }

/* ── Certifications ── */
.certs-section { padding: 64px 0; background: var(--ms-color-white); }
.certs-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

/* ── Zone ── */
.zone-section { padding: 64px 0; background: var(--ms-color-bg); }
.zone-intro { text-align: center; font-size: 0.9375rem; color: var(--ms-color-muted); margin: 0 auto 32px; max-width: 520px; }
.dept-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  max-width: 480px;
  margin: 0 auto;
}
@media (min-width: 640px) {
  .dept-grid {
    grid-template-columns: repeat(7, 1fr);
    max-width: 760px;
  }
}
.dept-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: var(--ms-color-white);
  border: 1px solid var(--ms-color-border);
  border-radius: var(--ms-radius-md);
  padding: 12px 20px;
  min-width: 80px;
  transition: border-color var(--ms-transition-fast);
}
.dept-card.dept-home {
  border-color: var(--ms-color-sky);
  background: rgba(0, 170, 239, 0.04);
}
.dept-num { font-family: var(--ms-font-condensed); font-size: 22px; font-weight: 700; color: var(--ms-color-navy); letter-spacing: -0.02em; line-height: 1; }
.dept-home .dept-num { color: var(--ms-color-sky); }
.dept-name { font-size: 12px; color: var(--ms-color-muted); font-weight: 500; }

/* ── Contact ── */
.contact-section { background: var(--ms-color-navy); padding: 64px 0; }
.contact-inner { display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
.contact-text { flex: 1; min-width: 260px; }
.contact-title {
  font-family: var(--ms-font-display);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  color: var(--ms-color-white);
  letter-spacing: -0.02em;
  margin: 0 0 10px;
}
.contact-desc { font-size: 1rem; color: rgba(255,255,255,0.65); margin: 0; line-height: 1.6; }

.contact-actions { display: flex; gap: 12px; flex-wrap: wrap; }

.btn-contact {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: var(--ms-radius-md);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: opacity var(--ms-transition-fast), transform var(--ms-transition-fast);
  white-space: nowrap;
}
.btn-contact:hover { opacity: 0.88; transform: translateY(-1px); }

.btn-whatsapp {
  background: #25D366;
  color: #fff;
}
.btn-email {
  background: rgba(255,255,255,0.1);
  color: var(--ms-color-white);
  border: 1px solid rgba(255,255,255,0.2);
}
.btn-email:hover { background: rgba(255,255,255,0.16); }
</style>
