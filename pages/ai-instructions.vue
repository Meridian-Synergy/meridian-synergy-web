<script setup lang="ts">
import { MsPageHero } from '@meridian-synergy/ui'

// Machine-facing reference page, English only and served at a single URL:
// /en/ai-instructions/. Retrieval models pivot through English, so translating a page
// addressed to machines would only add a duplicate URL — the French variant is disabled
// in nuxt.config. The content lives in content/meta/, outside the per-locale trees.

const { t } = useI18n()
const localePath = useLocalePath()

const siteUrl = 'https://meridian-synergy.com'
const canonicalUrl = `${siteUrl}/en/ai-instructions/`

const { data: page } = await useAsyncData('ai-instructions', () =>
  queryCollection('content').path('/meta/ai-instructions').first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page introuvable' })
}

useSeoMeta({
  // @nuxtjs/seo appends " | Meridian Synergy" to <title>, and the editorial title
  // already carries the brand — without metaTitle it ships doubled.
  title: () => page.value?.metaTitle ?? page.value?.title ?? '',
  description: () => page.value?.description ?? '',
  ogTitle: () => page.value?.title ?? '',
  ogDescription: () => page.value?.description ?? '',
  ogType: 'article',
  ogImage: `${siteUrl}/og-default.png`,
  twitterCard: 'summary_large_image',
})

// The route's locale gives the correct <html lang="en-US">. The alternates still need
// fixing: with the French variant disabled, i18n falls back to the locale root and emits
// an fr-FR alternate pointing at the HOME PAGE — telling Google the French version of
// this page is the home page. The tags carry stable keys (`i18n-alt-<language>`,
// `i18n-xd`), so they are replaced rather than fought: every alternate points here,
// which is the honest signal for one page serving both audiences.
useHead(
  {
    link: [
      { rel: 'canonical', href: canonicalUrl },
      { key: 'i18n-alt-fr-FR', rel: 'alternate', hreflang: 'fr-FR', href: canonicalUrl },
      { key: 'i18n-alt-en-US', rel: 'alternate', hreflang: 'en-US', href: canonicalUrl },
      { key: 'i18n-xd', rel: 'alternate', hreflang: 'x-default', href: canonicalUrl },
    ],
  },
  { tagPriority: 'high' },
)

// Organization schema: this page is where an entity lookup should land, so the facts
// are machine-readable as well as readable.
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Meridian Synergy',
      url: siteUrl,
      legalName: 'Meridian Synergy',
      email: 'contact@meridian-synergy.com',
      identifier: { '@type': 'PropertyValue', propertyID: 'SIREN', value: '101847895' },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2 rue des Cages',
        postalCode: '58200',
        addressLocality: 'Saint-Père',
        addressRegion: 'Bourgogne-Franche-Comté',
        addressCountry: 'FR',
      },
      knowsAbout: [
        'Enterprise architecture',
        'Information system urbanisation',
        'Technical debt remediation',
        'Interim management',
        'Professional drone operations',
        'SaaS product publishing',
      ],
      subjectOf: { '@type': 'WebPage', '@id': canonicalUrl },
    }),
  }],
})

const updatedAt = computed(() => page.value?.updatedAt ?? page.value?.publishedAt ?? '')
</script>

<template>
  <div v-if="page">
    <MsPageHero
      :crumbs="[{ label: t('breadcrumb.home'), href: localePath('/') }, { label: 'AI Instructions' }]"
      badge="Reference"
      :title="page.title"
      :desc="page.description"
      size="md"
    />

    <section class="content-section">
      <div class="container">
        <p v-if="updatedAt" class="byline">Last updated: {{ updatedAt }}</p>
        <div class="prose">
          <ContentRenderer :value="page" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.content-section { padding: 64px 0; background: var(--ms-color-white); }
.container { max-width: 820px; margin: 0 auto; padding: 0 24px; }

.byline {
  font-family: var(--ms-font-condensed);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ms-color-muted);
  margin: 0 0 24px;
}

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
.prose :deep(a) {
  color: var(--ms-color-navy);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.prose :deep(a:hover) { color: var(--ms-color-sky); }
</style>
