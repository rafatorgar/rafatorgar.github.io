# Sistema Multiidioma - Documentación

## Cómo funciona

El blog ahora soporta posts en múltiples idiomas con URLs diferenciadas y un switcher visual.

### Estructura de URLs

- **Inglés (default):** `/post-title/`
- **Español:** `/es/post-title/`

### Estructura de archivos

```
_posts/
  ├── 2025-11-05-post-title.md          # Versión en inglés
  └── es/
      └── 2025-11-05-post-title.md      # Versión en español
```

## Cómo crear un post multiidioma

### 1. Crea el post en inglés

Archivo: `_posts/2025-11-05-my-post.md`

```yaml
---
title: "My Post Title"
date: 2025-11-05 10:00:00 +0100
tags: [tag1, tag2]
description: "Post description in English"
lang: en
lang_ref: my-post-unique-id
---
```

**Campos importantes:**

- `lang: en` - Indica el idioma del post
- `lang_ref: my-post-unique-id` - ID único que conecta todas las traducciones del mismo post

### 2. Crea la versión en español

Archivo: `_posts/es/2025-11-05-my-post.md`

```yaml
---
title: "Título de Mi Post"
date: 2025-11-05 10:00:00 +0100
tags: [tag1, tag2]
description: "Descripción del post en español"
lang: es
lang_ref: my-post-unique-id
---
```

**Importante:**

- El `lang_ref` debe ser **exactamente el mismo** en ambas versiones
- El nombre del archivo puede ser el mismo (solo cambia la carpeta)
- La fecha debe ser la misma en ambas versiones

### 3. El switcher aparece automáticamente

Si ambos posts tienen el mismo `lang_ref`, aparecerá un botón en la esquina superior derecha del post para cambiar de idioma.

## Ejemplos de lang_ref

Usa nombres descriptivos y únicos:

- `github-copilot-2025`
- `from-zero-to-startup`
- `ai-competency-evaluation`
- `industrial-designer-to-cto`

## Cómo se ve el switcher

- **En post inglés:** Muestra 🇪🇸 ES (link a versión española)
- **En post español:** Muestra 🇬🇧 EN (link a versión inglesa)

## Ventajas

✅ **URLs únicas compartibles** - Puedes compartir directamente el link en el idioma correcto
✅ **SEO friendly** - Google indexa cada versión por separado
✅ **Sin JavaScript** - Funciona con Jekyll puro
✅ **Fácil de mantener** - Solo añades `lang` y `lang_ref` al front matter

## Notas

- Si un post no tiene `lang_ref`, no aparecerá el switcher
- Si un post solo existe en un idioma, tampoco aparecerá el switcher
- Los posts en español automáticamente tendrán el permalink `/es/post-title/` configurado en `_config.yml`
