import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import '../styles/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Providers from '@/components/layout/Providers';
import { schoolInfo } from '@/lib/constants';
import Script from 'next/script';

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
    default: 'Delhi Secondary School - Siddipet',
    template: '%s | Delhi Secondary School - Siddipet'
  },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
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
    title: 'Delhi Secondary School - Siddipet',
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
    title: 'Delhi Secondary School - Siddipet',
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Delhi Public Secondary School, Siddipet',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Srinivasa Nagar Road, Near Police Hall',
      addressLocality: 'Siddipet',
      addressRegion: 'Telangana',
      postalCode: '502103',
      addressCountry: 'IN'
    },
    telephone: schoolInfo.phone,
    email: schoolInfo.email,
    url: 'https://dpsssiddipet.com',
    logo: 'https://dpsssiddipet.com/images/logo.png',
  };

  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans min-h-screen flex flex-col bg-white text-typography-body">
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });

              // Global Click Tracking
              document.addEventListener('click', function(e) {
                var target = e.target.closest('a');
                if (!target) return;
                var href = target.getAttribute('href');
                if (href) {
                  if (href.includes('/admissions')) {
                    gtag('event', 'click', { event_category: 'Conversion', event_label: 'Apply Now Click' });
                  } else if (href.includes('/scholarship')) {
                    gtag('event', 'click', { event_category: 'Navigation', event_label: 'Scholarship Click' });
                  }
                }
              });
            `,
          }}
        />

        <Providers>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
