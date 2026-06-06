import "./globals.css";
import Header from "../components/Header"; 
import GlobalLoader from "@/components/GlobalLoader";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  title: {
    default: "Gorka Carmona Pino | Full Stack Developer",
    template: "%s | Gorka Carmona Pino",
  },
  description: "Portfolio profesional de Gorka Carmona Pino, Full Stack Developer especializado en Vue.js, Nuxt 3, React, Spring Boot y MongoDB.",
  keywords: ["Full Stack Developer", "Vue.js", "Nuxt 3", "React", "Spring Boot", "MongoDB", "Granada"],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://portafolio-gorka.vercel.app"),
  alternates: {
    languages: {
      "es-ES": "/",
      en: "/en",
      de: "/de",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html className={poppins.className} lang="es">
      <body className="bg-black text-white font-sans">
        <LanguageProvider>
          <GlobalLoader />
          <Header />
          <main className="pt-20">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}