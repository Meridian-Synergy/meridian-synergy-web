import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
  ],

  alias: {
    '@meridian-synergy/ui': fileURLToPath(new URL('./lib/ui.ts', import.meta.url)),
  },

  app: {
    head: {
      meta: [
        { property: 'og:site_name', content: 'Meridian Synergy' },
        { property: 'og:image', content: 'https://meridian-synergy.com/og-default.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://meridian-synergy.com/og-default.png' },
      ],
      script: [
        {
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-58NSHG6C');`,
        },
      ],
      link: [
        { rel: 'sitemap', type: 'application/xml', href: 'https://meridian-synergy.com/sitemap.xml' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600&family=Barlow:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Space+Mono&display=swap',
        },
      ],
    },
  },

  build: {
    transpile: ['meridian-synergy-ui'],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  nitro: {
    preset: 'github-pages',
    prerender: {
      failOnError: false,
    },
  },

  routeRules: {
    '/en/cas-usage/couverts-vegetaux': { redirect: { to: '/en/cas-usage/cover-crops',         statusCode: 301 } },
    '/cas-usage/cover-crops':          { redirect: { to: '/cas-usage/couverts-vegetaux',        statusCode: 301 } },
    '/en/services/audit-thermique':          { redirect: { to: '/en/services/thermal-inspection',      statusCode: 301 } },
    '/en/services/securite-surveillance':    { redirect: { to: '/en/services/security-surveillance',   statusCode: 301 } },
    '/en/services/topographie-cartographie': { redirect: { to: '/en/services/topography-mapping',      statusCode: 301 } },
    '/en/services/inspection-infrastructure':{ redirect: { to: '/en/services/infrastructure-inspection', statusCode: 301 } },
  },

  components: {
    dirs: [{ path: '~/components', pathPrefix: false }],
  },

  i18n: {
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français' },
      { code: 'en', language: 'en-US', name: 'English' },
    ],
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    vueI18n: './i18n.config.ts',
    bundle: { optimizeTranslationDirective: false },
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-01-01',
})
