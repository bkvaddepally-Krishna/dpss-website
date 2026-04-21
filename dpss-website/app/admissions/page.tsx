import React from 'react';
import type { Metadata } from 'next';
import AdmissionsClient from './AdmissionsClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admissions 2026-27',
  description: 'Apply for admission to DPSS Siddipet for the 2026-27 academic session. Register online for quality CBSE education in Siddipet.',
};

export default function AdmissionsPage() {
  return <AdmissionsClient />;
}
