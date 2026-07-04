<script setup lang="ts">
const { locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

useHead(computed(() => ({
  link: [
    ...locales.value.map(loc => ({
      rel: 'alternate',
      hreflang: loc.language,
      href: `https://meridian-synergy.com${switchLocalePath(loc.code)}`,
    })),
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `https://meridian-synergy.com${switchLocalePath('fr')}`,
    },
  ],
})))
</script>

<template>
  <div class="layout">
    <AppHeader />
    <main class="layout-main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.layout-main {
  flex: 1;
}
</style>
