<script setup lang="ts">
import { MsPageHero } from '@meridian-synergy/ui'

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('productsPage.meta.title'),
  description: () => t('productsPage.meta.description'),
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: t('breadcrumb.home'), item: 'https://meridian-synergy.com' },
      { name: t('nav.products') },
    ],
  }),
])

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Waypoint360',
      url: 'https://app.waypoint360.eu',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      publisher: { '@type': 'Organization', name: 'Meridian Synergy' },
      description: 'Plateforme SaaS pour opérateurs de drones professionnels : planification de missions, conformité DGAC, gestion de flotte et rapports d\'intervention.',
      offers: { '@type': 'Offer', price: '5', priceCurrency: 'EUR', description: 'Essai gratuit disponible' },
    }),
  }],
})

const highlights = ['h1', 'h2', 'h3'] as const
</script>

<template>
  <div>
    <MsPageHero
      :crumbs="[{ label: t('breadcrumb.home'), href: localePath('/') }, { label: t('nav.products') }]"
      :badge="t('productsPage.hero.badge')"
      :title="t('productsPage.hero.title')"
      :desc="t('productsPage.hero.desc')"
    />

    <!-- What it is: built and operated in-house -->
    <section class="intro">
      <div class="container">
        <p class="intro-lead">{{ t('productsPage.intro') }}</p>
        <div class="highlights">
          <div v-for="h in highlights" :key="h" class="highlight">
            <span class="highlight-title">{{ t(`productsPage.highlights.${h}.title`) }}</span>
            <span class="highlight-desc">{{ t(`productsPage.highlights.${h}.desc`) }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- SaaS platform -->
    <SaasTeaser />

    <!-- Marketplace -->
    <MarketplaceTeaser />
  </div>
</template>

<style scoped>
.container { max-width: 1000px; margin: 0 auto; padding: 0 24px; }

.intro { padding: 64px 0; background: var(--ms-color-white); }
.intro-lead {
  font-size: 1.25rem;
  line-height: 1.7;
  color: var(--ms-color-navy);
  font-weight: 500;
  max-width: 720px;
  margin: 0 0 40px;
}

.highlights { display: grid; grid-template-columns: 1fr; gap: 20px; }
@media (min-width: 768px) { .highlights { grid-template-columns: repeat(3, 1fr); } }
.highlight {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px;
  background: var(--ms-color-bg);
  border: 1px solid var(--ms-color-border);
  border-radius: var(--ms-radius-lg);
}
.highlight-title { font-family: var(--ms-font-display); font-size: 1.0625rem; font-weight: 700; color: var(--ms-color-navy); }
.highlight-desc { font-size: 0.875rem; color: var(--ms-color-muted); line-height: 1.6; }
</style>
