<script setup lang="ts">
import { MsCard, MsCtaBanner } from '@meridian-synergy/ui'

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('dronesPage.meta.title'),
  description: () => t('dronesPage.meta.description'),
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: t('breadcrumb.home'), item: 'https://meridian-synergy.com' },
      { name: t('nav.drones') },
    ],
  }),
])

// Sub-sections of the drone branch.
const subSections = [
  { key: 'services',  path: '/services',  color: 'var(--ms-color-sky)' },
  { key: 'useCases',  path: '/cas-usage', color: 'var(--ms-color-gold)' },
  { key: 'fleet',     path: '/flotte',    color: 'var(--ms-color-navy)' },
]
</script>

<template>
  <div>
    <!-- Drone branch pitch (certified operator, 6 fields, geography) -->
    <HeroSection />

    <!-- Branch sub-sections -->
    <section class="subs">
      <div class="subs-container">
        <div class="subs-header">
          <h2 class="subs-title">{{ t('dronesLanding.subs.title') }}</h2>
          <p class="subs-desc">{{ t('dronesLanding.subs.desc') }}</p>
        </div>
        <div class="subs-grid">
          <NuxtLink
            v-for="s in subSections"
            :key="s.key"
            :to="localePath(s.path)"
            class="sub-link"
          >
            <MsCard>
              <div class="sub-body">
                <div class="sub-icon" :style="{ '--icon': s.color }">
                  <svg v-if="s.key === 'services'" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <rect x="4" y="4" width="10" height="10" rx="2" stroke="currentColor" stroke-width="2"/>
                    <rect x="18" y="4" width="10" height="10" rx="2" stroke="currentColor" stroke-width="2"/>
                    <rect x="4" y="18" width="10" height="10" rx="2" stroke="currentColor" stroke-width="2"/>
                    <rect x="18" y="18" width="10" height="10" rx="2" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  <svg v-else-if="s.key === 'useCases'" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <path d="M6 4h20v18l-10 6-10-6V4z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                    <path d="M11 14l3 3 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <svg v-else viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <rect x="14" y="14" width="4" height="4" rx="1" fill="currentColor"/>
                    <circle cx="16" cy="16" r="2" stroke="currentColor" stroke-width="2"/>
                    <circle cx="6" cy="6" r="3" stroke="currentColor" stroke-width="2"/>
                    <circle cx="26" cy="6" r="3" stroke="currentColor" stroke-width="2"/>
                    <circle cx="6" cy="26" r="3" stroke="currentColor" stroke-width="2"/>
                    <circle cx="26" cy="26" r="3" stroke="currentColor" stroke-width="2"/>
                    <path d="M16 16L7 7M16 16l9-9M16 16l-9 9M16 16l9 9" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </div>
                <h3 class="sub-name">{{ t(`dronesLanding.subs.${s.key}.title`) }}</h3>
                <p class="sub-text">{{ t(`dronesLanding.subs.${s.key}.desc`) }}</p>
              </div>
              <template #footer>
                <span class="sub-more">{{ t('services.more') }} →</span>
              </template>
            </MsCard>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Detailed service fields -->
    <ServicesTeaser />

    <!-- CTA -->
    <MsCtaBanner
      :title="t('dronesLanding.contact.title')"
      :desc="t('dronesLanding.contact.desc')"
      :label="t('dronesLanding.contact.btn')"
      :href="localePath('/contact')"
    />
  </div>
</template>

<style scoped>
.subs { padding: 72px 24px; background: var(--ms-color-bg); }
.subs-container { max-width: 1280px; margin: 0 auto; }
.subs-header { text-align: center; margin-bottom: 40px; }
.subs-title {
  font-family: var(--ms-font-display);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 800;
  color: var(--ms-color-navy);
  letter-spacing: -0.03em;
  margin: 0 0 12px;
}
.subs-desc { font-size: 1.0625rem; color: var(--ms-color-muted); max-width: 540px; margin: 0 auto; line-height: 1.7; }

.subs-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  align-items: stretch;
}
@media (min-width: 768px) { .subs-grid { grid-template-columns: repeat(3, 1fr); } }

.sub-link {
  display: block;
  height: 100%;
  text-decoration: none;
  border-radius: var(--ms-radius-lg);
  transition: transform var(--ms-transition-base), box-shadow var(--ms-transition-base);
}
.sub-link:hover { transform: translateY(-3px); box-shadow: var(--ms-shadow-md); }
.sub-link:hover :deep(.ms-card) { border-color: var(--ms-color-sky); }
/* Equal-height cards: card fills the grid row, footer pinned to the bottom */
.sub-link :deep(.ms-card) { height: 100%; display: flex; flex-direction: column; }
.sub-link :deep(.ms-card__body) { flex: 1 1 auto; }

.sub-body { display: flex; flex-direction: column; gap: 12px; padding: 4px 0; }
.sub-icon {
  width: 44px; height: 44px;
  border-radius: var(--ms-radius-md);
  background: color-mix(in srgb, var(--icon) 12%, transparent);
  display: flex; align-items: center; justify-content: center;
  color: var(--icon); flex-shrink: 0;
}
.sub-icon svg { width: 22px; height: 22px; }
.sub-name { font-family: var(--ms-font-display); font-size: 1.0625rem; font-weight: 700; color: var(--ms-color-navy); margin: 0; }
.sub-text { font-size: 0.875rem; color: var(--ms-color-muted); line-height: 1.6; margin: 0; }
.sub-more { font-family: var(--ms-font-body); font-size: 13px; font-weight: 600; color: var(--ms-color-sky); }
</style>
