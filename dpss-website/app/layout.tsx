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
  title: {
    default: 'DPSS Siddipet – Premier CBSE School | Admissions 2026-27',
    template: '%s | DPSS Siddipet'
  },
  description: 'Delhi Public Secondary School in Siddipet, Telangana. CBSE affiliated with 25+ world-class facilities. Admissions open for 2026-27. Nurturing the leaders of tomorrow.',
  keywords: ['DPSS Siddipet', 'Best School in Siddipet', 'CBSE Schools Telangana', 'Delhi Public Secondary School', 'Siddipet Admission 2026', 'High School Siddipet'],
  authors: [{ name: 'DPSS Siddipet' }],
  creator: 'DPSS Siddipet',
  publisher: 'Delhi Public Secondary School',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://dpsssiddipet.com',
    siteName: 'DPSS Siddipet',
    title: 'DPSS Siddipet – Premier CBSE School | Admissions 2026-27',
    description: 'Premier CBSE education in Siddipet with international standards and 25+ world-class facilities.',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'DPSS Siddipet Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DPSS Siddipet – Elite CBSE Education',
    description: 'Admissions open for 2026-27 at Siddipet\'s finest institution.',
    images: ['/images/logo.png'],
  },
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
