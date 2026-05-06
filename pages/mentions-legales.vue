<script setup lang="ts">
import { MsBreadcrumb } from '@meridian-synergy/ui'

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('legalPage.meta.title'),
  description: () => t('legalPage.meta.description'),
})
</script>

<template>
  <div>
    <section class="hero">
      <div class="container">
        <MsBreadcrumb :crumbs="[{ label: t('breadcrumb.home'), href: localePath('/') }, { label: t('footer.legal') }]" />
        <h1 class="hero-title">{{ t('legalPage.title') }}</h1>
      </div>
    </section>

    <section class="content-section">
      <div class="container">
        <div class="legal-body">

          <div class="legal-block">
            <h2>1. Éditeur du site</h2>
            <p>Le site <strong>meridian-synergy.com</strong> est édité par :</p>
            <ul>
              <li><strong>Raison sociale :</strong> Meridian Synergy</li>
              <li><strong>Forme juridique :</strong> SAS (Société par Actions Simplifiée)</li>
              <li><strong>Capital social :</strong> 1 000 €</li>
              <li><strong>SIREN :</strong> 101 847 895</li>
              <li><strong>RCS :</strong> Nevers 101 847 895</li>
              <li><strong>Siège social :</strong> 2 rue des Cages, 58200 Saint-Père</li>
              <li><strong>E-mail :</strong> <a href="mailto:contact@meridian-synergy.com">contact@meridian-synergy.com</a></li>
              <li><strong>Téléphone :</strong> 07 66 97 48 74</li>
            </ul>
          </div>

          <div class="legal-block">
            <h2>2. Directeur de la publication</h2>
            <p>Denis Gosset</p>
          </div>

          <div class="legal-block">
            <h2>3. Hébergement</h2>
            <p>Ce site est hébergé par :</p>
            <ul>
              <li><strong>Société :</strong> GitHub, Inc.</li>
              <li><strong>Adresse :</strong> 88 Colin P Kelly Jr St, San Francisco, CA 94107, États-Unis</li>
              <li><strong>Site web :</strong> <a href="https://pages.github.com" target="_blank" rel="noopener noreferrer">pages.github.com</a></li>
            </ul>
          </div>

          <div class="legal-block">
            <h2>4. Propriété intellectuelle</h2>
            <p>
              L'ensemble des éléments constituant ce site (textes, images, graphismes, logo, icônes, sons, logiciels, etc.)
              est la propriété exclusive de Meridian Synergy ou de ses partenaires. Toute reproduction, représentation,
              modification, publication ou adaptation de tout ou partie de ces éléments, quel que soit le moyen ou le procédé
              utilisé, est interdite sauf autorisation écrite préalable de Meridian Synergy.
            </p>
            <p>
              Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient est considérée comme
              constitutive d'une contrefaçon et passible de poursuites judiciaires conformément aux dispositions des articles
              L.335-2 et suivants du Code de Propriété Intellectuelle.
            </p>
          </div>

          <div class="legal-block">
            <h2>5. Données personnelles</h2>
            <p>
              Ce site ne collecte pas de données personnelles via des formulaires. Aucun cookie de traçage ou de ciblage
              publicitaire n'est déposé sur votre appareil.
            </p>
            <p>
              Si vous nous contactez par e-mail ou via WhatsApp, les informations que vous communiquez sont utilisées
              exclusivement pour répondre à votre demande et ne sont pas transmises à des tiers.
            </p>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679) et à la loi Informatique
              et Libertés, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer
              ce droit, contactez-nous à l'adresse :
              <a href="mailto:contact@meridian-synergy.com">contact@meridian-synergy.com</a>.
            </p>
          </div>

          <div class="legal-block">
            <h2>6. Liens hypertextes</h2>
            <p>
              Ce site peut contenir des liens vers des sites tiers. Meridian Synergy n'exerce aucun contrôle sur ces sites
              et décline toute responsabilité quant à leur contenu ou à leur politique de confidentialité.
            </p>
            <p>
              Tout lien hypertexte pointant vers meridian-synergy.com doit faire l'objet d'une autorisation préalable
              de Meridian Synergy.
            </p>
          </div>

          <div class="legal-block">
            <h2>7. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français
              seront seuls compétents.
            </p>
          </div>

          <p class="legal-date">Dernière mise à jour : mai 2026</p>

        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ── Hero ── */
.hero {
  background: var(--ms-color-bg);
  padding: 56px 0;
  border-bottom: 1px solid var(--ms-color-border);
}
.hero-title {
  font-family: var(--ms-font-display);
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: var(--ms-color-navy);
  letter-spacing: -0.03em;
  margin: 16px 0 0;
}

/* ── Content ── */
.content-section { padding: 64px 0 80px; background: var(--ms-color-white); }

.legal-body {
  max-width: 760px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.legal-block h2 {
  font-family: var(--ms-font-display);
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--ms-color-navy);
  letter-spacing: -0.01em;
  margin: 0 0 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--ms-color-border);
}

.legal-block p {
  font-size: 0.9375rem;
  color: var(--ms-color-muted);
  line-height: 1.75;
  margin: 0 0 12px;
}
.legal-block p:last-child { margin-bottom: 0; }

.legal-block ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.legal-block li {
  font-size: 0.9375rem;
  color: var(--ms-color-muted);
  line-height: 1.6;
  padding-left: 16px;
  position: relative;
}
.legal-block li::before {
  content: '–';
  position: absolute;
  left: 0;
  color: var(--ms-color-border);
}

.legal-block a {
  color: var(--ms-color-sky);
  text-decoration: none;
}
.legal-block a:hover { text-decoration: underline; }

.legal-date {
  font-size: 0.8125rem;
  color: var(--ms-color-muted);
  opacity: 0.6;
  margin: 0;
}
</style>
