<script setup lang="ts">
import { MsCard, MsBadge, MsPageHero, MsCtaBanner } from '@meridian-synergy/ui'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const slug = route.params.slug as string
const contentPath = `/${locale.value}/cas-usage/${slug}`
const dirPrefix = `/${locale.value}/cas-usage/`

const { data: page } = await useAsyncData(contentPath, () =>
  queryCollection('content').path(contentPath).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page introuvable' })
}

const { data: related } = await useAsyncData(`related-${contentPath}`, async () => {
  const all = await queryCollection('content').all()
  const peers = all.filter(i => i.path?.startsWith(dirPrefix) && i.path !== contentPath)
  const svc = (page.value?.meta as any)?.service ?? ''
  const cat = (page.value?.meta as any)?.category ?? ''
  const byService  = peers.filter(i => (i.meta as any)?.service === svc)
  const byCategory = peers.filter(i => (i.meta as any)?.category === cat && (i.meta as any)?.service !== svc)
  return [...byService, ...byCategory].slice(0, 3)
})

function hrefFor(item: any) {
  const itemSlug = (item.path as string)?.split('/').pop() ?? ''
  return locale.value === 'en'
    ? `/en/use-case/${itemSlug}`
    : `/cas-usage/${itemSlug}`
}

const siteUrl = 'https://meridian-synergy.com'

useSeoMeta({
  title: () => page.value?.title ?? '',
  description: () => page.value?.description ?? '',
  ogTitle: () => page.value?.title ?? '',
  ogDescription: () => page.value?.description ?? '',
  ogType: 'article',
  twitterCard: 'summary_large_image',
})

defineOgImage({
  component: 'CasUsage',
  title: page.value?.title ?? '',
  description: page.value?.description ?? '',
  categoryLabel: (page.value?.meta as any)?.categoryLabel ?? (page.value?.meta as any)?.category ?? '',
})

const useCaseHubPath = computed(() =>
  locale.value === 'en' ? `${siteUrl}/en/use-case` : `${siteUrl}/cas-usage`
)

useSchemaOrg(computed(() => page.value ? [
  defineArticle({
    headline: page.value.title,
    description: page.value.description,
    image: (page.value?.meta as any)?.image
      ? `${siteUrl}${(page.value.meta as any).image}`
      : `${siteUrl}/og-default.png`,
    datePublished: page.value.publishedAt as string | undefined,
    author: [{ '@type': 'Organization', name: 'Meridian Synergy', url: siteUrl }],
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: t('breadcrumb.home'), item: siteUrl },
      { name: t('breadcrumb.useCases'), item: useCaseHubPath.value },
      { name: page.value.title },
    ],
  }),
] : []))

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
      :badge="page.meta?.categoryLabel ?? page.meta?.category"
      :title="page.title"
      :desc="page.description"
      size="md"
    />

    <!-- Tags -->
    <div v-if="page.meta?.tags?.length" class="tags-bar">
      <div class="container">
        <div class="tags-inner">
          <span v-for="tag in page.meta.tags" :key="tag" class="detail-tag">{{ tag }}</span>
        </div>
      </div>
    </div>

    <!-- Content + Sidebar -->
    <section class="content-section">
      <div class="container layout">

        <div class="prose">
          <ContentRenderer :value="page" />
        </div>

        <aside class="sidebar">
          <!-- Related service -->
          <MsCard v-if="page.meta?.service">
            <div class="sb-block">
              <p class="sb-label">{{ t('useCasesPage.relatedService') }}</p>
              <NuxtLink
                :to="localePath(`/services/${page.meta.service}`)"
                class="sb-item"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ t(`services.${serviceKeys[page.meta.service] ?? page.meta.service}.title`) }}
              </NuxtLink>
            </div>
          </MsCard>

          <!-- Related drones -->
          <MsCard v-if="page.meta?.relatedDrones?.length">
            <div class="sb-block">
              <p class="sb-label">{{ t('useCasesPage.relatedDrones') }}</p>
              <NuxtLink
                v-for="droneSlug in page.meta.relatedDrones"
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

    <!-- Related use cases -->
    <section v-if="related?.length" class="related-section">
      <div class="container">
        <h2 class="related-title">{{ t('useCasesPage.related.title') }}</h2>
        <div class="related-grid">
          <NuxtLink
            v-for="item in related"
            :key="item.path"
            :to="hrefFor(item)"
            class="related-link"
          >
            <MsCard>
              <div class="related-body">
                <MsBadge :label="(item.meta as any)?.categoryLabel ?? (item.meta as any)?.category" variant="sky" :dot="false" />
                <h3 class="related-card-title">{{ item.title }}</h3>
                <p class="related-card-desc">{{ item.description }}</p>
              </div>
              <template #footer>
                <span class="related-more">{{ t('services.more') }} →</span>
              </template>
            </MsCard>
          </NuxtLink>
        </div>
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
.tags-bar {
  background: var(--ms-color-white);
  padding: 12px 0 0;
}
.tags-inner {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.detail-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--ms-color-muted);
  background: var(--ms-color-bg);
  border: 1px solid var(--ms-color-border);
  border-radius: 4px;
  padding: 3px 9px;
}

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

/* ── Related use cases ── */
.related-section {
  padding: 64px 0;
  background: var(--ms-color-bg);
  border-top: 1px solid var(--ms-color-border);
}
.related-title {
  font-family: var(--ms-font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--ms-color-navy);
  letter-spacing: -0.02em;
  margin: 0 0 28px;
}
.related-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
@media (min-width: 640px)  { .related-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .related-grid { grid-template-columns: repeat(3, 1fr); } }

.related-link {
  display: block;
  text-decoration: none;
  border-radius: var(--ms-radius-lg);
  transition: transform var(--ms-transition-base), box-shadow var(--ms-transition-base);
}
.related-link:hover { transform: translateY(-3px); box-shadow: var(--ms-shadow-md); }
.related-link:hover :deep(.ms-card) { border-color: var(--ms-color-sky); }

.related-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 4px 0;
}
.related-card-title {
  font-family: var(--ms-font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--ms-color-navy);
  margin: 0;
  line-height: 1.35;
}
.related-card-desc {
  font-size: 0.875rem;
  color: var(--ms-color-muted);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.related-more {
  font-size: 13px;
  font-weight: 600;
  color: var(--ms-color-sky);
}
</style>
