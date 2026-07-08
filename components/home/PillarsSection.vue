<script setup lang="ts">
import { MsCard } from '@meridian-synergy/ui'

const { t } = useI18n()
const localePath = useLocalePath()

const pillars = [
  { key: 'conseil',  path: '/conseil',  color: 'var(--ms-color-sky)' },
  { key: 'drones',   path: '/drones',   color: 'var(--ms-color-navy)' },
  { key: 'produits', path: '/produits', color: 'var(--ms-color-gold)' },
]
</script>

<template>
  <section class="pillars">
    <div class="pillars-container">
      <div class="pillars-header">
        <h2 class="pillars-title">{{ t('pillars.title') }}</h2>
        <p class="pillars-desc">{{ t('pillars.desc') }}</p>
      </div>

      <div class="pillars-grid">
        <NuxtLink
          v-for="p in pillars"
          :key="p.key"
          :to="localePath(p.path)"
          class="pillar-link"
        >
          <MsCard>
            <div class="pillar-body">
              <div class="pillar-icon" :style="{ '--icon': p.color }">
                <!-- Conseil: blueprint / compass -->
                <svg v-if="p.key === 'conseil'" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <circle cx="16" cy="16" r="12" stroke="currentColor" stroke-width="2"/>
                  <path d="M16 8l3 8-3 8-3-8 3-8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                  <circle cx="16" cy="16" r="1.5" fill="currentColor"/>
                </svg>
                <!-- Drones: quadcopter -->
                <svg v-else-if="p.key === 'drones'" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <rect x="13" y="13" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="2"/>
                  <path d="M16 13L8 7M16 13l8-6M16 19l-8 6M16 19l8 6" stroke="currentColor" stroke-width="1.75"/>
                  <circle cx="7" cy="6" r="3" stroke="currentColor" stroke-width="2"/>
                  <circle cx="25" cy="6" r="3" stroke="currentColor" stroke-width="2"/>
                  <circle cx="7" cy="26" r="3" stroke="currentColor" stroke-width="2"/>
                  <circle cx="25" cy="26" r="3" stroke="currentColor" stroke-width="2"/>
                </svg>
                <!-- Produits: window / app -->
                <svg v-else viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <rect x="4" y="6" width="24" height="20" rx="2.5" stroke="currentColor" stroke-width="2"/>
                  <path d="M4 11h24" stroke="currentColor" stroke-width="2"/>
                  <circle cx="7.5" cy="8.5" r="0.9" fill="currentColor"/>
                  <path d="M9 18h7M9 21h11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <h3 class="pillar-name">{{ t(`pillars.${p.key}.title`) }}</h3>
              <p class="pillar-text">{{ t(`pillars.${p.key}.desc`) }}</p>
            </div>
            <template #footer>
              <span class="pillar-more">{{ t(`pillars.${p.key}.cta`) }} →</span>
            </template>
          </MsCard>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pillars { padding: 88px 24px; background: var(--ms-color-white); }
.pillars-container { max-width: 1280px; margin: 0 auto; }
.pillars-header { text-align: center; margin-bottom: 48px; }
.pillars-title {
  font-family: var(--ms-font-display);
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: var(--ms-color-navy);
  letter-spacing: -0.03em;
  margin: 0 0 16px;
}
.pillars-desc { font-size: 1.0625rem; color: var(--ms-color-muted); max-width: 560px; margin: 0 auto; line-height: 1.7; }

.pillars-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
@media (min-width: 768px) { .pillars-grid { grid-template-columns: repeat(3, 1fr); } }

.pillar-link {
  display: block;
  text-decoration: none;
  border-radius: var(--ms-radius-lg);
  transition: transform var(--ms-transition-base), box-shadow var(--ms-transition-base);
}
.pillar-link:hover { transform: translateY(-4px); box-shadow: var(--ms-shadow-md); }
.pillar-link:hover :deep(.ms-card) { border-color: var(--ms-color-sky); }

.pillar-body { display: flex; flex-direction: column; gap: 14px; padding: 12px 4px; }
.pillar-icon {
  width: 52px; height: 52px;
  border-radius: var(--ms-radius-md);
  background: color-mix(in srgb, var(--icon) 12%, transparent);
  color: var(--icon);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.pillar-icon svg { width: 26px; height: 26px; }
.pillar-name { font-family: var(--ms-font-display); font-size: 1.25rem; font-weight: 700; color: var(--ms-color-navy); margin: 0; }
.pillar-text { font-size: 0.9375rem; color: var(--ms-color-muted); line-height: 1.65; margin: 0; }
.pillar-more { font-family: var(--ms-font-body); font-size: 14px; font-weight: 600; color: var(--ms-color-sky); }
</style>
