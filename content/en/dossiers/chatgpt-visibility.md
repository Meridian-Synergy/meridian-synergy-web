---
title: "ChatGPT visibility: what actually works, measured"
description: "How ChatGPT picks its sources, what makes a site invisible to it, and which widely quoted figures are worth nothing."
metaTitle: "ChatGPT visibility, measured"
kind: "dossier"
order: 4
translationKey: "chatgpt-visibility"
publishedAt: "2026-08-21"
updatedAt: "2026-08-21"
seo:
  keywords:
    - "ChatGPT visibility"
    - "get cited by ChatGPT"
    - "generative engine optimisation"
    - "AI search visibility"
    - "llms.txt"
sources:
  - label: "Vercel & MERJ — The rise of the AI crawler"
    url: "https://vercel.com/blog/the-rise-of-the-ai-crawler"
  - label: "OpenAI — Overview of OpenAI crawlers"
    url: "https://developers.openai.com/api/docs/bots"
  - label: "Google — AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Search Engine Land — Does llms.txt matter?"
    url: "https://searchengineland.com/does-llms-txt-matter-467740"
  - label: "Search Engine Land — Inside ChatGPT's retrieval stack"
    url: "https://searchengineland.com/chatgpt-retrieval-stack-index-cache-pages-485036"
    date: "2026"
---

The subject is young, and the volume of assertion about it far exceeds the volume
of measurement. This piece states only what can be verified, and flags explicitly
what cannot — including where that contradicts the pages currently ranking best on
the question.

## How does ChatGPT pick its sources?

Two mechanisms have to be separated first, because they are constantly conflated.

**Training memory.** The model read the web at a given moment. It can mention your
company without ever fetching your site. That is the most fragile position there
is: it does not update, it does not depend on you, and it disappears with the next
model.

**Retrieval.** When the question calls for it, ChatGPT fetches pages and answers
from them. That is the only half where your site does any work, and the only half
you have a grip on.

The practical consequence is counter-intuitive: **a brand can be cited without its
domain ever being retrieved**. A serious audit separates the two; most commercial
pitches merge them.

## Do you need to be in Bing?

This is the question nearly every page settles too quickly, in one direction or
the other.

ChatGPT search originally ran on Bing's index. Since then OpenAI has operated
**its own crawler and its own index**, and publisher agreements have been added on
top. The defensible reading today is a **blended stack**: the dependency on Bing
has **loosened rather than disappeared**.

What that means concretely: registering your site with Bing Webmaster Tools is
still worth the half hour, but it is no longer the single lever it was described
as in 2024. A page selling you "Bing optimisation" as the key to ChatGPT
visibility is selling an architecture that has changed.

## Why can a site rank on Google and be invisible to ChatGPT?

This is the most important technical point here, and the only genuinely binary
one.

**AI crawlers do not execute JavaScript.** The joint Vercel and MERJ analysis,
covering **more than 500 million GPTBot fetches**, found **no evidence of
execution at all**. The crawler does fetch JavaScript files — around 11.5 % of
requests — but never runs them. The finding extends to `ClaudeBot` and
`PerplexityBot`.

The exception is Gemini, which inherits Googlebot's rendering infrastructure.

The consequence is blunt: if your page content only appears once JavaScript has
run — a catalogue loaded by API call, prices rendered afterwards, an accordion
whose contents mount on open — your site can rank normally on Google, whose
crawler does render, and be **a blank page** to ChatGPT, Claude and Perplexity.

It is checkable in one command, with no paid tool: request the page while
presenting as `GPTBot`, strip scripts and tags, count what is left. A number close
to zero means invisible.

## Should you create an `llms.txt` file?

**No.** And this is where this piece contradicts head-on several of the pages
ranking best on the query, which still recommend it.

The available measurements converge and are severe. Across **more than 500 million
AI bot visits** observed over 90 days, **408** targeted an `llms.txt`. Ahrefs, over
137,000 sites, finds that **97 % of those files received no traffic**. SE Ranking
measures roughly **10 % adoption** across 300,000 domains: one site in ten has
posted one, and nobody reads it. No major vendor — OpenAI, Google, Anthropic,
Meta, Mistral — has committed to consuming it, and John Mueller publicly compared
it to the `meta keywords` tag.

What works instead is more mundane, which is precisely why it sells badly: **an
ordinary page**, served as HTML readable without JavaScript, declared in the
sitemap, and linked from the rest of the site. The file nobody reads becomes a URL
every crawler reads.

## What are the percentages you read everywhere worth?

Not much, and it helps to know what produces them.

The field is saturated with precise-looking figures — this factor supposedly
accounts for 55 % of citation probability, that one for 14 %. They almost always
come from **tool vendors**, who have a direct commercial interest in demonstrating
that everything has changed and a subscription is required. Some are credited to
no source at all.

The most telling detail is that one of the best-ranking pages on this query itself
writes that such percentages "rest on no publicly verifiable study" — in an
article that quotes one. That is not dishonesty; it is the real difficulty of the
subject. Something has to be written, and independent measurement does not exist
yet.

The rule I apply, and that you can apply without being technical: before accepting
a figure on this subject, ask **who produced it** and **what they sell**. The
robust facts in this piece — no JavaScript execution, the inertia of `llms.txt`,
the independence of the agents — come from server log analysis and vendor
documentation, not from marketing studies.

## What can actually be measured, and what cannot?

Two different questions, and only one is within reach without a subscription.

**"Am I cited?"** — querying the models dozens of times, engine by engine, is
expensive and needs a dedicated tool. And there is **no single ranking**: the same
site can be highly visible on one engine and absent from another. Any metric
aggregated over "the AIs" is misleading.

**"Can I be?"** — this is verifiable for free, and it is the half that yields
actions rather than a score: text actually served to crawlers, agents named in
`robots.txt`, coherent structured data, a canonical reference page, an up-to-date
sitemap.

One point almost nobody makes: **two named agents do not obey `robots.txt`**.
OpenAI writes that its rules "may not apply" to `ChatGPT-User`, and Perplexity
that `Perplexity-User` generally ignores the file — in both cases because a person
triggered the fetch. Declaring them is still worth doing, but it is an intention,
not a control.

And an expensive trap: many sites blocked training crawlers in 2023 and 2024 to
protect their content, and excluded themselves from **citation** along the way.
These are not the same agents, and OpenAI states that each setting is independent
of the others. A `Disallow` placed under `User-agent: *` blocks all of them.

## Where should you start?

With measuring the text served without JavaScript. It is free, it takes a minute,
and it is binary: as long as it fails, everything else is decoration.

Then with `robots.txt`, naming the search agents explicitly so the intent survives
the next refactor.

That is what my diagnosis covers — and it tells you whether you **can** be cited,
never whether you **are**. Anyone promising you the second measurement for free
has not made it.
