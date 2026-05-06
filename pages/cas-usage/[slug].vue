<script setup lang="ts">
import { MsCard, MsPageHero, MsCtaBanner } from '@meridian-synergy/ui'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const slug = route.params.slug as string
const contentPath = `/${locale.value}/cas-usage/${slug}`

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

const droneLabels: Record<string, string> = {
  'dji-t100-agri':   'DJI Agras T100',
  'dji-matrice-4td': 'DJI Matrice 4TD',
  'dji-avata-360':   'DJI Avata 360',
}

const serviceKeys: Record<string, string> = {
  'agriculture-viticulture':   'agriculture',
  'audit-thermique':           'thermique',
  'thermal-inspection':        'thermique',
  'video-cinema':              'video',
  'securite-surveillance':     'securite',
  'security-surveillance':     'securite',
  'topographie-cartographie':  'topographie',
  'topography-mapping':        'topographie',
  'inspection-infrastructure': 'infrastructure',
  'infrastructure-inspection': 'infrastructure',
}
</script>

<template>
  <div v-if="page">

    <MsPageHero
      :crumbs="[
        { label: t('breadcrumb.home'), href: localePath('/') },
        { label: t('nav.useCases'), href: localePath('/cas-usage') },
        { label: page.categoryLabel ?? page.category },
        { label: page.title }
      ]"
      :badge="page.categoryLabel ?? page.category"
      :title="page.title"
      :desc="page.description"
      size="md"
    />

    <!-- Content + Sidebar -->
    <section class="content-section">
      <div class="container layout">

        <div class="prose">
          <ContentRenderer :value="page" />
        </div>

        <aside class="sidebar">
          <!-- Related service -->
          <MsCard v-if="page.service">
            <div class="sb-block">
              <p class="sb-label">{{ t('useCasesPage.relatedService') }}</p>
              <NuxtLink
                :to="localePath(`/services/${page.service}`)"
                class="sb-item"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ t(`services.${serviceKeys[page.service] ?? page.service}.title`) }}
              </NuxtLink>
            </div>
          </MsCard>

          <!-- Related drones -->
          <MsCard v-if="page.relatedDrones?.length">
            <div class="sb-block">
              <p class="sb-label">{{ t('useCasesPage.relatedDrones') }}</p>
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
        </aside>

      </div>
    </section>

    <MsCtaBanner
      :title="t('useCasesPage.quoteTitle')"
      :desc="t('useCasesPage.quoteDesc')"
      :label="t('useCasesPage.quoteBtn')"
      :href="localePath('/contact')"
    />

  </div>
</template>

<style scoped>
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
</style>
