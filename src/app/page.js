// src/app/page.js - SEO OPTIMIZADO Y SEGURO
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Certifications from "../components/Certifications";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export const metadata = {
  // ============ TÍTULOS OPTIMIZADOS ============
  title: "Gorka Carmona Pino | Full Stack Developer Granada | Vue.js, Nuxt 3, React, Spring Boot, MongoDB Expert",
  
  description: "Full Stack Developer from Granada, Spain specializing in Vue.js, Nuxt 3, React, Spring Boot, and MongoDB. Built GoLive Platform + holds 15 technical certifications. Available for opportunities.",
  
  // ============ KEYWORDS ESTRATÉGICAS (EVITANDO KEYWORD STUFFING) ============
  keywords: [
    // === IDENTIDAD PRINCIPAL (4-5) ===
    "Gorka Carmona Pino", "Gorka Carmona", "Gorka Full Stack Developer",
    
    // === UBICACIÓN ESTRATÉGICA (4-5) ===
    "Full Stack Developer Granada", "Web Developer Granada", "Desarrollador web Granada",
    "Spanish developer Granada",
    
    // === NIVEL Y ESPECIALIZACIÓN (4-5) ===
    "Junior Full Stack Developer", "Entry Level Full Stack", "FP Developer Granada",
    "Vocational Training Developer",
    
    // === TECNOLOGÍAS PRINCIPALES (8-10) ===
    "Vue.js Developer", "Nuxt 3 Developer", "React Developer", "Spring Boot Developer",
    "MongoDB Developer", "Docker Certified", "JavaScript Developer", "TypeScript Developer",
    
    // === CERTIFICACIONES (3-4) ===
    "Certified Docker Developer", "Python PCEP Certified", "AWS Certified Developer",
    
    // === PROYECTOS REALES (2-3) ===
    "GoLive Platform Developer", "Real Project Portfolio",
    
    // === PORTFOLIO PROFESIONAL (2-3) ===
    "Developer Portfolio", "Web Developer Portfolio",
    
    // === DISPONIBILIDAD (2-3) ===
    "Available Developer", "Open to Opportunities", "Junior Developer Available"
  ],
  
  // ============ INFORMACIÓN ESTRUCTURADA ============
  authors: [
    { 
      name: "Gorka Carmona Pino",
      url: "https://portafolio-gorka.vercel.app"
    }
  ],
  
  creator: "Gorka Carmona Pino",
  publisher: "Gorka Carmona Pino | Full Stack Developer Portfolio",
  generator: "Next.js 14, React 18, Tailwind CSS",
  
  // ============ ROBOTS CONFIGURACIÓN ============
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  
  // ============ OPEN GRAPH PROFESIONAL ============
  openGraph: {
    type: "profile",
    profile: {
      firstName: "Gorka",
      lastName: "Carmona Pino",
      username: "gorka_cpda"
    },
    locale: "es_ES",
    url: "https://portafolio-gorka.vercel.app",
    siteName: "Gorka Carmona Pino - Full Stack Developer Portfolio",
    title: "Gorka Carmona Pino | Full Stack Developer Specializing in Vue.js, React & Spring Boot",
    description: "Full Stack Developer portfolio showcasing Vue.js, Nuxt 3, React, Spring Boot, and MongoDB skills. Real project experience + technical certifications.",
    images: [
      {
        url: "https://portafolio-gorka.vercel.app/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gorka Carmona Pino - Full Stack Developer Portfolio",
        type: "image/jpeg"
      }
    ],
    emails: ["gorkacarmonapino@gmail.com"],
    address: {
      addressLocality: "Granada",
      addressRegion: "Andalusia",
      addressCountry: "ES"
    }
  },
  
  // ============ TWITTER CARD ============
  twitter: {
    card: "summary_large_image",
    site: "@gorka_cpda",
    creator: "@gorka_cpda",
    title: "Gorka Carmona Pino | Full Stack Developer Portfolio",
    description: "Full Stack Developer specializing in Vue.js, Nuxt 3, React, Spring Boot, and MongoDB.",
    images: [
      "https://portafolio-gorka.vercel.app/opengraph-image.jpg"
    ]
  },
  
  // ============ CANONICAL ============
  alternates: {
    canonical: "https://portafolio-gorka.vercel.app"
  },
  
  // ============ CATEGORÍAS ============
  category: "Technology",
  classification: "Web Development, Programming, Software Engineering",
  
  // ============ SCHEMA.ORG OPTIMIZADO Y SEGURO ============
  other: {
    // SCHEMA.ORG PRINCIPAL - VERSIÓN SEGURA
    "application/ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://portafolio-gorka.vercel.app/#person",
        "name": "Gorka Carmona Pino",
        "alternateName": ["Gorka Developer", "Gorka Full Stack"],
        "description": "Full Stack Developer from Granada, Spain specializing in modern web technologies including Vue.js, Nuxt 3, React, Spring Boot, and MongoDB.",
        "url": "https://portafolio-gorka.vercel.app",
        "image": {
          "@type": "ImageObject",
          "url": "https://portafolio-gorka.vercel.app/opengraph-image.jpg",
          "width": 1200,
          "height": 630
        },
        "sameAs": [
          "https://github.com/Gorkacp",
          "https://linkedin.com/in/gorka-carmona-pino"
          // SOLO REDES REALES Y ACTIVAS
        ],
        "jobTitle": "Full Stack Developer",
        "worksFor": {
          "@type": "Organization",
          "name": "Available for Professional Opportunities"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Granada",
          "addressRegion": "Andalusia",
          "addressCountry": "ES"
        },
        "knowsAbout": [
          "Vue.js", "Nuxt 3", "React", "JavaScript", "TypeScript",
          "Spring Boot", "Java", "MongoDB", "NoSQL", "Docker",
          "AWS", "Git", "REST APIs", "Web Development"
        ],
        "knowsLanguage": [
          {
            "@type": "Language",
            "name": "Spanish",
            "alternateName": "Español",
            "proficiencyLevel": "Native"
          },
          {
            "@type": "Language",
            "name": "English",
            "proficiencyLevel": "Intermediate"
          }
        ],
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Higher Technical Certificate in Web Application Development",
            "description": "Spanish Vocational Training in Web Application Development",
            "credentialCategory": "degree",
            "educationalLevel": "PostSecondary"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Python PCEP Certification",
            "description": "Python Certified Entry-Level Programmer certification",
            "credentialCategory": "certificate",
            "recognizedBy": {
              "@type": "Organization",
              "name": "OpenWebinars"
            }
          },
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Docker Fundamentals Certification",
            "description": "Certification in Docker containerization fundamentals",
            "credentialCategory": "certificate",
            "recognizedBy": {
              "@type": "Organization",
              "name": "OpenWebinars"
            }
          }
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Professional inquiries",
          "email": "gorkacarmonapino@gmail.com",
          "availableLanguage": ["Spanish", "English"],
          "areaServed": "Worldwide"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://portafolio-gorka.vercel.app/#website",
        "url": "https://portafolio-gorka.vercel.app",
        "name": "Gorka Carmona Pino - Full Stack Developer Portfolio",
        "description": "Professional portfolio showcasing Full Stack Development skills.",
        "publisher": {
          "@id": "https://portafolio-gorka.vercel.app/#person"
        },
        "inLanguage": ["es-ES", "en"]
      },
      {
        "@context": "https://schema.org",
        "@type": "Project",
        "name": "GoLive Platform",
        "description": "Full Stack event ticketing platform for music events.",
        "url": "https://portafolio-gorka.vercel.app/#projects",
        "technologies": ["Nuxt 3", "Vue 3", "Spring Boot", "MongoDB", "Docker"],
        "creator": {
          "@id": "https://portafolio-gorka.vercel.app/#person"
        },
        "applicationCategory": "BusinessApplication"
      }
    ]),
    
    // CONFIGURACIÓN TÉCNICA
    "viewport": "width=device-width, initial-scale=1, maximum-scale=5",
    "theme-color": "#000000",
    
    // REDES SOCIALES (SOLO REALES)
    "social:github": "https://github.com/Gorkacp",
    "social:linkedin": "https://linkedin.com/in/gorka-carmona-pino",
    "social:email": "gorkacarmonapino@gmail.com",
    
    // INFORMACIÓN GEOGRÁFICA BÁSICA
    "geo.region": "ES-AN",
    "geo.placename": "Granada, Spain"
  }
};

// ============ COMPONENTE PRINCIPAL ============
export default function Home() {
  return (
    <main className="flex flex-col bg-black text-white">
      <Hero />
      <About />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}