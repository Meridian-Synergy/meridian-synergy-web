<script setup lang="ts">
import { MsButton, MsCard } from '@meridian-synergy/ui'

const { t } = useI18n()
const localePath = useLocalePath()

const services = [
  { key: 'thermique',      path: '/services/audit-thermique',         color: 'var(--ms-color-sky)' },
  { key: 'agriculture',    path: '/services/agriculture-viticulture', color: 'var(--ms-color-success)' },
  { key: 'video',          path: '/services/video-cinema',            color: 'var(--ms-color-gold)' },
  { key: 'securite',       path: '/services/securite-surveillance',   color: 'var(--ms-color-navy)' },
  { key: 'topographie',    path: '/services/topographie-cartographie',color: 'var(--ms-color-sky)' },
  { key: 'infrastructure', path: '/services/inspection-infrastructure',color: 'var(--ms-color-orange)' },
]
</script>

<template>
  <section class="services">
    <div class="services-container">
      <div class="services-header">
        <h2 class="services-title">{{ t('services.sectionTitle') }}</h2>
        <p class="services-desc">{{ t('services.sectionDesc') }}</p>
      </div>

      <div class="services-grid">
        <NuxtLink
          v-for="s in services"
          :key="s.key"
          :to="localePath(s.path)"
          class="card-link"
        >
          <MsCard>
            <div class="svc-body">
              <!-- Service icon — inline SVG using currentColor -->
              <div class="svc-icon" :style="{ '--icon': s.color }">
                <!-- Thermique: thermometer -->
                <svg v-if="s.key === 'thermique'" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <circle cx="16" cy="22" r="5" stroke="currentColor" stroke-width="2"/>
                  <rect x="14.25" y="5" width="3.5" height="14" rx="1.75" stroke="currentColor" stroke-width="2"/>
                  <circle cx="16" cy="22" r="2" fill="currentColor"/>
                </svg>
                <!-- Agriculture: leaf -->
                <svg v-else-if="s.key === 'agriculture'" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <path d="M16 28V16m0 0C12 9 5 9 3 12c0 5 5 9 13 7zm0 0c4-7 11-7 13-4 0 5-5 9-13 7z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                </svg>
                <!-- Vidéo: camera -->
                <svg v-else-if="s.key === 'video'" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <rect x="3" y="9" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
                  <path d="M21 14l8-4v12l-8-4V14z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                </svg>
                <!-- Sécurité: shield -->
                <svg v-else-if="s.key === 'securite'" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <path d="M16 3L5 7v9c0 6.5 5 11.5 11 12.5C22 27.5 27 22.5 27 16V7L16 3z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                  <path d="M11 16l4 4 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <!-- Topographie: layers -->
                <svg v-else-if="s.key === 'topographie'" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <ellipse cx="16" cy="22" rx="11" ry="4" stroke="currentColor" stroke-width="2"/>
                  <ellipse cx="16" cy="15" rx="11" ry="4" stroke="currentColor" stroke-width="2"/>
                  <ellipse cx="16" cy="8"  rx="11" ry="4" stroke="currentColor" stroke-width="2"/>
                </svg>
                <!-- Infrastructure: bridge -->
                <svg v-else-if="s.key === 'infrastructure'" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <path d="M3 25h26M7 25V14M14 25V8M19 25V8M26 25V14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M7 14c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>

              <h3 class="svc-title">{{ t(`services.${s.key}.title`) }}</h3>
              <p class="svc-desc">{{ t(`services.${s.key}.desc`) }}</p>
            </div>

            <template #footer>
              <span class="svc-more">{{ t('services.more') }} →</span>
            </template>
          </MsCard>
        </NuxtLink>
      </div>

      <div class="services-cta">
        <MsButton
          :label="t('services.cta')"
          variant="secondary"
          size="lg"
          @click="navigateTo(localePath('/services'))"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  padding: 80px 24px;
  background: var(--ms-color-white);
}
.services-container {
  max-width: 1280px;
  margin: 0 auto;
}

.services-header {
  text-align: center;
  margin-bottom: 48px;
}
.services-title {
  font-family: var(--ms-font-display);
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: var(--ms-color-navy);
  letter-spacing: -0.03em;
  margin: 0 0 16px;
}
.services-desc {
  font-size: 1.0625rem;
  color: var(--ms-color-muted);
  max-width: 540px;
  margin: 0 auto;
  line-height: 1.7;
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 40px;
}
@media (min-width: 640px)  { .services-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .services-grid { grid-template-columns: repeat(3, 1fr); } }

/* Clickable card wrapper */
.card-link {
  display: block;
  text-decoration: none;
  border-radius: var(--ms-radius-lg);
  transition: transform var(--ms-transition-base), box-shadow var(--ms-transition-base);
}
.card-link:hover {
  transform: translateY(-3px);
  box-shadow: var(--ms-shadow-md);
}
.card-link:hover :deep(.ms-card) { border-color: var(--ms-color-sky); }

/* Card body content */
.svc-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 4px 0;
}

.svc-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--ms-radius-md);
  background: color-mix(in srgb, var(--icon) 12%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--icon);
  flex-shrink: 0;
}
.svc-icon svg { width: 22px; height: 22px; }

.svc-title {
  font-family: var(--ms-font-display);
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--ms-color-navy);
  margin: 0;
}
.svc-desc {
  font-size: 0.875rem;
  color: var(--ms-color-muted);
  line-height: 1.6;
  margin: 0;
}

.svc-more {
  font-family: var(--ms-font-body);
  font-size: 13px;
  font-weight: 600;
  color: var(--ms-color-sky);
  letter-spacing: 0.01em;
}

.services-cta {
  display: flex;
  justify-content: center;
}
</style>
