"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Download, GraduationCap, Award, CheckCircle,
  AlertCircle, Clock, TrendingUp, BookOpen, FileText,
  ChevronRight, Info
} from 'lucide-react';
import { jsPDF } from 'jspdf';

type ResultData = {
  hall_ticket_no: string;
  student_name: string;
  class: string;
  father_name: string;
  english_marks: number | null;
  science_marks: number | null;
  social_marks: number | null;
  maths_marks: number | null;
  gk_marks: number | null;
  total_marks: number;
  max_marks: number;
  scholarship_percentage: number;
  remarks: string | null;
};

type ErrorState = {
  message: string;
  code: 'NOT_REGISTERED' | 'MOBILE_MISMATCH' | 'RESULT_PENDING' | 'NOT_PUBLISHED' | 'GENERIC';
};

const ERROR_CONFIG: Record<ErrorState['code'], { icon: React.ReactNode; title: string; color: string }> = {
  NOT_REGISTERED:  { icon: <FileText size={22} />,    title: 'Hall Ticket Not Found',       color: 'red'    },
  MOBILE_MISMATCH: { icon: <AlertCircle size={22} />, title: 'Mobile Number Mismatch',      color: 'red'    },
  RESULT_PENDING:  { icon: <Clock size={22} />,       title: 'Results Not Entered Yet',      color: 'amber'  },
  NOT_PUBLISHED:   { icon: <Clock size={22} />,       title: 'Results Not Yet Published',    color: 'amber'  },
  GENERIC:         { icon: <AlertCircle size={22} />, title: 'Something Went Wrong',         color: 'red'    },
};

export default function ResultsClient() {
  const [hallTicket, setHallTicket] = useState('');
  const [mobile, setMobile]         = useState('');
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState<ErrorState | null>(null);
  const [result, setResult]         = useState<ResultData | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hallTicket.trim() || !mobile.trim()) {
      setError({ message: 'Please enter both Hall Ticket Number and Mobile Number.', code: 'GENERIC' });
      return;
    }
    if (mobile.replace(/\D/g, '').length < 10) {
      setError({ message: 'Please enter a valid 10-digit mobile number.', code: 'GENERIC' });
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
        const code = (data.code as ErrorState['code']) || 'GENERIC';
        setError({ message: data.error || 'Unable to fetch results.', code });
        return;
      }
      setResult(data.result);
    } catch {
      setError({ message: 'Network error. Please check your connection and try again.', code: 'GENERIC' });
    } finally {
      setLoading(false);
    }
  };

  const downloadResultPDF = async () => {
    if (!result) return;

    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    // Outer border
    doc.setDrawColor(0, 91, 65);
    doc.setLineWidth(1.5);
    doc.rect(10, 10, 190, 277);
    doc.setLineWidth(0.2);
    doc.rect(12, 12, 186, 273);

    // Logo
    try {
      const img = new window.Image();
      img.src = '/images/logo.png';
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
      doc.addImage(img, 'PNG', 18, 18, 22, 26);
    } catch { /* no logo */ }

    // Header
    doc.setTextColor(0, 91, 65);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('DELHI PUBLIC SECONDARY SCHOOL', 44, 27);
    doc.setFontSize(8.5);
    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'normal');
    doc.text('A Unit of Delhi Public International School Organization — Siddipet Campus', 44, 34);

    doc.setDrawColor(0, 91, 65); doc.setLineWidth(0.6);
    doc.line(12, 48, 198, 48);

    // Title band
    doc.setFillColor(245, 245, 245);
    doc.rect(12.5, 49, 185, 10, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('MERIT SCHOLARSHIP TEST 2026 — OFFICIAL SCORECARD', 105, 56.5, { align: 'center' });

    // Student Info
    let y = 75;
    const addRow = (label: string, val: string) => {
      doc.setFont('helvetica', 'bold'); doc.setTextColor(100, 100, 100); doc.setFontSize(9);
      doc.text(label, 22, y);
      doc.setFont('helvetica', 'bold'); doc.setTextColor(0, 0, 0); doc.setFontSize(10);
      doc.text(val || '—', 70, y);
      y += 8;
    };
    addRow('Hall Ticket No.', result.hall_ticket_no);
    addRow('Student Name',    result.student_name);
    addRow('Class',           result.class);
    addRow("Father's Name",   result.father_name);

    // Subject marks table
    y += 4;
    doc.setFillColor(0, 91, 65);
    doc.rect(20, y, 170, 7, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    doc.text('MARKS BREAKDOWN', 105, y + 5, { align: 'center' });
    y += 7;

    doc.setDrawColor(0, 91, 65); doc.setLineWidth(0.2);
    doc.rect(20, y, 170, isHighClass(result.class) ? 40 : 32);

    const subjects = [
      { label: 'English', val: result.english_marks },
      { label: 'Science', val: result.science_marks },
      { label: 'Social Studies', val: result.social_marks },
      { label: 'Mathematics', val: result.maths_marks },
      ...(isHighClass(result.class) ? [{ label: 'General Knowledge', val: result.gk_marks }] : []),
    ];

    const maxPer = isHighClass(result.class) ? 20 : 25;
    y += 8;
    subjects.forEach(({ label, val }) => {
      doc.setFont('helvetica', 'normal'); doc.setTextColor(60, 60, 60); doc.setFontSize(9);
      doc.text(label, 28, y);
      doc.setFont('helvetica', 'bold'); doc.setTextColor(0, 0, 0);
      doc.text(`${val ?? '—'} / ${maxPer}`, 130, y);
      y += 7;
    });

    y += 4;
    // Total bar
    doc.setFillColor(0, 91, 65);
    doc.rect(20, y, 170, 18, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12); doc.setFont('helvetica', 'bold');
    doc.text('TOTAL MARKS', 30, y + 7);
    doc.setFontSize(18);
    doc.text(`${result.total_marks} / ${result.max_marks}`, 30, y + 15);

    const pct = Math.round((result.total_marks / result.max_marks) * 100);
    doc.setFontSize(28);
    doc.text(`${pct}%`, 175, y + 14, { align: 'right' });

    y += 26;

    // Scholarship award
    if (result.scholarship_percentage > 0) {
      doc.setFillColor(255, 196, 0);
      doc.rect(20, y, 170, 16, 'F');
      doc.setTextColor(30, 30, 30);
      doc.setFontSize(13); doc.setFont('helvetica', 'bold');
      doc.text(`🏆  ${result.scholarship_percentage}% TUITION FEE WAIVER AWARDED`, 105, y + 10, { align: 'center' });
    } else {
      doc.setFillColor(240, 240, 240);
      doc.rect(20, y, 170, 14, 'F');
      doc.setTextColor(120, 120, 120);
      doc.setFontSize(10); doc.setFont('helvetica', 'italic');
      doc.text('No scholarship awarded for this score.', 105, y + 9, { align: 'center' });
    }

    y += 22;
    if (result.remarks) {
      doc.setTextColor(0, 91, 65); doc.setFontSize(9); doc.setFont('helvetica', 'bold');
      doc.text('Remarks:', 22, y);
      doc.setTextColor(50, 50, 50); doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(result.remarks, 165);
      doc.text(lines, 22, y + 5);
      y += 5 + lines.length * 5;
    }

    y = Math.max(y + 10, 240);
    doc.setFontSize(8); doc.setTextColor(150, 150, 150); doc.setFont('helvetica', 'italic');
    doc.text('This is a computer-generated scorecard. Final scholarship allocation is subject to document verification.', 105, y, { align: 'center' });

    // Signatures
    doc.setDrawColor(130, 130, 130); doc.setLineWidth(0.2);
    doc.line(28, 262, 80, 262); doc.line(130, 262, 182, 262);
    doc.setTextColor(0, 0, 0); doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    doc.text('Signature of Candidate', 54, 267, { align: 'center' });
    doc.text('Signature of Invigilator', 156, 267, { align: 'center' });

    doc.save(`${result.hall_ticket_no}_Scorecard_2026.pdf`);
  };

  const isHighClass = (cls: string) => {
    const n = parseInt((cls || '').replace(/\D/g, ''), 10);
    return n >= 6 && n <= 9;
  };

  const getSubjectBreakdown = (r: ResultData) => {
    const max = isHighClass(r.class) ? 20 : 25;
    const subjects = [
      { label: 'English',          value: r.english_marks },
      { label: 'Science',          value: r.science_marks },
      { label: 'Social Studies',   value: r.social_marks  },
      { label: 'Mathematics',      value: r.maths_marks   },
      ...(isHighClass(r.class) ? [{ label: 'General Knowledge', value: r.gk_marks }] : []),
    ];
    return { subjects, max };
  };

  return (
    <div className="flex flex-col pt-24 min-h-screen bg-[#fafafa]">

      {/* ── Hero ── */}
      <section className="bg-primary text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10 space-y-4">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 text-accent font-bold text-xs tracking-widest uppercase rounded-full mb-4">
              <Award size={14} /> Results 2026
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-2">
              Check Your Results
            </h1>
            <p className="text-white/75 text-lg font-medium max-w-xl mx-auto">
              Enter your Hall Ticket Number and registered Mobile Number to view your Merit Scholarship Test scorecard.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 w-full relative z-20 -mt-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── LOOKUP FORM ── */}
          <motion.div
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="lg:col-span-5 bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
          >
            <div className="mb-7">
              <h2 className="font-serif text-2xl font-bold text-typography-dark mb-1">Find My Result</h2>
              <p className="text-typography-body text-sm">Use the details from your registered scholarship application.</p>
            </div>

            {/* Error Display */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  key={error.code}
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className={`mb-5 flex gap-3 p-4 rounded-xl border text-sm font-medium ${
                    error.code === 'NOT_PUBLISHED' || error.code === 'RESULT_PENDING'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-red-50 text-red-600 border-red-200'
                  }`}
                >
                  <span className="shrink-0 mt-0.5">{ERROR_CONFIG[error.code]?.icon}</span>
                  <div>
                    <p className="font-bold mb-0.5">{ERROR_CONFIG[error.code]?.title}</p>
                    <p className="font-normal opacity-90">{error.message}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-typography-dark uppercase mb-1.5 ml-1">Hall Ticket Number</label>
                <input
                  type="text"
                  value={hallTicket}
                  onChange={e => setHallTicket(e.target.value.toUpperCase())}
                  placeholder="e.g. 202604XXXX"
                  className="w-full px-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-typography-dark font-mono tracking-wider"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-typography-dark uppercase mb-1.5 ml-1">Registered Mobile Number</label>
                <input
                  type="text"
                  value={mobile}
                  onChange={e => setMobile(e.target.value.replace(/[^\d+\s-]/g, ''))}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={13}
                  className="w-full px-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-typography-dark"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-2xl hover:bg-green-800 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 mt-2"
              >
                {loading
                  ? <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Searching...</>
                  : <><Search size={18} /> Get My Results</>}
              </button>
            </form>

            <div className="mt-7 pt-6 border-t border-gray-100 flex items-start gap-3">
              <div className="w-9 h-9 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center shrink-0">
                <Info size={18} />
              </div>
              <p className="text-xs text-typography-body leading-relaxed">
                Use the mobile number (Father's or Mother's) that was entered during your scholarship registration.
              </p>
            </div>
          </motion.div>

          {/* ── RESULT DISPLAY ── */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full min-h-[420px] bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-12 text-center"
                >
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-gray-300 shadow-sm mb-6">
                    <GraduationCap size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-400 mb-2">Your Scorecard Awaits</h3>
                  <p className="text-gray-400 text-sm max-w-xs">Enter your credentials in the form to reveal your performance and scholarship status.</p>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
                >
                  {/* Header */}
                  <div className="bg-primary p-8 text-white relative overflow-hidden">
                    <Award className="absolute -top-2 right-6 text-white/10" size={120} />
                    <div className="relative z-10">
                      <span className="inline-block px-3 py-1 bg-white/10 rounded-lg text-xs font-bold uppercase tracking-wider mb-3 border border-white/20">
                        Official Scorecard
                      </span>
                      <h3 className="text-3xl font-bold mb-1">{result.student_name}</h3>
                      <div className="flex flex-wrap gap-4 text-white/70 text-sm">
                        <span className="flex items-center gap-1.5"><FileText size={13} /> {result.hall_ticket_no}</span>
                        <span className="flex items-center gap-1.5"><BookOpen size={13} /> {result.class}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-7 space-y-6">
                    {/* Total + Scholarship row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Score</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-black text-typography-dark">{result.total_marks}</span>
                          <span className="text-gray-400 font-medium">/ {result.max_marks}</span>
                        </div>
                        <div className="mt-3 w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(result.total_marks / result.max_marks) * 100}%` }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className="bg-primary h-full rounded-full"
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{Math.round((result.total_marks / result.max_marks) * 100)}% overall</p>
                      </div>

                      <div className={`p-5 rounded-2xl border flex flex-col justify-center ${
                        result.scholarship_percentage > 0
                          ? 'bg-accent/10 border-accent/30'
                          : 'bg-gray-50 border-gray-100'
                      }`}>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Scholarship</p>
                        {result.scholarship_percentage > 0 ? (
                          <>
                            <p className="text-4xl font-black text-typography-dark">{result.scholarship_percentage}%</p>
                            <p className="text-xs font-bold text-primary mt-1 flex items-center gap-1">
                              <CheckCircle size={11} /> Fee Waiver Awarded
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-lg font-bold text-gray-400">Not Awarded</p>
                            <p className="text-xs text-gray-400 mt-1">Score did not meet scholarship threshold</p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Subject Breakdown */}
                    {(() => {
                      const { subjects, max } = getSubjectBreakdown(result);
                      return (
                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Subject-wise Marks</p>
                          <div className="space-y-2.5">
                            {subjects.map(({ label, value }) => (
                              <div key={label} className="flex items-center gap-3">
                                <span className="text-sm text-gray-600 font-medium w-32 shrink-0">{label}</span>
                                <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((value ?? 0) / max) * 100}%` }}
                                    transition={{ duration: 0.9, ease: 'easeOut' }}
                                    className="bg-primary h-full rounded-full"
                                  />
                                </div>
                                <span className="text-sm font-bold text-typography-dark w-12 text-right">{value ?? '—'}/{max}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Remarks */}
                    {result.remarks && (
                      <div className="bg-green-50/60 p-5 rounded-2xl border border-green-100">
                        <div className="flex gap-3">
                          <div className="w-9 h-9 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center shrink-0">
                            <TrendingUp size={18} />
                          </div>
                          <div>
                            <p className="font-bold text-typography-dark mb-0.5">Message from School</p>
                            <p className="text-sm text-typography-body leading-relaxed">{result.remarks}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-100">
                      <button
                        onClick={downloadResultPDF}
                        className="flex-1 flex items-center justify-center gap-2 bg-typography-dark text-white font-bold px-6 py-3.5 rounded-xl hover:bg-black transition-all shadow-md active:scale-95"
                      >
                        <Download size={17} /> Download Scorecard
                      </button>
                      <button
                        onClick={() => window.location.href = '/contact'}
                        className="flex-1 flex items-center justify-center gap-2 bg-primary/10 text-primary font-bold px-6 py-3.5 rounded-xl hover:bg-primary/20 transition-all group"
                      >
                        Contact School <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
