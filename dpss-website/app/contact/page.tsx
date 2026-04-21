import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Delhi Public Secondary School, Siddipet. Find our campus location, admissions contact number, and online inquiry form.',
};

export default function ContactPage() {
  return <ContactClient />;
}
