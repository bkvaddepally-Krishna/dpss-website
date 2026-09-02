"use client";

import React, { useState } from 'react';
import { FileText, X, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Replace these with your actual 10-15 PDFs
const DOCUMENTS = [
  { id: 1, title: "Building & Sound Certificate", filename: "building&sound_certificate.pdf" },
  { id: 2, title: "Delhi Recognition", filename: "DELHI_RECOGNITION.pdf" },
  { id: 3, title: "School Management Committee (SMC)", filename: "DPS _ SMC.pdf" },
  { id: 4, title: "CBSE Affidavit", filename: "DPS_CBSE_AFFIDAVIT.pdf" },
  { id: 5, title: "Fees Structure", filename: "fees_structure.pdf" },
  { id: 6, title: "Fire Safety Certificate", filename: "FIRE_SAFETY_CERTIFICATE.pdf" },
  { id: 7, title: "Land Certificate", filename: "land.pdf" },
  { id: 8, title: "Mandatory Disclosure", filename: "Mandatory.pdf" },
  { id: 9, title: "No Objection Certificate (NOC)", filename: "noc_mcs.pdf" },
  { id: 10, title: "Process Document (DSS)", filename: "proces_dss.pdf" },
  { id: 11, title: "Parent Teacher Association (PTA)", filename: "pta.pdf" },
  { id: 12, title: "Recognition Certificate", filename: "RECOGNITION_CERTIFICATE.pdf" },
  { id: 13, title: "School Certificate", filename: "school_cer.pdf" },
  { id: 14, title: "School Proceedings", filename: "school_proce.pdf" },
  { id: 15, title: "SMC Document", filename: "smc.pdf" },
  { id: 16, title: "Society Registration", filename: "socity.pdf" },
  { id: 17, title: "Teachers Details", filename: "teachers.pdf" },
  { id: 18, title: "Water & Sanitation Certificate", filename: "water_cert.pdf" },
];

export default function MandatoryDocuments() {
  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white">
      {DOCUMENTS.map((doc) => (
        <a
          key={doc.id}
          href={`/pdfs/${doc.filename}`}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center justify-between hover:border-primary hover:shadow-md transition-all group bg-white"
        >
          <div className="mb-4 text-gray-400 group-hover:text-primary transition-colors">
            <FileText size={36} strokeWidth={1.5} />
          </div>
          <h4 className="font-bold text-typography-dark mb-4 text-sm">{doc.title}</h4>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg text-xs font-bold transition-colors">
            <Eye size={14} /> View & Download
          </div>
        </a>
      ))}
    </div>
  );
}
