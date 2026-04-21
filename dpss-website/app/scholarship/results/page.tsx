import type { Metadata } from 'next';
import ResultsClient from './ResultsClient';

export const metadata: Metadata = {
  title: 'Scholarship Results',
  description: 'Check your Merit Scholarship Test results online. Enter your Hall Ticket to view your scorecard and scholarship award at DPSS Siddipet.',
};

export default function ResultsPage() {
  return <ResultsClient />;
}
