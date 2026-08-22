<script setup lang="ts">
import { MsPageHero, MsCtaBanner, MsCard } from '@meridian-synergy/ui'

// Guides for an SME owner, published in both locales. The FR and EN slugs differ, so
// the two versions are paired through `translationKey` — same mechanism as the
// dossiers, and for the same reason: left alone, i18n emits an alternate pointing at
// a URL that does not exist.

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const slug = route.params.slug as string
const contentPath = computed(() => `/${locale.value}/guides/${slug}`)
const siteUrl = 'https://meridian-synergy.com'
const hubPath = computed(() => (locale.value === 'en' ? '/en/guides' : '/guides'))
const canonicalUrl = computed(() => `${siteUrl}${hubPath.value}/${slug}/`)

const { data: page } = await useAsyncData(contentPath.value, () =>
  queryCollection('content').path(contentPath.value).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page introuvable' })
}

useSeoMeta({
  // The SEO module appends the site name to <title>; metaTitle keeps the SERP budget.
  title: () => page.value?.metaTitle ?? page.value?.title ?? '',
  description: () => page.value?.description ?? '',
  ogTitle: () => page.value?.title ?? '',
  ogDescription: () => page.value?.description ?? '',
  ogType: 'article',
  ogImage: `${siteUrl}/og-default.png`,
  twitterCard: 'summary_large_image',
})

// FR and EN slugs differ, and i18n cannot guess the counterpart of a dynamic param.
// Pairing on translationKey makes the alternates real instead of pointing at a URL
// that was never generated.
const { data: catalogue } = await useAsyncData('guides-catalogue', async () => {
  const all = await queryCollection('content').all()
  return all
    .filter(doc => /^\/(fr|en)\/guides\//.test(doc.path ?? ''))
    .map(doc => {
      const [, docLocale, docSlug] = doc.path!.match(/^\/(fr|en)\/guides\/(.+)$/)!
      return {
        locale: docLocale,
        slug: docSlug,
        path: doc.path!,
        translationKey: (doc.translationKey as string | undefined) ?? docSlug,
      }
    })
})

const setI18nParams = useSetI18nParams()
const alternates = computed(() => {
  const key = catalogue.value?.find(e => e.path === contentPath.value)?.translationKey
  if (!key) return {}
  return Object.fromEntries(
    (catalogue.value ?? []).filter(e => e.translationKey === key).map(e => [e.locale, { slug: e.slug }]),
  )
})
setI18nParams(alternates.value)

useSchemaOrg(computed(() => (page.value ? [
  defineBreadcrumb({
    itemListElement: [
      { name: t('breadcrumb.home'), item: siteUrl },
      { name: page.value.title, item: canonicalUrl.value },
    ],
  }),
] : [])))

useHead(computed(() => {
  if (!page.value) return {}
  return {
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: page.value.title,
        description: page.value.description,
        url: canonicalUrl.value,
        inLanguage: locale.value === 'en' ? 'en' : 'fr',
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl.value },
        datePublished: page.value.publishedAt,
        dateModified: page.value.updatedAt ?? page.value.publishedAt,
        author: { '@type': 'Person', name: 'Denis Gosset', url: `${siteUrl}${locale.value === 'en' ? '/en/about' : '/a-propos'}` },
        publisher: { '@type': 'Organization', name: 'Meridian Synergy', url: siteUrl },
      }),
    }],
  }
}))
</script>

<template>
  <div v-if="page">
    <MsPageHero
      :crumbs="[{ label: t('breadcrumb.home'), href: localePath('/') }, { label: page.title }]"
      :badge="t('guidesPage.badge')"
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
        </div>

        <aside class="sidebar">
          <MsCard>
            <div class="sb-block">
              <p class="sb-label">{{ t('guidesPage.offerLabel') }}</p>
              <p class="sb-text">{{ t('guidesPage.offerDesc') }}</p>
              <NuxtLink :to="localePath('/audit-de-site')" class="sb-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ t('guidesPage.offerLink') }}
              </NuxtLink>
            </div>
          </MsCard>
        </aside>
      </div>
    </section>

    <MsCtaBanner
      :title="t('guidesPage.cta.title')"
      :desc="t('guidesPage.cta.desc')"
      :label="t('guidesPage.cta.btn')"
      :href="localePath('/contact')"
    />
  </div>
</template>

<style scoped>
.content-section { padding: 64px 0; background: var(--ms-color-white); }
.layout { display: grid; grid-template-columns: 1fr; gap: 40px; align-items: start; }
@media (min-width: 1024px) { .layout { grid-template-columns: 1fr 280px; gap: 56px; } }
.main-col { min-width: 0; }

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
.prose :deep(p) {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--ms-color-navy);
  margin-bottom: 1.1em;
}
.prose :deep(ul), .prose :deep(ol) {
  margin: 0.75em 0 1.25em 1.25em;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.prose :deep(li) { font-size: 1rem; line-height: 1.65; color: var(--ms-color-navy); }
.prose :deep(strong) { font-weight: 700; color: var(--ms-color-navy); }
.prose :deep(a) {
  color: var(--ms-color-navy);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.prose :deep(a:hover) { color: var(--ms-color-sky); }
.prose :deep(blockquote) {
  margin: 1.5em 0;
  padding: 16px 24px;
  background: var(--ms-color-bg);
  border-left: 4px solid var(--ms-color-gold);
  border-radius: var(--ms-radius-md);
}
.prose :deep(blockquote p) { margin: 0; font-style: italic; }
.prose :deep(code) {
  font-family: var(--ms-font-mono, monospace);
  font-size: 0.9em;
  background: var(--ms-color-bg);
  border: 1px solid var(--ms-color-border);
  border-radius: 4px;
  padding: 1px 5px;
}

.sidebar { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 88px; }
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
.sb-text { font-size: 0.875rem; line-height: 1.6; color: var(--ms-color-muted); margin: 0; }
.sb-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ms-color-navy);
  text-decoration: none;
  padding: 6px 8px;
  border-radius: var(--ms-radius-md);
}
.sb-item:hover { background: var(--ms-color-bg); color: var(--ms-color-sky); }
.sb-item svg { color: var(--ms-color-sky); flex-shrink: 0; }
</style>
