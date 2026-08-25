# Coastline Sound Supply — Website

This is a plain HTML/CSS/JS website — no framework, no npm, nothing to
`npm install`. There is one tiny build step (explained below) whose only
job is to stitch the shared header and footer into every page, so you
only ever edit those two pieces once instead of in 9 separate files. It
runs automatically when you push to GitHub — you never have to run it
yourself unless you want to preview changes locally first.

This README is written for you (not a developer). It covers:

1. [How the site is put together](#how-the-site-is-put-together)
2. [Previewing the site locally](#previewing-the-site-locally)
3. [Deploying to GitHub Pages](#deploying-to-github-pages)
4. [How to recolour the entire site](#how-to-recolour-the-entire-site)
5. [How to change fonts and type sizes](#how-to-change-fonts-and-type-sizes)
6. [How to add a package](#how-to-add-a-package)
7. [How to add a service area town](#how-to-add-a-service-area-town)
8. [Wiring up the enquiry form](#wiring-up-the-enquiry-form)
9. [Changing the header or footer](#changing-the-header-or-footer)
10. [Dark mode](#dark-mode)
11. [Before you launch — full placeholder checklist](#before-you-launch--full-placeholder-checklist)

---

## How the site is put together

There are three places files live, and they mean different things:

- **`src/pages/*.html`** — the real, editable source for every page.
  This is where you make content changes (new package, new FAQ answer,
  new town, etc).
- **`src/partials/header.html`** and **`src/partials/footer.html`** —
  the header and footer, each written out *once*. Every page in
  `src/pages/` just contains a one-line marker —
  `<!-- include:header -->` and `<!-- include:footer -->` — wherever
  that content belongs.
- **`dist/`** — the finished, deployable site. A small script
  (`scripts/build.py`) reads `src/pages/` and `src/partials/`, drops the
  partial content into the markers, and writes the result here, along
  with a copy of `assets/`, `sitemap.xml`, `robots.txt`, `.nojekyll`,
  and `CNAME`. **Nothing in `dist/` should ever be hand-edited** — it's
  regenerated from scratch every time the build runs, so any edit made
  directly in `dist/` is silently lost on the next build. It's also not
  committed to the repository (see `.gitignore`) — GitHub Actions
  builds it fresh from `src/` on every push.

So: **edit files under `src/`, never under `dist/`.** The build step
(`scripts/build.py`) is a ~70-line script using only what's already
built into Python 3 — no packages to install, no `package.json`, no
lockfile. GitHub's servers already have Python 3, so pushing to `main`
is all it takes; you don't need Python installed on your own computer
unless you want to preview locally before pushing (see below).

## Previewing the site locally

Because pages now assemble from partials, opening a file straight out
of `src/pages/` won't show a header or footer — you'll just see the
literal text `<!-- include:header -->`. Build the site first:

```
python3 scripts/build.py
```

(macOS and Linux already have `python3` installed — nothing to
download.) That creates/refreshes the `dist/` folder. Then either:

- Double-click `dist/index.html` (or any other page in `dist/`) to open
  it straight in your browser, or
- Serve it so the enquiry form's `fetch()` call works too (browsers
  block some requests from `file://` pages): run
  `python3 -m http.server 8000 --directory dist` from the project
  folder, then open `http://localhost:8000`.

Re-run `python3 scripts/build.py` any time you change something under
`src/` and want to see it reflected in `dist/`.

## Deploying to GitHub Pages

Deployment is automatic: a GitHub Actions workflow
(`.github/workflows/deploy.yml`) runs `scripts/build.py` and publishes
`dist/` every time you push to `main`. You don't run anything by hand.

1. Create a new GitHub repository and push this entire folder to it.
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to **"GitHub Actions"**
   (not "Deploy from a branch" — that mode would try to serve the raw
   `src/`/`dist/` folder structure directly, which isn't what you want).
4. Push to `main` (or re-run the workflow from the **Actions** tab).
   GitHub will give you a URL like
   `https://yourusername.github.io/your-repo/` within a minute or two.
5. Every future push to `main` rebuilds and redeploys automatically —
   watch progress under the repo's **Actions** tab.

### Using a custom domain

The `CNAME` file (at the project root, copied into `dist/` by the build)
currently contains a **placeholder domain**: `www.coastlinesoundsupply.ca`.
To use a real domain:

1. Replace the contents of `CNAME` with your real domain (just the
   domain, nothing else — no `http://`, no trailing slash).
2. At your domain registrar, add a `CNAME` DNS record pointing your
   domain at `yourusername.github.io`.
3. Back in **Settings → Pages**, enter the same custom domain and wait
   for GitHub to verify it (can take up to 24 hours), then enable
   "Enforce HTTPS".
4. If you're **not** using a custom domain, delete the `CNAME` file
   entirely — otherwise GitHub Pages will try to serve the placeholder
   domain and your `*.github.io` URL may stop working.
5. Also update the placeholder domain
   (`www.coastlinesoundsupply.ca`) everywhere else it appears — see the
   [checklist](#before-you-launch--full-placeholder-checklist) below for
   the full list of files (it's in every page's `<title>`/meta tags,
   plus `sitemap.xml` and `robots.txt`).

---

## How to recolour the entire site

Open `assets/css/tokens.css` (this file lives outside `src/` — it's not
templated, just edited directly and copied through by the build
unchanged). Everything at the top, under the comment `1. PRIMITIVES`,
is the raw palette. Everything below it, under `2. SEMANTIC TOKENS`, is
what the actual pages use — and it's defined purely in terms of the
primitives above.

**You never need to touch component or page CSS to change colours.**
Every color used anywhere on the site traces back to this one file.

To try one of the three alternate directions we included:

1. Find the block labelled `ACTIVE PALETTE: "Pacific Dusk"` near the top
   of the primitives section.
2. Wrap it in comment markers to comment it out (or delete it).
3. Find one of the three alternate blocks just below it —
   `"Late Tide"` (darker, nightlife), `"Editorial Linen"` (lighter,
   editorial/print), or `"Regatta"` (crisp nautical blue/orange) —
   and remove its comment markers so it becomes active.
4. Rebuild (`python3 scripts/build.py`) and refresh
   `dist/styleguide.html`. Every colour swatch, every button, every page
   updates at once.

You can also just hand-edit individual values — e.g. change only
`--color-amber-500` to try a different accent colour — without swapping
the whole block.

> **Careful with literal `/*`/`*/` inside comments.** CSS comments
> don't nest — the *first* `*/` the browser finds closes the comment,
> even if you only meant it as an example inside a longer note. If you
> ever add your own explanatory comments to `tokens.css`, describe
> comment syntax in words rather than typing the actual characters.

## How to change fonts and type sizes

Same file, further down in the primitives section, under
"Typography primitives". The active pairing is a serif display font
paired with a system sans body font — both are **system font stacks**,
so nothing needs to download and the site stays fast with zero external
requests.

- To try the alternate pairing (a bolder, more nightlife-agency feel),
  comment out the active block and uncomment the one below it, the same
  way as the colour palettes.
- To use real downloaded webfont files instead of system fonts, there's
  a commented `@font-face` block right below the font stacks — drop
  your `.woff2` files in a new `assets/fonts/` folder, uncomment and
  edit that block, then point `--font-family-display` /
  `--font-family-body` at your new font name (keep a fallback after it).
- To change how big any heading or text style is, edit the `clamp()`
  values under "SEMANTIC — TYPOGRAPHY SCALE" (search for `--text-h1`,
  `--text-body`, etc.). Each `clamp()` has three numbers: the smallest
  size (on phones), a scaling formula, and the largest size (on big
  screens).

---

## How to add a package

Open `src/pages/packages.html`. Packages are grouped into three
sections — Rental, DJ, and Full-Service — each a row of `.card`
elements. To add one:

1. Copy an existing `<div class="card">...</div>` block in the section
   you want (Rental, DJ, or Full-Service).
2. Change the heading, the "Best for" line, and the bullet list inside
   `<ul class="card__list">`.
3. Update the "Request a quote" link's `href` to
   `contact.html?package=Your%20Package%20Name` (spaces become `%20`) —
   this pre-fills the "Package of interest" field on the contact form
   automatically.
4. If it's a DJ package, also add a matching column to the comparison
   table further down the same page.
5. Keep the `<span class="badge badge--draft">Draft</span>` on it (or
   remove it once you've confirmed the real inclusions).
6. Rebuild (`python3 scripts/build.py`) to see it in `dist/`.

All current packages are placeholder names and inclusions — see the
checklist below.

## How to add a service area town

Open `src/pages/service-areas.html` and find the region
(`Vancouver Island` or `Lower Mainland & Sea-to-Sky`) you want to add a
town to. Add a new:

```html
<span class="badge badge--muted">Your Town</span>
```

inside that region's `.region-card__towns` block. If you're adding a
town that wasn't part of the original list Grady/Dave gave, leave an
HTML comment next to it (e.g. `<!-- suggested, please confirm -->`) so
it's easy to spot and approve or remove later.

The homepage footer only shows a one-line summary per region (not the
full town list), so you don't need to touch it when adding a town — only
`src/pages/service-areas.html` needs updating.

---

## Wiring up the enquiry form

The form posts to a placeholder-agnostic third-party endpoint — it works
with **Formspree**, **Web3Forms**, **Basin**, or anything else that
accepts a plain `POST` of form data and returns JSON.

1. Sign up with one of those (or similar) and create a form — they'll
   give you an endpoint URL, usually something like
   `https://formspree.io/f/abc123` or `https://api.web3forms.com/submit`.
2. Open `assets/js/site-config.js` and paste that URL into the
   `formEndpoint` field near the bottom (it starts empty: `""`).
3. That's it — every page's form (`contact.html`, plus the package
   "Request a quote" links which route into the same form) will now
   submit there. No other file needs touching, and no rebuild is needed
   for JS/config changes to show up in a page you've already built —
   just re-run the build to be safe if in doubt.

**To test it:** open `contact.html` on the live GitHub Pages URL (form
submission needs a real `http(s)://` origin, not a local file), fill in
a name and email, and submit. You should see the green success message.
Check your form provider's dashboard to confirm the submission arrived.

**If you leave `formEndpoint` blank**, the site doesn't break — the
submit button will show an inline message pointing people to the
`mailto:` link instead, so you never ship a form that silently fails.

---

## Changing the header or footer

This is the whole reason the build step exists: the header and footer
each live in exactly **one** file, and every page pulls them in at build
time.

- Header (logo, nav links, "Get a Quote" button, theme toggle): edit
  **`src/partials/header.html`**.
- Footer (footer CTA, columns, social links, copyright line): edit
  **`src/partials/footer.html`**.

Edit one of those, run `python3 scripts/build.py`, and the change
appears on all 9 pages in `dist/` at once — you never touch
`src/pages/*.html` for a nav or footer change.

The active nav link (bolded, underlined) is set automatically by
`assets/js/main.js` based on the current page URL, so you never need to
hand-edit which link is "active" — the header partial itself never
changes between pages.

(`src/pages/styleguide.html` has a simplified header of its own and no
footer — it's an internal tool, not a real page — so it isn't wired up
to the shared partials.)

---

## Dark mode

Dark mode is already fully wired — not just structured for later. It
works two ways:

- **Automatically**, if a visitor's OS is set to dark mode (via
  `prefers-color-scheme`).
- **Manually**, via the moon/sun button in the header, which sets an
  explicit `data-theme="dark"` or `data-theme="light"` on the page and
  remembers the choice for that visitor (stored in their browser only).

All of this works because the **semantic** token layer in
`assets/css/tokens.css` is redefined once for dark mode, remapping each
token (like `--color-surface`) to a different primitive. No component or
page CSS has any dark-mode-specific code — that's the whole point of the
two-layer token system. If you want to design a different dark palette
than the default, edit the two `dark` blocks near the bottom of
`tokens.css` (the `@media (prefers-color-scheme: dark)` one and the
`:root[data-theme="dark"]` one — keep them identical to each other).

---

## Before you launch — full placeholder checklist

Nothing below will break the site as-is (every placeholder is a valid,
working stand-in), but all of it should be reviewed/replaced before you
point real traffic at this. File/line references below point at the
**source** files under `src/` — that's what you actually edit; your
changes show up in `dist/` after the next build (automatic on push, or
run `python3 scripts/build.py` to check locally first).

### Contact details (single source of truth)

Edit these once in **`assets/js/site-config.js`** and they update
everywhere on the site that JavaScript runs. Each value also has a
hard-coded fallback written directly into the footer partial and the
Contact page in case JavaScript fails — if you change a value in
`site-config.js`, you don't *have* to also change the HTML fallbacks,
but it's worth doing a find-and-replace across the project for the old
value so a JS-disabled visitor sees the same thing.

| What | File & line | Current placeholder |
|---|---|---|
| Email | `assets/js/site-config.js:18` | `hello@example.com` |
| Phone (tel: link format) | `assets/js/site-config.js:19` | `+12505550142` |
| Phone (human-readable) | `assets/js/site-config.js:20` | `(250) 555-0142` |
| Instagram handle | `assets/js/site-config.js:21` | `@coastlinesoundsupply` |
| Instagram URL | `assets/js/site-config.js:22` | `https://instagram.com/coastlinesoundsupply` |
| Form endpoint | `assets/js/site-config.js:42` | *(blank — see [Wiring up the enquiry form](#wiring-up-the-enquiry-form))* |

The same three contact values (email, phone, Instagram) also appear as
plain hard-coded text inside **`src/partials/footer.html`** and
**`src/pages/contact.html`**, as the no-JS fallback — search the
project for `hello@example.com`, `555-0142`, and `coastlinesoundsupply`
(the Instagram handle) to find every instance if you want to replace
them by hand too.

### Domain name

The domain `www.coastlinesoundsupply.ca` is a **placeholder** — it is
not registered to this project. It appears in:

- `CNAME` (the actual GitHub Pages custom domain config)
- `robots.txt` (the sitemap URL)
- `sitemap.xml` (every `<loc>` entry)
- The `<link rel="canonical">`, `og:url`, `og:image`, and
  `twitter:image` tags in the `<head>` of every page under `src/pages/`
- The `JSON-LD` structured data block in `src/pages/index.html` (`@id`
  and `url` fields, twice)

Once you've picked a real domain, do a project-wide find-and-replace of
`www.coastlinesoundsupply.ca` → your real domain.

### Social preview image (Open Graph / Twitter card)

Every page's `<head>` references `assets/img/og-image.jpg` for link
previews on social media and iMessage/Slack — **that file doesn't exist
yet**. Add a real 1200×630px JPEG at that exact path before launch, or
previews will show a broken image.

### Logo

The header logo is a simple inline SVG wave-and-sun mark plus the
wordmark "Coastline Sound Supply" (see the `.logo__mark` SVG in
`src/partials/header.html`, and again in `src/partials/footer.html`
where it's repeated smaller). It's a clean placeholder, not a real
designed logo — swap the `<svg class="logo__mark">...</svg>` block for
your real logo mark (or an `<img>` tag) in those two partial files —
that's it, no need to touch any page in `src/pages/`.

### Photos

All photography is a labelled placeholder box (tokenized gradient +
icon + caption describing what should go there) — no real images are
used anywhere. Replace each `<div class="placeholder-photo ...">` block
with a real `<img>` tag (remember to set `width`/`height` attributes to
match, so nothing shifts on load):

| Page & line | What it should show |
|---|---|
| `src/pages/index.html:102` | DJ booth & dance floor lighting, outdoor reception at dusk |
| `src/pages/index.html:238` | *(testimonials block — replace once you have client quotes)* |
| `src/pages/weddings.html:40` | Bride & groom exchanging vows, outdoor ceremony, wireless mic visible |
| `src/pages/events.html:40` | Corporate conference stage with presenter mic |
| `src/pages/events.html:102` | PA speakers & mixing console packed for delivery (dry-hire) |

### Headshots

`src/pages/about.html:41` and `src/pages/about.html:49` use circular
initial-only avatar placeholders (`G` and `D`) instead of real
headshots. Replace the `<div class="avatar-placeholder">` elements with
real `<img>` photos of Grady and Dave.

### Draft bios & package copy

- `src/pages/about.html:45` and `src/pages/about.html:53` — Grady's and
  Dave's bios are reasonable-sounding drafts, but the specifics (years
  active, notable venues, certifications) are invented and marked
  in-page as needing confirmation.
- `src/pages/packages.html` — **every package name, inclusion list, and
  hour count is a placeholder**, marked with a `Draft` badge. Confirm
  real gear lists, hours, and (if you decide to publish them) prices
  with Grady and Dave before launch. No prices are shown anywhere on the
  site currently, by design.

### Everything else

Search the project for the word `PLACEHOLDER` (all caps) to catch a few
smaller inline notes not listed above, and for `Draft` to find every
in-page draft badge.

---

## File structure reference

```
/src/pages/index.html          Home                          } edit
/src/pages/packages.html       Packages (no prices)           } these —
/src/pages/weddings.html       Wedding-specific landing page  } the real
/src/pages/events.html         Corporate/private/community +  } source for
                                dry-hire rentals              } every page
/src/pages/service-areas.html  Full town list, both regions   }
/src/pages/about.html          Grady & Dave                   }
/src/pages/contact.html        The enquiry form                }
/src/pages/404.html            Not-found page                  }
/src/pages/styleguide.html     Design system preview — not linked anywhere

/src/partials/header.html   The ONE header — every page pulls this in
/src/partials/footer.html   The ONE footer — every page pulls this in

/scripts/build.py           Stitches src/ into dist/ — Python stdlib only
/.github/workflows/deploy.yml   Runs build.py and deploys on every push

/dist/                      GENERATED — never edit by hand, not committed
                              (see .gitignore). This is the folder that
                              actually gets deployed / previewed.

/assets/css/tokens.css       ALL design tokens live here — the only file to
                              edit for a full restyle
/assets/css/base.css         Reset + element defaults + heading/type wiring
/assets/css/layout.css       Containers, grid, section rhythm
/assets/css/components.css   Buttons, cards, nav, footer, form, etc.
/assets/js/site-config.js    Contact details + form endpoint, in one object
/assets/js/main.js           Mobile nav, FAQ accordion, theme toggle, form
/assets/img/                 (currently empty — see photo/headshot checklist)

/.nojekyll                GitHub Pages: skip Jekyll processing
/CNAME                    GitHub Pages: custom domain (placeholder — see above)
/sitemap.xml
/robots.txt
```
