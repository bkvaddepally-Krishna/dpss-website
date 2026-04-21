import type { Metadata } from 'next';
import AcademicsClient from './AcademicsClient';

export const metadata: Metadata = {
  title: 'Academics | DPSS Siddipet',
  description: 'Explore the academic excellence, digital infrastructure, and holistic curriculum designed for the future leaders at Delhi Public Secondary School Siddipet.',
};

export default function AcademicsPage() {
  return <AcademicsClient />;
}
