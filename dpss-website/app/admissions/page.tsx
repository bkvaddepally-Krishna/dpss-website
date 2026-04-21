import React from 'react';
import type { Metadata } from 'next';
import AdmissionsClient from './AdmissionsClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admissions Open 2026-27 | Online Registration for DPSS Siddipet',
  description: 'Apply for admission to Delhi Public Secondary School, Siddipet for the 2026-27 academic session. Best CBSE school in Siddipet for quality education. Register online today.',
  keywords: ['School Admissions 2026', 'DPSS Siddipet Registration', 'CBSE Admission Telangana', 'Best School in Siddipet'],
};

export default function AdmissionsPage() {
  return <AdmissionsClient />;
}
