---
title: "Application mapping: what it must contain"
description: "Without a map, no batch can be isolated and no debt repaid. What the French cyber agency requires, and what kills a map."
metaTitle: "Application mapping for your estate"
kind: "dossier"
translationKey: "application-mapping"
publishedAt: "2026-08-21"
updatedAt: "2026-08-21"
seo:
  keywords:
    - "application mapping"
    - "information system mapping"
    - "application landscape inventory"
    - "IT asset inventory"
    - "enterprise architecture mapping"
sources:
  - label: "ANSSI — Cartographie du système d'information, guide d'élaboration en cinq étapes (v1b)"
    url: "https://messervices.cyber.gouv.fr/documents-guides/20181213_anssi_guide_cartographie_v1b.pdf"
    date: "2018"
  - label: "ANSSI / CERT-FR — Panorama de la cybermenace 2025"
    url: "https://www.cert.ssi.gouv.fr/uploads/CERTFR-2026-CTI-002.pdf"
    date: "2026"
  - label: "McKinsey — Tech debt: reclaiming tech equity"
    url: "https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/tech-debt-reclaiming-tech-equity"
---

Application mapping has a bad reputation, and it has earned it. Too many IT departments
remember a six-month exercise that produced a handsome document, out of date before it
was circulated, that nobody ever opened again.

It is nonetheless the one deliverable everything else depends on. You do not repay a
technical debt you have not located, you do not split a system into batches when you do
not know its dependencies, and you do not urgently patch an asset whose owner nobody can
name. So the question is not whether you need a map, but **why the previous ones died**.

## What is an application map actually for?

Three things, and they are worth separating because they do not demand the same level of
detail.

**Deciding.** Knowing what exists, what it costs, what is redundant. This is the use that
justifies the budget, and the one that needs the least technical precision.

**Isolating.** A modernisation batch can only be carved out if you know what calls what.
This is where the map becomes an engineering tool rather than a presentation asset.

**Reacting.** When a vulnerability is published, the only question that matters is: are
we exposed, and where? France's cyber agency reports in its *Panorama de la cybermenace
2025* that **more than 6,200 assets in France were still affected at the end of 2025** by
the main vulnerabilities exploited since 2023 and 2024. These are not unknown flaws: the
patches existed, on machines nobody could tie back to an owner.

## What must a map actually contain?

ANSSI, the French national cybersecurity agency, publishes a five-step guide that settles
the question of content. A map is made of **three visions moving progressively from
business to technical**, broken down into six views:

- **Business vision** — the *ecosystem view*, showing the entities and systems the estate
  interacts with, and the *business view*, representing it through its main processes and
  information.
- **Application vision** — the *applications view*, describing software components, the
  services they offer and the data flows between them, and the *administration view*,
  listing administrative perimeters and privilege levels.
- **Infrastructure vision** — the *logical infrastructure view* (segmentation, address
  ranges, filtering) and the *physical infrastructure view*.

Two field remarks on that list. First, the **administration view** is the one everyone
skips, and it is the one an attacker cares about most: it says who can do what, and
therefore which account is worth stealing. Second, these views do not cost the same: the
business vision is built in workshops, the infrastructure vision is extracted from tools.
Trying to produce both at the same granularity is the surest way never to finish.

## Why are existing maps wrong?

Because their construction was funded and their upkeep was not.

A map is not a document, it is a **state**. It describes a system that changes every week:
a server added, a component replaced, a flow opened to fix an incident and never closed
again. A document produced once is wrong at the first change, and wrong **silently** —
nothing signals its drift from reality.

That is what makes the exercise different today. Inventory work, reconciling sources and
keeping entries current is repetitive, high-volume and verifiable: exactly the task
profile where AI assistance changes the unit cost. It is not building the map that
becomes affordable, it is **maintaining it**. And maintenance was the real obstacle.

## Do you need a tool, or a spreadsheet?

A spreadsheet, to start. No exception.

A mapping tool solves a problem you do not have yet: **representation**. Your current
problem is **collection** — knowing what runs, who owns it, what it depends on. That is
done in a spreadsheet, with a handful of columns and naming discipline.

A tool becomes useful when two conditions hold: the data is already fed automatically
from authoritative sources, and several teams need to consult the map without stepping on
each other. Buying the tool before you have the data means buying a handsome display of
emptiness — and turning a governance problem into an IT project.

## How long does it take to produce one?

For a first usable inventory over a bounded perimeter, count weeks, not months. The
duration almost never depends on the technology: it depends on how many people you have
to interview and how available they are.

The trap is wanting to map the whole estate at once. ANSSI explicitly recommends
**defining the perimeter to be mapped** in the very first step, and setting a trajectory.
A partial, accurate map is worth infinitely more than a complete, stale one.

## Where should the map be stored?

Here is the least intuitive recommendation in the ANSSI guide, and the one almost nobody
applies: **the map must not be stored on the information system it describes**. The
reasoning is plain — an attacker who has got in would find the complete plan of their
target, dependencies and privileges included.

The guide also recommends keeping a backup accessible **during a network outage**, an
up-to-date paper copy being acceptable. It reads as a quaint precaution until the day of
a crisis, when you discover that the document explaining how everything reconnects is
stored inside the thing that just went down.

## How does this connect to technical debt?

Directly: the map is what makes debt **quantifiable**. As long as you do not know how many
applications rest on an out-of-support component, debt stays a worry; once the map exists,
it becomes a budget line with a scope and a deadline.

It also protects against the opposite error — modernising what is visible rather than what
weighs. Without a map, the arbitration goes to whichever application has the loudest user.
