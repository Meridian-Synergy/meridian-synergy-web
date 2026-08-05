<script setup lang="ts">
import { MsButton, MsBadge } from '@meridian-synergy/ui'

const { t } = useI18n()
const localePath = useLocalePath()
// CTAs render as real links (MsButton `as`), so they carry an href.
const NuxtLink = resolveComponent('NuxtLink')
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
            :as="NuxtLink"
            :to="localePath('/services')"
            :label="t('hero.ctaPrimary')"
            variant="cta"
            size="lg"
          />
          <MsButton
            :as="NuxtLink"
            :to="localePath('/a-propos')"
            :label="t('hero.ctaSecondary')"
            variant="secondary"
            size="lg"
          />
        </div>
      </div>

      <!-- Proof points -->
      <div class="hero-visual" aria-hidden="true">
        <div class="proof-card">
          <!-- DGAC -->
          <div class="proof-item">
            <div class="proof-icon proof-icon--navy">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2L4 6v6c0 5.25 3.5 9.74 8 11 4.5-1.26 8-5.75 8-11V6L12 2z" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
                <path d="M8.5 12l2.5 2.5 5-5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="proof-text">
              <strong>{{ t('hero.proof1Title') }}</strong>
              <span>{{ t('hero.proof1Desc') }}</span>
            </div>
          </div>

          <div class="proof-divider" />

          <!-- 6 domaines -->
          <div class="proof-item">
            <div class="proof-icon proof-icon--sky">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.75"/>
                <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.75"/>
                <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.75"/>
                <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.75"/>
              </svg>
            </div>
            <div class="proof-text">
              <strong>{{ t('hero.proof2Title') }}</strong>
              <span>{{ t('hero.proof2Desc') }}</span>
            </div>
          </div>

          <div class="proof-divider" />

          <!-- Géographie -->
          <div class="proof-item">
            <div class="proof-icon proof-icon--gold">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C8.69 2 6 4.69 6 8c0 4.5 6 13 6 13s6-8.5 6-13c0-3.31-2.69-6-6-6z" stroke="currentColor" stroke-width="1.75"/>
                <circle cx="12" cy="8" r="2" stroke="currentColor" stroke-width="1.75"/>
              </svg>
            </div>
            <div class="proof-text">
              <strong>{{ t('hero.proof3Title') }}</strong>
              <span>{{ t('hero.proof3Desc') }}</span>
            </div>
          </div>
        </div>
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

/* ── Proof card ── */
.hero-visual {
  display: flex;
  justify-content: center;
}

.proof-card {
  width: 100%;
  max-width: 400px;
  background: var(--ms-color-white);
  border: 1px solid var(--ms-color-border);
  border-radius: var(--ms-radius-xl);
  padding: 8px 0;
  box-shadow: var(--ms-shadow-md);
}

.proof-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 24px;
}

.proof-divider {
  height: 1px;
  background: var(--ms-color-border);
  margin: 0 24px;
}

.proof-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--ms-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.proof-icon svg { width: 22px; height: 22px; }

.proof-icon--navy {
  background: color-mix(in srgb, var(--ms-color-navy) 10%, transparent);
  color: var(--ms-color-navy);
}
.proof-icon--sky {
  background: color-mix(in srgb, var(--ms-color-sky) 12%, transparent);
  color: var(--ms-color-sky);
}
.proof-icon--gold {
  background: color-mix(in srgb, var(--ms-color-gold) 12%, transparent);
  color: var(--ms-color-gold);
}

.proof-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.proof-text strong {
  font-family: var(--ms-font-display);
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--ms-color-navy);
  line-height: 1.2;
}
.proof-text span {
  font-size: 0.8125rem;
  color: var(--ms-color-muted);
  line-height: 1.5;
}
</style>
