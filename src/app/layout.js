import "./globals.css";
import Header from "../components/Header"; 
import GlobalLoader from "@/components/GlobalLoader";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Gorka Portfolio",
  description: "Front End Developer",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html className={poppins.className} lang="es">
      <body className="bg-black text-white font-sans">
        <GlobalLoader />
        <Header />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}