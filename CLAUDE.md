# CLAUDE.md

## Project overview

Personal portfolio and blog of Rafa Torres García — creative engineer, Co-Founder & CPTO at Voicit. Built with Jekyll and hosted on GitHub Pages.

## Tech stack

- **Static site generator**: Jekyll 3.10 (via github-pages gem)
- **Ruby**: 3.3.0 (managed with rbenv, `.ruby-version` in root)
- **Styling**: SCSS (`_sass/klise/`), some pages use inline `<style>` blocks
- **Layout compression**: `layout: compress` — avoid JS template literals in pages using this layout (they get mangled)
- **3D viewer**: Three.js r128 with STLLoader and OrbitControls

## Site structure

```
/                          → Homepage (blog + author bio with category links)
/archive/                  → Blog post archive
/3d-models/                → Design & Engineering (IKEA Tisken 3D collection)
/software-products/        → Software Products (Voicit, Destinos Oposiciones)
/services/impresion-3d-asturias/        → SEO landing page for 3D printing services
/services/desarrollo-web-asturias/      → SEO landing page for web development services
/assets/viewer.html        → Standalone 3D model viewer (no Jekyll processing)
```

## Key files

- `_config.yml` — Site config, author info, plugins
- `_data/menus.yml` — Navigation menu items
- `_data/stl_models.yml` — 3D model definitions (name, file path, description)
- `_includes/author.html` — Author bio + category links + skill tags (shown on homepage)
- `_sass/klise/_base.scss` — Main styles including author categories and tags
- `_sass/klise/_dark.scss` — Dark theme overrides
- `modelos-3d.html` — 3D models page with embedded Three.js viewers
- `software-products.html` — Software products page
- `servicios.html` — 3D printing services SEO page (Spanish)
- `servicios-software.html` — Software development services SEO page (Spanish)

## Development

```bash
eval "$(rbenv init - zsh)"
bundle exec jekyll serve
# → http://127.0.0.1:4000/
```

## Conventions

- Pages use `layout: compress` — never use JS template literals (backticks with HTML) in these pages
- Standalone HTML files (like `assets/viewer.html`) have no front matter so Jekyll copies them as-is
- Blog posts support `lang: es` for Spanish, default is English
- Contact email: hello@rafatorresgarcia.com

## Changelog

See `context/` folder for session-by-session changelogs.
