import React from 'react';
import { Metadata } from 'next';
import { Download } from 'lucide-react';
import { schoolInfo } from '@/lib/constants';
import MandatoryDocuments from '@/components/MandatoryDocuments';

export const metadata: Metadata = {
  title: 'Mandatory Public Disclosure',
  description: 'Official information and transparency disclosures for Delhi Secondary School, Siddipet.',
  robots: {
    index: false,
    follow: false,
  },
};

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="bg-[#f8faf9] border-y border-gray-100 px-8 py-4">
      <h2 className="text-lg font-bold tracking-widest text-primary uppercase">{title}</h2>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6 py-4 border-b border-gray-50 px-8 last:border-0 hover:bg-gray-50/50 transition-colors">
      <div className="font-semibold text-typography-body">{label}</div>
      <div className="sm:col-span-2 text-typography-dark font-medium">{value}</div>
    </div>
  );
}

export default function MandatoryDisclosurePage() {
  return (
    <main className="flex flex-col pt-[130px] pb-24 px-6 bg-[#f8faf9] min-h-screen">
      
      <div className="max-w-5xl mx-auto w-full bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* 1. HERO */}
        <div className="bg-primary py-16 px-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px]" />
          <div className="relative z-10">
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4 tracking-wide">
              Mandatory Disclosure
            </h1>
            <p className="text-white/80 max-w-xl mx-auto text-sm md:text-base">
              Information and details as per educational guidelines and transparency requirements.
            </p>
          </div>
        </div>

        {/* 2. SCHOOL INFORMATION */}
        <SectionHeader title="A. Basic School Information" />
        <div className="flex flex-col">
          <InfoRow label="Name of the School" value={schoolInfo.name} />
          <InfoRow label="Complete Address" value={schoolInfo.address} />
          <InfoRow label="Principal Name & Qualification" value="[PLEASE SEND ME THE NAME & QUALIFICATION, YOU FORGOT TO PASTE IT!]" />
          <InfoRow label="School Email ID" value={schoolInfo.email} />
          <InfoRow label="Contact Details" value={schoolInfo.phone} />
        </div>

        {/* 3. GENERAL INFORMATION */}
        <SectionHeader title="B. General Information" />
        <div className="flex flex-col">
          <InfoRow label="Year of Establishment" value="2022" />
          <InfoRow label="School Category / Type" value="Co-educational Day School" />
          <InfoRow label="Medium of Instruction" value="English" />
          <InfoRow label="Classes Offered" value="Nursery to Grade IX" />
        </div>

        {/* 4. DOCUMENTS / DOWNLOADS */}
        <SectionHeader title="C. Important Documents" />
          <MandatoryDocuments />

        {/* 8. NOTE */}
        <div className="bg-gray-50 border-t border-gray-100 p-8 text-center">
          <p className="text-sm text-typography-body italic">
            "This information is provided for transparency and will be updated periodically as per administrative changes."
          </p>
        </div>

      </div>
    </main>
  );
}
