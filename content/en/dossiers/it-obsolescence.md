---
title: "IT obsolescence: what it really costs you"
description: "End of support breaks nothing on the day. It turns your estate into attack surface, on a deadline you no longer set."
metaTitle: "Managing IT obsolescence"
kind: "dossier"
order: 3
translationKey: "it-obsolescence"
publishedAt: "2026-08-21"
updatedAt: "2026-08-21"
seo:
  keywords:
    - "IT obsolescence"
    - "end of support software"
    - "obsolescence management plan"
    - "unsupported systems security risk"
    - "NIS2 obsolescence"
sources:
  - label: "ANSSI / CERT-FR — Panorama de la cybermenace 2025"
    url: "https://www.cert.ssi.gouv.fr/uploads/CERTFR-2026-CTI-002.pdf"
    date: "2026"
  - label: "Verizon — 2026 Data Breach Investigations Report"
    url: "https://www.verizon.com/about/news/breach-industry-wide-dbir-finds"
    date: "2026"
  - label: "Microsoft — Windows 10 support has ended on October 14, 2025"
    url: "https://support.microsoft.com/en-us/windows/deployment/updates-lifecycle/windows-10-support-has-ended-on-october-14-2025"
    date: "2025"
  - label: "ANSSI — Cartographie du système d'information, guide d'élaboration en cinq étapes"
    url: "https://messervices.cyber.gouv.fr/documents-guides/20181213_anssi_guide_cartographie_v1b.pdf"
    date: "2018"
  - label: "MITRE ATT&CK — Campaign C0062"
    url: "https://attack.mitre.org/campaigns/C0062/"
    date: "2025"
---

IT obsolescence is the one major risk in an information system that has **no symptom**. An
application past end of support runs exactly as it did the day before. It keeps delivering
the expected service, without slowdown, without an error message, sometimes for years.

That is precisely what makes it hard to fund. There is no incident to show, so no urgency
to invoke — until the day there is one, and it is too late to choose your own timetable.

## What exactly is IT obsolescence?

It is neither a failure nor a slowdown: it is **the end of the vendor's commitment to fix
flaws**. The software does not degrade; the world around it keeps moving.

Three states are worth separating, and they are routinely confused:

- **Supported** — the vendor publishes security fixes. The only healthy situation.
- **Extended support** — the vendor publishes critical fixes only, usually for a fee and
  for a bounded period. That is bought time, not a solution.
- **Out of support** — no more fixes. Every vulnerability published from then on stays
  open permanently.

Moving from the first state to the third is a **date known well in advance**, often years.
That is what makes obsolescence unlike every other risk: it is the only one you can plan
with certainty, and it is the one least planned for.

## Why has obsolescence become the leading cyber risk?

Because attackers changed their entry point.

For the **first time in the report's nineteen-year history**, the 2026 edition of
Verizon's *Data Breach Investigations Report* ranks **vulnerability exploitation as the
leading initial access vector, at 31 % of breaches** — ahead of stolen credentials, which
had dominated until then. The same report notes that AI on the attacker's side is
shrinking the defence window "from months to mere hours".

France's cyber agency describes the same mechanics: the rate at which vulnerabilities are
published has grown **18 % per year since 2020**, and **about 29 %** of those exploited in
2025 were exploited **on the very day they were published, or before**.

Put the two ends together. On one side, remediation measured in weeks. On the other,
exploitation measured in hours. An up-to-date estate absorbs that gap because all it has
to do is apply a patch. An obsolete estate cannot: **there is no patch to apply.**

Add that automation now sits on both sides: campaign **C0062** in MITRE ATT&CK, documented
in late 2025, targeted around thirty organisations with **80 to 90 % of operations carried
out autonomously** by an agent. An automated sweep makes no distinction between a large
group and a small business: it is looking for a version string.

## How long do you have after end of support?

Less than you think, and the best-documented case shows it. Support for **Windows 10 ended
on 14 October 2025**: Microsoft states that from that date, technical assistance, feature
updates and **security updates** stop. The consumer extended security updates programme
runs **until 12 October 2027**.

That second date is the real trap. It creates a feeling of comfortable margin, when it
only covers fixes deemed critical, with no assistance and no functional correction. It
buys time to migrate, not time to wait. And on the day it expires, there is no net at all.

## What does regulation change?

It shifts the burden, in both directions.

**NIS2** widens the French regulatory perimeter from roughly 500 entities to some fifteen
thousand, with penalty ceilings set by the directive at **€10 M or 2 % of worldwide
turnover** for essential entities, and accountability explicitly carried by the management
body. As I write, the French transposition law has not yet been promulgated: the deadline
is coming, it has not passed.

**The Cyber Resilience Act** acts on your suppliers. ANSSI notes that from **11 December
2027**, manufacturers of products with digital elements will have to identify and document
their products' components, fix vulnerabilities without delay, and **distribute patches
without delay**. Good news in the medium term: the market will get healthier. Immediate
consequence, however: a product whose supplier cannot meet those obligations becomes a
compliance problem, not merely a technical one.

## How do you build an obsolescence management plan?

In four moves, none of them technical to begin with.

1. **Inventory.** What runs, which version, and its end-of-support date. That third column
   is the one missing everywhere, and the only one that turns worry into a calendar.
2. **Map the dependencies.** A component past end of support is not an isolated problem:
   it carries applications. The number of applications carried sets the priority, not the
   age of the component.
3. **Schedule.** Every item gets an exit date, aligned on its real end of support rather
   than on team availability. A plan without dates is not a plan.
4. **Decommission.** A migration that leaves the old system running "just in case" has
   solved nothing: it has doubled the attack surface. Switching off is part of the batch.

The first two steps are high-volume, repetitive and verifiable — exactly the work profile
where AI assistance collapses the unit cost, and the reason an obsolescence plan has
become fundable when it was not three years ago.

## Where should you start?

With the "end of support" column of your inventory. If it does not exist, everything else
is opinion.

It fills in quickly, it needs no tool, and it immediately produces the only list that
matters: what is **exposed to the internet and already out of support**. That list is
short, it is urgent, and it can be dealt with independently of the rest of the programme.
