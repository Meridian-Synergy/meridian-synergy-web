<script setup lang="ts">
import { MsCard, MsPageHero, MsCtaBanner } from '@meridian-synergy/ui'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const slug = route.params.slug as string
const contentPath = `/${locale.value}/dossiers/${slug}`

const { data: page } = await useAsyncData(contentPath, () =>
  queryCollection('content').path(contentPath).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page introuvable' })
}

const siteUrl = 'https://meridian-synergy.com'
const localePrefix = computed(() => (locale.value === 'en' ? '/en' : ''))
const hubPath = computed(() => (locale.value === 'en' ? '/en/insights' : '/dossiers'))
const canonicalUrl = computed(() => `${siteUrl}${hubPath.value}/${slug}/`)

useSeoMeta({
  // <title> gets the site name appended; ogTitle does not. Keep the editorial
  // headline for social, and a shorter metaTitle for the SERP when one is given.
  title: () => page.value?.metaTitle ?? page.value?.title ?? '',
  description: () => page.value?.description ?? '',
  ogTitle: () => page.value?.title ?? '',
  ogDescription: () => page.value?.description ?? '',
  ogType: 'article',
  ogImage: () => (page.value?.image ? `${siteUrl}${page.value.image}` : `${siteUrl}/og-default.png`),
  twitterCard: 'summary_large_image',
})

useSchemaOrg(computed(() => (page.value ? [
  defineBreadcrumb({
    itemListElement: [
      { name: t('breadcrumb.home'), item: siteUrl },
      { name: t('nav.dossiers'), item: `${siteUrl}${hubPath.value}` },
      { name: page.value.title, item: canonicalUrl.value },
    ],
  }),
] : [])))

// Article schema — the dossiers are editorial pieces, not services.
useHead(computed(() => {
  if (!page.value) return {}
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.value.title,
    description: page.value.description,
    url: canonicalUrl.value,
    inLanguage: locale.value === 'en' ? 'en' : 'fr',
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl.value },
    author: { '@type': 'Person', name: 'Denis Gosset', url: `${siteUrl}${localePrefix.value}/a-propos` },
    publisher: { '@type': 'Organization', name: 'Meridian Synergy', url: siteUrl },
  }
  if (page.value.publishedAt) schema.datePublished = page.value.publishedAt
  if (page.value.updatedAt) schema.dateModified = page.value.updatedAt
  if (page.value.image) schema.image = `${siteUrl}${page.value.image}`
  const sources = page.value.sources as { url: string }[] | undefined
  if (sources?.length) schema.citation = sources.map(s => s.url)
  return {
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(schema) }],
  }
}))

// Every dossier of every locale, in one query: it feeds both the sibling links and
// the hreflang pairing below.
const { data: catalogue } = await useAsyncData(`dossiers-catalogue`, async () => {
  const all = await queryCollection('content').all()
  return all
    .filter(doc => /^\/(fr|en)\/dossiers\//.test(doc.path ?? ''))
    .map(doc => {
      const [, docLocale, slug] = doc.path!.match(/^\/(fr|en)\/dossiers\/(.+)$/)!
      return {
        locale: docLocale,
        slug,
        path: doc.path!,
        title: doc.title as string,
        translationKey: (doc.translationKey as string | undefined) ?? slug,
      }
    })
})

// FR and EN slugs differ, and @nuxtjs/i18n cannot guess the counterpart of a dynamic
// param on its own — left alone it emits hreflang pointing at /en/insights/<FR slug>,
// a URL that does not exist. Pairing on translationKey makes the alternates real.
const setI18nParams = useSetI18nParams()
const currentEntry = computed(() => catalogue.value?.find(entry => entry.path === contentPath))
const alternates = computed(() => {
  const key = currentEntry.value?.translationKey
  if (!key) return {}
  return Object.fromEntries(
    (catalogue.value ?? [])
      .filter(entry => entry.translationKey === key)
      .map(entry => [entry.locale, { slug: entry.slug }])
  )
})
setI18nParams(alternates.value)

const siblings = computed(() =>
  (catalogue.value ?? [])
    .filter(entry => entry.locale === locale.value && entry.path !== contentPath)
    .map(entry => ({ slug: entry.slug, title: entry.title }))
)

function dossierHref(target: string): string {
  return `${hubPath.value}/${target}`
}

const relatedDossiers = computed(() => {
  const pinned = page.value?.relatedDossiers as string[] | undefined
  const list = siblings.value
  if (!pinned?.length) return list
  return list.filter(item => pinned.includes(item.slug))
})
</script>

<template>
  <div v-if="page">

    <MsPageHero
      :crumbs="[
        { label: t('breadcrumb.home'), href: localePath('/') },
        { label: t('nav.dossiers'), href: hubPath },
        { label: page.title },
      ]"
      :badge="t('dossiersPage.badge')"
      :title="page.title"
      :desc="page.description"
      size="md"
    />

    <section class="content-section">
      <div class="container layout">

        <div class="main-col">
          <div class="prose">
            <ContentRenderer :value="page" />
          </div>

          <!-- Sources — every figure quoted above points here. -->
          <section v-if="page.sources?.length" class="sources">
            <h2 class="sources-title">{{ t('dossiersPage.sources') }}</h2>
            <ol class="sources-list">
              <li v-for="source in page.sources" :key="source.url" class="sources-item">
                <a :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.label }}</a>
                <span v-if="source.date" class="sources-date">— {{ source.date }}</span>
              </li>
            </ol>
          </section>
        </div>

        <aside class="sidebar">
          <MsCard v-if="relatedDossiers.length">
            <div class="sb-block">
              <p class="sb-label">{{ t('dossiersPage.related') }}</p>
              <NuxtLink
                v-for="item in relatedDossiers"
                :key="item.slug"
                :to="dossierHref(item.slug)"
                class="sb-item"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ item.title }}
              </NuxtLink>
            </div>
          </MsCard>

          <MsCard>
            <div class="sb-block">
              <p class="sb-label">{{ t('dossiersPage.pillarLabel') }}</p>
              <p class="sb-text">{{ t('dossiersPage.pillarDesc') }}</p>
              <NuxtLink :to="localePath('/conseil')" class="sb-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ t('nav.conseil') }}
              </NuxtLink>
            </div>
          </MsCard>
        </aside>

      </div>
    </section>

    <MsCtaBanner
      :title="t('dossiersPage.cta.title')"
      :desc="t('dossiersPage.cta.desc')"
      :label="t('dossiersPage.cta.btn')"
      :href="localePath('/contact')"
    />

  </div>
</template>

<style scoped>
.content-section { padding: 64px 0; background: var(--ms-color-white); }

.layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: start;
}
@media (min-width: 1024px) {
  .layout { grid-template-columns: 1fr 300px; gap: 56px; }
}

.main-col { min-width: 0; }

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
.prose :deep(ul),
.prose :deep(ol) {
  margin: 0.75em 0 1.25em 1.25em;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.prose :deep(li) {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--ms-color-navy);
}
.prose :deep(strong) { font-weight: 700; color: var(--ms-color-navy); }
.prose :deep(em) { font-style: italic; }

/* ── Sources ── */
.sources {
  margin-top: 56px;
  padding: 24px 28px;
  background: var(--ms-color-bg);
  border: 1px solid var(--ms-color-border);
  border-left: 4px solid var(--ms-color-gold);
  border-radius: var(--ms-radius-lg);
}
.sources-title {
  font-family: var(--ms-font-condensed);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ms-color-gold);
  margin: 0 0 12px;
}
.sources-list {
  margin: 0;
  padding-left: 1.1em;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.sources-item {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--ms-color-muted);
}
.sources-item a {
  color: var(--ms-color-navy);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.sources-item a:hover { color: var(--ms-color-sky); }
.sources-date { color: var(--ms-color-muted); }

/* ── Sidebar ── */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 88px;
}
.sb-block { display: flex; flex-direction: column; gap: 10px; }
.sb-label {
  font-family: var(--ms-font-condensed);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ms-color-muted);
  margin: 0;
}
.sb-text {
  font-size: 0.875rem;
  line-height: 1.6;
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
.sb-item:hover { background: var(--ms-color-white); color: var(--ms-color-sky); }
.sb-item svg { color: var(--ms-color-sky); flex-shrink: 0; }
</style>
