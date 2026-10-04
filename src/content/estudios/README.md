# Estudios

Un archivo `.mdx` por artículo. La carpeta en la que vive el archivo **es** la
sección a la que pertenece, y eso solo: la URL sale de la ruta.

```
src/content/estudios/
  javascript/
    event-loop-y-microtasks.mdx      ->  /estudios/javascript/event-loop-y-microtasks
  frontend/
    keys-y-reconciliacion.mdx        ->  /estudios/frontend/keys-y-reconciliacion
```

## Frontmatter

```yaml
---
title: "Título del artículo"          # obligatorio. El build falla sin él.
description: "Una frase de 150-160 caracteres."   # va al meta description y al OG
tags: ["javascript", "performance"]   # chips, keywords y `article:tag`
published: 2026-09-14                 # fecha de publicación
updated: 2026-09-28                   # opcional. Si no está, vale `published`
featured: true                        # opcional. Lo sube a la portada del índice
draft: true                           # opcional. No se publica ni aparece en el sitemap
related: ["closures-y-memoria"]       # opcional. Slugs de artículos relacionados
---
```

`description` es el campo que más impacto tiene: es el texto que Google muestra
debajo del título en los resultados. Escribilo pensando en el buscador, no
resumiendo el artículo.

`updated` no es decorativo: es el `lastmod` que el sitemap declara para este
artículo, y Google lo usa como señal de frescura para decidir cuánto re-crawlear.
Tocá el artículo sin tocar la fecha y la señal queda mintiendo. Si tocás una
corrección de fondo, subí `updated`.

## Qué podés escribir

Markdown normal, con extras:

| Sintaxis | Para qué |
| --- | --- |
| Tablas, listas de tareas, ~~tachado~~ | `remark-gfm` |
| ```js title="archivo.js" | Le pone nombre al bloque |
| ```js {3,5-7} | Resalta esas líneas |
| `<Nota>` | Caja de nota (morada) |
| `<Aviso>` | Caja de advertencia (ámbar) |
| `<Idea>` | Caja de resumen (cian) |

Los headings `##` y `###` se convierten solos en el índice lateral con scroll-spy.
No hace falta escribir nada para eso, pero **cada artículo necesita al menos dos
`##`**, si no el índice queda vacío y no se renderiza.

## Agregar una sección nueva

Tres pasos:

1. Crear la carpeta `src/content/estudios/<id>/`.
2. Agregar la entrada en `src/data/estudios/categories.js` con su icono y su
   paleta. Sin esa entrada la carpeta se ignora en silencio.
3. Agregar `label` y `description` en `Estudios.categories.<id>` de
   `src/locales/es.json`, `en.json` y `de.json`.

Sin pasos extra: la sección aparece sola en el índice, en su propia página, en el
sitemap y en el selector de filtros.

## Antes de commitear

```bash
npm run build
```

El build lee el disco en tiempo de compilación. Un frontmatter inválido o un
`title` ausente rompen el prerender, no el dev server, así que `npm run dev` no
te va a avisar.