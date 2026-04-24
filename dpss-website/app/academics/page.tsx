import type { Metadata } from 'next';
import AcademicsClient from './AcademicsClient';

export const metadata: Metadata = {
  title: 'Academics & Curriculum',
  description: 'Explore the academic curriculum, digital infrastructure, and holistic learning approach at DPSS Siddipet.',
};

export default function AcademicsPage() {
  return <AcademicsClient />;
}
