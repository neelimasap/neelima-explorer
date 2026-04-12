# Neelima Explorer — Hugo + Cloudflare Pages

A travel portfolio site built with **Hugo** and hosted on **Cloudflare Pages**.
Design: deep navy · forest green · ember orange · Playfair Display + DM Sans.

## Stack

| Layer | Tech | Cost |
|---|---|---|
| Framework | Hugo (static site generator) | Free |
| Hosting | Cloudflare Pages | Free |
| CDN | Cloudflare (global, fastest in the world) | Free |
| Forms | Cloudflare Pages Functions or Web3Forms | Free |
| Domain | Transfer neelimaexplorer.com to Cloudflare | ~$10/yr |

**Total: free forever** (beyond the domain renewal).

---

## Project structure

```
neelima-explorer/
├── content/
│   ├── _index.md           # Homepage content
│   ├── about.md            # About page
│   ├── contact.md          # Contact page
│   └── trips/
│       ├── _index.md       # Trips listing page
│       ├── everest-base-camp-nepal.md
│       ├── kilimanjaro-africa.md
│       ├── patagonia-argentina.md
│       ├── fitz-roy-argentina.md
│       ├── norway.md
│       ├── banff-canada.md
│       ├── mt-baker-washington.md
│       ├── mt-toubkal-morocco.md
│       └── grand-canyon.md
├── layouts/
│   ├── _default/
│   │   └── baseof.html     # Base template (nav + footer)
│   ├── partials/
│   │   ├── mountain-divider.html   # SVG ridgeline dividers
│   │   └── trip-card.html          # Trip card component
│   ├── index.html          # Homepage layout
│   ├── 404.html            # 404 page
│   └── trips/
│       ├── list.html       # All trips listing
│       └── single.html     # Individual trip page
├── static/
│   ├── css/main.css        # Full design system
│   ├── js/main.js          # Nav + interactions
│   └── images/
│       ├── favicon.svg
│       └── trips/          # ← Put your trip photos here
├── hugo.toml               # Hugo config
├── wrangler.toml           # Cloudflare Pages config
└── _redirects              # Cloudflare redirect rules
```

---

## Quick start

### 1. Install Hugo

**Mac:**
```bash
brew install hugo
```

**Windows:**
```bash
winget install Hugo.Hugo.Extended
```

**Linux:**
```bash
sudo apt install hugo
```

### 2. Run locally

```bash
cd neelima-explorer
hugo server -D
```

Open [localhost:1313](http://localhost:1313) — live reload included.

### 3. Add your photos

Place trip photos in `static/images/trips/`:
```
static/images/trips/
  everest-base-camp/
    hero.jpg
    gallery-1.jpg
    gallery-2.jpg
    ...
  kilimanjaro/
    hero.jpg
    ...
```

Then update the frontmatter in each trip file:
```yaml
hero_image: "/images/trips/everest-base-camp/hero.jpg"
```

For gallery images, add to the trip's frontmatter:
```yaml
gallery:
  - src: "/images/trips/everest-base-camp/gallery-1.jpg"
    alt: "Prayer flags on the trail to Everest Base Camp"
  - src: "/images/trips/everest-base-camp/gallery-2.jpg"
    alt: "Khumbu Glacier at sunrise"
```

---

## Deploy to Cloudflare Pages

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — Neelima Explorer"
```

Create a new repo at [github.com/new](https://github.com/new), then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/neelima-explorer.git
git push -u origin main
```

### Step 2 — Connect to Cloudflare Pages

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **Pages** → **Create a project** → **Connect to Git**
3. Select your `neelima-explorer` repo
4. Set build settings:
   - **Build command:** `hugo --minify`
   - **Build output directory:** `public`
   - **Environment variable:** `HUGO_VERSION` = `0.124.1`
5. Click **Save and Deploy**

That's it. Cloudflare builds and deploys automatically. Every push to `main` triggers a new deploy.

### Step 3 — Connect your domain

1. In Cloudflare Pages → your project → **Custom domains**
2. Add `neelimaexplorer.com` and `www.neelimaexplorer.com`
3. Cloudflare will walk you through the DNS setup

If your domain is currently at Wix, you have two options:
- **Transfer to Cloudflare** (recommended — Cloudflare Registrar charges at cost, no markup): ~$10/yr
- **Point DNS to Cloudflare**: Add `CNAME www → your-project.pages.dev` at Wix's DNS settings

---

## Adding a new trip

1. Create a new Markdown file in `content/trips/`:

```bash
hugo new trips/my-new-trip.md
```

2. Fill in the frontmatter:

```yaml
---
title: "Mont Blanc, France"
subtitle: "The roof of the Alps"
date: "2024"
location: "Chamonix, France"
biome: "mountain"     # mountain | ocean | desert
weight: 10            # display order
hero_image: "/images/trips/mont-blanc/hero.jpg"
hero_image_alt: "Mont Blanc summit at sunrise"
description: "One-line description for card previews."
gallery:
  - src: "/images/trips/mont-blanc/1.jpg"
    alt: "Mer de Glace glacier"
  - src: "/images/trips/mont-blanc/2.jpg"
    alt: "Aiguille du Midi cable car"
---

Your trip description goes here. This is the full text shown on the trip detail page.
```

3. Add photos to `static/images/trips/mont-blanc/`
4. Push to GitHub — Cloudflare deploys in ~30 seconds

---

## Contact form

The form currently uses `data-netlify="true"` for Netlify-style forms.
For **Cloudflare Pages**, use one of these free options:

### Option A — Web3Forms (easiest, free)
1. Sign up at [web3forms.com](https://web3forms.com)
2. Get your access key
3. Replace the form action in `layouts/contact/single.html`:
```html
<form action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="YOUR_KEY_HERE">
  <!-- rest of form fields -->
</form>
```

### Option B — Cloudflare Pages Functions
Create `functions/contact.js` to handle form submissions via Cloudflare Workers.

---

## Design system

CSS variables defined in `static/css/main.css`:

| Token | Hex | Role |
|---|---|---|
| `--navy` | `#0D1B2A` | Page backgrounds |
| `--slate` | `#0F1E2D` | Section backgrounds |
| `--slate-2` | `#162636` | Cards, inputs |
| `--forest` | `#2C5F4A` | Borders, accents |
| `--sage` | `#6BBFA0` | Links, tags |
| `--ember` | `#E67E22` | Buttons, CTAs |
| `--parchment` | `#F5F0E8` | All text |

**Biome card accent bars** (set `biome` in frontmatter):
- `mountain` → Forest green gradient
- `ocean` → Ocean blue gradient
- `desert` → Ember amber gradient

**Mountain dividers** — SVG ridgeline shapes between every section.
Three variants available: `variant 1`, `2`, `3` in `mountain-divider.html`.

---

## Performance

Hugo generates pure static HTML/CSS/JS — no JavaScript framework, no server.
Expected Lighthouse scores after deployment:

| Metric | Score |
|---|---|
| Performance | 98–100 |
| Accessibility | 95+ |
| Best Practices | 100 |
| SEO | 95+ |

Cloudflare's CDN serves assets from the edge closest to each visitor — typically sub-100ms load times globally.
