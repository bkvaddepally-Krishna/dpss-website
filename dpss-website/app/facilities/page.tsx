import { Metadata } from 'next';
import FacilitiesClient from './FacilitiesClient';

export const metadata: Metadata = {
  title: 'World-Class Facilities',
  description: 'Explore our modern campus facilities in Siddipet, including smart classrooms, science labs, transport, and 24/7 security designed for student well-being.',
};

export default function FacilitiesPage() {
  return <FacilitiesClient />;
}
