<script setup lang="ts">
import { MsCard, MsBadge, MsPageHero, MsCtaBanner } from '@meridian-synergy/ui'

const { t, locale } = useI18n()
const localePath = useLocalePath()

const siteUrl = 'https://meridian-synergy.com'
const hubPath = computed(() => (locale.value === 'en' ? '/en/insights' : '/dossiers'))

useSeoMeta({
  title: () => t('dossiersPage.meta.title'),
  description: () => t('dossiersPage.meta.description'),
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: t('breadcrumb.home'), item: siteUrl },
      { name: t('nav.dossiers'), item: `${siteUrl}${hubPath.value}` },
    ],
  }),
])

// Listing is driven by the content folder: dropping a markdown file in
// content/{fr,en}/dossiers/ is enough to publish it here.
const { data: dossiers } = await useAsyncData(`dossiers-hub-${locale.value}`, async () => {
  const all = await queryCollection('content').all()
  const prefix = `/${locale.value}/dossiers/`
  return all
    .filter(doc => doc.path?.startsWith(prefix))
    .map(doc => ({
      slug: doc.path!.slice(prefix.length),
      title: doc.title as string,
      description: doc.description as string,
      publishedAt: (doc.publishedAt as string | undefined) ?? '',
      updatedAt: (doc.updatedAt as string | undefined) ?? '',
      keywords: ((doc.seo as { keywords?: string[] } | undefined)?.keywords ?? []).slice(0, 3),
    }))
    .sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''))
})

const dateFormatter = computed(() =>
  new Intl.DateTimeFormat(locale.value === 'en' ? 'en-GB' : 'fr-FR', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
)

function formatDate(value?: string): string {
  if (!value) return ''
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? value : dateFormatter.value.format(parsed)
}
</script>

<template>
  <div>
    <MsPageHero
      :crumbs="[{ label: t('breadcrumb.home'), href: localePath('/') }, { label: t('nav.dossiers') }]"
      :badge="t('dossiersPage.hero.badge')"
      :title="t('dossiersPage.hero.title')"
      :desc="t('dossiersPage.hero.desc')"
    />

    <section class="intro">
      <div class="container">
        <p class="intro-lead">{{ t('dossiersPage.intro') }}</p>
      </div>
    </section>

    <section class="grid-section">
      <div class="container">
        <div class="dossiers-grid">
          <NuxtLink
            v-for="item in dossiers"
            :key="item.slug"
            :to="`${hubPath}/${item.slug}`"
            class="card-link"
          >
            <MsCard>
              <div class="d-body">
                <MsBadge :label="t('dossiersPage.badge')" variant="sky" :dot="false" />
                <h2 class="d-title">{{ item.title }}</h2>
                <p class="d-desc">{{ item.description }}</p>
                <div v-if="item.keywords.length" class="d-tags">
                  <span v-for="keyword in item.keywords" :key="keyword" class="d-tag">{{ keyword }}</span>
                </div>
              </div>
              <template #footer>
                <div class="d-footer">
                  <span class="d-date">{{ formatDate(item.updatedAt || item.publishedAt) }}</span>
                  <span class="d-more">{{ t('services.more') }} →</span>
                </div>
              </template>
            </MsCard>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Editorial rules, spelled out: the section is meant to be read and quoted, so
         what it is and how it is written belong on the hub, not only in the pieces. -->
    <section class="editorial">
      <div class="container">
        <div class="editorial-grid">
          <article class="editorial-block">
            <h2 class="editorial-title">{{ t('dossiersPage.about.title') }}</h2>
            <p class="editorial-text">{{ t('dossiersPage.about.body') }}</p>
          </article>
          <article class="editorial-block">
            <h2 class="editorial-title">{{ t('dossiersPage.method.title') }}</h2>
            <p class="editorial-text">{{ t('dossiersPage.method.body1') }}</p>
            <p class="editorial-text">{{ t('dossiersPage.method.body2') }}</p>
          </article>
          <article class="editorial-block">
            <h2 class="editorial-title">{{ t('dossiersPage.author.title') }}</h2>
            <p class="editorial-text">{{ t('dossiersPage.author.body') }}</p>
          </article>
        </div>
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
.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

.intro { padding: 56px 0 0; background: var(--ms-color-white); }
.intro-lead {
  max-width: 760px;
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--ms-color-navy);
  margin: 0;
  font-weight: 500;
}

.grid-section { padding: 40px 0 64px; background: var(--ms-color-white); }

.dossiers-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
@media (min-width: 768px)  { .dossiers-grid { grid-template-columns: repeat(2, 1fr); } }

.editorial { padding: 8px 0 64px; background: var(--ms-color-white); }
.editorial-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  max-width: 820px;
}
.editorial-block { display: flex; flex-direction: column; gap: 12px; }
.editorial-title {
  font-family: var(--ms-font-display);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--ms-color-navy);
  letter-spacing: -0.02em;
  margin: 0;
  padding-bottom: 0.5em;
  border-bottom: 1px solid var(--ms-color-border);
}
.editorial-text {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--ms-color-navy);
  margin: 0;
}

.card-link {
  display: block;
  text-decoration: none;
  border-radius: var(--ms-radius-lg);
  transition: transform var(--ms-transition-base), box-shadow var(--ms-transition-base);
}
.card-link:hover { transform: translateY(-3px); box-shadow: var(--ms-shadow-md); }
.card-link:hover :deep(.ms-card) { border-color: var(--ms-color-sky); }

.d-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 4px 0;
}
.d-title {
  font-family: var(--ms-font-display);
  font-size: 1.1875rem;
  font-weight: 700;
  color: var(--ms-color-navy);
  margin: 0;
  letter-spacing: -0.01em;
}
.d-desc {
  font-size: 0.9375rem;
  color: var(--ms-color-muted);
  line-height: 1.65;
  margin: 0;
}
.d-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.d-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ms-color-muted);
  background: var(--ms-color-bg);
  border: 1px solid var(--ms-color-border);
  border-radius: 4px;
  padding: 2px 7px;
}
.d-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.d-date {
  font-family: var(--ms-font-condensed);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ms-color-muted);
}
.d-more { font-size: 13px; font-weight: 600; color: var(--ms-color-sky); }
</style>
