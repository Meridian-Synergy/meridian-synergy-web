<script setup lang="ts">
import { MsPageHero, MsCtaBanner } from '@meridian-synergy/ui'

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('servicesPage.meta.title'),
  description: () => t('servicesPage.meta.description'),
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: t('breadcrumb.home'), item: 'https://meridian-synergy.com' },
      { name: t('nav.services') },
    ],
  }),
])
</script>

<template>
  <div>
    <MsPageHero
      :crumbs="[{ label: t('breadcrumb.home'), href: localePath('/') }, { label: t('nav.services') }]"
      :badge="t('servicesPage.hero.badge')"
      :title="t('servicesPage.hero.title')"
      :desc="t('servicesPage.hero.desc')"
    />

    <!-- Services grid -->
    <section class="grid-section">
      <div class="container">
        <ServicesGrid />
      </div>
    </section>

    <!-- Contact CTA -->
    <MsCtaBanner
      :title="t('servicesPage.contact.title')"
      :desc="t('servicesPage.contact.desc')"
      :label="t('servicesPage.contact.btn')"
      :href="localePath('/contact')"
    />
  </div>
</template>

<style scoped>
/* ── Grid ── */
.grid-section {
  padding: 64px 0;
  background: var(--ms-color-white);
}

</style>
