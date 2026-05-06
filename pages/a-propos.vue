<script setup lang="ts">
import { MsBadge, MsPageHero, MsValueCard, MsContactBanner } from '@meridian-synergy/ui'

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
  { label: 'CertiBiocide', variant: 'sky' as const },
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
  {
    key: 'v1',
    icon: `<path d="M12 2L3 6v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V6l-9-4z" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>`,
  },
  {
    key: 'v2',
    icon: `<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" stroke-width="1.75"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="1.75"/>`,
  },
  {
    key: 'v3',
    icon: `<rect x="7" y="7" width="10" height="10" rx="1.5" stroke="currentColor" stroke-width="1.75"/><path d="M9 7V4M12 7V4M15 7V4M9 20v-3M12 20v-3M15 20v-3M7 9H4M7 12H4M7 15H4M20 9h-3M20 12h-3M20 15h-3" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>`,
  },
  {
    key: 'v4',
    icon: `<path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 2l2.09 1.26L17 2.5l1 2.77L20.5 7l-.74 2.91L21 12l-1.24 2.09L20.5 17l-2.77 1-1.74 2.5L13 19.74 12 22l-2.09-1.26L7 21.5l-1-2.77L3.5 17l.74-2.91L3 12l1.24-2.09L3.5 7l2.77-1L8 3.5 10.91 2.26 12 2z" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>`,
  },
]

const contactActions = computed(() => [
  { type: 'whatsapp' as const, href: 'https://wa.me/33766974874', label: t('about.contact.whatsapp') },
  { type: 'email'    as const, href: 'mailto:contact@meridian-synergy.com', label: t('about.contact.email') },
])
</script>

<template>
  <div>
    <MsPageHero
      :crumbs="[{ label: t('breadcrumb.home'), href: localePath('/') }, { label: t('nav.about') }]"
      :badge="t('about.hero.badge')"
      :title="t('about.hero.title')"
      :desc="t('about.hero.subtitle')"
    />

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
            </g>
            <line x1="100" y1="12" x2="100" y2="188" stroke="var(--ms-color-gold)" stroke-width="3" clip-path="url(#ap-logo-clip)" opacity="0.85"/>
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
          <MsValueCard
            v-for="v in values"
            :key="v.key"
            :title="t(`about.values.${v.key}.title`)"
            :desc="t(`about.values.${v.key}.desc`)"
            :icon="v.icon"
          />
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
    <MsContactBanner
      :title="t('about.contact.title')"
      :desc="t('about.contact.desc')"
      :actions="contactActions"
    />
  </div>
</template>

<style scoped>
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

</style>
