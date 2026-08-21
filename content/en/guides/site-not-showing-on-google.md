---
title: "My site does not show on Google: what now?"
description: "The real causes, in the order to check them — and the now common case of a site invisible to AI engines."
metaTitle: "Site not showing on Google"
kind: "guide"
order: 2
translationKey: "not-showing-on-google"
publishedAt: "2026-08-21"
updatedAt: "2026-08-21"
seo:
  keywords:
    - "my site does not show on google"
    - "site not indexed"
    - "website invisible on google"
    - "get cited by ChatGPT"
    - "AI search visibility"
---

There are two situations behind that sentence, and they share neither cause nor
urgency.

**The site has never appeared.** That is almost always technical, and generally
fixable quickly.

**The site used to appear and no longer does.** That is an accident, and it has a
date. Finding that date is the first job, because it names the culprit: a rebuild,
a change of host, an update.

## How do you check in thirty seconds whether you are indexed?

Type `site:` followed by your address into Google, with no space — for example
`site:my-company.com`. You get the list of pages Google knows about.

No result means Google has recorded **nothing**: the problem is indexing, not
ranking. A handful of results when your site has many more means part of it is
blocked. All your pages present, but nowhere to be found on your keywords: that is
a positioning problem, an entirely different subject on an entirely different
timescale.

That distinction matters. It separates a problem fixable in a day from work
measured in months.

## The real causes, in the order to check them

**The site forbids indexing.** A box ticked during the build and never unticked at
launch — the most frequent cause, and the easiest to fix. A misconfigured
`robots.txt` or a forgotten `noindex` tag produce the same effect.

**The site is too recent.** A few days to a few weeks is normal. Nothing really
shortens it, other than declaring the site in Google Search Console and supplying a
sitemap.

**Content only appears once JavaScript has run.** The robot sees an empty page.
Common on sites built with modern tooling, and on many automatically generated
sites.

**Content is too thin or duplicated.** Three pages of generic text bring nothing
Google does not already have. It sometimes records them, and never shows them.

**You are searching for the wrong term.** Many owners test their trading name,
which nobody else types. That is not a search problem, it is an awareness problem.

## And if it is your business, not your site, that does not appear?

That case is different and very widespread. When a customer searches your trade
followed by your town, what appears first is not a website: it is the map, with
business profiles.

If you have no profile, you are absent from that area whatever your site does. If
you have one but the **primary category** is badly chosen, you are absent from the
searches that matter — a joinery listed as "furniture shop" does not come up for
"joiner".

It is free, it is quick, and for a local business it often weighs more than the
site itself.

## The now common case: invisible to AI

A second kind of invisibility has appeared, and almost nobody measures it.

More and more people no longer search a list of links: they ask ChatGPT, or
Perplexity, or read the summary Google shows above the results. Being cited there
does not follow quite the same rules.

The technical point is simple and blunt: **AI crawlers do not execute JavaScript**.
An analysis covering more than 500 million requests from these crawlers found no
trace of execution. A site whose content appears after loading can therefore rank
normally on Google — whose crawler does render — and be **a blank page** to
ChatGPT, Claude and Perplexity.

Second point, counter-intuitive: many sites blocked AI crawlers in 2023 and 2024 to
protect their content, and excluded themselves from **citations** along the way.
The crawlers that train models and the ones that fetch an answer are not the same;
blocking them in one gesture amounts to refusing to be recommended.

And one thing that does nothing, whatever you read: the `llms.txt` file. Across more
than 500 million AI crawler visits observed over 90 days, only 408 requested it, and
no major vendor commits to reading it. What works is more mundane: an ordinary page,
served as HTML readable without JavaScript, declared in the sitemap.

The subject has its own analysis, with figures and sources:
[ChatGPT visibility, what works and what does not](/en/insights/chatgpt-visibility/).

## Where should you start?

With the `site:` check, which takes thirty seconds and directs everything else.
Then with the business profile if your customers are local.

If you want to know precisely what search engines see — and what AI engines see,
which almost no tool measures — that is what the diagnosis I produce covers. It is
offered free and rests on measurements, not impressions.
