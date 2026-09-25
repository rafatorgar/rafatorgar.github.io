# 2026-09-25 — Software Products redesign: floating arc

## Software Products page (`/software-products/`)
- **Replaced the card grid with a floating arc** of app logos. Each logo floats gently (CSS keyframes, staggered delays, disabled under `prefers-reduced-motion`).
- **Hover / focus / tap shows details** in a panel sitting inside the arc (role, name, tagline, description, CTA). Other logos dim while one is active. The last hovered item stays active so its link can be clicked.
- **Data-driven**: products now live in `_data/software_products.yml`. Arc angles are computed in Liquid (spread evenly from -160° to -20°), so adding/removing entries just works.
- **Two "Coming soon" placeholders** (`status: soon`) reserve space for the next two apps.
- **Logos** added in `assets/img/products/` (`voicit.png` from voicit.com, `destinos-oposiciones.svg` from the app's favicon).
- JS written without template literals or `//` comments (the compress layout collapses everything onto one line).

## Follow-ups (same session)
- Smaller logos (64px desktop / 46px mobile) and wider arc (`--r: min(370px, 50vw - 3rem)`).
- No idle animation: logos only float while active.
- **Active logo travels to the centre of the arc** (scaled up) and the info panel shows below it; the previous one returns to its slot. `.orbit-arc` now spans the full arc width so moving the logo away doesn't trigger `mouseleave` on `#orbit`.
- Panel crossfade staggered (old fades out, then new fades in).
- **Iterare** (`~/projects/trip-studio`) and **Cesta** (`~/projects/notes-app`, Cesta target) replace the two placeholders, with `status: soon` (badge, no button). Icons copied and resized to 256px as `iterare.png` / `cesta.png`; `logo_fit: cover` makes full-bleed app icons fill the tile.
