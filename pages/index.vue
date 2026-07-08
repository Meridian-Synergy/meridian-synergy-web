<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title:       t('home.meta.title'),
  description: t('home.meta.description'),
  ogTitle:     'Meridian Synergy',
  ogImage:     '/og-default.png',
})

useHead({ titleTemplate: '%s' })

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Meridian Synergy',
        url: 'https://meridian-synergy.com',
        logo: 'https://meridian-synergy.com/android-chrome-512x512.png',
        email: 'contact@meridian-synergy.com',
        telephone: '+33766974874',
        description: 'Meridian Synergy — conseil et architecture d\'entreprise, opérateur drone certifié DGAC et éditeur de la plateforme SaaS Waypoint360. Du cadrage à la réalisation.',
        sameAs: [
          'https://www.linkedin.com/company/meridian-synergy/',
          'https://www.instagram.com/meridian.synergy',
          'https://www.tiktok.com/@meridian.synergy',
          'https://www.youtube.com/@meridian.synergy',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+33766974874',
          contactType: 'customer service',
          availableLanguage: ['French', 'English'],
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Waypoint360',
        url: 'https://app.waypoint360.eu',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: 'Plateforme SaaS pour opérateurs de drones professionnels. Génération de MANEX, analyse SORA, planification de missions et conformité DGAC en un seul outil.',
        offers: {
          '@type': 'Offer',
          price: '5',
          priceCurrency: 'EUR',
          description: 'Essai gratuit disponible',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Meridian Synergy',
        url: 'https://meridian-synergy.com',
      },
    ]),
  }],
})
</script>

<template>
  <div>
    <UmbrellaHero />
    <PillarsSection />
  </div>
</template>
