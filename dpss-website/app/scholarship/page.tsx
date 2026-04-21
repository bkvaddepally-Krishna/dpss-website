import type { Metadata } from 'next';
import ScholarshipClient from './ScholarshipClient';

export const metadata: Metadata = {
  title: 'Scholarship & admissions Test | DPSS Siddipet',
  description: 'Apply for the DPSS Scholarship & Admission Test (DPSSAT). Top rankers can secure up to 100% scholarships.',
};

export default function ScholarshipPage() {
  return <ScholarshipClient />;
}
