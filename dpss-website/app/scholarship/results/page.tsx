import type { Metadata } from 'next';
import ResultsClient from './ResultsClient';

export const metadata: Metadata = {
  title: 'Merit Scholarship Test Results 2026 | DPSS Siddipet',
  description: 'Check your Merit Scholarship Test 2026 results. Enter your Hall Ticket Number and mobile number to view your scorecard and scholarship award.',
};

export default function ResultsPage() {
  return <ResultsClient />;
}
