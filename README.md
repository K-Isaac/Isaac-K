# Isaac Kwizera — Portfolio (v4)

A single-page portfolio built from Isaac's actual CV, work samples, and event photography: research (Behind the Scenes Rwanda & Ghana, WAF climate review, UR dissertation), digital-product content work (EarthLink Study, Africa School of Sales, EarthLink Group), business development (AIESEC), and presentations/dissemination.

## What changed in v4
- **New animated hero.** The hero is now a dark, editorial "data field" — a canvas of slow-drifting dashes in blue/cyan/purple, with a subtle mouse-parallax effect. It's pure HTML5 Canvas + vanilla JS (no library), respects `prefers-reduced-motion` (falls back to a static gradient), and thins out the particle count on mobile for performance.
- **Real photography added.** Your headshot is now in the hero and used as the Open Graph share image. Five event/presentation photos (ICRW "Behind the Scenes" dissemination, panel sessions) are in an editorial gallery under Presentations, and a candid portrait sits in the About section. All images were resized/compressed for the web and live in `/images`.
- **Sticky nav now adapts**: it renders light-on-dark while the hero is in view, then switches to the original paper-toned nav once you scroll past it — small JS scroll listener, no layout shift.
- Everything else — the research library, case studies, digital products section, business section, contact — is unchanged content-wise from v3, still built directly from the CV and work-samples document (no placeholder text, real Google Drive links).

## Files
```
index.html
styles.css
README.md
images/
  headshot.jpg
  presenting-icrw-banner.jpg
  presenting-panel-screen.jpg
  presenting-dark-bg.jpg
  presenting-woodpanel.jpg
  panel-seated.jpg
  portrait-thinking.jpg   (not currently used on the page — spare for future sections)
  portrait-tie.jpg
```

## Still worth doing
- **"Download CV" button** in the hero links to `/Kwizera_Isaac_-_Resume.pdf`, which isn't in this folder yet. Add that PDF to the repo root (same level as `index.html`) or update the link, before publishing.
- `portrait-thinking.jpg` is included in `/images` but not placed anywhere yet — a natural spot would be a second About/bio image or a case-study card if you want another photo used later.

## How to update the live site (GitHub Pages)
Your site is served straight from the repository — there's no build step. To publish a change:

1. Go to your repository on GitHub (e.g. `github.com/K-Isaac/Isaac-K`).
2. Click **Add file → Upload files**.
3. Drag in the updated `index.html`, `styles.css`, and the `images/` folder (GitHub Pages will keep the existing file structure — just make sure `index.html` stays at the repo root, not inside a subfolder).
4. Scroll down, write a commit message (e.g. "Update hero animation and add photos"), and click **Commit changes**.
5. GitHub Pages rebuilds automatically — give it 1–2 minutes, then refresh `https://k-isaac.github.io/Isaac-K/` (hard-refresh with Ctrl/Cmd+Shift+R if the browser is showing a cached version).

No `Settings → Pages` changes are needed again once it's already been set to **Deploy from a branch → main → / (root)** — that only has to be configured once.
