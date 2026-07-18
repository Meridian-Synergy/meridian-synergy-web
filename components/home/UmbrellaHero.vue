<script setup lang="ts">
import { MsButton, MsBadge } from '@meridian-synergy/ui'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="hero">
    <div class="hero-container">
      <MsBadge :label="t('homeHero.tag')" variant="sky" :dot="false" />

      <h1 class="hero-title">
        {{ t('homeHero.titleLine1') }}<br>
        <span class="hero-title-accent">{{ t('homeHero.titleLine2') }}</span>
      </h1>

      <p class="hero-desc">{{ t('homeHero.desc') }}</p>

      <div class="hero-actions">
        <MsButton
          :label="t('homeHero.ctaPrimary')"
          variant="cta"
          size="lg"
          @click="navigateTo(localePath('/conseil'))"
        />
        <MsButton
          :label="t('homeHero.ctaSecondary')"
          variant="secondary"
          size="lg"
          @click="navigateTo(localePath('/drones'))"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 96px 24px 88px;
  background: var(--ms-color-bg);
  border-bottom: 1px solid var(--ms-color-border);
  overflow: hidden;
  position: relative;
}

.hero-container {
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
  position: relative;
}

.hero-title {
  font-family: var(--ms-font-display);
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  font-weight: 800;
  line-height: 1.06;
  letter-spacing: -0.035em;
  color: var(--ms-color-navy);
  margin: 0;
}
.hero-title-accent { color: var(--ms-color-sky); }

.hero-desc {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--ms-color-muted);
  max-width: 620px;
  margin: 0;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-top: 8px;
}
</style>
