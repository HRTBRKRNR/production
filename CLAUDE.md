This folder contains files used to build a website. The website is in the theme of Cyberpunk 2077 mixed with cybersecurity. This website is to build my portfolio of personal projects and CTF's (Capture the Flag) competitions I have done. I have provided the color scheme in the CSS file.
The cyberpunk character I base myself off of is a netrunner.

This website should be easy to manage and accessible on both desktop and mobile.

Website are to be in HTML and can contain CSS and Javascript. Be mindful of vulnerabilities when building code.

## Site Structure

- `index.html` — main portfolio landing page
- `style.css` — single global stylesheet shared by all pages; do not create per-page CSS files
- `main.js` — shared JavaScript (nav hamburger toggle)
- `target-defense-2025.html` — challenge index / landing page for the WiCyS TDC 2025 CTF event
- `ctf-wicys-tdc-2025/` — individual CTF write-up pages
  - Practice challenges: `p1.html`–`p6.html` (p3 has `p3_1.html` and `p3_2.html`)
  - Defensive challenges: `d1.html`–`d11.html`

## Conventions

- All new pages link to `style.css` and `main.js` using paths relative to the page's location.
- Pages inside `ctf-wicys-tdc-2025/` use `../style.css` and `../main.js`; pages at the root use `style.css` and `main.js`.
- Nav logo always links back to the portfolio root (`index.html` or `../index.html`).
- CTF challenges follow the naming convention: `P` prefix = practice/tutorial, `D` prefix = defensive/actual. The number after the letter is the display order.
- When adding new CTF write-up cards to `target-defense-2025.html`, reuse `.ctf-grid` / `.ctf-card` / `.ctf-body` / `.ctf-meta` / `.ctf-tag` / `.ctf-difficulty` CSS classes from `style.css`.
- Difficulty colors are applied inline (no dedicated classes): Easy = `var(--green-neon)`, Medium = `var(--yellow-neon)`, Hard = `var(--magenta)`.