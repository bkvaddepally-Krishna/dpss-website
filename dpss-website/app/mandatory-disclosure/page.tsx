import React from 'react';
import { Metadata } from 'next';
import { Download } from 'lucide-react';
import { schoolInfo } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Mandatory Public Disclosure',
  description: 'Official information, affiliation details, and transparency disclosures for Delhi Public Secondary School, Siddipet.',
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
          <InfoRow label="Principal Name & Qualification" value="[Principal Name], [Degrees]" />
          <InfoRow label="School Email ID" value={schoolInfo.email} />
          <InfoRow label="Contact Details" value={schoolInfo.phone} />
          <InfoRow label="Affiliation Number" value="[Add Registration No.]" />
          <InfoRow label="Affiliation Banner" value="CBSE (If Appicable/Pending)" />
        </div>

        {/* 3. GENERAL INFORMATION */}
        <SectionHeader title="B. General Information" />
        <div className="flex flex-col">
          <InfoRow label="Year of Establishment" value="2022" />
          <InfoRow label="School Category / Type" value="Co-educational Day School" />
          <InfoRow label="Medium of Instruction" value="English" />
          <InfoRow label="Classes Offered" value="Nursery to Grade X" />
        </div>

        {/* 4. STAFF DETAILS */}
        <SectionHeader title="C. Staff Information" />
        <div className="flex flex-col">
          <InfoRow label="Total Number of Teachers" value="[Number]" />
          <InfoRow label="Teachers Qualification" value="All teaching staff are properly certified and qualified as per board norms." />
          <InfoRow label="Student-Teacher Ratio" value="Optimal ratio maintained for individualized attention [e.g. 25:1]" />
          <InfoRow label="Special Educators" value="Available / Associated" />
          <InfoRow label="Counselors" value="Available for student well-being" />
        </div>

        {/* 5. ACADEMIC INFORMATION */}
        <SectionHeader title="D. Academic Framework" />
        <div className="flex flex-col">
          <InfoRow label="Curriculum" value="National Curriculum Framework / CBSE Guidelines" />
          <InfoRow label="Assessment System" value="Formative and Summative localized assessments with continuous tracking." />
          <InfoRow label="Academic Session Period" value="April to March" />
          <InfoRow label="Vacation Period" value="May to June (Summer) & October (Dussehra/Diwali)" />
        </div>

        {/* 6. INFRASTRUCTURE DETAILS */}
        <SectionHeader title="E. Infrastructure Details" />
        <div className="flex flex-col">
          <InfoRow label="Total Campus Area" value="[Area in Sq. Mtrs/Acres]" />
          <InfoRow label="Classrooms" value="Spacious, well-ventilated, digitally equipped Smart Classrooms." />
          <InfoRow label="Laboratories" value="Dedicated units for composite Science and interactive Computer Learning." />
          <InfoRow label="Library" value="Well-stocked central resource center with reading materials across genres." />
          <InfoRow label="Transport Facility" value="Yes, GPS-enabled buses servicing routes across Siddipet." />
          <InfoRow label="Safety & Security" value="24/7 CCTV surveillance, boundary coverage, trained security staff." />
        </div>

        {/* 7. DOCUMENTS / DOWNLOADS */}
        <SectionHeader title="F. Important Documents" />
        <div className="p-8 grid sm:grid-cols-3 gap-6 bg-white">
          {[
            { label: "Affiliation/Trust Certificate", doc: "trust-certificate.pdf" },
            { label: "School Prospectus", doc: "dpss-prospectus.pdf" },
            { label: "Fee Structure", doc: "fee-structure.pdf" }
          ].map((item, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center justify-between hover:border-primary hover:shadow-md transition-all group">
              <div className="mb-4 text-gray-400 group-hover:text-primary transition-colors">
                <Download size={32} />
              </div>
              <h4 className="font-bold text-typography-dark mb-4 text-sm">{item.label}</h4>
              <button disabled className="px-4 py-2 bg-gray-50 text-gray-400 rounded-lg text-xs font-bold border border-gray-100 cursor-not-allowed">
                Upload Pending
              </button>
            </div>
          ))}
        </div>

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
