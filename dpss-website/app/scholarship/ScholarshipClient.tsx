"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, CheckCircle, AlertCircle, FileText, Calendar, MapPin, ChevronRight, GraduationCap, ArrowLeft } from 'lucide-react';
import { jsPDF } from 'jspdf';
import ScholarshipForm from '@/components/scholarship/ScholarshipForm';

export default function ScholarshipClient() {
  const [isApplying, setIsApplying] = useState(false);
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMobile = mobile.trim();
    const formattedDob = dob.split('-').reverse().join('-'); // YYYY-MM-DD -> DD-MM-YYYY

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/scholarship', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dob: formattedDob, mobile: cleanMobile }),
      });

      const data = await res.json();

      if (!res.ok) {
         throw new Error(data.error || 'Record not found. Ensure your details match the registration.');
      }

      // Generate ultra premium PDF
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Try loading the school logo for the header
      let imgData = null;
      try {
         const img = new window.Image();
         img.src = '/images/logo.png';
         await new Promise((resolve, reject) => {
           img.onload = resolve;
           img.onerror = reject;
         });
         imgData = img;
      } catch (e) {
         console.log("Logo could not be loaded for PDF.", e);
      }

      // 1. Draw Outer Border
      doc.setDrawColor(0, 91, 65);
      doc.setLineWidth(1.5);
      doc.rect(10, 10, 190, 277);
      
      doc.setDrawColor(0, 91, 65);
      doc.setLineWidth(0.3);
      doc.rect(12, 12, 186, 273);

      // 2. Header Section
      if (imgData) {
         doc.addImage(imgData, 'PNG', 18, 18, 24, 28);
      }
      
      doc.setTextColor(0, 91, 65);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("DELHI PUBLIC SECONDARY SCHOOL", 46, 26);
      
      doc.setFontSize(9);
      doc.setTextColor(50, 50, 50);
      doc.text("A Unit of Delhi Public International School Organization", 46, 33);
      doc.text("Siddipet Campus", 46, 38);
      
      doc.setDrawColor(0, 91, 65);
      doc.setLineWidth(0.8);
      doc.line(10, 50, 200, 50);

      // 3. Document Title Section
      doc.setFillColor(245, 245, 245); // Subtle light gray background for title area
      doc.rect(12.5, 52, 185, 12, 'F');
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("MERIT SCHOLORSHIP TEST 2026 - ADMIT CARD", 105, 60, { align: "center" });

      // 4. Photo Placeholder (Refined positioning)
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.1);
      doc.rect(155, 75, 32, 40);
      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.setFont("helvetica", "normal");
      doc.text("AFFIX RECENT", 171, 92, { align: "center" });
      doc.text("PASSPORT SIZE", 171, 95, { align: "center" });
      doc.text("PHOTO", 171, 98, { align: "center" });

      // 5. Student Details Section (Precise horizontal alignment)
      doc.setTextColor(60, 60, 60); // Softer black for labels
      doc.setFontSize(10);
      
      let y = 82;
      const labelX = 25;
      const valueX = 70;
      
      const addDetail = (label: string, value: string) => {
         doc.setFont("helvetica", "bold");
         doc.setTextColor(80, 80, 80);
         doc.text(label, labelX, y);
         doc.text(":", 65, y);
         
         doc.setTextColor(0, 0, 0);
         doc.setFont("helvetica", "bold");
         doc.text(String(value || "N/A").toUpperCase(), valueX, y);
         y += 10;
      };

      addDetail("Hall Ticket No.", data["Hall Ticket Number"] || "Pending");
      addDetail("Student Name", data["STUDENT NAME"]);
      addDetail("Father's Name", data["FATHER'S NAME"]);
      addDetail("Class", data["CLASS"]);
      addDetail("Mobile Number", data["FATHER’S CONTACT NUMBER"]);

      // 6. Examination Details (Premium Card Layout)
      const cardY = 135;
      doc.setFillColor(0, 91, 65);
      doc.rect(20, cardY, 170, 8, 'F'); // Header Bar
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("EXAMINATION DETAILS", 105, cardY + 5.5, { align: "center" });

      // Card Body
      doc.setDrawColor(0, 91, 65);
      doc.setLineWidth(0.3);
      doc.rect(20, cardY + 8, 170, 32); 
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      
      const examInfoY = cardY + 18;
      doc.setFont("helvetica", "bold");
      doc.text("Exam Date", 30, examInfoY);
      doc.text("Exam Time", 30, examInfoY + 8);
      doc.text("Exam Venue", 30, examInfoY + 16);
      
      doc.text(":", 60, examInfoY);
      doc.text(":", 60, examInfoY + 8);
      doc.text(":", 60, examInfoY + 16);
      
      doc.setFont("helvetica", "normal");
      doc.text("26th April 2026 (Sunday)", 65, examInfoY);
      doc.text("10:00 AM - 12:00 PM (Reporting Time: 09:30 AM)", 65, examInfoY + 8);
      const venueLines = doc.splitTextToSize("Delhi Public Secondary School, Main Campus, Siddipet.", 100);
      doc.text(venueLines, 65, examInfoY + 16);

      // 7. Important Instructions (Spaced vertical rhythm)
      const instY = 195;
      doc.setTextColor(0, 91, 65);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("IMPORTANT INSTRUCTIONS TO THE CANDIDATE", 22, instY);
      
      // Instruction Border Line
      doc.setDrawColor(0, 91, 65);
      doc.setLineWidth(0.1);
      doc.line(22, instY + 2, 110, instY + 2);
      
      doc.setTextColor(40, 40, 40);
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "normal");
      
      const instructions = [
        "1. Please bring a printed copy of this Admit Card along with a valid Government photo ID.",
        "2. Candidates must reach the examination center at least 30 minutes before the test (09:30 AM).",
        "3. Latecomers will not be permitted to enter the examination hall under any circumstances.",
        "4. Electronic devices, calculators, smartwatches, and mobile phones are strictly prohibited.",
        "5. Use only Black or Blue ballpoint pen for OMR sheets and rough work.",
        "6. Ensure the passport-sized photograph is firmly attached to this card before entry."
      ];

      let currentInstY = instY + 10;
      instructions.forEach(inst => {
         const wrappedInst = doc.splitTextToSize(inst, 165);
         doc.text(wrappedInst, 22, currentInstY);
         currentInstY += (wrappedInst.length > 1 ? 9 : 6);
      });

      // 8. Signatures (Clean, balanced footer)
      const sigY = 265;
      doc.setDrawColor(100, 100, 100);
      doc.setLineWidth(0.2);
      doc.line(30, sigY, 80, sigY);
      doc.line(130, sigY, 180, sigY);
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("Signature of Candidate", 55, sigY + 5, { align: "center" });
      doc.text("Signature of Invigilator", 155, sigY + 5, { align: "center" });

      // Footer Note
      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.setFont("helvetica", "italic");
      doc.text("This is a computer-generated document. No seal is required for validity.", 105, 278, { align: "center" });

      doc.save(`HT_2026_${data["Hall Ticket Number"] || "Record"}.pdf`);

      doc.save(`${data["Hall Ticket Number"] || "Unknown"}_HT_2026.pdf`);
      setSuccess(true);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col pt-24 min-h-screen bg-[#fafafa]">
      
      {/* ══════════════ HERO SECTION ══════════════ */}
      <section className="bg-primary/95 text-white py-20 px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
             <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 text-accent font-bold text-xs tracking-widest uppercase rounded-full mb-4">
                <GraduationCap size={16} /> Admissions Open 2026
             </span>
             <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-4">
                Merit Scholarship Test 2026
             </h1>
             <p className="text-white/80 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                Secure up to 100% scholarship for meritorious students. Join Siddipet's premier educational institution.
             </p>
             <div className="flex flex-wrap justify-center gap-4 mt-8">
                <button 
                  onClick={() => {
                    setIsApplying(true);
                    setTimeout(() => document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }}
                  className="bg-accent text-typography-dark font-bold px-8 py-4 rounded-2xl hover:bg-yellow-300 transition-all shadow-lg shadow-accent/20"
                >
                   Register Now
                </button>
                <button 
                   onClick={() => {
                     setIsApplying(false);
                     setTimeout(() => document.getElementById('hall-ticket')?.scrollIntoView({ behavior: 'smooth' }), 100);
                   }}
                   className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold px-8 py-4 rounded-2xl hover:bg-white/20 transition-all"
                >
                   Get Hall Ticket
                </button>
             </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ CONTENT LAYER ══════════════ */}
      <section id="main-content" className="max-w-6xl mx-auto px-6 relative z-20 -mt-10 mb-24 w-full">
        <AnimatePresence mode="wait">
          {isApplying ? (
            <motion.div 
              key="apply-form"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-lg border border-gray-100 mb-8">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-typography-dark">Scholarship Application</h2>
                  <p className="text-sm text-typography-body">Complete the form below to register for the Merit Scholarship Test.</p>
                </div>
                <button 
                  onClick={() => setIsApplying(false)}
                  className="text-sm font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <ArrowLeft size={16} /> Cancel & Go Back
                </button>
              </div>
              
              <ScholarshipForm />
            </motion.div>
          ) : (
            <motion.div 
              key="marketing-view"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* MARKETING: Left Side */}
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 flex flex-col justify-between">
                <div>
                  <h2 className="font-serif text-3xl font-bold text-typography-dark mb-6">Why take the test?</h2>
                  <div className="space-y-6 mb-8">
                      <div className="flex gap-4">
                        <CheckCircle className="text-green-500 shrink-0 mt-1" size={24} />
                        <div>
                            <h4 className="font-bold text-typography-dark text-lg">Financial Assistance</h4>
                            <p className="text-typography-body text-sm">Top performers are eligible for massive tuition fee waivers up to 100%.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <CheckCircle className="text-green-500 shrink-0 mt-1" size={24} />
                        <div>
                            <h4 className="font-bold text-typography-dark text-lg">Benchmarking</h4>
                            <p className="text-typography-body text-sm">Test your child's aptitude against students from across the district.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <CheckCircle className="text-green-500 shrink-0 mt-1" size={24} />
                        <div>
                            <h4 className="font-bold text-typography-dark text-lg">Direct Admission</h4>
                            <p className="text-typography-body text-sm">Qualifying students get immediate seat confirmation for the 2026-27 batch.</p>
                        </div>
                      </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 mb-8 space-y-3">
                      <div className="flex items-center gap-3 text-sm text-typography-dark font-medium">
                        <Calendar className="text-primary shrink-0" size={18} /> Exam Date: 26th April 2026
                      </div>
                      <div className="flex items-center gap-3 text-sm text-typography-dark font-medium">
                        <MapPin className="text-primary shrink-0" size={18} /> Venue: DPSS Main Campus
                      </div>
                  </div>
                </div>

                <button 
                  onClick={() => setIsApplying(true)}
                  className="w-full inline-flex justify-center items-center gap-2 bg-accent text-typography-dark font-bold text-lg px-8 py-5 rounded-2xl hover:bg-yellow-300 transition-colors shadow-lg shadow-accent/20"
                >
                  Enroll for Scholarship <ChevronRight size={20} />
                </button>
              </div>

              {/* HALL TICKET DOWNLOAD: Right Side */}
              <div id="hall-ticket" className="bg-primary/5 rounded-3xl p-8 md:p-12 border-2 border-primary/20 h-full flex flex-col justify-center">
                <div className="mb-8">
                    <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center mb-6 shadow-md">
                        <FileText size={28} />
                    </div>
                    <h2 className="font-serif text-3xl font-bold text-typography-dark mb-2">Download Hall Ticket</h2>
                    <p className="text-typography-body text-sm">
                        Registered already? Enter your registered Date of Birth and mobile number below to download your Exam Hall Ticket.
                    </p>
                </div>

                {/* Notifications */}
                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex gap-3 text-sm font-medium mb-6">
                        <AlertCircle className="shrink-0" size={20} /> {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-100 flex gap-3 text-sm font-medium mb-6">
                        <CheckCircle className="shrink-0" size={20} /> Hall Ticket downloaded successfully.
                    </div>
                )}

                <form onSubmit={handleDownload} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-typography-dark mb-1 ml-1">Date of Birth (DOB) *</label>
                        <input 
                          type="date" 
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow text-typography-dark"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-typography-dark mb-1 ml-1">Registered Mobile Number *</label>
                        <input 
                          type="text" 
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                          placeholder="Enter 10-digit mobile number"
                          maxLength={10}
                          className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow text-typography-dark"
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-green-800 transition-colors disabled:opacity-50 mt-4"
                    >
                        {loading ? (
                          <>Processing...</>
                        ) : (
                          <>
                             <Download size={20} /> Verify & Download PDF
                          </>
                        )}
                    </button>
                </form>

                <p className="text-xs text-typography-body mt-6 text-center">
                   Having issues? <a href="/contact" className="text-primary font-bold hover:underline">Contact Support</a>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
