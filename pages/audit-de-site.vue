<script setup lang="ts">
import { MsPageHero, MsCtaBanner, MsCard } from '@meridian-synergy/ui'

// Conversion page for the offered site diagnosis, published in both locales. This is
// a STATIC route with a localised slug (/audit-de-site ↔ /en/website-audit), so i18n
// resolves the alternates on its own — unlike the dynamic guide and dossier routes,
// which need translationKey pairing.

const { t, locale } = useI18n()
const localePath = useLocalePath()

const siteUrl = 'https://meridian-synergy.com'
const contentPath = computed(() =>
  locale.value === 'en' ? '/en/offre/website-audit' : '/fr/offre/audit-de-site',
)
const canonicalUrl = computed(() =>
  `${siteUrl}${locale.value === 'en' ? '/en/website-audit' : '/audit-de-site'}/`,
)

const { data: page } = await useAsyncData(contentPath.value, () =>
  queryCollection('content').path(contentPath.value).first()
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

useSchemaOrg(computed(() => (page.value ? [
  defineBreadcrumb({
    itemListElement: [
      { name: t('breadcrumb.home'), item: siteUrl },
      { name: page.value.title, item: canonicalUrl.value },
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
      name: locale.value === 'en' ? 'Website diagnosis' : 'Diagnostic de site internet',
      serviceType: locale.value === 'en' ? 'Website audit' : 'Audit de site internet',
      description: locale.value === 'en'
        ? 'Measured diagnosis of a website: visibility in search engines and AI, business '
          + 'profile, performance, domain name protection, compliance.'
        : "Diagnostic mesuré d'un site internet : visibilité dans les moteurs et les IA, "
          + "fiche d'établissement, performance, protection du nom de domaine, conformité.",
      url: canonicalUrl.value,
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

// Slugs differ per locale; the hub prefix does too.
const guides = computed(() => {
  const en = locale.value === 'en'
  return [
    { href: en ? '/en/guides/website-cost' : '/guides/combien-coute-un-site-internet', key: 'prix' },
    { href: en ? '/en/guides/site-not-showing-on-google' : '/guides/site-invisible-sur-google', key: 'visibilite' },
    { href: en ? '/en/insights/chatgpt-visibility' : '/dossiers/referencement-chatgpt', key: 'chatgpt' },
  ]
})
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
