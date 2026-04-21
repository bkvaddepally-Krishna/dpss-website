"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, GraduationCap, Award, CheckCircle, AlertCircle, TrendingUp, BookOpen, Clock, FileText, ChevronRight } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { fadeUp, staggerContainer, viewport } from '@/lib/animations';

type ResultData = {
  hall_ticket_no: string;
  student_name: string;
  class: string;
  english_marks: number;
  science_marks: number;
  social_marks: number;
  maths_marks: number;
  gk_marks: number | null;
  total_marks: number;
  max_marks: number;
  scholarship_percentage: number;
  remarks: string | null;
};

export default function ResultsClient() {
  const [hallTicket, setHallTicket] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultData | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hallTicket || !mobile) {
      setError('Please enter both Hall Ticket Number and Mobile Number.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/scholarship/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hallTicket: hallTicket.trim(), mobile: mobile.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Unable to fetch results. Please check your details.');
      }

      setResult(data.result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadResultPDF = async () => {
    if (!result) return;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Branded Header
    doc.setDrawColor(0, 91, 65);
    doc.setLineWidth(1.5);
    doc.rect(10, 10, 190, 277);
    
    doc.setTextColor(0, 91, 65);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("DELHI PUBLIC SECONDARY SCHOOL", 105, 30, { align: "center" });
    
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text("DPSSAT 2026 - SCHOLARSHIP EXAMINATION RESULTS", 105, 38, { align: "center" });
    doc.setLineWidth(0.5);
    doc.line(40, 42, 170, 42);

    // Student Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("SCORECARD", 20, 60);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    let y = 75;
    const addRow = (label: string, val: string) => {
      doc.setFont("helvetica", "bold");
      doc.text(label, 20, y);
      doc.setFont("helvetica", "normal");
      doc.text(val, 70, y);
      y += 10;
    };

    addRow("Hall Ticket Number", result.hall_ticket_no);
    addRow("Student Name", result.student_name);
    addRow("Class", result.class);
    
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("PERFORMANCE SUMMARY", 20, y);
    y += 12;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    addRow("Total Marks Obtained", `${result.total_marks} / ${result.max_marks}`);
    
    y += 5;
    doc.setFillColor(0, 91, 65);
    doc.rect(20, y, 170, 25, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("SCHOLARSHIP AWARDED", 105, y + 10, { align: "center" });
    
    doc.setFontSize(22);
    const awardText = result.scholarship_percentage > 0 
      ? `${result.scholarship_percentage}% TUITION FEE WAIVER`
      : "PARTICIPATION CERTIFICATE";
    doc.text(awardText, 105, y + 20, { align: "center" });

    doc.setTextColor(0, 0, 0);
    y += 45;
    doc.setFontSize(11);
    doc.setFont("helvetica", "italic");
    doc.text("Note: This is a computer-generated scorecard. Final scholarship allocation is subject to original document verification at the time of admission.", 20, y, { maxWidth: 170 });

    doc.save(`${result.hall_ticket_no}_DPSSAT_Result.pdf`);
  };

  return (
    <div className="flex flex-col pt-24 min-h-screen bg-[#fafafa]">
      
      {/* ══════════════ HERO SECTION ══════════════ */}
      <section className="bg-primary text-white py-16 px-6 text-center relative overflow-hidden">
         {/* Animated BG elements */}
         <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
         <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
         
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
             <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 text-accent font-bold text-xs tracking-widest uppercase rounded-full mb-4">
                <Award size={16} /> Results Declared 2026
             </span>
             <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-2">
                Scholarship Test Outcomes
             </h1>
             <p className="text-white/80 text-lg font-medium max-w-2xl mx-auto">
                Congratulations to all participants! Enter your details below to reveal your performance and scholarship status.
             </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ SEARCH LAYER ══════════════ */}
      <section className="max-w-6xl mx-auto px-6 relative z-20 -mt-8 mb-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SEARCH FORM: Left Column */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="lg:col-span-5 bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
             <div className="mb-8">
                <h2 className="font-serif text-2xl font-bold text-typography-dark mb-2">Check Result</h2>
                <p className="text-typography-body text-sm">
                   Provide your Hall Ticket Number and the registered mobile number to see your scorecard.
                </p>
             </div>

             {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex gap-3 text-sm font-medium mb-6">
                   <AlertCircle className="shrink-0" size={20} /> {error}
                </div>
             )}

             <form onSubmit={handleSearch} className="space-y-5">
                <div>
                   <label className="block text-sm font-bold text-typography-dark mb-1.5 ml-1">Hall Ticket Number</label>
                   <input 
                      type="text" 
                      value={hallTicket}
                      onChange={(e) => setHallTicket(e.target.value.toUpperCase())}
                      placeholder="e.g. DPSS2026-XXXX"
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-typography-dark"
                   />
                </div>
                <div>
                   <label className="block text-sm font-bold text-typography-dark mb-1.5 ml-1">Registered Mobile Number</label>
                   <input 
                      type="text" 
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-typography-dark"
                   />
                </div>
                
                <button 
                   type="submit" 
                   disabled={loading}
                   className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold px-8 py-5 rounded-2xl hover:bg-green-800 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 mt-4 group"
                >
                   {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   ) : (
                      <>
                         <Search size={20} /> Reveal My Result
                      </>
                   )}
                </button>
             </form>
             
             <div className="mt-8 pt-8 border-t border-gray-50 flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center shrink-0">
                  <TrendingUp size={20} />
                </div>
                <p className="text-xs text-typography-body leading-relaxed">
                  Scholarships range from 10% to 100% based on cut-off marks across all subjects.
                </p>
             </div>
          </motion.div>

          {/* RESULT DISPLAY: Right Column */}
          <div className="lg:col-span-7 sm:min-h-[500px]">
             <AnimatePresence mode="wait">
                {!result ? (
                   <motion.div 
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-12 text-center"
                   >
                      <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-gray-300 shadow-sm mb-6">
                         <GraduationCap size={40} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-400 mb-2">Awaiting lookup...</h3>
                      <p className="text-gray-400 text-sm max-w-xs mx-auto">
                         Enter your credentials in the form to your left to see your detailed score and scholarship status.
                      </p>
                   </motion.div>
                ) : (
                   <motion.div 
                      key="result"
                      initial="hidden" animate="visible" variants={fadeUp}
                      className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
                   >
                      {/* Header Card */}
                      <div className="bg-primary p-8 md:p-10 text-white relative">
                         <Award className="absolute top-8 right-8 text-white/10" size={120} />
                         <div className="relative z-10">
                            <span className="inline-block px-3 py-1 bg-white/10 rounded-lg text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
                               Official Scorecard
                            </span>
                            <h3 className="text-3xl font-bold mb-2">{result.student_name}</h3>
                            <div className="flex flex-wrap gap-4 text-white/70 text-sm">
                               <span className="flex items-center gap-1.5"><FileText size={14} /> HT: {result.hall_ticket_no}</span>
                               <span className="flex items-center gap-1.5"><BookOpen size={14} /> Class {result.class}</span>
                            </div>
                         </div>
                      </div>

                      {/* Score Grid */}
                      <div className="p-8 md:p-10 space-y-8">
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                               <p className="text-typography-body text-xs font-bold uppercase tracking-wider mb-1 opacity-60 font-sans">Total Score</p>
                               <div className="flex items-baseline gap-2">
                                  <span className="text-4xl font-bold text-typography-dark leading-none">{result.total_marks}</span>
                                  <span className="text-gray-400 font-medium">/ {result.max_marks}</span>
                               </div>
                               <div className="w-full bg-gray-200 h-1.5 rounded-full mt-4 overflow-hidden">
                                  <motion.div 
                                     initial={{ width: 0 }}
                                     animate={{ width: `${(result.total_marks/result.max_marks)*100}%` }}
                                     transition={{ duration: 1, ease: "easeOut" }}
                                     className="bg-primary h-full"
                                  />
                               </div>
                            </div>

                            <div className="bg-accent/5 p-6 rounded-2xl border border-accent/20 flex flex-col justify-center">
                               <p className="text-typography-body text-xs font-bold uppercase tracking-wider mb-1 opacity-80 font-sans">Scholarship Award</p>
                               <div className="flex items-center gap-2">
                                  <span className="text-3xl font-black text-typography-dark tracking-tight">
                                     {result.scholarship_percentage > 0 ? `${result.scholarship_percentage}%` : 'Selected'}
                                  </span>
                                  {result.scholarship_percentage > 0 && <span className="text-typography-dark/70 font-bold text-sm uppercase">Waiver</span>}
                               </div>
                               <p className="text-[10px] text-accent-dark font-bold mt-2 flex items-center gap-1">
                                  <CheckCircle size={10} /> Qualified for Admission
                               </p>
                            </div>
                         </div>

                         {/* Remarks or Next Steps */}
                         <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100/50">
                            <div className="flex gap-4">
                               <div className="w-10 h-10 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center shrink-0">
                                  <TrendingUp size={20} />
                               </div>
                               <div>
                                  <h4 className="font-bold text-typography-dark mb-1">What's Next?</h4>
                                  <p className="text-sm text-typography-body leading-relaxed">
                                     {result.remarks || "Please visit the school campus within the next 7 days with your original documents to claim your scholarship and secure your seat. Limited seats available per class."}
                                  </p>
                               </div>
                            </div>
                         </div>

                         {/* Footer Actions */}
                         <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-50">
                            <button 
                               onClick={downloadResultPDF}
                               className="flex-1 flex items-center justify-center gap-2 bg-typography-dark text-white font-bold px-6 py-4 rounded-xl hover:bg-black transition-all shadow-md active:scale-95"
                            >
                               <Download size={18} /> Download Scorecard
                            </button>
                            <button 
                               onClick={() => window.location.href = `/contact?subject=Admission Inquiry for ${result.student_name}`}
                               className="flex-1 flex items-center justify-center gap-2 bg-primary/10 text-primary font-bold px-6 py-4 rounded-xl hover:bg-primary/20 transition-all group"
                            >
                               Inquire Now <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                         </div>
                      </div>
                   </motion.div>
                )}
             </AnimatePresence>
          </div>

        </div>
      </section>
    </div>
  );
}
