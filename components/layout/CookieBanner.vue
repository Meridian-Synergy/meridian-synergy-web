<script setup lang="ts">
const { t } = useI18n()
const { bannerVisible, acceptAll, declineAll } = useCookieConsent()

watch(bannerVisible, (val) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = val ? 'hidden' : ''
})
</script>

<template>
  <Transition name="cookie-overlay">
    <div v-if="bannerVisible" class="cookie-overlay" role="dialog" aria-modal="true" :aria-label="t('cookies.title')">
      <Transition name="cookie-modal">
        <div class="cookie-modal">
          <div class="cookie-icon" aria-hidden="true">🍪</div>
          <h2 class="cookie-title">{{ t('cookies.title') }}</h2>
          <p class="cookie-desc">{{ t('cookies.desc') }}</p>
          <div class="cookie-actions">
            <button class="cookie-btn cookie-btn--decline" @click="declineAll">
              {{ t('cookies.decline') }}
            </button>
            <button class="cookie-btn cookie-btn--accept" @click="acceptAll">
              {{ t('cookies.accept') }}
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.cookie-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(17, 29, 56, 0.65);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.cookie-modal {
  background: var(--ms-color-white);
  border-radius: var(--ms-radius-lg);
  padding: 36px 32px 32px;
  max-width: 460px;
  width: 100%;
  box-shadow: var(--ms-shadow-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
}

.cookie-icon {
  font-size: 40px;
  line-height: 1;
}

.cookie-title {
  font-family: var(--ms-font-display);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--ms-color-navy);
  letter-spacing: -0.02em;
  margin: 0;
}

.cookie-desc {
  font-size: 14px;
  color: var(--ms-color-muted);
  line-height: 1.65;
  margin: 0;
}

.cookie-actions {
  display: flex;
  gap: 12px;
  width: 100%;
  margin-top: 8px;
}

.cookie-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 11px 20px;
  border-radius: var(--ms-radius-md);
  font-family: var(--ms-font-body);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.15s ease, transform 0.15s ease;
  border: none;
}
.cookie-btn:hover { opacity: 0.85; transform: translateY(-1px); }

.cookie-btn--decline {
  background: var(--ms-color-bg);
  color: var(--ms-color-navy);
  border: 1.5px solid var(--ms-color-border);
}
.cookie-btn--decline:hover { border-color: var(--ms-color-navy); }

.cookie-btn--accept {
  background: var(--ms-color-sky);
  color: var(--ms-color-white);
}

/* Overlay fade */
.cookie-overlay-enter-active,
.cookie-overlay-leave-active {
  transition: opacity 0.25s ease;
}
.cookie-overlay-enter-from,
.cookie-overlay-leave-to {
  opacity: 0;
}

/* Modal scale */
.cookie-modal-enter-active,
.cookie-modal-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.cookie-modal-enter-from,
.cookie-modal-leave-to {
  transform: scale(0.95) translateY(8px);
  opacity: 0;
}
</style>
