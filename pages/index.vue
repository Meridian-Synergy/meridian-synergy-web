<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: 'Meridian Synergy — La plateforme drone professionnelle',
  description: 'Plateforme SaaS pour télépilotes de drones professionnels. Planification, conformité DGAC, rapports d\'intervention.',
  ogTitle: 'Meridian Synergy',
  ogImage: '/og-default.jpg',
})
</script>

<template>
  <div>
    <HeroSection />
    <ServicesTeaser />
    <MarketplaceTeaser />
    <SaasTeaser />
  </div>
</template>
