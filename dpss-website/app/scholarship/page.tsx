import type { Metadata } from 'next';
import ScholarshipClient from './ScholarshipClient';

export const metadata: Metadata = {
  title: 'Merit Scholarship Test 2026',
  description: 'Register for the DPSS Siddipet Merit Scholarship Test. Excellent students can secure up to 100% tuition fee waivers for the upcoming academic year.',
};

export default function ScholarshipPage() {
  return <ScholarshipClient />;
}
