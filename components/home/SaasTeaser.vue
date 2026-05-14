<script setup lang="ts">
import { MsButton, MsBadge } from '@meridian-synergy/ui'

const { t } = useI18n()
</script>

<template>
  <section class="saas">
    <div class="saas-container">
      <div class="saas-content">
        <MsBadge :label="t('saas.badge')" variant="sky" :dot="true" />

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

        <a href="https://app.waypoint360.eu" target="_blank" rel="noopener noreferrer" class="saas-cta">
          <MsButton :label="t('saas.cta')" variant="cta" size="lg" tag="span" />
        </a>
      </div>

      <!-- Browser mockup showing app.waypoint360.eu -->
      <div class="saas-visual" aria-hidden="true">
        <div class="mockup">
          <div class="mockup-chrome">
            <div class="chrome-dots">
              <span class="dot dot--red"></span>
              <span class="dot dot--yellow"></span>
              <span class="dot dot--green"></span>
            </div>
            <div class="chrome-url">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="4" stroke="currentColor" stroke-width="1"/>
                <path d="M2 5h6M5 2a3 3 0 0 1 0 6M5 2a3 3 0 0 0 0 6" stroke="currentColor" stroke-width="0.8"/>
              </svg>
              <span>{{ t('saas.url') }}</span>
            </div>
          </div>

          <div class="mockup-sidebar">
            <div class="sidebar-logo">W360</div>
            <div class="sidebar-nav">
              <div class="sidebar-item sidebar-item--active"></div>
              <div class="sidebar-item"></div>
              <div class="sidebar-item"></div>
              <div class="sidebar-item"></div>
            </div>
          </div>

          <div class="mockup-body">
            <div class="mockup-header">
              <div class="mockup-row mockup-row--title" style="width: 45%;"></div>
              <div class="mockup-chip"></div>
            </div>
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
            <div class="mockup-table">
              <div class="mockup-row mockup-row--thead"></div>
              <div class="mockup-row mockup-row--tr"></div>
              <div class="mockup-row mockup-row--tr"></div>
              <div class="mockup-row mockup-row--tr mockup-row--tr-active"></div>
              <div class="mockup-row mockup-row--tr"></div>
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
.saas-cta { text-decoration: none; display: inline-block; }

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

/* ── Mockup ── */
.saas-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mockup {
  width: 100%;
  max-width: 420px;
  background: #0f1623;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: var(--ms-radius-lg);
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04);
  display: grid;
  grid-template-columns: 52px 1fr;
  grid-template-rows: 36px 1fr;
}

/* Chrome bar — spans full width */
.mockup-chrome {
  grid-column: 1 / -1;
  grid-row: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 12px;
  background: #0a1020;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.chrome-dots {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: 0.7;
}
.dot--red    { background: #f05538; }
.dot--yellow { background: #c9a84c; }
.dot--green  { background: #22c55e; }

.chrome-url {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 4px;
  padding: 3px 8px;
  font-family: var(--ms-font-condensed);
  font-size: 10px;
  color: rgba(255,255,255,0.45);
  letter-spacing: 0.01em;
  overflow: hidden;
  white-space: nowrap;
}
.chrome-url svg {
  flex-shrink: 0;
  color: var(--ms-color-sky);
  opacity: 0.7;
}

/* Sidebar */
.mockup-sidebar {
  grid-column: 1;
  grid-row: 2;
  background: #0c1420;
  border-right: 1px solid rgba(255,255,255,0.06);
  padding: 14px 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.sidebar-logo {
  font-family: var(--ms-font-display);
  font-size: 8px;
  font-weight: 800;
  color: var(--ms-color-sky);
  letter-spacing: 0.05em;
  background: rgba(0, 170, 239, 0.12);
  border-radius: 4px;
  padding: 4px 4px;
  text-align: center;
  width: 34px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.sidebar-item {
  height: 28px;
  border-radius: 4px;
  background: rgba(255,255,255,0.05);
}
.sidebar-item--active {
  background: rgba(0, 170, 239, 0.2);
  border: 1px solid rgba(0, 170, 239, 0.3);
}

/* Body */
.mockup-body {
  grid-column: 2;
  grid-row: 2;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mockup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.mockup-chip {
  width: 40px;
  height: 16px;
  border-radius: 999px;
  background: rgba(0, 170, 239, 0.25);
  border: 1px solid rgba(0, 170, 239, 0.4);
  flex-shrink: 0;
}

.mockup-row {
  border-radius: 3px;
  background: rgba(255,255,255,0.07);
}
.mockup-row--title { height: 14px; }
.mockup-row--thead { height: 10px; width: 100%; opacity: 0.5; }
.mockup-row--tr    { height: 22px; width: 100%; border-radius: 4px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.04); }
.mockup-row--tr-active { background: rgba(0, 170, 239, 0.08); border-color: rgba(0, 170, 239, 0.2); }

.mockup-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.mockup-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: var(--ms-radius-md);
  padding: 10px 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.mc-label { height: 6px; background: rgba(255,255,255,0.12); border-radius: 2px; }
.mc-val   { height: 18px; background: rgba(255,255,255,0.08); border-radius: 3px; }
.mc-val--hi { background: rgba(0, 170, 239, 0.3); }

.mockup-table {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
