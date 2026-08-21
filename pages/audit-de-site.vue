<script setup lang="ts">
import { MsPageHero, MsCtaBanner, MsCard } from '@meridian-synergy/ui'

// Conversion page for the offered site diagnosis. French-only by design: it is linked
// from cold outreach and from the report itself, and its audience is a French SME
// owner. The English variant is disabled in nuxt.config.

const { t } = useI18n()
const localePath = useLocalePath()

const siteUrl = 'https://meridian-synergy.com'
const canonicalUrl = `${siteUrl}/audit-de-site/`

const { data: page } = await useAsyncData('audit-de-site', () =>
  queryCollection('content').path('/fr/offre/audit-de-site').first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page introuvable' })
}

useSeoMeta({
  title: () => page.value?.metaTitle ?? page.value?.title ?? '',
  description: () => page.value?.description ?? '',
  ogTitle: () => page.value?.title ?? '',
  ogDescription: () => page.value?.description ?? '',
  ogType: 'article',
  ogImage: `${siteUrl}/og-default.png`,
  twitterCard: 'summary_large_image',
})

// Same correction as the guides: with the English variant disabled, i18n would
// advertise the home page as this page's English counterpart.
useHead(
  {
    link: [
      { key: 'i18n-alt-fr-FR', rel: 'alternate', hreflang: 'fr-FR', href: canonicalUrl },
      { key: 'i18n-alt-en-US', rel: 'alternate', hreflang: 'en-US', href: canonicalUrl },
      { key: 'i18n-xd', rel: 'alternate', hreflang: 'x-default', href: canonicalUrl },
    ],
  },
  { tagPriority: 'high' },
)

useSchemaOrg(computed(() => (page.value ? [
  defineBreadcrumb({
    itemListElement: [
      { name: t('breadcrumb.home'), item: siteUrl },
      { name: page.value.title, item: canonicalUrl },
    ],
  }),
] : [])))

// Service schema — this page describes an offering, not an article.
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Diagnostic de site internet',
      serviceType: 'Audit de site internet',
      description:
        "Diagnostic mesuré d'un site internet : visibilité dans les moteurs et les IA, "
        + 'fiche d\'établissement, performance, protection du nom de domaine, conformité.',
      url: canonicalUrl,
      provider: { '@type': 'Organization', name: 'Meridian Synergy', url: siteUrl },
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Nièvre' },
        { '@type': 'AdministrativeArea', name: 'Cher' },
        { '@type': 'AdministrativeArea', name: 'Yonne' },
        { '@type': 'AdministrativeArea', name: 'Loiret' },
        { '@type': 'AdministrativeArea', name: 'Paris' },
      ],
    }),
  }],
})

const guides = [
  { href: '/guides/combien-coute-un-site-internet', key: 'prix' },
  { href: '/guides/site-invisible-sur-google', key: 'visibilite' },
  { href: '/dossiers/referencement-chatgpt', key: 'chatgpt' },
]
</script>

<template>
  <div v-if="page">
    <MsPageHero
      :crumbs="[{ label: t('breadcrumb.home'), href: localePath('/') }, { label: page.title }]"
      :badge="t('auditPage.badge')"
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
              <p class="sb-label">{{ t('auditPage.readLabel') }}</p>
              <NuxtLink
                v-for="guide in guides"
                :key="guide.href"
                :to="guide.href"
                class="sb-item"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ t(`auditPage.guides.${guide.key}`) }}
              </NuxtLink>
            </div>
          </MsCard>
        </aside>
      </div>
    </section>

    <MsCtaBanner
      :title="t('auditPage.cta.title')"
      :desc="t('auditPage.cta.desc')"
      :label="t('auditPage.cta.btn')"
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
.prose :deep(ul) {
  margin: 0.75em 0 1.25em 1.25em;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.prose :deep(li) { font-size: 1rem; line-height: 1.65; color: var(--ms-color-navy); }
.prose :deep(strong) { font-weight: 700; color: var(--ms-color-navy); }

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
  line-height: 1.4;
}
.sb-item:hover { background: var(--ms-color-bg); color: var(--ms-color-sky); }
.sb-item svg { color: var(--ms-color-sky); flex-shrink: 0; }
</style>
