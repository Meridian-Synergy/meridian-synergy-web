<script setup lang="ts">
import { MsPageHero, MsCard, MsCtaBanner } from '@meridian-synergy/ui'

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('conseilPage.meta.title'),
  description: () => t('conseilPage.meta.description'),
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: t('breadcrumb.home'), item: 'https://meridian-synergy.com' },
      { name: t('nav.conseil') },
    ],
  }),
])

const continuum = ['audit', 'archi', 'direction', 'realisation'] as const
</script>

<template>
  <div>
    <MsPageHero
      :crumbs="[{ label: t('breadcrumb.home'), href: localePath('/') }, { label: t('nav.conseil') }]"
      :badge="t('conseilPage.hero.badge')"
      :title="t('conseilPage.hero.title')"
      :desc="t('conseilPage.hero.desc')"
    />

    <!-- Intro -->
    <section class="intro">
      <div class="container">
        <p class="intro-lead">{{ t('conseilPage.intro') }}</p>
      </div>
    </section>

    <!-- Two ways to intervene -->
    <section class="modes">
      <div class="container">
        <h2 class="section-title centered">{{ t('conseilPage.modes.title') }}</h2>
        <div class="modes-grid">
          <MsCard>
            <div class="mode-body">
              <div class="mode-icon">
                <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <circle cx="16" cy="16" r="12" stroke="currentColor" stroke-width="2"/>
                  <path d="M4 16h24M16 4c3 3.2 4.5 7.4 4.5 12S19 24.8 16 28c-3-3.2-4.5-7.4-4.5-12S13 7.2 16 4z" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <h3 class="mode-name">{{ t('conseilPage.modes.transverse.title') }}</h3>
              <p class="mode-text">{{ t('conseilPage.modes.transverse.desc') }}</p>
            </div>
          </MsCard>
          <MsCard>
            <div class="mode-body">
              <div class="mode-icon">
                <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <circle cx="16" cy="16" r="3" stroke="currentColor" stroke-width="2"/>
                  <circle cx="16" cy="16" r="8" stroke="currentColor" stroke-width="2"/>
                  <circle cx="16" cy="16" r="13" stroke="currentColor" stroke-width="2" opacity="0.4"/>
                </svg>
              </div>
              <h3 class="mode-name">{{ t('conseilPage.modes.domaine.title') }}</h3>
              <p class="mode-text">{{ t('conseilPage.modes.domaine.desc') }}</p>
            </div>
          </MsCard>
        </div>
      </div>
    </section>

    <!-- Transition management -->
    <section class="transition">
      <div class="container">
        <div class="transition-card">
          <span class="transition-badge">{{ t('conseilPage.transition.badge') }}</span>
          <h2 class="transition-title">{{ t('conseilPage.transition.title') }}</h2>
          <p class="transition-text">{{ t('conseilPage.transition.desc') }}</p>
        </div>
      </div>
    </section>

    <!-- Continuum -->
    <section class="continuum">
      <div class="container">
        <h2 class="section-title centered">{{ t('conseilPage.continuum.title') }}</h2>
        <ol class="continuum-list">
          <li v-for="(step, i) in continuum" :key="step" class="continuum-step">
            <span class="continuum-num">{{ i + 1 }}</span>
            <div class="continuum-content">
              <h3 class="continuum-name">{{ t(`conseilPage.continuum.${step}.title`) }}</h3>
              <p class="continuum-text">{{ t(`conseilPage.continuum.${step}.desc`) }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- Proof: up to production -->
    <section class="proof">
      <div class="container">
        <div class="proof-inner">
          <h2 class="proof-title">{{ t('conseilPage.proof.title') }}</h2>
          <p class="proof-text">{{ t('conseilPage.proof.desc') }}</p>
          <NuxtLink :to="localePath('/produits')" class="proof-link">{{ t('conseilPage.proof.link') }} →</NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <MsCtaBanner
      :title="t('conseilPage.cta.title')"
      :desc="t('conseilPage.cta.desc')"
      :label="t('conseilPage.cta.btn')"
      :href="localePath('/contact')"
    />
  </div>
</template>

<style scoped>
.container { max-width: 900px; margin: 0 auto; padding: 0 24px; }

.section-title {
  font-family: var(--ms-font-display);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  color: var(--ms-color-navy);
  letter-spacing: -0.02em;
  margin: 0 0 32px;
}
.section-title.centered { text-align: center; }

/* Intro */
.intro { padding: 64px 0 8px; background: var(--ms-color-white); }
.intro-lead {
  font-size: 1.25rem;
  line-height: 1.7;
  color: var(--ms-color-navy);
  margin: 0;
  font-weight: 500;
}

/* Modes */
.modes { padding: 56px 0; background: var(--ms-color-white); }
.modes-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
@media (min-width: 768px) { .modes-grid { grid-template-columns: repeat(2, 1fr); } }
.mode-body { display: flex; flex-direction: column; gap: 12px; padding: 8px 4px; }
.mode-icon {
  width: 48px; height: 48px;
  border-radius: var(--ms-radius-md);
  background: color-mix(in srgb, var(--ms-color-sky) 12%, transparent);
  color: var(--ms-color-sky);
  display: flex; align-items: center; justify-content: center;
}
.mode-icon svg { width: 24px; height: 24px; }
.mode-name { font-family: var(--ms-font-display); font-size: 1.1875rem; font-weight: 700; color: var(--ms-color-navy); margin: 0; }
.mode-text { font-size: 0.9375rem; color: var(--ms-color-muted); line-height: 1.7; margin: 0; }

/* Transition */
.transition { padding: 24px 0 64px; background: var(--ms-color-white); }
.transition-card {
  background: var(--ms-color-bg);
  border: 1px solid var(--ms-color-border);
  border-left: 4px solid var(--ms-color-gold);
  border-radius: var(--ms-radius-lg);
  padding: 32px;
}
.transition-badge {
  display: inline-block;
  font-family: var(--ms-font-condensed);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ms-color-gold);
  margin-bottom: 12px;
}
.transition-title { font-family: var(--ms-font-display); font-size: 1.375rem; font-weight: 800; color: var(--ms-color-navy); margin: 0 0 12px; letter-spacing: -0.02em; }
.transition-text { font-size: 1rem; line-height: 1.7; color: var(--ms-color-muted); margin: 0; }

/* Continuum */
.continuum { padding: 64px 0; background: var(--ms-color-bg); }
.continuum-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.continuum-step {
  display: flex;
  gap: 20px;
  background: var(--ms-color-white);
  border: 1px solid var(--ms-color-border);
  border-radius: var(--ms-radius-lg);
  padding: 24px;
}
.continuum-num {
  flex-shrink: 0;
  width: 40px; height: 40px;
  border-radius: 50%;
  background: var(--ms-color-navy);
  color: var(--ms-color-white);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--ms-font-display);
  font-size: 1.125rem;
  font-weight: 800;
}
.continuum-content { display: flex; flex-direction: column; gap: 6px; }
.continuum-name { font-family: var(--ms-font-display); font-size: 1.125rem; font-weight: 700; color: var(--ms-color-navy); margin: 0; }
.continuum-text { font-size: 0.9375rem; color: var(--ms-color-muted); line-height: 1.65; margin: 0; }

/* Proof */
.proof { padding: 64px 0; background: var(--ms-color-white); }
.proof-inner {
  background: var(--ms-color-navy);
  border-radius: var(--ms-radius-xl);
  padding: 40px;
  text-align: center;
}
.proof-title { font-family: var(--ms-font-display); font-size: 1.5rem; font-weight: 800; color: var(--ms-color-white); margin: 0 0 16px; letter-spacing: -0.02em; }
.proof-text { font-size: 1rem; line-height: 1.7; color: rgba(255,255,255,0.72); max-width: 620px; margin: 0 auto 20px; }
.proof-link { font-family: var(--ms-font-body); font-size: 0.9375rem; font-weight: 600; color: var(--ms-color-sky); text-decoration: none; }
.proof-link:hover { text-decoration: underline; }
</style>
