import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Our School',
  description: 'Learn about Delhi Public Secondary School in Siddipet. Explore our vision, core values, and commitment to holistic CBSE education.',
};

export default function AboutPage() {
  return <AboutClient />;
}
