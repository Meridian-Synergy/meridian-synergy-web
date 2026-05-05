<script setup lang="ts">
import { MsButton, MsBadge, MsCard } from '@meridian-synergy/ui'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="hero">
    <div class="hero-container">
      <!-- Content -->
      <div class="hero-content">
        <MsBadge :label="t('hero.tag')" variant="sky" :dot="false" />

        <h1 class="hero-title">
          {{ t('hero.titleLine1') }}<br>
          <span class="hero-title-accent">{{ t('hero.titleLine2') }}</span>
        </h1>

        <p class="hero-desc">{{ t('hero.desc') }}</p>

        <div class="hero-actions">
          <MsButton
            :label="t('hero.ctaPrimary')"
            variant="cta"
            size="lg"
            @click="navigateTo(localePath('/services'))"
          />
          <MsButton
            :label="t('hero.ctaSecondary')"
            variant="secondary"
            size="lg"
            @click="navigateTo(localePath('/a-propos'))"
          />
        </div>
      </div>

      <!-- Dashboard mockup -->
      <div class="hero-visual" aria-hidden="true">
        <MsCard :title="t('hero.dashTitle')" :dark="true">
          <template #badge>
            <MsBadge :label="t('hero.dashLive')" variant="active" />
          </template>

          <div class="dash-stats">
            <div class="dash-stat">
              <span class="dash-val">24</span>
              <span class="dash-label">{{ t('hero.dashMissions') }}</span>
            </div>
            <div class="dash-stat">
              <span class="dash-val">98%</span>
              <span class="dash-label">{{ t('hero.dashCompliance') }}</span>
            </div>
            <div class="dash-stat">
              <span class="dash-val">3</span>
              <span class="dash-label">{{ t('hero.dashDrones') }}</span>
            </div>
          </div>

          <div class="dash-chart">
            <div class="dash-bar" style="height:42%"></div>
            <div class="dash-bar" style="height:65%"></div>
            <div class="dash-bar" style="height:52%"></div>
            <div class="dash-bar" style="height:78%"></div>
            <div class="dash-bar" style="height:68%"></div>
            <div class="dash-bar" style="height:88%"></div>
            <div class="dash-bar dash-bar--hi" style="height:74%"></div>
          </div>

          <template #footer>
            <MsBadge :label="t('hero.dashBadge')" variant="navy" :dot="false" />
          </template>
        </MsCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 80px 24px 96px;
  background: linear-gradient(160deg, var(--ms-color-white) 55%, #EEF5FB 100%);
  overflow: hidden;
  position: relative;
}
.hero::before {
  content: '';
  position: absolute;
  top: -120px;
  right: -80px;
  width: 560px;
  height: 560px;
  background: radial-gradient(circle, rgba(0, 170, 239, 0.07) 0%, transparent 70%);
  pointer-events: none;
}

.hero-container {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;
}
@media (min-width: 1024px) {
  .hero-container { grid-template-columns: 1fr 1fr; gap: 64px; }
}

/* ── Content ── */
.hero-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-title {
  font-family: var(--ms-font-display);
  font-size: clamp(2.125rem, 4.5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.035em;
  color: var(--ms-color-navy);
  margin: 0;
}
.hero-title-accent {
  color: var(--ms-color-sky);
}

.hero-desc {
  font-size: 1.0625rem;
  line-height: 1.72;
  color: var(--ms-color-muted);
  max-width: 500px;
  margin: 0;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* ── Dashboard card ── */
.hero-visual {
  display: flex;
  justify-content: center;
}
.hero-visual :deep(.ms-card) {
  width: 100%;
  max-width: 380px;
}

.dash-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 8px 0 20px;
}
.dash-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
}
.dash-val {
  font-family: var(--ms-font-display);
  font-size: 2rem;
  font-weight: 800;
  color: var(--ms-color-white);
  letter-spacing: -0.04em;
  line-height: 1;
}
.dash-label {
  font-size: 11px;
  color: rgba(255,255,255,0.45);
  font-family: var(--ms-font-condensed);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1.3;
}

.dash-chart {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 72px;
  padding: 0 0 4px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  margin-bottom: 4px;
}
.dash-bar {
  flex: 1;
  border-radius: 3px 3px 0 0;
  background: rgba(0, 170, 239, 0.25);
  transition: background var(--ms-transition-base);
}
.dash-bar--hi { background: var(--ms-color-sky); }
</style>
