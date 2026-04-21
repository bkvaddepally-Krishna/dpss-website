import { Metadata } from 'next';
import StudentLifeClient from './StudentLifeClient';

export const metadata: Metadata = {
  title: 'Student Life',
  description: 'Experience the daily routines, co-curricular activities, and vibrant campus culture that fosters student confidence at DPSS Siddipet.',
};

export default function StudentLifePage() {
  return <StudentLifeClient />;
}
