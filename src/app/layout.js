import "./globals.css";
import Header from "../components/Header"; 
import { Poppins } from "next/font/google";

// Configuramos Poppins con los pesos que vamos a usar
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Gorka Portfolio",
  description: "Front End Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={poppins.className}>
      <body className="bg-black text-white font-sans">
        <Header />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
