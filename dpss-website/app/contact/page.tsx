import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | Location & Inquiries',
  description: 'Get in touch with Delhi Public Secondary School, Siddipet. Find our location on the map, call our admissions office, or send an online inquiry. We are here to help.',
  keywords: ['Contact DPSS Siddipet', 'Siddipet School Phone Number', 'Best School Location Siddipet', 'DPSS Siddipet Enquiry'],
};

export default function ContactPage() {
  return <ContactClient />;
}
