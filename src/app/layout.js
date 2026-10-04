import "./globals.css";
import Header from "../components/Header"; 
import GlobalLoader from "@/components/GlobalLoader";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { headerLabels } from "@/lib/clientLabels";
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
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://portafolio-gorka.vercel.app"),
  // No global `alternates.canonical` here on purpose. Declaring the home URL as
  // canonical in the layout makes every route that does not override it a
  // declared duplicate of the home page. Each route owns its own canonical.
};

export default function RootLayout({ children }) {
  return (
    <html className={poppins.className} lang="es">
      <body className="bg-black text-white font-sans">
        <LanguageProvider>
          <GlobalLoader />
          <Header labelsByLang={headerLabels} />
          {/*
            El header es `fixed`, así que el flujo normal queda por debajo y hay
            que compensarlo. Este es el ÚNICO punto donde se hace: las secciones
            ya no suman su propio `pt-*`.
          */}
          <main className="pt-[var(--header-h)]">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}