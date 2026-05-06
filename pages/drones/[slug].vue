<script setup lang="ts">
import { MsBadge, MsCard, MsCtaBanner } from '@meridian-synergy/ui'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const slug = route.params.slug as string
const contentPath = `/${locale.value}/drones/${slug}`

const { data: page } = await useAsyncData(contentPath, () =>
  queryCollection('content').path(contentPath).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page introuvable' })
}

const siteUrl = 'https://meridian-synergy.com'

useSeoMeta({
  title: () => page.value?.title ?? '',
  description: () => page.value?.description ?? '',
  ogTitle: () => page.value?.title ?? '',
  ogDescription: () => page.value?.description ?? '',
  ogType: 'article',
  ogImage: () => page.value?.image ? `${siteUrl}${page.value.image}` : `${siteUrl}/og-default.png`,
  twitterCard: 'summary_large_image',
})

const serviceKeys: Record<string, string> = {
  'audit-thermique':          'thermique',
  'thermal-inspection':       'thermique',
  'agriculture-viticulture':  'agriculture',
  'video-cinema':             'video',
  'securite-surveillance':    'securite',
  'security-surveillance':    'securite',
  'topographie-cartographie': 'topographie',
  'topography-mapping':       'topographie',
  'inspection-infrastructure':'infrastructure',
  'infrastructure-inspection':'infrastructure',
}

const specIcons = {
  weight: 'M12 3C8 3 5 6 5 10c0 5.25 7 13 7 13s7-7.75 7-13c0-4-3-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 7a2.5 2.5 0 0 1 0 5.5z',
  flightTime: 'M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  camera: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  range: 'M1.42 9a11 11 0 0 1 21.16 0M5 12.55a7 7 0 0 1 14 0M10.71 17.29a1.41 1.41 0 1 0 2 2M12 20h.01',
}
</script>

<template>
  <div v-if="page">

    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <div class="hero-inner">
          <div class="hero-text">
            <MsBreadcrumb :crumbs="[{ label: t('breadcrumb.home'), href: localePath('/') }, { label: t('nav.drones'), href: localePath('/drones') }, { label: page.model }]" />
            <MsBadge :label="page.manufacturer" variant="navy" :dot="false" />
            <h1 class="hero-title">{{ page.title }}</h1>
            <p class="hero-desc">{{ page.description }}</p>
          </div>
          <div class="hero-visual">
            <div class="hero-placeholder" aria-hidden="true">
              <svg viewBox="0 0 80 50" fill="none">
                <rect x="35" y="20" width="10" height="10" rx="2" fill="var(--ms-color-navy)" opacity="0.1"/>
                <circle cx="40" cy="25" r="4" stroke="var(--ms-color-navy)" stroke-width="1.5" opacity="0.3"/>
                <line x1="40" y1="25" x2="10" y2="10" stroke="var(--ms-color-navy)" stroke-width="1.5" opacity="0.2"/>
                <line x1="40" y1="25" x2="70" y2="10" stroke="var(--ms-color-navy)" stroke-width="1.5" opacity="0.2"/>
                <line x1="40" y1="25" x2="10" y2="40" stroke="var(--ms-color-navy)" stroke-width="1.5" opacity="0.2"/>
                <line x1="40" y1="25" x2="70" y2="40" stroke="var(--ms-color-navy)" stroke-width="1.5" opacity="0.2"/>
                <circle cx="10" cy="10" r="5" stroke="var(--ms-color-sky)" stroke-width="1.5" opacity="0.5"/>
                <circle cx="70" cy="10" r="5" stroke="var(--ms-color-sky)" stroke-width="1.5" opacity="0.5"/>
                <circle cx="10" cy="40" r="5" stroke="var(--ms-color-sky)" stroke-width="1.5" opacity="0.5"/>
                <circle cx="70" cy="40" r="5" stroke="var(--ms-color-sky)" stroke-width="1.5" opacity="0.5"/>
              </svg>
            </div>
            <img
              v-if="page.image"
              :src="page.image"
              :alt="page.model"
              class="hero-img"
              @error="($event.target as HTMLImageElement).style.display = 'none'"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Specs -->
    <section class="specs-section">
      <div class="container">
        <p class="specs-label">{{ t('dronePage.specs') }}</p>
        <div class="specs-grid">
          <div class="spec-card">
            <svg class="spec-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3a7 7 0 1 0 0 14A7 7 0 0 0 12 3zM8 12h8M12 8v8" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
            </svg>
            <span class="spec-key">{{ t('dronePage.specWeight') }}</span>
            <span class="spec-val">{{ page.specs?.weight }}</span>
          </div>
          <div class="spec-card">
            <svg class="spec-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.75"/>
              <path d="M12 7v5l3 3" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="spec-key">{{ t('dronePage.specFlightTime') }}</span>
            <span class="spec-val">{{ page.specs?.maxFlightTime }}</span>
          </div>
          <div class="spec-card">
            <svg class="spec-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="7" width="15" height="11" rx="2" stroke="currentColor" stroke-width="1.75"/>
              <path d="M17 11l5-3v8l-5-3v-2z" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
            </svg>
            <span class="spec-key">{{ t('dronePage.specCamera') }}</span>
            <span class="spec-val">{{ page.specs?.camera }}</span>
          </div>
          <div class="spec-card">
            <svg class="spec-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M1.5 8.5a13 13 0 0 1 21 0M5 12a10 10 0 0 1 14 0M8.5 15.5a5.5 5.5 0 0 1 7 0" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
              <circle cx="12" cy="19" r="1" fill="currentColor"/>
            </svg>
            <span class="spec-key">{{ t('dronePage.specRange') }}</span>
            <span class="spec-val">{{ page.specs?.range }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Content + Sidebar -->
    <section class="content-section">
      <div class="container layout">

        <div class="prose">
          <ContentRenderer :value="page" />
        </div>

        <aside class="sidebar">
          <MsCard v-if="page.relatedServices?.length">
            <div class="sb-block">
              <p class="sb-label">{{ t('dronePage.relatedServices') }}</p>
              <NuxtLink
                v-for="svcSlug in page.relatedServices"
                :key="svcSlug"
                :to="localePath(`/services/${svcSlug}`)"
                class="sb-item"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ t(`services.${serviceKeys[svcSlug]}.title`) }}
              </NuxtLink>
            </div>
          </MsCard>
        </aside>

      </div>
    </section>

    <!-- CTA -->
    <MsCtaBanner
      :title="t('dronePage.quoteTitle')"
      :desc="t('dronePage.quoteDesc')"
      :label="t('dronePage.quoteBtn')"
      :href="localePath('/contact')"
    />

  </div>
</template>

<style scoped>
.container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }

/* ── Hero ── */
.hero { background: var(--ms-color-bg); padding: 56px 0; border-bottom: 1px solid var(--ms-color-border); }
.hero-inner { display: flex; flex-direction: column; gap: 32px; }
@media (min-width: 768px) {
  .hero-inner { flex-direction: row; align-items: center; gap: 48px; }
  .hero-text { flex: 1; }
  .hero-visual { width: 380px; flex-shrink: 0; }
}
.hero-title {
  font-family: var(--ms-font-display);
  font-size: clamp(1.75rem, 3.5vw, 2.75rem);
  font-weight: 800;
  color: var(--ms-color-navy);
  letter-spacing: -0.03em;
  margin: 16px 0;
}
.hero-desc { font-size: 1.0625rem; color: var(--ms-color-muted); max-width: 600px; line-height: 1.7; margin: 0; }
.hero-visual { position: relative; }
.hero-placeholder {
  width: 100%;
  height: 280px;
  background: var(--ms-color-white);
  border: 1px solid var(--ms-color-border);
  border-radius: var(--ms-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
}
.hero-placeholder svg { width: 100%; max-width: 200px; height: auto; }
.hero-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--ms-radius-lg);
  border: 1px solid var(--ms-color-border);
}

/* ── Specs ── */
.specs-section { background: var(--ms-color-navy); padding: 40px 0; }
.specs-label {
  font-family: var(--ms-font-condensed);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin: 0 0 20px;
}
.specs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
@media (min-width: 768px) { .specs-grid { grid-template-columns: repeat(4, 1fr); } }
.spec-card {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: var(--ms-radius-md);
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.spec-icon { width: 20px; height: 20px; color: var(--ms-color-sky); flex-shrink: 0; }
.spec-key { font-family: var(--ms-font-condensed); font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.45); }
.spec-val { font-size: 14px; font-weight: 600; color: var(--ms-color-white); line-height: 1.45; }

/* ── Content layout ── */
.content-section { padding: 64px 0; background: var(--ms-color-white); }
.layout { display: grid; grid-template-columns: 1fr; gap: 40px; align-items: start; }
@media (min-width: 1024px) { .layout { grid-template-columns: 1fr 280px; gap: 56px; } }

/* ── Prose ── */
.prose :deep(h2) { font-family: var(--ms-font-display); font-size: 1.375rem; font-weight: 700; color: var(--ms-color-navy); letter-spacing: -0.02em; margin: 2.25em 0 0.75em; padding-bottom: 0.5em; border-bottom: 1px solid var(--ms-color-border); }
.prose :deep(h3) { font-family: var(--ms-font-display); font-size: 1.125rem; font-weight: 700; color: var(--ms-color-navy); margin: 1.75em 0 0.5em; }
.prose :deep(p) { font-size: 1rem; line-height: 1.75; color: var(--ms-color-navy); margin-bottom: 1.1em; }
.prose :deep(ul) { margin: 0.75em 0 1.25em 1.25em; display: flex; flex-direction: column; gap: 6px; }
.prose :deep(li) { font-size: 1rem; line-height: 1.65; color: var(--ms-color-navy); }
.prose :deep(strong) { font-weight: 700; color: var(--ms-color-navy); }

/* ── Sidebar ── */
.sidebar { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 88px; }
.sb-block { display: flex; flex-direction: column; gap: 10px; }
.sb-label { font-family: var(--ms-font-condensed); font-size: 10px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ms-color-muted); margin: 0; }
.sb-item { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 500; color: var(--ms-color-navy); text-decoration: none; padding: 6px 8px; border-radius: var(--ms-radius-md); transition: background-color var(--ms-transition-fast), color var(--ms-transition-fast); }
.sb-item:hover { background: var(--ms-color-bg); color: var(--ms-color-sky); }
.sb-item svg { color: var(--ms-color-sky); flex-shrink: 0; }

</style>
