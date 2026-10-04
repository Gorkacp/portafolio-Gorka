import { notFound } from "next/navigation";
import GoLiveDetailClient from "./GoLiveDetailClient";
import JarvisDetailClient from "./JarvisDetailClient";
import { footerLabels } from "@/lib/clientLabels";

const projectMetadata = {
  "golive-platform": {
    title: "GoLive Platform | Full Stack Project - Gorka Carmona Pino",
    description:
      "Full Stack event ticketing platform built with Nuxt 3, Vue 3, Spring Boot, MongoDB. Features: PayPal payments, QR tickets, PWA, multi-language, admin dashboard.",
    canonical: "https://portafolio-gorka.vercel.app/proyectos/golive-platform",
  },
  "jarvis": {
    title: "JARVIS | Voice Assistant - Gorka Carmona Pino",
    description:
      "100% local intelligent voice assistant with Vosk offline speech recognition, Ollama LLM, ChatGPT-like web interface, and clap detection.",
    canonical: "https://portafolio-gorka.vercel.app/proyectos/jarvis",
  },
};

/**
 * Los datos viven en un literal del modulo de arriba: no hay fs, ni fetch, ni
 * API. La ruta era dinamica sin motivo, o sea que cada visita renderizaba en
 * servidor un componente cliente de ~1400 lineas.
 *
 * Con esto se prerenderizan los dos proyectos y, junto con `dynamicParams =
 * false`, un slug desconocido pasa a ser un 404 real. Antes caia en el `default`
 * del switch y devolvia la pagina de GoLive con HTTP 200: un soft-404, que es
 * lo peor para un buscador porque declara como indexable una URL que no existe.
 */
export function generateStaticParams() {
  return Object.keys(projectMetadata).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = projectMetadata[slug];
  if (!meta) return {};

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      siteName: "Gorka Carmona Pino - Full Stack Developer Portfolio",
      images: [
        {
          url: "https://portafolio-gorka.vercel.app/opengraph-image.jpg",
          width: 1200,
          height: 630,
        },
      ],
      locale: "es_ES",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["https://portafolio-gorka.vercel.app/opengraph-image.jpg"],
    },
    alternates: {
      canonical: meta.canonical,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;

  if (!projectMetadata[slug]) notFound();

  switch (slug) {
    case "jarvis":
      return <JarvisDetailClient footerLabels={footerLabels} />;
    case "golive-platform":
    default:
      return <GoLiveDetailClient footerLabels={footerLabels} />;
  }
}
