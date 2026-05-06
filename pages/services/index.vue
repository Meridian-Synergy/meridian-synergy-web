<script setup lang="ts">
import { MsButton, MsPageHero } from '@meridian-synergy/ui'

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('servicesPage.meta.title'),
  description: () => t('servicesPage.meta.description'),
})
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
    <section class="cta-section">
      <div class="container cta-inner">
        <div class="cta-text">
          <h2 class="cta-title">{{ t('servicesPage.contact.title') }}</h2>
          <p class="cta-desc">{{ t('servicesPage.contact.desc') }}</p>
        </div>
        <MsButton
          :label="t('servicesPage.contact.btn')"
          variant="cta"
          size="lg"
          @click="navigateTo(localePath('/contact'))"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ── Grid ── */
.grid-section {
  padding: 64px 0;
  background: var(--ms-color-white);
}

/* ── CTA ── */
.cta-section {
  background: var(--ms-color-navy);
  padding: 64px 0;
}
.cta-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
}
.cta-text { flex: 1; min-width: 260px; }
.cta-title {
  font-family: var(--ms-font-display);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  color: var(--ms-color-white);
  letter-spacing: -0.02em;
  margin: 0 0 10px;
}
.cta-desc {
  font-size: 1rem;
  color: var(--ms-color-muted);
  margin: 0;
  opacity: 0.8;
}
</style>
