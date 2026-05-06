<script setup lang="ts">
import { MsButton, MsCard, MsPageHero } from '@meridian-synergy/ui'

const { t, locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('dronesPage.meta.title'),
  description: () => t('dronesPage.meta.description'),
})

const dronesSlugs = ['dji-t100-agri', 'dji-matrice-4td', 'dji-avata-360']
const { data: drones } = await useAsyncData(`drones-${locale.value}`, async () => {
  const results = await Promise.all(
    dronesSlugs.map(async (slug) => {
      const doc = await queryCollection('content').path(`/${locale.value}/drones/${slug}`).first()
      return doc ? { ...doc, slug } : null
    })
  )
  return results.filter(Boolean)
})
</script>

<template>
  <div>
    <MsPageHero
      :crumbs="[{ label: t('breadcrumb.home'), href: localePath('/') }, { label: t('nav.drones') }]"
      :badge="t('dronesPage.hero.badge')"
      :title="t('dronesPage.hero.title')"
      :desc="t('dronesPage.hero.desc')"
    />

    <!-- Drones grid -->
    <section class="grid-section">
      <div class="container">
        <div class="drones-grid">
          <NuxtLink
            v-for="drone in drones"
            :key="drone.slug"
            :to="localePath(`/drones/${drone.slug}`)"
            class="drone-link"
          >
            <MsCard>
              <div class="drone-body">
                <div class="drone-visual">
                  <svg class="drone-svg" viewBox="0 0 80 50" fill="none" aria-hidden="true">
                    <rect x="35" y="20" width="10" height="10" rx="2" fill="var(--ms-color-navy)" opacity="0.15"/>
                    <circle cx="40" cy="25" r="4" stroke="var(--ms-color-navy)" stroke-width="1.5" opacity="0.4"/>
                    <line x1="40" y1="25" x2="10" y2="10" stroke="var(--ms-color-navy)" stroke-width="1.5" opacity="0.3"/>
                    <line x1="40" y1="25" x2="70" y2="10" stroke="var(--ms-color-navy)" stroke-width="1.5" opacity="0.3"/>
                    <line x1="40" y1="25" x2="10" y2="40" stroke="var(--ms-color-navy)" stroke-width="1.5" opacity="0.3"/>
                    <line x1="40" y1="25" x2="70" y2="40" stroke="var(--ms-color-navy)" stroke-width="1.5" opacity="0.3"/>
                    <circle cx="10" cy="10" r="5" stroke="var(--ms-color-sky)" stroke-width="1.5" opacity="0.7"/>
                    <circle cx="70" cy="10" r="5" stroke="var(--ms-color-sky)" stroke-width="1.5" opacity="0.7"/>
                    <circle cx="10" cy="40" r="5" stroke="var(--ms-color-sky)" stroke-width="1.5" opacity="0.7"/>
                    <circle cx="70" cy="40" r="5" stroke="var(--ms-color-sky)" stroke-width="1.5" opacity="0.7"/>
                  </svg>
                  <img
                    v-if="drone.image"
                    :src="drone.image"
                    :alt="drone.model"
                    class="drone-img"
                    @error="($event.target as HTMLImageElement).style.display = 'none'"
                  />
                </div>

                <div class="drone-meta">
                  <MsBadge :label="drone.manufacturer" variant="navy" :dot="false" />
                  <h2 class="drone-name">{{ drone.model }}</h2>
                  <p class="drone-desc">{{ drone.description }}</p>
                </div>

                <dl class="drone-specs">
                  <div class="spec-item">
                    <dt>{{ t('dronePage.specFlightTime') }}</dt>
                    <dd>{{ drone.specs?.maxFlightTime }}</dd>
                  </div>
                  <div class="spec-item">
                    <dt>{{ t('dronePage.specCamera') }}</dt>
                    <dd>{{ drone.specs?.camera }}</dd>
                  </div>
                </dl>
              </div>

              <template #footer>
                <span class="drone-more">{{ t('services.more') }} →</span>
              </template>
            </MsCard>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container cta-inner">
        <div class="cta-text">
          <h2 class="cta-title">{{ t('dronesPage.contact.title') }}</h2>
          <p class="cta-desc">{{ t('dronesPage.contact.desc') }}</p>
        </div>
        <MsButton
          :label="t('dronesPage.contact.btn')"
          variant="cta"
          size="lg"
          @click="navigateTo(localePath('/contact'))"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ── Grid ── */
.grid-section { padding: 64px 0; background: var(--ms-color-white); }
.drones-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
@media (min-width: 768px) { .drones-grid { grid-template-columns: repeat(2, 1fr); } }

.drone-link {
  display: block;
  text-decoration: none;
  border-radius: var(--ms-radius-lg);
  transition: transform var(--ms-transition-base), box-shadow var(--ms-transition-base);
}
.drone-link:hover { transform: translateY(-3px); box-shadow: var(--ms-shadow-md); }
.drone-link:hover :deep(.ms-card) { border-color: var(--ms-color-sky); }

.drone-body { display: flex; flex-direction: column; gap: 16px; }

.drone-visual {
  position: relative;
  background: var(--ms-color-bg);
  border-radius: var(--ms-radius-md);
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: 160px;
}
.drone-svg { width: 100%; max-width: 200px; height: auto; }
.drone-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--ms-radius-md);
}

.drone-meta { display: flex; flex-direction: column; gap: 8px; }
.drone-name {
  font-family: var(--ms-font-display);
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--ms-color-navy);
  margin: 0;
}
.drone-desc { font-size: 0.9375rem; color: var(--ms-color-muted); line-height: 1.65; margin: 0; }

.drone-specs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  border-top: 1px solid var(--ms-color-border);
  padding-top: 16px;
  margin: 0;
}
.spec-item { display: flex; flex-direction: column; gap: 3px; }
.spec-item dt { font-family: var(--ms-font-condensed); font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ms-color-muted); }
.spec-item dd { font-size: 13px; font-weight: 600; color: var(--ms-color-navy); margin: 0; }

.drone-more { font-size: 13px; font-weight: 600; color: var(--ms-color-sky); }

/* ── CTA ── */
.cta-section { background: var(--ms-color-navy); padding: 64px 0; }
.cta-inner { display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
.cta-text { flex: 1; min-width: 260px; }
.cta-title { font-family: var(--ms-font-display); font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 800; color: var(--ms-color-white); letter-spacing: -0.02em; margin: 0 0 10px; }
.cta-desc { font-size: 1rem; color: var(--ms-color-muted); margin: 0; opacity: 0.8; }
</style>
