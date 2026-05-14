<script setup lang="ts">
import { MsButton, MsBadge } from '@meridian-synergy/ui'

const { t } = useI18n()
</script>

<template>
  <section class="marketplace">
    <div class="marketplace-container">

      <!-- Profile card mockup -->
      <div class="marketplace-visual" aria-hidden="true">
        <div class="mp-card">
          <div class="mp-card-header">
            <div class="mp-avatar">MS</div>
            <div class="mp-id">
              <span class="mp-name">Meridian Synergy</span>
              <span class="mp-location">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M5.5 1C3.567 1 2 2.567 2 4.5c0 2.625 3.5 5.5 3.5 5.5S9 7.125 9 4.5C9 2.567 7.433 1 5.5 1z" stroke="currentColor" stroke-width="1" fill="none"/>
                  <circle cx="5.5" cy="4.5" r="1.25" stroke="currentColor" stroke-width="1"/>
                </svg>
                Nièvre (58) · Bourgogne
              </span>
            </div>
            <div class="mp-badge-verified">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Vérifié
            </div>
          </div>

          <div class="mp-tags">
            <span class="mp-tag">Inspection thermique</span>
            <span class="mp-tag">Topographie</span>
            <span class="mp-tag">Agriculture</span>
            <span class="mp-tag mp-tag--more">+3</span>
          </div>

          <div class="mp-certs">
            <span class="mp-cert">A1 / A3</span>
            <span class="mp-cert">Spécifique DGAC</span>
            <span class="mp-cert">Certiphyto</span>
          </div>

          <div class="mp-card-footer">
            <div class="mp-stat">
              <span class="mp-stat-val">Nièvre · Saône-et-Loire · Yonne</span>
              <span class="mp-stat-label">Zone d'intervention</span>
            </div>
            <div class="mp-cta-pill">Contacter</div>
          </div>
        </div>

        <!-- Floating search bar -->
        <div class="mp-search">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="5" cy="5" r="3.5" stroke="currentColor" stroke-width="1.25"/>
            <path d="M8 8l2.5 2.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>
          </svg>
          <span>Inspection thermique · <strong>Côte-d'Or</strong></span>
          <div class="mp-search-results">3 experts trouvés</div>
        </div>
      </div>

      <!-- Content -->
      <div class="marketplace-content">
        <MsBadge :label="t('marketplace.badge')" variant="sky" :dot="false" />

        <h2 class="marketplace-title">{{ t('marketplace.title') }}</h2>
        <p class="marketplace-desc">{{ t('marketplace.desc') }}</p>

        <ul class="marketplace-features">
          <li class="marketplace-feature">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 9l4 4 8-8" stroke="var(--ms-color-sky)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ t('marketplace.feature1') }}
          </li>
          <li class="marketplace-feature">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 9l4 4 8-8" stroke="var(--ms-color-sky)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ t('marketplace.feature2') }}
          </li>
          <li class="marketplace-feature">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 9l4 4 8-8" stroke="var(--ms-color-sky)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ t('marketplace.feature3') }}
          </li>
        </ul>

        <a href="https://waypoint360.eu" target="_blank" rel="noopener noreferrer" class="marketplace-cta">
          <MsButton :label="t('marketplace.cta')" variant="primary" size="lg" tag="span" />
        </a>
      </div>

    </div>
  </section>
</template>

<style scoped>
.marketplace {
  background: var(--ms-color-bg);
  padding: 80px 24px;
  overflow: hidden;
}

.marketplace-container {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 56px;
  align-items: center;
}
@media (min-width: 1024px) {
  .marketplace-container {
    grid-template-columns: 1fr 1fr;
    gap: 80px;
  }
}

/* ── Profile card ── */
.marketplace-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: relative;
}

.mp-card {
  width: 100%;
  max-width: 400px;
  background: var(--ms-color-white);
  border: 1.5px solid var(--ms-color-border);
  border-radius: var(--ms-radius-xl);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.06);
}

.mp-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mp-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--ms-color-sky) 12%, white);
  border: 1.5px solid color-mix(in srgb, var(--ms-color-sky) 30%, white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--ms-font-display);
  font-size: 13px;
  font-weight: 800;
  color: var(--ms-color-sky);
  letter-spacing: 0.02em;
  flex-shrink: 0;
}

.mp-id {
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
  min-width: 0;
}

.mp-name {
  font-family: var(--ms-font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--ms-color-navy);
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mp-location {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: var(--ms-color-muted);
}

.mp-badge-verified {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: color-mix(in srgb, #22c55e 10%, white);
  border: 1px solid color-mix(in srgb, #22c55e 30%, white);
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 600;
  color: #16a34a;
  white-space: nowrap;
  flex-shrink: 0;
}

.mp-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.mp-tag {
  padding: 4px 10px;
  background: var(--ms-color-bg);
  border: 1px solid var(--ms-color-border);
  border-radius: var(--ms-radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--ms-color-navy);
}
.mp-tag--more {
  background: transparent;
  border-color: transparent;
  color: var(--ms-color-muted);
}

.mp-certs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.mp-cert {
  padding: 3px 8px;
  background: color-mix(in srgb, var(--ms-color-sky) 8%, white);
  border: 1px solid color-mix(in srgb, var(--ms-color-sky) 25%, white);
  border-radius: var(--ms-radius-sm);
  font-family: var(--ms-font-condensed);
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--ms-color-sky);
  letter-spacing: 0.04em;
}

.mp-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 14px;
  border-top: 1px solid var(--ms-color-border);
}

.mp-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.mp-stat-val {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--ms-color-navy);
}
.mp-stat-label {
  font-size: 0.6875rem;
  color: var(--ms-color-muted);
}

.mp-cta-pill {
  padding: 7px 16px;
  background: var(--ms-color-sky);
  color: white;
  border-radius: var(--ms-radius-md);
  font-size: 0.8125rem;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
}

/* Floating search bar */
.mp-search {
  width: 100%;
  max-width: 400px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--ms-color-white);
  border: 1.5px solid var(--ms-color-border);
  border-radius: var(--ms-radius-lg);
  padding: 10px 14px;
  font-size: 0.8125rem;
  color: var(--ms-color-muted);
  box-shadow: 0 4px 16px rgba(0,0,0,0.05);
}
.mp-search svg { flex-shrink: 0; color: var(--ms-color-sky); }
.mp-search span { flex: 1; }
.mp-search strong { color: var(--ms-color-navy); font-weight: 600; }
.mp-search-results {
  padding: 3px 8px;
  background: color-mix(in srgb, var(--ms-color-sky) 10%, white);
  border: 1px solid color-mix(in srgb, var(--ms-color-sky) 25%, white);
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--ms-color-sky);
  white-space: nowrap;
  flex-shrink: 0;
}

/* ── Content ── */
.marketplace-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.marketplace-title {
  font-family: var(--ms-font-display);
  font-size: clamp(1.75rem, 3.5vw, 2.75rem);
  font-weight: 800;
  color: var(--ms-color-navy);
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0;
}

.marketplace-desc {
  font-size: 1.0625rem;
  line-height: 1.7;
  color: var(--ms-color-muted);
  max-width: 480px;
  margin: 0;
}

.marketplace-features {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.marketplace-feature {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--ms-color-navy);
}

.marketplace-cta { text-decoration: none; display: inline-block; }
</style>
