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
    <!-- Google Tag Manager (noscript) -->
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-58NSHG6C"
        height="0" width="0"
        style="display:none;visibility:hidden"
      />
    </noscript>
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
