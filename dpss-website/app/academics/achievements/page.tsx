import { Metadata } from 'next';
import AcademicsAchievementsClient from './AcademicsAchievementsClient';

export const metadata: Metadata = {
  title: 'Academic Achievements',
  description: 'Discover our approach to academic excellence, consistent performance, and student development at Delhi Secondary School, Siddipet.',
};

export default function AcademicsAchievementsPage() {
  return <AcademicsAchievementsClient />;
}
