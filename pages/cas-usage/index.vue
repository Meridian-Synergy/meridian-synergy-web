<script setup lang="ts">
import { MsCard, MsBadge, MsPageHero, MsCtaBanner } from '@meridian-synergy/ui'

const { t, locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('useCasesPage.meta.title'),
  description: () => t('useCasesPage.meta.description'),
})

type Locale = 'fr' | 'en'

const useCases = [
  { key: 'couverts',                    category: 'agriculture',    tags: { fr: ['Agricole', 'Semis'],            en: ['Agriculture', 'Sowing']        }, slugs: { fr: 'couverts-vegetaux',           en: 'cover-crops'                   } },
  { key: 'panneauxSolaires',            category: 'thermique',      tags: { fr: ['Énergie', 'Thermique'],         en: ['Energy', 'Thermal']             }, slugs: { fr: 'panneaux-solaires',           en: 'solar-panels'                  } },
  { key: 'eoliennes',                   category: 'infrastructure', tags: { fr: ['Énergie', 'Inspection'],        en: ['Energy', 'Inspection']          }, slugs: { fr: 'inspection-eoliennes',        en: 'wind-turbine-inspection'       } },
  { key: 'chantier',                    category: 'topographie',    tags: { fr: ['BTP', 'Cartographie'],          en: ['Construction', 'Mapping']       }, slugs: { fr: 'suivi-chantier',              en: 'construction-monitoring'       } },
  { key: 'viticultureNdvi',             category: 'agriculture',    tags: { fr: ['Agricole', 'Cartographie'],     en: ['Agriculture', 'Mapping']        }, slugs: { fr: 'viticulture-ndvi',            en: 'vineyard-ndvi'                 } },
  { key: 'immobilier',                  category: 'video',          tags: { fr: ['Immobilier', 'Prise de vue'],   en: ['Real estate', 'Aerial']         }, slugs: { fr: 'prise-de-vue-immobilier',     en: 'real-estate-aerial'            } },
  { key: 'auditThermiqueBatiments',     category: 'thermique',      tags: { fr: ['Bâtiment', 'Thermique'],        en: ['Building', 'Thermal']           }, slugs: { fr: 'audit-thermique-batiments',   en: 'building-thermal-inspection'   } },
  { key: 'reseauxChaleur',              category: 'thermique',      tags: { fr: ['Énergie', 'Bâtiment'],          en: ['Energy', 'Building']            }, slugs: { fr: 'reseaux-chaleur',             en: 'heat-network-inspection'       } },
  { key: 'pylonesElectriques',          category: 'infrastructure', tags: { fr: ['Énergie', 'Infrastructure'],    en: ['Energy', 'Infrastructure']      }, slugs: { fr: 'pylones-electriques',         en: 'power-line-inspection'         } },
  { key: 'pontsOuvragesArt',            category: 'infrastructure', tags: { fr: ['Infrastructure', 'BTP'],        en: ['Infrastructure', 'Construction'] }, slugs: { fr: 'ponts-ouvrages-art',          en: 'bridge-inspection'             } },
  { key: 'chemineesIndustrielles',      category: 'infrastructure', tags: { fr: ['Industrie', 'Infrastructure'],  en: ['Industry', 'Infrastructure']    }, slugs: { fr: 'cheminees-industrielles',     en: 'industrial-chimney-inspection' } },
  { key: 'modelisation3DCarrieres',     category: 'topographie',    tags: { fr: ['Industrie', 'BTP'],             en: ['Industry', 'Construction']      }, slugs: { fr: 'modelisation-3d-carrieres',   en: 'quarry-3d-modelling'           } },
  { key: 'releveCadastral',             category: 'topographie',    tags: { fr: ['BTP', 'Cartographie'],          en: ['Construction', 'Mapping']       }, slugs: { fr: 'releve-cadastral',            en: 'cadastral-survey'              } },
  { key: 'epandagePhytosanitaire',      category: 'agriculture',    tags: { fr: ['Agricole', 'Épandage'],         en: ['Agriculture', 'Spraying']       }, slugs: { fr: 'epandage-phytosanitaire',     en: 'crop-spraying'                 } },
  { key: 'surveillanceSites',           category: 'securite',       tags: { fr: ['Industrie', 'Sécurité'],        en: ['Industry', 'Security']          }, slugs: { fr: 'surveillance-sites-industriels', en: 'industrial-site-surveillance' } },
  { key: 'couvertureEvenementielle',    category: 'video',          tags: { fr: ['Événementiel', 'Prise de vue'], en: ['Events', 'Aerial']              }, slugs: { fr: 'couverture-evenementielle',    en: 'event-coverage'                } },
]

const items = computed(() =>
  useCases.map(uc => ({
    ...uc,
    href: locale.value === 'en' ? `/en/cas-usage/${uc.slugs.en}` : `/cas-usage/${uc.slugs.fr}`,
    tags: uc.tags[locale.value as Locale] ?? uc.tags.fr,
    title: t(`useCases.${uc.key}.title`),
    desc:  t(`useCases.${uc.key}.desc`),
    categoryLabel: t(`useCasesPage.categories.${uc.category}`),
  }))
)
</script>

<template>
  <div>
    <MsPageHero
      :crumbs="[{ label: t('breadcrumb.home'), href: localePath('/') }, { label: t('nav.useCases') }]"
      :badge="t('useCasesPage.hero.badge')"
      :title="t('useCasesPage.hero.title')"
      :desc="t('useCasesPage.hero.desc')"
    />

    <section class="grid-section">
      <div class="container">
        <div class="use-cases-grid">
          <NuxtLink
            v-for="item in items"
            :key="item.key"
            :to="item.href"
            class="card-link"
          >
            <MsCard>
              <div class="uc-body">
                <MsBadge :label="item.categoryLabel" variant="sky" :dot="false" />
                <h2 class="uc-title">{{ item.title }}</h2>
                <p class="uc-desc">{{ item.desc }}</p>
                <div v-if="item.tags?.length" class="uc-tags">
                  <span v-for="tag in item.tags" :key="tag" class="uc-tag">{{ tag }}</span>
                </div>
              </div>
              <template #footer>
                <span class="uc-more">{{ t('services.more') }} →</span>
              </template>
            </MsCard>
          </NuxtLink>
        </div>
      </div>
    </section>

    <MsCtaBanner
      :title="t('useCasesPage.contact.title')"
      :desc="t('useCasesPage.contact.desc')"
      :label="t('useCasesPage.contact.btn')"
      :href="localePath('/contact')"
    />
  </div>
</template>

<style scoped>
.grid-section {
  padding: 64px 0;
  background: var(--ms-color-white);
}

.use-cases-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
@media (min-width: 640px)  { .use-cases-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .use-cases-grid { grid-template-columns: repeat(3, 1fr); } }

.card-link {
  display: block;
  text-decoration: none;
  border-radius: var(--ms-radius-lg);
  transition: transform var(--ms-transition-base), box-shadow var(--ms-transition-base);
}
.card-link:hover { transform: translateY(-3px); box-shadow: var(--ms-shadow-md); }
.card-link:hover :deep(.ms-card) { border-color: var(--ms-color-sky); }

.uc-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 4px 0;
}
.uc-title {
  font-family: var(--ms-font-display);
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--ms-color-navy);
  margin: 0;
}
.uc-desc {
  font-size: 0.9375rem;
  color: var(--ms-color-muted);
  line-height: 1.65;
  margin: 0;
}
.uc-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.uc-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ms-color-muted);
  background: var(--ms-color-bg);
  border: 1px solid var(--ms-color-border);
  border-radius: 4px;
  padding: 2px 7px;
}
.uc-more {
  font-size: 13px;
  font-weight: 600;
  color: var(--ms-color-sky);
}
</style>
