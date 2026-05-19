import { fileURLToPath } from 'node:url'
import { readdirSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'

function contentSlugs(dir: string): string[] {
  try { return readdirSync(dir).map(f => f.replace('.md', '')) } catch { return [] }
}

const frServices  = contentSlugs('./content/fr/services')
const enServices  = contentSlugs('./content/en/services')
const frUseCases  = contentSlugs('./content/fr/cas-usage')
const enUseCases  = contentSlugs('./content/en/cas-usage')
const drones      = contentSlugs('./content/fr/drones')

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
  ],

  site: {
    url: 'https://meridian-synergy.com',
    name: 'Meridian Synergy',
    defaultLocale: 'fr',
  },

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
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
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
      crawlLinks: true,
      routes: [
        // Static pages — FR (default) + EN
        '/', '/en/',
        '/services/', '/en/services/',
        '/cas-usage/', '/en/use-case/',
        '/drones/', '/en/drones/',
        '/a-propos/', '/en/a-propos/',
        '/contact/', '/en/contact/',
        '/mentions-legales/', '/en/mentions-legales/',
        // Dynamic content — services
        ...frServices.map(s => `/services/${s}`),
        ...enServices.map(s => `/en/services/${s}`),
        // Dynamic content — use cases
        ...frUseCases.map(s => `/cas-usage/${s}`),
        ...enUseCases.map(s => `/en/use-case/${s}`),
        // Dynamic content — drones (same slugs FR/EN)
        ...drones.map(s => `/drones/${s}`),
        ...drones.map(s => `/en/drones/${s}`),
      ],
    },
  },

  routeRules: {
    // Services: EN slugs differ from FR — redirect stray FR slugs on EN
    '/services/thermal-inspection':          { redirect: { to: '/services/audit-thermique',            statusCode: 301 } },
    '/services/infrastructure-inspection':   { redirect: { to: '/services/inspection-infrastructure',  statusCode: 301 } },
    '/services/security-surveillance':       { redirect: { to: '/services/securite-surveillance',      statusCode: 301 } },
    '/services/topography-mapping':          { redirect: { to: '/services/topographie-cartographie',   statusCode: 301 } },
    '/en/services/audit-thermique':          { redirect: { to: '/en/services/thermal-inspection',      statusCode: 301 } },
    '/en/services/securite-surveillance':    { redirect: { to: '/en/services/security-surveillance',   statusCode: 301 } },
    '/en/services/topographie-cartographie': { redirect: { to: '/en/services/topography-mapping',      statusCode: 301 } },
    '/en/services/inspection-infrastructure':{ redirect: { to: '/en/services/infrastructure-inspection', statusCode: 301 } },
    // Legacy: /en/cas-usage/* → /en/use-case/* (hub and old cross-locale redirects)
    '/en/cas-usage':                              { redirect: { to: '/en/use-case',                              statusCode: 301 } },
    '/en/cas-usage/cover-crops':                  { redirect: { to: '/en/use-case/cover-crops',                  statusCode: 301 } },
    '/en/cas-usage/solar-panels':                 { redirect: { to: '/en/use-case/solar-panels',                 statusCode: 301 } },
    '/en/cas-usage/wind-turbine-inspection':      { redirect: { to: '/en/use-case/wind-turbine-inspection',      statusCode: 301 } },
    '/en/cas-usage/construction-monitoring':      { redirect: { to: '/en/use-case/construction-monitoring',      statusCode: 301 } },
    '/en/cas-usage/vineyard-ndvi':                { redirect: { to: '/en/use-case/vineyard-ndvi',                statusCode: 301 } },
    '/en/cas-usage/real-estate-aerial':           { redirect: { to: '/en/use-case/real-estate-aerial',           statusCode: 301 } },
    '/en/cas-usage/building-thermal-inspection':  { redirect: { to: '/en/use-case/building-thermal-inspection',  statusCode: 301 } },
    '/en/cas-usage/heat-network-inspection':      { redirect: { to: '/en/use-case/heat-network-inspection',      statusCode: 301 } },
    '/en/cas-usage/power-line-inspection':        { redirect: { to: '/en/use-case/power-line-inspection',        statusCode: 301 } },
    '/en/cas-usage/bridge-inspection':            { redirect: { to: '/en/use-case/bridge-inspection',            statusCode: 301 } },
    '/en/cas-usage/industrial-chimney-inspection':{ redirect: { to: '/en/use-case/industrial-chimney-inspection',statusCode: 301 } },
    '/en/cas-usage/quarry-3d-modelling':          { redirect: { to: '/en/use-case/quarry-3d-modelling',          statusCode: 301 } },
    '/en/cas-usage/cadastral-survey':             { redirect: { to: '/en/use-case/cadastral-survey',             statusCode: 301 } },
    '/en/cas-usage/crop-spraying':                { redirect: { to: '/en/use-case/crop-spraying',                statusCode: 301 } },
    '/en/cas-usage/industrial-site-surveillance': { redirect: { to: '/en/use-case/industrial-site-surveillance', statusCode: 301 } },
    '/en/cas-usage/event-coverage':               { redirect: { to: '/en/use-case/event-coverage',               statusCode: 301 } },
    // Cross-locale: FR slug on EN → correct EN slug on /en/use-case/
    '/en/use-case/couverts-vegetaux':             { redirect: { to: '/en/use-case/cover-crops',                  statusCode: 301 } },
    '/en/use-case/panneaux-solaires':             { redirect: { to: '/en/use-case/solar-panels',                 statusCode: 301 } },
    '/en/use-case/inspection-eoliennes':          { redirect: { to: '/en/use-case/wind-turbine-inspection',      statusCode: 301 } },
    '/en/use-case/suivi-chantier':                { redirect: { to: '/en/use-case/construction-monitoring',      statusCode: 301 } },
    '/en/use-case/viticulture-ndvi':              { redirect: { to: '/en/use-case/vineyard-ndvi',                statusCode: 301 } },
    '/en/use-case/prise-de-vue-immobilier':       { redirect: { to: '/en/use-case/real-estate-aerial',           statusCode: 301 } },
    '/en/use-case/audit-thermique-batiments':     { redirect: { to: '/en/use-case/building-thermal-inspection',  statusCode: 301 } },
    '/en/use-case/reseaux-chaleur':               { redirect: { to: '/en/use-case/heat-network-inspection',      statusCode: 301 } },
    '/en/use-case/pylones-electriques':           { redirect: { to: '/en/use-case/power-line-inspection',        statusCode: 301 } },
    '/en/use-case/ponts-ouvrages-art':            { redirect: { to: '/en/use-case/bridge-inspection',            statusCode: 301 } },
    '/en/use-case/cheminees-industrielles':       { redirect: { to: '/en/use-case/industrial-chimney-inspection',statusCode: 301 } },
    '/en/use-case/modelisation-3d-carrieres':     { redirect: { to: '/en/use-case/quarry-3d-modelling',          statusCode: 301 } },
    '/en/use-case/releve-cadastral':              { redirect: { to: '/en/use-case/cadastral-survey',             statusCode: 301 } },
    '/en/use-case/epandage-phytosanitaire':       { redirect: { to: '/en/use-case/crop-spraying',                statusCode: 301 } },
    '/en/use-case/surveillance-sites-industriels':{ redirect: { to: '/en/use-case/industrial-site-surveillance', statusCode: 301 } },
    '/en/use-case/couverture-evenementielle':     { redirect: { to: '/en/use-case/event-coverage',               statusCode: 301 } },
    // Cross-locale: EN slug on FR /cas-usage/ → correct FR slug
    '/cas-usage/cover-crops':                { redirect: { to: '/cas-usage/couverts-vegetaux',           statusCode: 301 } },
    '/cas-usage/solar-panels':               { redirect: { to: '/cas-usage/panneaux-solaires',           statusCode: 301 } },
    '/cas-usage/wind-turbine-inspection':    { redirect: { to: '/cas-usage/inspection-eoliennes',        statusCode: 301 } },
    '/cas-usage/construction-monitoring':    { redirect: { to: '/cas-usage/suivi-chantier',              statusCode: 301 } },
    '/cas-usage/vineyard-ndvi':              { redirect: { to: '/cas-usage/viticulture-ndvi',            statusCode: 301 } },
    '/cas-usage/real-estate-aerial':         { redirect: { to: '/cas-usage/prise-de-vue-immobilier',    statusCode: 301 } },
    '/cas-usage/building-thermal-inspection':{ redirect: { to: '/cas-usage/audit-thermique-batiments',  statusCode: 301 } },
    '/cas-usage/heat-network-inspection':    { redirect: { to: '/cas-usage/reseaux-chaleur',            statusCode: 301 } },
    '/cas-usage/power-line-inspection':      { redirect: { to: '/cas-usage/pylones-electriques',        statusCode: 301 } },
    '/cas-usage/bridge-inspection':          { redirect: { to: '/cas-usage/ponts-ouvrages-art',         statusCode: 301 } },
    '/cas-usage/industrial-chimney-inspection':{ redirect: { to: '/cas-usage/cheminees-industrielles',  statusCode: 301 } },
    '/cas-usage/quarry-3d-modelling':        { redirect: { to: '/cas-usage/modelisation-3d-carrieres',  statusCode: 301 } },
    '/cas-usage/cadastral-survey':           { redirect: { to: '/cas-usage/releve-cadastral',           statusCode: 301 } },
    '/cas-usage/crop-spraying':              { redirect: { to: '/cas-usage/epandage-phytosanitaire',    statusCode: 301 } },
    '/cas-usage/industrial-site-surveillance':{ redirect: { to: '/cas-usage/surveillance-sites-industriels', statusCode: 301 } },
    '/cas-usage/event-coverage':             { redirect: { to: '/cas-usage/couverture-evenementielle',  statusCode: 301 } },
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
    strategy: 'prefix_and_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'ms-locale',
      redirectOn: 'all',
      alwaysRedirect: false,
      fallbackLocale: 'en',
    },
    vueI18n: './i18n.config.ts',
    bundle: { optimizeTranslationDirective: false },
    customRoutes: 'config',
    pages: {
      'cas-usage/index': { fr: '/cas-usage', en: '/use-case' },
      'cas-usage/[slug]': { fr: '/cas-usage/[slug]', en: '/use-case/[slug]' },
    },
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-01-01',
})
