import Footer from "@/components/Footer";
import { footerLabels } from "@/lib/clientLabels";

/**
 * Footer envuelto en un componente de servidor.
 *
 * `Footer` es un componente cliente, asi que no puede importar los locales por su
 * cuenta sin arrastrarlos al bundle. Este wrapper los lee en el servidor y se los
 * pasa ya resueltos. Las paginas de servidor usan `<SiteFooter />` en lugar de
 * `<Footer />`.
 */
export default function SiteFooter() {
  return <Footer labelsByLang={footerLabels} />;
}