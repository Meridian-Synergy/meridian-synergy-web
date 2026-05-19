<script setup lang="ts">
import { MsPageHero, MsContactChannel, MsSocialCard } from '@meridian-synergy/ui'

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('contactPage.meta.title'),
  description: () => t('contactPage.meta.description'),
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: t('breadcrumb.home'), item: 'https://meridian-synergy.com' },
      { name: t('nav.contact') },
    ],
  }),
])

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Meridian Synergy',
      url: 'https://meridian-synergy.com',
      logo: 'https://meridian-synergy.com/android-chrome-512x512.png',
      sameAs: [
        'https://www.linkedin.com/company/meridian-synergy/',
        'https://www.instagram.com/meridian.synergy',
        'https://www.tiktok.com/@meridian.synergy',
        'https://www.youtube.com/@meridian.synergy',
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+33766974874',
          contactType: 'customer service',
          availableLanguage: ['French', 'English'],
        },
        {
          '@type': 'ContactPoint',
          email: 'contact@meridian-synergy.com',
          contactType: 'customer service',
          availableLanguage: ['French', 'English'],
        },
      ],
    }),
  }],
})

const socials = [
  {
    label: 'Instagram',
    handle: '@meridian.synergy',
    href: 'https://www.instagram.com/meridian.synergy',
    icon: 'instagram',
  },
  {
    label: 'LinkedIn',
    handle: 'meridian-synergy',
    href: 'https://www.linkedin.com/company/meridian-synergy/',
    icon: 'linkedin',
  },
  {
    label: 'TikTok',
    handle: '@meridian.synergy',
    href: 'https://www.tiktok.com/@meridian.synergy',
    icon: 'tiktok',
  },
  {
    label: 'YouTube',
    handle: '@meridian.synergy',
    href: 'https://www.youtube.com/@meridian.synergy',
    icon: 'youtube',
  },
]
</script>

<template>
  <div>
    <MsPageHero
      :crumbs="[{ label: t('breadcrumb.home'), href: localePath('/') }, { label: t('nav.contact') }]"
      :badge="t('contactPage.hero.badge')"
      :title="t('contactPage.hero.title')"
      :desc="t('contactPage.hero.subtitle')"
    />

    <!-- Direct contact -->
    <section class="contact-section">
      <div class="container">
        <h2 class="section-title">{{ t('contactPage.direct.title') }}</h2>
        <div class="channels">
          <MsContactChannel
            type="whatsapp"
            href="https://wa.me/33766974874"
            :label="t('contactPage.direct.whatsappLabel')"
            value="07 66 97 48 74"
            :desc="t('contactPage.direct.whatsappDesc')"
            :cta="t('contactPage.direct.whatsappBtn')"
          />
          <MsContactChannel
            type="email"
            href="mailto:contact@meridian-synergy.com"
            :label="t('contactPage.direct.emailLabel')"
            value="contact@meridian-synergy.com"
            :desc="t('contactPage.direct.emailDesc')"
            :cta="t('contactPage.direct.emailBtn')"
          />
        </div>
      </div>
    </section>

    <!-- Social networks -->
    <section class="social-section">
      <div class="container">
        <h2 class="section-title">{{ t('contactPage.social.title') }}</h2>
        <div class="socials-grid">
          <MsSocialCard
            v-for="s in socials"
            :key="s.label"
            :network="s.icon"
            :href="s.href"
            :label="s.label"
            :handle="s.handle"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ── Section title ── */
.section-title {
  font-family: var(--ms-font-display);
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 800;
  color: var(--ms-color-navy);
  letter-spacing: -0.02em;
  margin: 0 0 28px;
}

/* ── Direct contact ── */
.contact-section { padding: 64px 0; background: var(--ms-color-white); }
.channels {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
@media (min-width: 640px) { .channels { grid-template-columns: repeat(2, 1fr); } }

/* ── Social networks ── */
.social-section { padding: 64px 0; background: var(--ms-color-bg); }
.socials-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
@media (min-width: 768px) { .socials-grid { grid-template-columns: repeat(4, 1fr); } }
</style>
