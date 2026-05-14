<script setup lang="ts">
import { MsPageHero } from '@meridian-synergy/ui'

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('cgvPage.meta.title'),
  description: () => t('cgvPage.meta.description'),
})
</script>

<template>
  <div>
    <MsPageHero
      :crumbs="[{ label: t('breadcrumb.home'), href: localePath('/') }, { label: t('nav.termsSale') }]"
      :title="t('cgvPage.title')"
      size="md"
    />

    <section class="content-section">
      <div class="container">
        <div class="legal-body">

          <div class="legal-block">
            <h2>1. {{ t('cgvPage.s1.title') }}</h2>
            <p>{{ t('cgvPage.s1.p1') }}</p>
            <p>{{ t('cgvPage.s1.p2') }}</p>
          </div>

          <div class="legal-block">
            <h2>2. {{ t('cgvPage.s2.title') }}</h2>
            <p>{{ t('cgvPage.s2.p1') }}</p>
            <ul>
              <li>{{ t('cgvPage.s2.item1') }}</li>
              <li>{{ t('cgvPage.s2.item2') }}</li>
            </ul>
            <p>{{ t('cgvPage.s2.p2') }}</p>
          </div>

          <div class="legal-block">
            <h2>3. {{ t('cgvPage.s3.title') }}</h2>
            <p>{{ t('cgvPage.s3.p1') }}</p>
            <p>{{ t('cgvPage.s3.p2') }}</p>
          </div>

          <div class="legal-block">
            <h2>4. {{ t('cgvPage.s4.title') }}</h2>
            <p>{{ t('cgvPage.s4.p1') }}</p>
            <p>{{ t('cgvPage.s4.p2') }}</p>
          </div>

          <div class="legal-block">
            <h2>5. {{ t('cgvPage.s5.title') }}</h2>
            <p>{{ t('cgvPage.s5.p1') }}</p>
            <p>{{ t('cgvPage.s5.p2') }}</p>
          </div>

          <div class="legal-block">
            <h2>6. {{ t('cgvPage.s6.title') }}</h2>
            <p>{{ t('cgvPage.s6.p1') }}</p>
          </div>

          <div class="legal-block">
            <h2>7. {{ t('cgvPage.s7.title') }}</h2>
            <p>{{ t('cgvPage.s7.p1') }}</p>
            <p>{{ t('cgvPage.s7.p2') }}</p>
          </div>

          <div class="legal-block">
            <h2>8. {{ t('cgvPage.s8.title') }}</h2>
            <p>{{ t('cgvPage.s8.p1') }}</p>
            <p>{{ t('cgvPage.s8.p2') }}</p>
          </div>

          <div class="legal-block">
            <h2>9. {{ t('cgvPage.s9.title') }}</h2>
            <p>{{ t('cgvPage.s9.p1') }}</p>
            <p>{{ t('cgvPage.s9.p2') }}</p>
          </div>

          <div class="legal-block">
            <h2>10. {{ t('cgvPage.s10.title') }}</h2>
            <p>
              {{ t('cgvPage.s10.p1') }}
              <a href="mailto:billing@meridian-synergy.com">billing@meridian-synergy.com</a>.
            </p>
          </div>

          <p class="legal-date">{{ t('cgvPage.updatedAt') }}</p>

        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ── Content ── */
.content-section { padding: 64px 0 80px; background: var(--ms-color-white); }

.container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
}

.legal-body {
  max-width: 760px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.legal-block h2 {
  font-family: var(--ms-font-display);
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--ms-color-navy);
  letter-spacing: -0.01em;
  margin: 0 0 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--ms-color-border);
}

.legal-block p {
  font-size: 0.9375rem;
  color: var(--ms-color-muted);
  line-height: 1.75;
  margin: 0 0 12px;
}
.legal-block p:last-child { margin-bottom: 0; }

.legal-block ul {
  list-style: none;
  padding: 0;
  margin: 0 0 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.legal-block li {
  font-size: 0.9375rem;
  color: var(--ms-color-muted);
  line-height: 1.6;
  padding-left: 16px;
  position: relative;
}
.legal-block li::before {
  content: '–';
  position: absolute;
  left: 0;
  color: var(--ms-color-border);
}

.legal-block a {
  color: var(--ms-color-sky);
  text-decoration: none;
}
.legal-block a:hover { text-decoration: underline; }

.legal-date {
  font-size: 0.8125rem;
  color: var(--ms-color-muted);
  opacity: 0.6;
  margin: 0;
}
</style>
