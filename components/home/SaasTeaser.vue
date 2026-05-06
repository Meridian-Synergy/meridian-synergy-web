<script setup lang="ts">
import { MsButton, MsBadge } from '@meridian-synergy/ui'

const { t } = useI18n()
</script>

<template>
  <section class="saas">
    <div class="saas-container">
      <div class="saas-content">
        <MsBadge :label="t('saas.badge')" variant="sky" :dot="false" />

        <h2 class="saas-title">{{ t('saas.title') }}</h2>
        <p class="saas-desc">{{ t('saas.desc') }}</p>

        <ul class="saas-features">
          <li class="saas-feature">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 9l4 4 8-8" stroke="var(--ms-color-sky)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ t('saas.feature1') }}
          </li>
          <li class="saas-feature">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 9l4 4 8-8" stroke="var(--ms-color-sky)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ t('saas.feature2') }}
          </li>
          <li class="saas-feature">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 9l4 4 8-8" stroke="var(--ms-color-sky)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ t('saas.feature3') }}
          </li>
        </ul>

        <a href="mailto:contact@meridian-synergy.com?subject=Notification%20plateforme%20t%C3%A9l%C3%A9pilote" class="saas-mailto">
          <MsButton :label="t('saas.cta')" variant="cta" size="lg" tag="span" />
        </a>
      </div>

      <!-- Abstract mockup visual -->
      <div class="saas-visual" aria-hidden="true">
        <div class="mockup">
          <div class="mockup-bar">
            <span></span><span></span><span></span>
          </div>
          <div class="mockup-body">
            <div class="mockup-row mockup-row--title"></div>
            <div class="mockup-row mockup-row--text w-3/4"></div>
            <div class="mockup-row mockup-row--text w-5/6"></div>
            <div class="mockup-cards">
              <div class="mockup-card">
                <div class="mc-label"></div>
                <div class="mc-val"></div>
              </div>
              <div class="mockup-card">
                <div class="mc-label"></div>
                <div class="mc-val mc-val--hi"></div>
              </div>
              <div class="mockup-card">
                <div class="mc-label"></div>
                <div class="mc-val"></div>
              </div>
            </div>
            <div class="mockup-row mockup-row--bar full">
              <div class="mockup-progress"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.saas {
  background: var(--ms-color-navy);
  padding: 80px 24px;
  overflow: hidden;
  position: relative;
}
.saas::before {
  content: '';
  position: absolute;
  bottom: -100px;
  left: -80px;
  width: 480px;
  height: 480px;
  background: radial-gradient(circle, rgba(0, 170, 239, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.saas-container {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 56px;
  align-items: center;
}
@media (min-width: 1024px) {
  .saas-container { grid-template-columns: 1fr 1fr; gap: 80px; }
}

/* ── Content ── */
.saas-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.saas-mailto { text-decoration: none; display: inline-block; }

.saas-title {
  font-family: var(--ms-font-display);
  font-size: clamp(1.75rem, 3.5vw, 2.75rem);
  font-weight: 800;
  color: var(--ms-color-white);
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0;
}

.saas-desc {
  font-size: 1.0625rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.6);
  max-width: 480px;
  margin: 0;
}

.saas-features {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.saas-feature {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9375rem;
  font-weight: 500;
  color: rgba(255,255,255,0.85);
}

/* ── Mockup visual ── */
.saas-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mockup {
  width: 100%;
  max-width: 400px;
  background: var(--ms-color-dark-bg2);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--ms-radius-lg);
  overflow: hidden;
  box-shadow: var(--ms-shadow-lg);
}

.mockup-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.mockup-bar span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
}
.mockup-bar span:first-child { background: rgba(240, 90, 40, 0.5); }
.mockup-bar span:nth-child(2) { background: rgba(201, 168, 76, 0.5); }
.mockup-bar span:nth-child(3) { background: rgba(34, 197, 94, 0.5); }

.mockup-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mockup-row {
  border-radius: var(--ms-radius-sm);
  background: rgba(255,255,255,0.07);
}
.mockup-row--title { height: 20px; width: 55%; }
.mockup-row--text  { height: 12px; }
.mockup-row--bar   { height: 8px; overflow: hidden; }

.mockup-progress {
  height: 100%;
  width: 68%;
  background: var(--ms-color-sky);
  border-radius: var(--ms-radius-sm);
}

.mockup-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 8px 0;
}
.mockup-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: var(--ms-radius-md);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.mc-label { height: 8px; background: rgba(255,255,255,0.12); border-radius: 2px; }
.mc-val   { height: 20px; background: rgba(255,255,255,0.1); border-radius: 3px; }
.mc-val--hi { background: rgba(0, 170, 239, 0.35); }
</style>
