<script setup lang="ts">
import { MsButton, MsBadge, MsCard } from '@meridian-synergy/ui'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const slug = route.params.slug as string
const contentPath = `/${locale.value}/services/${slug}`

const { data: page } = await useAsyncData(contentPath, () =>
  queryCollection('content').path(contentPath).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page introuvable' })
}

const siteUrl = 'https://meridian-synergy.com'
const imageError = ref(false)

useSeoMeta({
  title: () => page.value?.title ?? '',
  description: () => page.value?.description ?? '',
  ogTitle: () => page.value?.title ?? '',
  ogDescription: () => page.value?.description ?? '',
  ogType: 'article',
  ogImage: () => page.value?.image ? `${siteUrl}${page.value.image}` : `${siteUrl}/og-default.png`,
  twitterCard: 'summary_large_image',
})

const droneLabels: Record<string, string> = {
  'dji-t100-agri':   'DJI Agras T100',
  'dji-matrice-4td': 'DJI Matrice 4TD',
}

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
</script>

<template>
  <div v-if="page">

    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <nav class="breadcrumb" aria-label="Fil d'Ariane">
          <NuxtLink :to="localePath('/')" class="bc-link">{{ t('breadcrumb.home') }}</NuxtLink>
          <span class="bc-sep" aria-hidden="true">›</span>
          <NuxtLink :to="localePath('/services')" class="bc-link">{{ t('nav.services') }}</NuxtLink>
          <span class="bc-sep" aria-hidden="true">›</span>
          <span class="bc-current">{{ page.title }}</span>
        </nav>
        <MsBadge label="Service" variant="sky" />
        <h1 class="hero-title">{{ page.title }}</h1>
        <p class="hero-desc">{{ page.description }}</p>
      </div>
    </section>

    <!-- Image banner -->
    <div v-if="page.image && !imageError" class="image-banner">
      <div class="container">
        <img
          :src="page.image"
          :alt="page.title"
          class="banner-img"
          @error="imageError = true"
        />
      </div>
    </div>

    <!-- Content + Sidebar -->
    <section class="content-section">
      <div class="container layout">

        <div class="prose">
          <ContentRenderer :value="page" />
        </div>

        <aside class="sidebar">
          <MsCard v-if="page.relatedDrones?.length">
            <div class="sb-block">
              <p class="sb-label">{{ t('servicePage.relatedDrones') }}</p>
              <NuxtLink
                v-for="droneSlug in page.relatedDrones"
                :key="droneSlug"
                :to="localePath(`/drones/${droneSlug}`)"
                class="sb-item"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 9h3m12 0h3M3 15h3m12 0h3M9 3v3m0 12v3m6-18v3m0 12v3" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
                  <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" stroke-width="1.75"/>
                  <circle cx="12" cy="12" r="2" fill="currentColor"/>
                </svg>
                {{ droneLabels[droneSlug] ?? droneSlug }}
              </NuxtLink>
            </div>
          </MsCard>

          <MsCard v-if="page.relatedServices?.length">
            <div class="sb-block">
              <p class="sb-label">{{ t('servicePage.relatedServices') }}</p>
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
    <section class="cta-section">
      <div class="container cta-inner">
        <div class="cta-text">
          <h2 class="cta-title">{{ t('servicePage.quoteTitle') }}</h2>
          <p class="cta-desc">{{ t('servicePage.quoteDesc') }}</p>
        </div>
        <MsButton
          :label="t('servicePage.quoteBtn')"
          variant="cta"
          size="lg"
          @click="navigateTo(localePath('/contact'))"
        />
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

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.bc-link {
  font-size: 13px;
  color: var(--ms-color-muted);
  text-decoration: none;
  transition: color var(--ms-transition-fast);
  white-space: nowrap;
}
.bc-link:hover { color: var(--ms-color-navy); }
.bc-sep { color: var(--ms-color-border); font-size: 14px; }
.bc-current {
  font-size: 13px;
  color: var(--ms-color-navy);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hero-title {
  font-family: var(--ms-font-display);
  font-size: clamp(1.75rem, 3.5vw, 2.75rem);
  font-weight: 800;
  color: var(--ms-color-navy);
  letter-spacing: -0.03em;
  margin: 16px 0;
}
.hero-desc {
  font-size: 1.0625rem;
  color: var(--ms-color-muted);
  max-width: 600px;
  line-height: 1.7;
  margin: 0;
}

/* ── Image banner ── */
.image-banner { background: var(--ms-color-white); padding: 0 0 0; }
.banner-img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: var(--ms-radius-lg);
  border: 1px solid var(--ms-color-border);
  display: block;
  margin-top: -1px;
}
@media (min-width: 768px) { .banner-img { height: 420px; } }

/* ── Content layout ── */
.content-section {
  padding: 64px 0;
  background: var(--ms-color-white);
}

.layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: start;
}
@media (min-width: 1024px) {
  .layout { grid-template-columns: 1fr 300px; gap: 56px; }
}

/* ── Prose ── */
.prose :deep(h2) {
  font-family: var(--ms-font-display);
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--ms-color-navy);
  letter-spacing: -0.02em;
  margin: 2.25em 0 0.75em;
  padding-bottom: 0.5em;
  border-bottom: 1px solid var(--ms-color-border);
}
.prose :deep(h3) {
  font-family: var(--ms-font-display);
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--ms-color-navy);
  margin: 1.75em 0 0.5em;
}
.prose :deep(p) {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--ms-color-navy);
  margin-bottom: 1.1em;
}
.prose :deep(ul) {
  margin: 0.75em 0 1.25em 1.25em;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.prose :deep(li) {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--ms-color-navy);
}
.prose :deep(strong) {
  font-weight: 700;
  color: var(--ms-color-navy);
}
.prose :deep(em) { font-style: italic; }

/* ── Sidebar ── */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 88px;
}

.sb-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sb-label {
  font-family: var(--ms-font-condensed);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ms-color-muted);
  margin: 0;
}
.sb-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ms-color-navy);
  text-decoration: none;
  padding: 6px 8px;
  border-radius: var(--ms-radius-md);
  transition: background-color var(--ms-transition-fast), color var(--ms-transition-fast);
}
.sb-item:hover {
  background: var(--ms-color-bg);
  color: var(--ms-color-sky);
}
.sb-item svg { color: var(--ms-color-sky); flex-shrink: 0; }

/* ── CTA ── */
.cta-section {
  background: var(--ms-color-navy);
  padding: 64px 0;
}
.cta-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
}
.cta-text { flex: 1; min-width: 260px; }
.cta-title {
  font-family: var(--ms-font-display);
  font-size: clamp(1.375rem, 2.5vw, 1.875rem);
  font-weight: 800;
  color: var(--ms-color-white);
  letter-spacing: -0.02em;
  margin: 0 0 10px;
}
.cta-desc {
  font-size: 1rem;
  color: var(--ms-color-muted);
  margin: 0;
  opacity: 0.8;
}
</style>
