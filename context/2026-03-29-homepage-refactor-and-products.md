# 2026-03-29 — Homepage refactor, 3D viewer fix, Software Products page

## 3D Models page fixes
- **Fixed 3D models not loading**: `layout: compress` was mangling JS template literals in the popup viewer. Created standalone `assets/viewer.html` that receives model path via URL params instead.
- **Replaced static thumbnails with interactive 3D viewers**: Each card now has a live Three.js viewer with OrbitControls (rotate, zoom, pan).
- **Model color**: Changed from blue → white → settled on neutral gray (`#aaaaaa`, shininess 60).
- **Download button**: Removed "View 3D" button (redundant with interactive preview). Download button is now full-width and downloads the STL file directly.
- **Collection header**: Replaced generic "3D Models Gallery" with "IKEA Tisken Collection" title and description.
- **Removed "Download All Models" section**: Replaced with a link to Cults3D in the CTA area.
- **Added link to 3D printing services page** (SEO) in the CTA section.
- **Fixed CSS syntax error** in `assets/css/stl-viewer.css` (line 105 had `}e8e8e8;` garbage).

## Homepage refactor (author.html)
- **Added two category links**: "Design & Engineering" → `/3d-models/` and "Software Products" → `/software-products/`
- **Simplified skill tags**: Removed all `onclick` handlers, tags are now purely informational (smaller, lighter style).
- **Updated styles**: New `.author-categories` and `.category-link` classes in `_base.scss`, dark theme support in `_dark.scss`. Removed duplicate tag styles from `_layout.scss`.

## Navigation update
- Renamed "3D models" → "design & engineering" in nav
- Added "software products" nav item pointing to `/software-products/`

## New: Software Products page (`/software-products/`)
- **Voicit**: AI-powered meeting intelligence — general meeting reports + HR vertical for recruitment consultants. Links to voicit.com.
- **Destinos Oposiciones**: Free tool for civil service exam candidates to sort job placements by driving distance. Links to destinosoposiciones.rafatorresgarcia.com.
- CTA section with "Get in touch" mailto link.

## Ruby environment
- Installed rbenv + Ruby 3.3.0 (system Ruby 2.6 was too old for github-pages gem).
- `.ruby-version` file created in project root.

## Files changed
- `modelos-3d.html` — Major refactor
- `software-products.html` — New page
- `assets/viewer.html` — New standalone 3D viewer
- `_includes/author.html` — Category links + simplified tags
- `_data/menus.yml` — Updated nav
- `_sass/klise/_base.scss` — Category link styles, simplified tag styles
- `_sass/klise/_dark.scss` — Dark theme for categories, simplified tag dark styles
- `_sass/klise/_layout.scss` — Removed duplicate tag styles
- `assets/css/stl-viewer.css` — Fixed syntax error
