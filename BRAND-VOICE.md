# Coastline Sound Supply — Brand Voice & Content Principles

**Internal document. Not part of the website.** It lives at the repo root
alongside `README.md`, is not in `PASSTHROUGH` in `scripts/build.py`, and so
is never copied into `dist/`. Do not link it from any page, the nav, the
footer, `sitemap.xml`, or `llms.txt`.

**Who this is for:** anyone — human or agent — writing or revising copy on
this site. Read this before editing any file under `src/pages/` or
`src/partials/`. It governs *what the words are doing*; `README.md` governs
how the site is built and `src/pages/styleguide.html` governs how it looks.

---

## 1. What the business is

Coastline Sound Supply is a two-person DJ and live-sound outfit working
across British Columbia. Grady covers Vancouver Island from Nanaimo; Dave
covers the Lower Mainland and Sea-to-Sky from Vancouver. Both have run sound
and DJ'd rooms themselves. The client always talks to the person who will
actually be behind the decks.

Three ways to book: DJ only, DJ with full sound, or sound system rental
(dry hire, with an optional operator).

---

## 2. The service hierarchy

**This ordering is the single most important thing in this document.**

1. **Non-wedding DJ bookings** — bars, clubs, festivals, private and
   corporate events. The priority.
2. **Weddings** — a real and valued revenue line, second in emphasis.
3. **Equipment-only rental** — dry hire. Real, supported, and offered last.

**Express this ordering; never state it.** No page should ever say or imply
that weddings are secondary or that rentals are a lesser product. A couple
landing on `weddings.html` must feel the page was written for them, and a
dry-hire client must feel the gear line is a genuine service, not a
consolation prize. The hierarchy is communicated through *sequence,
airtime, and vocabulary* — not through any sentence a reader could quote
back.

How that works in practice:

- **Order of nouns.** Wherever event types are listed, lead with bars,
  clubs, and festivals. Example, from the homepage hero: "Bars, clubs,
  festivals, and private events across BC."
- **Weddings stay discoverable at the site level.** Weddings are a
  significant search term, and the site as a whole must keep them findable:
  the dedicated `weddings.html` page, the nav item, the homepage card and
  link, the `<title>` and meta description of the wedding page, the wedding
  structured data, `sitemap.xml`, and `llms.txt`. Do not strip weddings out
  of the site's architecture to signal priority — that costs real traffic
  and is not the method.
- **But weddings do not belong in every piece of copy.** An individual
  sentence, hero, heading, or meta description is free to omit the word
  entirely. Coverage is a property of the site, not of each paragraph. The
  homepage hero in §5 names bars, clubs, festivals, and private events and
  deliberately does not name weddings — that is correct and settled; do not
  "fix" it.
- **Placement rule.** Where weddings *is* named alongside other event
  types, it goes in the middle or at the end of the list, never first or
  second. Readers weight the first and last items in a series most heavily,
  so a mid-list position keeps the term present while reading as one
  offering among several.
- **Proportion rule for airtime.** On any general-audience page, weddings
  should not occupy more space, more headings, or more detail than
  non-wedding work. `index.html` gives weddings one card among four and a
  single link out — that ratio is correct and should be preserved.
- **Weddings keep their full voice on their own page.** On
  `weddings.html`, write to the couple with warmth and specificity, and
  name weddings as often as the copy naturally calls for it. The hierarchy
  is already expressed everywhere else; do not dilute the wedding page to
  reinforce it.
- **Gear comes last in any sentence that also mentions the DJ work**, and
  reads as a convenience attached to the booking: "we bring the sound
  system, or work on the house rig." Dry hire gets its own full section on
  `events.html`, where it is described without apology.
- **Known gap:** `packages.html` currently describes nearly every tier with
  a wedding scenario in its "Best for" line, while the homepage sells bars,
  clubs, and festivals. A visitor clicking "View DJ packages" from the
  homepage currently lands somewhere that does not appear to be for them.
  Any work on that page should broaden those lines to lead with non-wedding
  scenarios while keeping a wedding example present.

---

## 3. Voice principles

### 3.1 We play; we don't press play

The product is judgment. Sets are mixed live and steered by what the floor
is actually doing. Copy should describe craft and its effect on the room,
never a service menu of compliance.

- Write: "chosen on the night, not in advance"
- Avoid: "built around your crowd and your night" — reads as order-taking
  and promises the client shapes the set

### 3.2 Reliability is the second product

Redundant power, backup mics, gear tested before it leaves the van, early
load-in, sound-checked one to two hours before doors. This is a genuine
differentiator and should appear on every service page in some form. State
it concretely — specific practices, not adjectives.

- Write: "We build in buffer time so line check happens quietly, well
  before doors."
- Avoid: "professional, reliable service you can count on"

### 3.3 Confident, not boastful

Assert what is true and let it stand. No superlatives, no "premier",
"leading", "unmatched", no exclamation marks.

### 3.4 Concrete over abstract

Name towns, gear, hours, and situations. "A wireless lav on your officiant,
tested before your first guest sits down" beats "professional ceremony
audio". Specificity is the whole voice.

### 3.5 Plain, spoken English

Contractions are correct. Short sentences. Address the reader as "you" and
the business as "we". Grady and Dave are named where it adds warmth.

### 3.6 No pressure

Every call to action invites a conversation rather than closing a sale:
"No pressure, no obligation." "Tell us about your event." "Ask anyway."
Never manufacture urgency or scarcity.

---

## 4. The requests question — read this carefully

This is the most delicate line on the site, and the easiest to get wrong.

**The position:** we take direction on the *shape* of the night — the room,
the crowd, the energy, must-plays and do-not-plays. We are always happy to hear someone's request and will work it into the set if it can fit the moment. We aren't "no requests" snobs, but track selection is part of our craft. Someone who wants their playlist performed should not
book us.

**Two failure modes, both of which must be avoided:**

- **Over-promising.** Anything that sounds like "we'll play whatever you
  want" or "requests welcome" sets an expectation that will be broken on
  the night. The old homepage line *"requests handled without derailing the
  night"* is exactly this failure and should be softened wherever it or
  anything like it appears.
- **Closing the door.** Never write "no requests", never write a policy,
  never sound precious about it. The filter should work quietly, before
  anyone picks up the phone, so that a client with a fixed playlist knows
  to *ask* rather than being turned away by the website.

**How to write it:** describe the craft, not the rule. A description of how
a set gets built cannot be read as a refusal, but it tells anyone paying
attention what they are buying.

Sanctioned phrasings:

- "chosen on the night, not in advance"
- "mixed live and steered by the room"
- "read off the floor as the night goes"
- "tell us the room and the crowd you're expecting"
- "we'll talk through the shape of the night beforehand"

Do not write:

- "no requests" / "we don't take requests"
- "requests handled without derailing the night"
- "we'll play anything you like"
- "your playlist, our speakers" or any equivalent

**Weddings are a partial exception.** Must-play and do-not-play lists are a
legitimate and expected part of wedding planning, and `weddings.html` may
say so — the honest framing is that the lists are built ahead of time and
the room is read within them. Never extend that promise to bar, club, or
festival copy.

---

## 5. Canonical voice reference

The homepage hero is the tuning fork. When unsure whether a sentence sounds
like Coastline, hold it against this:

> We play to get people dancing — the hits everyone's waiting on,
> throwbacks nobody's touched in years, and a few you'll be Shazaming from
> the floor. All of it mixed live and chosen on the night, not in advance.
> Bars, clubs, festivals, and private events across BC; we bring the sound
> system, or work on the house rig.

Note what it does: leads with the outcome (dancing), blends familiarity and
discovery, describes the method in a way that filters without refusing,
orders the event types by priority, and puts gear last as a convenience.

**This hero is approved and locked.** Do not reword it, do not add weddings
to its list of event types, and do not soften "Shazaming". If a change to it
ever becomes necessary, it is a decision for Grady and Dave, not a copy
edit.

---

## 6. Vocabulary

**Use:** floor, dance floor, room, crowd, set, mix, records, line check,
load-in, house system / house rig, crew, booth, decks, gear.

**Avoid:** "party rocking", "vibes", "curated experience", "solutions",
"turnkey", "state-of-the-art", "world-class", "seamless" (already used once
on `weddings.html`; do not add more), "unforgettable", "magical",
"one-stop shop", "DJ services provider", "entertainment solutions",
"bespoke".

**Careful with:** "deep cuts" and other club-insider terms — good for bars
and festivals, cooling for wedding clients. Fine on `index.html` and
`events.html`; use sparingly on `weddings.html`.

---

## 7. Mechanics

- **Canadian spelling.** colour, favourite, centre, neighbourhood; -ize
  endings (organizers, recognize).
- **Typographic punctuation in page copy.** Curly quotes and apostrophes
  (' and " "), em dashes (—) for parenthetical breaks, en dashes (–) for
  ranges. Straight quotes are fine in code and in this document.
- **Sentence case for headings**, including section headers and card
  titles. Not Title Case.
- **No emoji anywhere.** No exclamation marks.
- **Arrow links** use " →" appended to the link text, matching existing
  usage ("More on weddings →").
- **Second person for the client, first person plural for the business.**
- Copy lives in `src/pages/`, never in `dist/`. Header and footer copy
  lives in `src/partials/`. Contact values live in
  `assets/js/site-config.js` with hard-coded fallbacks in the footer
  partial and `contact.html` — change all of them together.

---

## 8. Hard constraints

- **No prices anywhere.** Every quote is built around date, venue, and
  guest count. This is deliberate and load-bearing: the `packages.html`
  structured data is typed as `Service` rather than `Offer` specifically to
  avoid a priceless-`Offer` mismatch. Do not add a price, a "from" figure,
  or a price range, and do not change that schema type.
- **No phone number.** By choice. There is no `phone` field in
  `site-config.js`. Do not add one, in copy or in structured data.
- **Do not invent facts.** Years of experience, certifications, client
  names, testimonials, venue relationships, gear brands, and equipment
  counts are not to be written unless Grady or Dave has supplied them.
  Placeholder blocks stay as marked placeholders.
- **`Draft` badges mark unconfirmed content and stay until it is
  confirmed.** The package names, inclusions, and hours on
  `packages.html` were confirmed by Grady and are no longer drafts — the
  badges, the draft framing in that page's schema, the footer's drafts
  line, and the `llms.txt` draft paragraph all came out in the same
  change. Do not reintroduce them there. The convention still holds for
  anything not yet confirmed (see the outstanding list below): AI answer
  engines strip that framing and will quote inclusions as settled fact,
  so the badge is not decoration.
- **Structured data must match visible copy.** If a page's wording changes,
  update its JSON-LD in the same edit — the wedding `FAQPage` block on
  `weddings.html` and the `Service`/`Organization` blocks on
  `packages.html` and `index.html`.
- **Update `<lastmod>` in `sitemap.xml` by hand** for any page whose copy
  meaningfully changes.
- **The domain is `coastlinesoundsupply.com`** — apex, no `www`. Confirmed
  by Grady. Use that exact form in canonicals, `og:url`, structured data,
  `CNAME`, `robots.txt`, and `sitemap.xml`. The older placeholder
  `www.coastlinesoundsupply.ca` is dead; do not reintroduce it.
- **Placeholders currently outstanding:** Instagram handle and URL,
  `assets/img/og-image.jpg`, both bios on `about.html`, all photo
  placeholders, and the reserved testimonial block. See the checklist in
  `README.md`.

---

## 9. Page intent

| Page | Job | Emphasis |
|---|---|---|
| `index.html` | Establish what we do and who it's for | Non-wedding DJ work leads; weddings present as one card; gear last |
| `events.html` | Convert bars, clubs, festivals, corporate, community | The priority page. Non-wedding DJ work, then dry hire |
| `weddings.html` | Convert couples; answer their anxieties | Full warmth, written to the couple, no dilution |
| `packages.html` | Show shape and range without pricing | Needs broadening beyond wedding scenarios (see §2) |
| `service-areas.html` | Prove coverage and local presence | Two named people, two regions, ask-anyway openness |
| `about.html` | Credibility through hands-on experience | Grady and Dave as practitioners, not a company |
| `contact.html` | Remove friction from the enquiry | Minimal required fields, one-business-day reply |
| `404.html` | Recover the visit | Brief, in voice, route back to Contact |
| `styleguide.html` | Internal component reference | Not in nav, footer, or `sitemap.xml`; disallowed in `robots.txt` |

---

## 10. Before committing a copy change

- Does the event-type ordering still lead with non-wedding work?
- Does any new sentence promise to play what the client chooses?
- Did an adjective replace a specific fact?
- Does the structured data on this page still match the visible words?
- Is `<lastmod>` updated in `sitemap.xml`?
- Are the *remaining* placeholder markers still intact — the `about.html`
  bios, the photo placeholders, the testimonial block? (Package copy is
  confirmed and deliberately carries no badges.)
- Did the same wording change need to be made in `src/partials/`,
  `llms.txt`, or the page `<head>` meta and OG description?
- Edited under `src/`, never `dist/`?
