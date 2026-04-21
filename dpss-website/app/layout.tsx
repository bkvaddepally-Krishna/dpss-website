import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import '../styles/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-pjs'
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: 'DPSS Siddipet – Premier CBSE School | Admissions 2026-27',
  description: 'Delhi Public Secondary School in Siddipet, Telangana. CBSE affiliated with 25+ world-class facilities. Admissions open for 2026-27. Nurturing future leaders.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      <body className="antialiased font-sans min-h-screen flex flex-col bg-white text-typography-body">
        {/* Gold top border */}
        <div className="fixed top-0 left-0 right-0 h-[3px] bg-accent z-[60]" />
        <div className="pt-[3px]">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
