import GoLiveDetailClient from "./GoLiveDetailClient";

export async function generateMetadata() {
  return {
    title: "GoLive Platform | Full Stack Project - Gorka Carmona Pino",
    description:
      "Full Stack event ticketing platform built with Nuxt 3, Vue 3, Spring Boot, MongoDB. Features: PayPal payments, QR tickets, PWA, multi-language, admin dashboard.",
    openGraph: {
      title: "GoLive Platform | Full Stack Project - Gorka Carmona Pino",
      description:
        "Full Stack event ticketing platform built with Nuxt 3, Vue 3, Spring Boot, MongoDB. PayPal, QR tickets, PWA, multi-language.",
      url: "https://portafolio-gorka.vercel.app/proyectos/golive-platform",
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
      title: "GoLive Platform | Full Stack Project - Gorka Carmona Pino",
      description:
        "Full Stack event ticketing platform built with Nuxt 3, Vue 3, Spring Boot, MongoDB.",
      images: ["https://portafolio-gorka.vercel.app/opengraph-image.jpg"],
    },
    alternates: {
      canonical: "https://portafolio-gorka.vercel.app/proyectos/golive-platform",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ProjectPage() {
  return <GoLiveDetailClient />;
}
