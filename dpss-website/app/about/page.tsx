import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us | DPSS Siddipet',
  description: 'Learn about Delhi Public Secondary School Siddipet. Message from the Chairman and Principal, Our Vision, Core Values, and Holistic Education.',
};

export default function AboutPage() {
  return <AboutClient />;
}
