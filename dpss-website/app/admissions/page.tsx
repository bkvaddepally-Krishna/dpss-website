import React from 'react';
import type { Metadata } from 'next';
import AdmissionsClient from './AdmissionsClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'DPSS Admission Form 2026-27',
  description: 'Online Registration Portal for Delhi Public Secondary School Siddipet',
};

export default function AdmissionsPage() {
  return <AdmissionsClient />;
}
