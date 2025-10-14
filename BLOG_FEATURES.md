# Jekyll Blog Features Reference

This document contains examples of Jekyll features and resources you can use in your posts.

## Front Matter Options

```yaml
---
title: "Post Title"
date: YYYY-MM-DD HH:MM:SS +timezone
modified: YYYY-MM-DD HH:MM:SS +timezone # Optional: last modified date
tags: [tag1, tag2, tag3] # Post tags
description: "SEO description for the post"
image: "/folder/image.jpg" # Featured image (optional)
layout: post # Usually auto-applied
comments: false # Disable comments if needed
---
```

## Text Formatting

- **Bold text**: `**text**` or `__text__`
- _Italic text_: `*text*` or `_text_`
- ~~Strikethrough~~: `~~text~~`
- `Inline code`: `` `code` ``
- <mark>Highlighted text</mark>: `<mark>text</mark>`

## Links

- Basic link: `[text](url)`
- External link with attributes: `<a href="url" target="_blank" rel="noopener">text</a>`

## Images

```html
<figure>
  <img src="/folder/image.jpg" alt="description" />
  <figcaption>Figure caption text</figcaption>
</figure>
```

## Code Blocks

````markdown
```language
code here
```
````

## HTML Elements

- Abbreviations: `<abbr title="Full Text">ABBR</abbr>`
- Horizontal rule: `<hr>`
- Superscript footnotes: `<sup id="ref">[[1]](#footnote)</sup>`

## Lists

- Unordered: `- item`
- Ordered: `1. item`

## File Organization

Posts should be in folders: `_posts/post-slug/YYYY-MM-DD-post-slug.md`
Images go in: `_posts/post-slug/` or `assets/img/`

## Tags Available

Based on existing posts: blog, netlify, jekyll, github, unix/linux, cli, javascript, react, python, machine-learning, tips, git, software
