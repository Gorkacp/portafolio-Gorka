import GoLiveDetailClient from "./GoLiveDetailClient";
import JarvisDetailClient from "./JarvisDetailClient";

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

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = projectMetadata[slug] || projectMetadata["golive-platform"];

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

  switch (slug) {
    case "jarvis":
      return <JarvisDetailClient />;
    case "golive-platform":
    default:
      return <GoLiveDetailClient />;
  }
}
