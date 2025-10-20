# Rafa Torres García - Personal Blog

[![Deploy Status](https://github.com/rafatorgar/rafatorgar.github.io/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/rafatorgar/rafatorgar.github.io/actions/workflows/pages/pages-build-deployment)
[![Jekyll](https://img.shields.io/badge/Jekyll-v3.10.0-red)](https://jekyllrb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Personal blog and portfolio of Rafa Torres García - Co-Founder & CPTO at [Voicit](https://voicit.es)

## 🚀 Live Site

Visit the blog at: **[rafatorgar.github.io](https://rafatorgar.github.io)**

## 📝 About

This is my personal blog where I share insights about:

- **Startup Journey**: Real experiences building [Voicit](https://voicit.es) from idea to 2.5k MRR
- **Product Management**: Lessons learned as CTO/CPO in a growing startup
- **Engineering**: Technical insights from an Industrial Design Engineer perspective
- **Entrepreneurship**: Honest takes on the startup ecosystem, pivots, and growth

## 🛠️ Tech Stack

- **Framework**: Jekyll (GitHub Pages compatible)
- **Theme**: Custom modified Klise theme
- **Hosting**: GitHub Pages
- **Styling**: SCSS with custom components
- **Features**:
  - Dark/Light mode toggle
  - Responsive design
  - Search functionality
  - Blog archive with year grouping
  - Personal interest tags

## 🎨 Features

### Design

- **Minimalist aesthetic** with clean typography
- **Dark/Light theme** toggle
- **Responsive design** optimized for all devices
- **Custom components**: Interest tags, post previews, archive view

### Functionality

- **Blog posts** with proper SEO meta tags
- **Archive page** with search capabilities
- **Tag system** for organizing content
- **RSS feed** for subscribers
- **Fast loading** with optimized assets

## 🏃‍♂️ Quick Start

### Prerequisites

- Ruby (2.6+)
- Bundler
- Git

### Local Development

```bash
# Clone the repository
git clone https://github.com/rafatorgar/rafatorgar.github.io.git
cd rafatorgar.github.io

# Install dependencies
bundle install

# Run local server
bundle exec jekyll serve --livereload

# Navigate to http://localhost:4000
```

### Adding New Posts

Posts should be created in the `_posts` directory with the format:

```
YYYY-MM-DD-post-slug.md
```

Example front matter:

```yaml
---
title: "Your Post Title"
date: 2025-10-14 16:30:00 +0200
tags: [startup, product, engineering]
description: "SEO-friendly description of your post"
---
```

## 📁 Project Structure

```
rafatorgar.github.io/
├── _includes/          # Reusable components
│   ├── author.html     # Personal bio with interest tags
│   ├── header.html     # Site navigation
│   └── footer.html     # Site footer
├── _layouts/           # Page templates
│   ├── default.html    # Base layout
│   ├── home.html      # Homepage layout
│   └── post.html      # Blog post layout
├── _posts/            # Blog posts
├── _sass/             # SCSS stylesheets
│   └── klise/         # Theme components
├── assets/            # Static assets
├── _config.yml        # Jekyll configuration
└── README.md          # This file
```

## 🎯 Content Strategy

### Blog Topics

- **Startup Journey**: Behind-the-scenes of building Voicit
- **Product Insights**: CTO/CPO perspective on product development
- **Technical Content**: Engineering solutions and architectural decisions
- **Personal Growth**: Lessons learned in entrepreneurship

### Writing Style

- **Authentic**: Real experiences without startup glamour
- **Practical**: Actionable insights and lessons
- **Technical**: In-depth when relevant, accessible when needed
- **Personal**: Human stories behind the business decisions

## 👨‍💻 About Me

**Rafa Torres García**  
Co-Founder & CPTO at [Voicit](https://voicit.es)

Industrial Design Engineer turned entrepreneur. Currently building voice-based feedback solutions for HR teams. Previously worked on drones, ventilators, and various hardware/software projects.

**Interests**: Graphic Design • 3D Printing • 3D Modelling • Coding • Photography • Cycling • Swimming • Running

**Connect with me**:

- LinkedIn: [Rafa Torres García](https://linkedin.com/in/rafatorgar)
- Email: hello@rafatorresgarcia.com
- Company: [Voicit](https://voicit.es)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Based on the [Klise](https://github.com/piharpi/klise) Jekyll theme
- Hosted on [GitHub Pages](https://pages.github.com/)
- Built with [Jekyll](https://jekyllrb.com/)

---

_Last updated: October 2025_

## License

This project is open source and available under the [MIT License](LICENSE).
