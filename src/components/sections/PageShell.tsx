import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import ScrollBar from '@/components/ui/ScrollBar';
import JsonLd from '@/components/ui/JsonLd';

/** Chrome every content page shares: progress bar, nav, footer, plus the
 *  page's own JSON-LD (breadcrumbs, FAQPage …). */
export default function PageShell({
  jsonLd,
  children,
}: {
  jsonLd?: object[];
  children: React.ReactNode;
}) {
  return (
    <>
      {jsonLd && <JsonLd data={jsonLd} />}
      <ScrollBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
