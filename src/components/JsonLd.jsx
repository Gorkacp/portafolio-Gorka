import { serializeJsonLd } from "@/lib/seo";

/**
 * Emite JSON-LD en un `<script type="application/ld+json">`, que es la unica
 * forma en que un buscador lo lee.
 *
 * Ojo con `metadata.other["application/ld+json"]`: Next lo serializa como
 * `<meta name="application/ld+json" content="...">`, y ahi no hay structured data
 * que Google lea. Por eso la home renderiza esto en el cuerpo en vez de
 * dejarlo en el metadata.
 */
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}