<script setup lang="ts">
import { MsButton, MsBadge } from '@meridian-synergy/ui'

const { t } = useI18n()
const localePath = useLocalePath()

const error = useError()
const is404 = computed(() => error.value?.statusCode === 404)

useHead({ title: is404.value ? `404 — ${t('nav.home')}` : `Erreur — ${t('nav.home')}` })

function handleError() {
  clearError({ redirect: localePath('/') })
}
</script>

<template>
  <NuxtLayout>
    <section class="error-section">
      <div class="container">
        <MsBadge :label="is404 ? '404' : String(error?.statusCode ?? 'Erreur')" variant="sky" :dot="false" />
        <h1 class="error-title">
          {{ is404 ? 'Page introuvable' : 'Une erreur est survenue' }}
        </h1>
        <p class="error-desc">
          {{ is404
            ? 'La page que vous recherchez n\'existe pas ou a été déplacée.'
            : 'Une erreur inattendue s\'est produite. Veuillez réessayer.' }}
        </p>
        <MsButton
          :label="t('breadcrumb.home') + ' →'"
          variant="cta"
          size="lg"
          @click="handleError"
        />
      </div>
    </section>
  </NuxtLayout>
</template>

<style scoped>
.error-section {
  min-height: 60vh;
  display: flex;
  align-items: center;
  background: var(--ms-color-bg);
}
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 80px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.error-title {
  font-family: var(--ms-font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: var(--ms-color-navy);
  letter-spacing: -0.03em;
  margin: 0;
}
.error-desc {
  font-size: 1.0625rem;
  color: var(--ms-color-muted);
  max-width: 480px;
  line-height: 1.7;
  margin: 0;
}
</style>
