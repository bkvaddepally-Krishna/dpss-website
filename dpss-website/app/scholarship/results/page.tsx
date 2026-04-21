import type { Metadata } from 'next';
import ResultsClient from './ResultsClient';

export const metadata: Metadata = {
  title: 'Scholarship Results 2026 | DPSS Siddipet',
  description: 'Check your DPSSAT 2026 Scholarship & Admission Test results. View marks and scholarship awards.',
};

export default function ResultsPage() {
  return <ResultsClient />;
}
