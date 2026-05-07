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
    '/services/thermal-inspection':          { redirect: { to: '/services/audit-thermique',            statusCode: 301 } },
    '/services/infrastructure-inspection':   { redirect: { to: '/services/inspection-infrastructure',  statusCode: 301 } },
    '/services/security-surveillance':       { redirect: { to: '/services/securite-surveillance',      statusCode: 301 } },
    '/services/topography-mapping':          { redirect: { to: '/services/topographie-cartographie',   statusCode: 301 } },
    '/en/cas-usage/couverts-vegetaux':       { redirect: { to: '/en/cas-usage/cover-crops',              statusCode: 301 } },
    '/cas-usage/cover-crops':                { redirect: { to: '/cas-usage/couverts-vegetaux',             statusCode: 301 } },
    '/en/cas-usage/panneaux-solaires':       { redirect: { to: '/en/cas-usage/solar-panels',               statusCode: 301 } },
    '/cas-usage/solar-panels':               { redirect: { to: '/cas-usage/panneaux-solaires',             statusCode: 301 } },
    '/en/cas-usage/inspection-eoliennes':    { redirect: { to: '/en/cas-usage/wind-turbine-inspection',    statusCode: 301 } },
    '/cas-usage/wind-turbine-inspection':    { redirect: { to: '/cas-usage/inspection-eoliennes',          statusCode: 301 } },
    '/en/cas-usage/suivi-chantier':          { redirect: { to: '/en/cas-usage/construction-monitoring',    statusCode: 301 } },
    '/cas-usage/construction-monitoring':    { redirect: { to: '/cas-usage/suivi-chantier',                statusCode: 301 } },
    '/en/cas-usage/viticulture-ndvi':        { redirect: { to: '/en/cas-usage/vineyard-ndvi',              statusCode: 301 } },
    '/cas-usage/vineyard-ndvi':              { redirect: { to: '/cas-usage/viticulture-ndvi',              statusCode: 301 } },
    '/en/cas-usage/prise-de-vue-immobilier': { redirect: { to: '/en/cas-usage/real-estate-aerial',         statusCode: 301 } },
    '/cas-usage/real-estate-aerial':         { redirect: { to: '/cas-usage/prise-de-vue-immobilier',       statusCode: 301 } },
    '/en/services/audit-thermique':          { redirect: { to: '/en/services/thermal-inspection',      statusCode: 301 } },
    '/en/services/securite-surveillance':    { redirect: { to: '/en/services/security-surveillance',   statusCode: 301 } },
    '/en/services/topographie-cartographie': { redirect: { to: '/en/services/topography-mapping',      statusCode: 301 } },
    '/en/services/inspection-infrastructure':{ redirect: { to: '/en/services/infrastructure-inspection', statusCode: 301 } },
    '/en/cas-usage/audit-thermique-batiments':    { redirect: { to: '/en/cas-usage/building-thermal-inspection',   statusCode: 301 } },
    '/cas-usage/building-thermal-inspection':     { redirect: { to: '/cas-usage/audit-thermique-batiments',        statusCode: 301 } },
    '/en/cas-usage/reseaux-chaleur':              { redirect: { to: '/en/cas-usage/heat-network-inspection',       statusCode: 301 } },
    '/cas-usage/heat-network-inspection':         { redirect: { to: '/cas-usage/reseaux-chaleur',                  statusCode: 301 } },
    '/en/cas-usage/pylones-electriques':          { redirect: { to: '/en/cas-usage/power-line-inspection',         statusCode: 301 } },
    '/cas-usage/power-line-inspection':           { redirect: { to: '/cas-usage/pylones-electriques',              statusCode: 301 } },
    '/en/cas-usage/ponts-ouvrages-art':           { redirect: { to: '/en/cas-usage/bridge-inspection',             statusCode: 301 } },
    '/cas-usage/bridge-inspection':               { redirect: { to: '/cas-usage/ponts-ouvrages-art',               statusCode: 301 } },
    '/en/cas-usage/cheminees-industrielles':      { redirect: { to: '/en/cas-usage/industrial-chimney-inspection', statusCode: 301 } },
    '/cas-usage/industrial-chimney-inspection':   { redirect: { to: '/cas-usage/cheminees-industrielles',          statusCode: 301 } },
    '/en/cas-usage/modelisation-3d-carrieres':    { redirect: { to: '/en/cas-usage/quarry-3d-modelling',           statusCode: 301 } },
    '/cas-usage/quarry-3d-modelling':             { redirect: { to: '/cas-usage/modelisation-3d-carrieres',        statusCode: 301 } },
    '/en/cas-usage/releve-cadastral':             { redirect: { to: '/en/cas-usage/cadastral-survey',              statusCode: 301 } },
    '/cas-usage/cadastral-survey':                { redirect: { to: '/cas-usage/releve-cadastral',                 statusCode: 301 } },
    '/en/cas-usage/epandage-phytosanitaire':      { redirect: { to: '/en/cas-usage/crop-spraying',                 statusCode: 301 } },
    '/cas-usage/crop-spraying':                   { redirect: { to: '/cas-usage/epandage-phytosanitaire',          statusCode: 301 } },
    '/en/cas-usage/surveillance-sites-industriels': { redirect: { to: '/en/cas-usage/industrial-site-surveillance', statusCode: 301 } },
    '/cas-usage/industrial-site-surveillance':    { redirect: { to: '/cas-usage/surveillance-sites-industriels',   statusCode: 301 } },
    '/en/cas-usage/couverture-evenementielle':    { redirect: { to: '/en/cas-usage/event-coverage',               statusCode: 301 } },
    '/cas-usage/event-coverage':                  { redirect: { to: '/cas-usage/couverture-evenementielle',        statusCode: 301 } },
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
