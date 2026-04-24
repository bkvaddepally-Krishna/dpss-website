"use client";

import React from 'react';
import MultiStepForm from '@/components/admissions/MultiStepForm';
import { Toaster } from 'sonner';
import { motion } from 'framer-motion';
import { CheckCircle2, Users, BookOpen, Clock, FileText, Calendar, GraduationCap, ShieldCheck } from 'lucide-react';

export default function AdmissionsClient() {
  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-4 sm:px-6 lg:px-8 pt-32 pb-24">
      <Toaster position="top-center" richColors />

      {/* ══════════════ HERO SECTION ══════════════ */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.p 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
          className="text-xs font-bold tracking-[0.25em] text-primary uppercase mb-3"
        >
          Online Registration Portal
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} 
          className="font-serif text-4xl md:text-6xl font-black text-typography-dark tracking-tight leading-tight"
        >
          Admissions <span className="text-primary">2026–27</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} 
          className="mt-5 text-lg text-typography-body max-w-2xl mx-auto font-medium"
        >
          Fill the form below to begin your child's admission process for the upcoming academic year.
        </motion.p>
        
        {/* TRUST STRIP */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} 
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-10"
        >
            <div className="flex items-center gap-2 border border-gray-200 bg-white rounded-full px-4 py-2 shadow-sm">
               <Users size={16} className="text-accent" /> 
               <span className="text-xs font-bold text-typography-dark uppercase tracking-widest">600+ Students</span>
            </div>
            <div className="flex items-center gap-2 border border-gray-200 bg-white rounded-full px-4 py-2 shadow-sm">
               <BookOpen size={16} className="text-accent" /> 
               <span className="text-xs font-bold text-typography-dark uppercase tracking-widest">25+ Faculty</span>
            </div>
            <div className="flex items-center gap-2 border border-gray-200 bg-white rounded-full px-4 py-2 shadow-sm">
               <CheckCircle2 size={16} className="text-accent" /> 
               <span className="text-xs font-bold text-typography-dark uppercase tracking-widest">Premier Institution</span>
            </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
        
        {/* ══════════════ LEFT COLUMN (INFORMATION) ══════════════ */}
        <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-32 order-2 lg:order-1">
          
          {/* WHY APPLY */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
             <h2 className="text-2xl font-serif font-bold text-typography-dark mb-6">Why Apply to DPSS?</h2>
             <ul className="space-y-4">
               {[
                 { text: "Strong academic results with modern curriculum", icon: <BookOpen size={18}/> },
                 { text: "Safe and disciplined environment", icon: <ShieldCheck size={18}/> },
                 { text: "Focus on overall development (sports, arts, leadership)", icon: <GraduationCap size={18}/> },
                 { text: "Experienced faculty and modern classrooms", icon: <Users size={18}/> }
               ].map((item, i) => (
                 <li key={i} className="flex items-start gap-4">
                   <div className="mt-0.5 shrink-0 text-primary bg-primary/5 p-2 rounded-xl border border-primary/10">
                     {item.icon}
                   </div>
                   <span className="text-typography-body font-medium pt-1 leading-snug">{item.text}</span>
                 </li>
               ))}
             </ul>
          </section>

          {/* ADMISSION PROCESS */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
             <h2 className="text-2xl font-serif font-bold text-typography-dark mb-6">Admission Process</h2>
             <div className="space-y-0">
                {/* Step 1 */}
                <div className="flex gap-5 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-black shrink-0 relative z-10">1</div>
                    <div className="w-[2px] h-full bg-gray-100 absolute top-10 left-1/2 -translate-x-1/2 -bottom-2 z-0" />
                  </div>
                  <div className="pb-8 pt-2">
                    <h3 className="font-bold text-typography-dark text-lg">Fill Online Form</h3>
                    <p className="text-sm text-typography-body mt-1 leading-relaxed">Submit the online application with accurate student and parent details.</p>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="flex gap-5 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-black shrink-0 relative z-10">2</div>
                    <div className="w-[2px] h-full bg-gray-100 absolute top-10 left-1/2 -translate-x-1/2 -bottom-2 z-0" />
                  </div>
                  <div className="pb-8 pt-2">
                    <h3 className="font-bold text-typography-dark text-lg">Student Interaction</h3>
                    <p className="text-sm text-typography-body mt-1 leading-relaxed">A brief campus meeting to understand the child's readiness and interests.</p>
                  </div>
                </div>
                {/* Step 3 */}
                <div className="flex gap-5 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-white shadow-md flex items-center justify-center font-black shrink-0 relative z-10">3</div>
                  </div>
                  <div className="pt-2">
                    <h3 className="font-bold text-typography-dark text-lg">Admission Confirmation</h3>
                    <p className="text-sm text-typography-body mt-1 leading-relaxed">Submit requisite documents and complete fee payment securely.</p>
                  </div>
                </div>
             </div>
          </section>

          {/* REQUIREMENTS & AGE CRITERIA BOX */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
               <h3 className="flex items-center gap-2 font-bold text-typography-dark mb-4 text-sm uppercase tracking-widest">
                 <FileText size={16} className="text-accent" /> Documents Req.
               </h3>
               <ul className="text-sm text-typography-body space-y-2.5 font-medium">
                 <li className="flex items-center gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Birth Certificate</li>
                 <li className="flex items-center gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Aadhaar Card</li>
                 <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> Previous School Records</li>
                 <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> Passport Size Photos</li>
               </ul>
             </div>
             
             <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
               <h3 className="flex items-center gap-2 font-bold text-typography-dark mb-4 text-sm uppercase tracking-widest">
                 <Calendar size={16} className="text-accent" /> Age Criteria
               </h3>
               <ul className="text-sm text-typography-body space-y-3">
                 <li className="flex items-center justify-between border-b border-gray-50 pb-2">
                   <span className="font-medium text-gray-500">Nursery:</span> 
                   <strong className="text-primary tracking-wide">3+ years</strong>
                 </li>
                 <li className="flex items-center justify-between border-b border-gray-50 pb-2">
                   <span className="font-medium text-gray-500">LKG:</span> 
                   <strong className="text-primary tracking-wide">4+ years</strong>
                 </li>
                 <li className="flex items-center justify-between">
                   <span className="font-medium text-gray-500">UKG:</span> 
                   <strong className="text-primary tracking-wide">5+ years</strong>
                 </li>
               </ul>
             </div>
          </div>

        </div>

        {/* ══════════════ RIGHT COLUMN (FORM) ══════════════ */}
        <div className="lg:col-span-7 order-1 lg:order-2">
           {/* URGENCY ELEMENT */}
           <motion.div 
             initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
             className="bg-[#fff9e6] border border-amber-200 rounded-2xl p-5 mb-8 flex items-start gap-4 shadow-[0_4px_20px_rgba(255,196,0,0.15)] relative overflow-hidden"
           >
             <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/3" />
             <div className="bg-white p-2.5 rounded-xl border border-amber-100 shadow-sm shrink-0">
               <Clock className="text-accent" size={24} />
             </div>
             <div className="relative z-10 pt-1">
               <h4 className="font-bold text-typography-dark text-base tracking-wide">Limited Seats Available</h4>
               <p className="text-typography-body text-sm mt-1 leading-relaxed">
                 Admissions are processed strictly on a first-come basis. Submission of this form does not guarantee admission.
               </p>
             </div>
           </motion.div>
           
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
             <MultiStepForm />
           </motion.div>
        </div>

      </div>
    </div>
  );
}
