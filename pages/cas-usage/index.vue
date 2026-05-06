<script setup lang="ts">
import { MsCard, MsBadge, MsPageHero, MsCtaBanner } from '@meridian-synergy/ui'

const { t, locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('useCasesPage.meta.title'),
  description: () => t('useCasesPage.meta.description'),
})

const useCases = [
  {
    key: 'couverts',
    category: 'agriculture',
    slugs: { fr: 'couverts-vegetaux', en: 'cover-crops' },
  },
]

const items = computed(() =>
  useCases.map(uc => ({
    ...uc,
    slug: uc.slugs[locale.value as 'fr' | 'en'] ?? uc.slugs.fr,
    title: t(`useCases.${uc.key}.title`),
    desc:  t(`useCases.${uc.key}.desc`),
    categoryLabel: t(`useCasesPage.categories.${uc.category}`),
  }))
)
</script>

<template>
  <div>
    <MsPageHero
      :crumbs="[{ label: t('breadcrumb.home'), href: localePath('/') }, { label: t('nav.useCases') }]"
      :badge="t('useCasesPage.hero.badge')"
      :title="t('useCasesPage.hero.title')"
      :desc="t('useCasesPage.hero.desc')"
    />

    <section class="grid-section">
      <div class="container">
        <div class="use-cases-grid">
          <NuxtLink
            v-for="item in items"
            :key="item.key"
            :to="localePath(`/cas-usage/${item.slug}`)"
            class="card-link"
          >
            <MsCard>
              <div class="uc-body">
                <MsBadge :label="item.categoryLabel" variant="sky" :dot="false" />
                <h2 class="uc-title">{{ item.title }}</h2>
                <p class="uc-desc">{{ item.desc }}</p>
              </div>
              <template #footer>
                <span class="uc-more">{{ t('services.more') }} →</span>
              </template>
            </MsCard>
          </NuxtLink>
        </div>
      </div>
    </section>

    <MsCtaBanner
      :title="t('useCasesPage.contact.title')"
      :desc="t('useCasesPage.contact.desc')"
      :label="t('useCasesPage.contact.btn')"
      :href="localePath('/contact')"
    />
  </div>
</template>

<style scoped>
.grid-section {
  padding: 64px 0;
  background: var(--ms-color-white);
}

.use-cases-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
@media (min-width: 640px)  { .use-cases-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .use-cases-grid { grid-template-columns: repeat(3, 1fr); } }

.card-link {
  display: block;
  text-decoration: none;
  border-radius: var(--ms-radius-lg);
  transition: transform var(--ms-transition-base), box-shadow var(--ms-transition-base);
}
.card-link:hover { transform: translateY(-3px); box-shadow: var(--ms-shadow-md); }
.card-link:hover :deep(.ms-card) { border-color: var(--ms-color-sky); }

.uc-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 4px 0;
}
.uc-title {
  font-family: var(--ms-font-display);
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--ms-color-navy);
  margin: 0;
}
.uc-desc {
  font-size: 0.9375rem;
  color: var(--ms-color-muted);
  line-height: 1.65;
  margin: 0;
}
.uc-more {
  font-size: 13px;
  font-weight: 600;
  color: var(--ms-color-sky);
}
</style>
