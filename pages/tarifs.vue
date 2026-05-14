<script setup lang="ts">
import { MsBadge, MsButton, MsPageHero } from '@meridian-synergy/ui'

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('tarifsPage.meta.title'),
  description: () => t('tarifsPage.meta.description'),
})
</script>

<template>
  <div>
    <MsPageHero
      :crumbs="[{ label: t('breadcrumb.home'), href: localePath('/') }, { label: t('nav.pricing') }]"
      :badge="t('tarifsPage.hero.badge')"
      :title="t('tarifsPage.hero.title')"
      :desc="t('tarifsPage.hero.desc')"
      size="md"
    />

    <!-- Trial badge -->
    <section class="trial-section">
      <div class="container">
        <div class="trial-banner">
          <MsBadge :label="t('tarifsPage.trial.badge')" variant="sky" size="lg" />
          <p class="trial-desc">{{ t('tarifsPage.trial.desc') }}</p>
        </div>
      </div>
    </section>

    <!-- Pricing cards -->
    <section class="pricing-section">
      <div class="container">
        <div class="pricing-grid">

          <!-- Essentiel -->
          <div class="pricing-card">
            <div class="pricing-card-header">
              <h2 class="plan-name">{{ t('tarifsPage.plans.essential.name') }}</h2>
              <p class="plan-desc">{{ t('tarifsPage.plans.essential.desc') }}</p>
            </div>
            <div class="pricing-card-price">
              <span class="price-amount">10 €</span>
              <span class="price-period">{{ t('tarifsPage.plans.perMonth') }}</span>
            </div>
            <p class="price-note">{{ t('tarifsPage.plans.essential.note') }}</p>
            <ul class="plan-features">
              <li v-for="feat in ['f1', 'f2', 'f3', 'f4']" :key="feat" class="plan-feature">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ t(`tarifsPage.plans.essential.${feat}`) }}
              </li>
            </ul>
          </div>

          <!-- Par siège -->
          <div class="pricing-card pricing-card--featured">
            <div class="pricing-card-header">
              <h2 class="plan-name">{{ t('tarifsPage.plans.perSeat.name') }}</h2>
              <p class="plan-desc">{{ t('tarifsPage.plans.perSeat.desc') }}</p>
            </div>
            <div class="pricing-card-price">
              <span class="price-amount">5 €</span>
              <span class="price-period">{{ t('tarifsPage.plans.perSeatPeriod') }}</span>
            </div>
            <p class="price-note">{{ t('tarifsPage.plans.perSeat.note') }}</p>
            <ul class="plan-features">
              <li v-for="feat in ['f1', 'f2', 'f3', 'f4']" :key="feat" class="plan-feature">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ t(`tarifsPage.plans.perSeat.${feat}`) }}
              </li>
            </ul>
          </div>

        </div>

        <!-- Total illustratif -->
        <div class="total-example">
          <h3 class="total-title">{{ t('tarifsPage.example.title') }}</h3>
          <div class="total-calc">
            <div class="calc-row">
              <span class="calc-label">{{ t('tarifsPage.example.base') }}</span>
              <span class="calc-value">10 €</span>
            </div>
            <div class="calc-row">
              <span class="calc-label">{{ t('tarifsPage.example.seats') }}</span>
              <span class="calc-value">15 €</span>
            </div>
            <div class="calc-row calc-row--total">
              <span class="calc-label">{{ t('tarifsPage.example.total') }}</span>
              <span class="calc-value">25 €<span class="calc-month">{{ t('tarifsPage.example.month') }}</span></span>
            </div>
          </div>
          <p class="total-note">{{ t('tarifsPage.example.note') }}</p>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="faq-section">
      <div class="container">
        <h2 class="section-title">{{ t('tarifsPage.faq.title') }}</h2>
        <div class="faq-list">
          <details v-for="q in ['q1', 'q2', 'q3', 'q4']" :key="q" class="faq-item">
            <summary class="faq-question">{{ t(`tarifsPage.faq.${q}.q`) }}</summary>
            <p class="faq-answer">{{ t(`tarifsPage.faq.${q}.a`) }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- CTA final -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-block">
          <h2 class="cta-title">{{ t('tarifsPage.cta.title') }}</h2>
          <p class="cta-desc">{{ t('tarifsPage.cta.desc') }}</p>
          <MsButton
            tag="a"
            href="https://app.meridian-synergy.com/auth/signup"
            target="_blank"
            rel="noopener noreferrer"
            :label="t('tarifsPage.cta.btn')"
            variant="primary"
            size="lg"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ── Container ── */
.container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ── Section title ── */
.section-title {
  font-family: var(--ms-font-display);
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 800;
  color: var(--ms-color-navy);
  letter-spacing: -0.02em;
  margin: 0 0 32px;
}

/* ── Trial banner ── */
.trial-section {
  padding: 40px 0 0;
  background: var(--ms-color-white);
}
.trial-banner {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 20px 24px;
  background: color-mix(in srgb, var(--ms-color-sky) 8%, white);
  border: 1px solid color-mix(in srgb, var(--ms-color-sky) 25%, white);
  border-radius: var(--ms-radius-lg);
}
.trial-desc {
  font-size: 0.9375rem;
  color: var(--ms-color-navy);
  font-weight: 500;
  margin: 0;
}

/* ── Pricing grid ── */
.pricing-section {
  padding: 48px 0 64px;
  background: var(--ms-color-white);
}
.pricing-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 48px;
}
@media (min-width: 768px) {
  .pricing-grid { grid-template-columns: repeat(2, 1fr); }
}

.pricing-card {
  border: 1.5px solid var(--ms-color-border);
  border-radius: var(--ms-radius-xl);
  padding: 32px;
  background: var(--ms-color-white);
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.pricing-card--featured {
  border-color: var(--ms-color-sky);
  background: color-mix(in srgb, var(--ms-color-sky) 4%, white);
  box-shadow: 0 4px 24px color-mix(in srgb, var(--ms-color-sky) 12%, transparent);
}

.pricing-card-header { display: flex; flex-direction: column; gap: 6px; }

.plan-name {
  font-family: var(--ms-font-display);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--ms-color-navy);
  letter-spacing: -0.02em;
  margin: 0;
}
.plan-desc {
  font-size: 0.875rem;
  color: var(--ms-color-muted);
  margin: 0;
  line-height: 1.55;
}

.pricing-card-price {
  display: flex;
  align-items: baseline;
  gap: 6px;
}
.price-amount {
  font-family: var(--ms-font-display);
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--ms-color-navy);
  letter-spacing: -0.04em;
  line-height: 1;
}
.price-period {
  font-size: 0.875rem;
  color: var(--ms-color-muted);
}
.price-note {
  font-size: 0.8125rem;
  color: var(--ms-color-muted);
  margin: -8px 0 0;
  opacity: 0.75;
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px solid var(--ms-color-border);
  padding-top: 20px;
}
.plan-feature {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--ms-color-navy);
  line-height: 1.5;
}
.plan-feature svg {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--ms-color-sky);
}

/* ── Total example ── */
.total-example {
  border: 1.5px solid var(--ms-color-border);
  border-radius: var(--ms-radius-xl);
  padding: 32px;
  max-width: 560px;
}
.total-title {
  font-family: var(--ms-font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--ms-color-navy);
  letter-spacing: -0.01em;
  margin: 0 0 20px;
}
.total-calc {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}
.calc-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9375rem;
  color: var(--ms-color-muted);
}
.calc-row--total {
  border-top: 1px solid var(--ms-color-border);
  padding-top: 10px;
  font-weight: 700;
  color: var(--ms-color-navy);
}
.calc-value { font-family: var(--ms-font-condensed); font-weight: 600; letter-spacing: 0.02em; }
.calc-month { font-size: 0.8125rem; font-weight: 400; margin-left: 4px; }
.total-note {
  font-size: 0.8125rem;
  color: var(--ms-color-muted);
  margin: 0;
  opacity: 0.7;
}

/* ── FAQ ── */
.faq-section {
  padding: 64px 0;
  background: var(--ms-color-bg);
}
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 760px;
}
.faq-item {
  background: var(--ms-color-white);
  border: 1px solid var(--ms-color-border);
  border-radius: var(--ms-radius-lg);
  overflow: hidden;
}
.faq-question {
  padding: 18px 24px;
  font-family: var(--ms-font-body);
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--ms-color-navy);
  cursor: pointer;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  user-select: none;
}
.faq-question::-webkit-details-marker { display: none; }
.faq-question::after {
  content: '+';
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--ms-color-sky);
  flex-shrink: 0;
  transition: transform 0.2s ease;
}
details[open] .faq-question::after {
  content: '−';
}
.faq-answer {
  padding: 0 24px 18px;
  font-size: 0.9375rem;
  color: var(--ms-color-muted);
  line-height: 1.75;
  margin: 0;
}

/* ── CTA ── */
.cta-section {
  padding: 64px 0 80px;
  background: var(--ms-color-white);
}
.cta-block {
  max-width: 640px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}
.cta-title {
  font-family: var(--ms-font-display);
  font-size: clamp(1.375rem, 2.5vw, 1.875rem);
  font-weight: 800;
  color: var(--ms-color-navy);
  letter-spacing: -0.03em;
  margin: 0;
}
.cta-desc {
  font-size: 1rem;
  color: var(--ms-color-muted);
  line-height: 1.65;
  margin: 0;
}
</style>
