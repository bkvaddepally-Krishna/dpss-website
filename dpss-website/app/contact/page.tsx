import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | DPSS Siddipet',
  description: 'Reach out to Delhi Public Secondary School Siddipet for admissions, inquiries, and other information.',
};

export default function ContactPage() {
  return <ContactClient />;
}
