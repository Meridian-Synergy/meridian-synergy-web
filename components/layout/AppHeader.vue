<script setup lang="ts">
import { MsButton, MsLogo } from '@meridian-synergy/ui'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()
const isOpen = ref(false)

const links = [
  { labelKey: 'nav.services',  path: '/services' },
  { labelKey: 'nav.drones',    path: '/drones' },
  { labelKey: 'nav.useCases',  path: '/cas-usage' },
  { labelKey: 'nav.pricing',   path: '/tarifs' },
  { labelKey: 'nav.about',     path: '/a-propos' },
  { labelKey: 'nav.contact',   path: '/contact' },
]

function isActive(path: string) {
  const resolved = localePath(path)
  return route.path === resolved || route.path.startsWith(resolved + '/')
}

watch(() => route.path, () => { isOpen.value = false })
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <NuxtLink :to="localePath('/')" class="logo" :aria-label="$t('nav.home', 'Meridian Synergy — Accueil')">
        <MsLogo variant="icon" color="navy" :width="28" />
        <span class="logo-name">Meridian Synergy</span>
      </NuxtLink>

      <nav class="nav" aria-label="Navigation principale">
        <NuxtLink
          v-for="link in links"
          :key="link.path"
          :to="localePath(link.path)"
          :class="['nav-link', { 'nav-link--active': isActive(link.path) }]"
        >
          {{ t(link.labelKey) }}
        </NuxtLink>
      </nav>

      <div class="actions">
        <div class="lang" role="navigation" aria-label="Langue / Language">
          <NuxtLink
            :to="switchLocalePath('fr')"
            :class="['lang-btn', { 'lang-btn--active': locale === 'fr' }]"
          >FR</NuxtLink>
          <span aria-hidden="true" class="lang-sep">|</span>
          <NuxtLink
            :to="switchLocalePath('en')"
            :class="['lang-btn', { 'lang-btn--active': locale === 'en' }]"
          >EN</NuxtLink>
        </div>
        <MsButton
          :label="t('nav.cta')"
          variant="primary"
          size="sm"
          @click="navigateTo(localePath('/services'))"
        />
      </div>

      <button
        class="burger"
        :aria-expanded="isOpen"
        :aria-label="isOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
        @click="isOpen = !isOpen"
      >
        <svg v-if="!isOpen" width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M2 6h18M2 11h18M2 16h18" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
        </svg>
        <svg v-else width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <Transition name="drawer">
      <div v-if="isOpen" class="drawer">
        <nav class="drawer-nav" aria-label="Navigation mobile">
          <NuxtLink
            v-for="link in links"
            :key="link.path"
            :to="localePath(link.path)"
            :class="['drawer-link', { 'drawer-link--active': isActive(link.path) }]"
          >
            {{ t(link.labelKey) }}
          </NuxtLink>
        </nav>
        <div class="drawer-foot">
          <div class="lang">
            <NuxtLink :to="switchLocalePath('fr')" :class="['lang-btn', { 'lang-btn--active': locale === 'fr' }]">FR</NuxtLink>
            <span aria-hidden="true" class="lang-sep">|</span>
            <NuxtLink :to="switchLocalePath('en')" :class="['lang-btn', { 'lang-btn--active': locale === 'en' }]">EN</NuxtLink>
          </div>
          <MsButton :label="t('nav.cta')" variant="primary" @click="navigateTo(localePath('/services'))" />
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--ms-color-white);
  border-bottom: 1px solid var(--ms-color-border);
}

.header-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  height: 68px;
  display: flex;
  align-items: center;
  gap: 32px;
}

/* ── Logo ── */
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}
.logo-name {
  font-family: var(--ms-font-display);
  font-weight: 700;
  font-size: 16px;
  color: var(--ms-color-navy);
  letter-spacing: -0.02em;
}

/* ── Desktop nav ── */
.nav {
  display: none;
  align-items: center;
  gap: 2px;
  flex: 1;
}
@media (min-width: 900px) { .nav { display: flex; } }

.nav-link {
  padding: 6px 12px;
  font-family: var(--ms-font-body);
  font-size: 15px;
  font-weight: 500;
  color: var(--ms-color-muted);
  text-decoration: none;
  border-radius: var(--ms-radius-md);
  transition: color var(--ms-transition-base), background-color var(--ms-transition-base);
  white-space: nowrap;
}
.nav-link:hover { color: var(--ms-color-navy); background: var(--ms-color-bg); }
.nav-link--active { color: var(--ms-color-navy); font-weight: 600; background: var(--ms-color-bg); }

/* ── Actions (lang + CTA) ── */
.actions {
  display: none;
  align-items: center;
  gap: 16px;
  margin-left: auto;
}
@media (min-width: 900px) { .actions { display: flex; } }

/* ── Language switcher ── */
.lang { display: flex; align-items: center; gap: 6px; }
.lang-btn {
  font-family: var(--ms-font-condensed);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ms-color-muted);
  text-decoration: none;
  transition: color var(--ms-transition-fast);
}
.lang-btn:hover,
.lang-btn--active { color: var(--ms-color-navy); }
.lang-sep { color: var(--ms-color-border); font-size: 11px; }

/* ── Mobile burger ── */
.burger {
  display: none;
  margin-left: auto;
  padding: 6px;
  background: none;
  border: none;
  border-radius: var(--ms-radius-md);
  color: var(--ms-color-navy);
  cursor: pointer;
  transition: background-color var(--ms-transition-fast);
}
.burger:hover { background: var(--ms-color-bg); }
@media (max-width: 899px) { .burger { display: flex; align-items: center; justify-content: center; } }

/* ── Mobile drawer ── */
.drawer {
  border-top: 1px solid var(--ms-color-border);
  background: var(--ms-color-white);
  padding: 12px 24px 24px;
}
.drawer-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 16px;
}
.drawer-link {
  display: block;
  padding: 12px 16px;
  font-family: var(--ms-font-body);
  font-size: 16px;
  font-weight: 500;
  color: var(--ms-color-navy);
  text-decoration: none;
  border-radius: var(--ms-radius-md);
  transition: background-color var(--ms-transition-fast);
}
.drawer-link:hover { background: var(--ms-color-bg); }
.drawer-link--active { background: var(--ms-color-bg); font-weight: 600; }

.drawer-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid var(--ms-color-border);
}

/* ── Drawer transition ── */
.drawer-enter-active,
.drawer-leave-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.drawer-enter-from,
.drawer-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
