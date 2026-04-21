import type { Metadata } from 'next';
import ScholarshipClient from './ScholarshipClient';

export const metadata: Metadata = {
  title: 'Merit Scholarship Test 2026 | DPSS Siddipet admissions',
  description: 'Apply for the Merit Scholarship Test at Delhi Public Secondary School, Siddipet. Top rankers can secure up to 100% tuition fee waivers. Register online and download your Hall Ticket.',
  keywords: ['Merit Scholarship Test', 'DPSS Siddipet', 'School Scholarship 2026', 'Siddipet School Admissions', 'Best School in Siddipet'],
  openGraph: {
    title: 'Merit Scholarship Test 2026 | DPSS Siddipet',
    description: 'Secure your child\'s future with up to 100% scholarship at DPSS Siddipet. Register for the Merit Scholarship Test today.',
    images: ['/images/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Merit Scholarship Test 2026 | DPSS Siddipet',
    description: 'Apply now for the Merit Scholarship Test at DPSS Siddipet. Scholarships up to 100% available.',
  }
};

export default function ScholarshipPage() {
  return <ScholarshipClient />;
}
