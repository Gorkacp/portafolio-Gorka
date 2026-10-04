export const SITE_URL = "https://portafolio-gorka.vercel.app";
export const OG_IMAGE = `${SITE_URL}/opengraph-image.jpg`;

/**
 * The home page already declares a `Person` with this `@id`. Reusing it is what
 * lets Google connect every article to the same author entity instead of
 * treating each one as an anonymous blog.
 */
export const PERSON_ID = `${SITE_URL}/#person`;

export function absoluteUrl(pathname = "/") {
  return `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

export function techArticleJsonLd({ estudio, categoryLabel }) {
  const url = absoluteUrl(estudio.href);

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: estudio.title,
    description: estudio.description,
    inLanguage: estudio.lang,
    datePublished: estudio.publishedIso,
    dateModified: estudio.updatedIso,
    wordCount: estudio.wordCount,
    keywords: estudio.tags.join(", "),
    articleSection: categoryLabel,
    dependencies: estudio.tags,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    image: {
      "@type": "ImageObject",
      url: OG_IMAGE,
      width: 1200,
      height: 630,
    },
  };
}

export function collectionJsonLd({ pathname, name, description, items }) {
  const url = absoluteUrl(pathname);

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    url,
    name,
    description,
    inLanguage: "es",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((estudio, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(estudio.href),
        name: estudio.title,
      })),
    },
  };
}

/**
 * `DefinedTerm` con `inDefinedTermSet` es la forma correcta de marcar una entrada
 * de glosario. Apuntando el conjunto a la portada del glosario, Google puede
 * entender que estas 174 páginas son el mismo conjunto y no 174 páginas sueltas
 * que compiten entre si.
 */
export function definedTermJsonLd({ term, termUrl, groupName, setUrl, setName }) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term,
    alternateName: term.aliases,
    description: term.what,
    url: absoluteUrl(termUrl),
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      "@id": setUrl,
      name: setName,
      url: setUrl,
    },
    ...(groupName ? { articleSection: groupName } : {}),
  };
}

/**
 * Escaping `<` is not optional. Without it, a title containing `</script>`
 * would terminate the tag early and the rest of the JSON would be parsed as
 * markup by the browser.
 */
export function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}