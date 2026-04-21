"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Download, Search, CheckCircle, AlertCircle, FileText, Calendar, MapPin, ChevronRight, GraduationCap } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { fadeUp, staggerContainer, viewport } from '@/lib/animations';

export default function ScholarshipClient() {
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dob || !mobile) {
      setError('Please enter both Date of Birth and Mobile Number.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/scholarship', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dob, mobile }),
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
         const logoScale = 1.0;
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

      // 1. Draw Outer Border (A4 size is 210 x 297mm)
      doc.setDrawColor(0, 91, 65); // Primary DPSS Green
      doc.setLineWidth(1.5);
      doc.rect(10, 10, 190, 277);
      
      // Inner thin border
      doc.setDrawColor(0, 91, 65);
      doc.setLineWidth(0.3);
      doc.rect(12, 12, 186, 273);

      // 2. Header Section
      if (imgData) {
         doc.addImage(imgData, 'PNG', 18, 18, 24, 28); // x, y, width, height
      }
      
      // School Name Block
      doc.setTextColor(0, 91, 65);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("DELHI PUBLIC SECONDARY SCHOOL", 46, 26);
      
      doc.setFontSize(9);
      doc.setTextColor(50, 50, 50);
      doc.text("A Unit of Delhi Public International School Organization", 46, 33);
      doc.text("Siddipet Campus", 46, 38);
      
      // Header dividing line
      doc.setDrawColor(0, 91, 65);
      doc.setLineWidth(0.8);
      doc.line(10, 50, 200, 50);

      // 3. Document Title
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("DPSSAT 2026 - ADMIT CARD", 105, 60, { align: "center" });
      doc.setLineWidth(0.5);
      doc.line(65, 62, 145, 62);

      // 4. Photo Placeholder (Right Side)
      doc.setDrawColor(150, 150, 150);
      doc.setLineWidth(0.3);
      doc.rect(155, 75, 35, 45); // Pass port size box
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(150, 150, 150);
      doc.text("Affix Recent", 172.5, 95, { align: "center" });
      doc.text("Passport Size", 172.5, 100, { align: "center" });
      doc.text("Photo", 172.5, 105, { align: "center" });

      // 5. Student Details Section
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      
      let y = 80;
      const xLabel = 20;
      const xColon = 65;
      const xValue = 70;
      const ySpace = 12;

      // detail helper
      const addDetail = (label: string, value: string) => {
         doc.setFont("helvetica", "bold");
         doc.text(label, xLabel, y);
         doc.text(":", xColon, y);
         doc.setFont("helvetica", "normal");
         doc.text(value.toUpperCase(), xValue, y);
         y += ySpace;
      };

      addDetail("Hall Ticket No.", data["Hall Ticket Number"] || "Pending");
      addDetail("Student Name", data["STUDENT NAME"] || "N/A");
      addDetail("Father's Name", data["FATHER'S NAME"] || "N/A");
      addDetail("Class", data["CLASS"] || "N/A");
      addDetail("Mobile Number", data["FATHER’S CONTACT NUMBER"] || "N/A");

      // 6. Examination Details Box
      y = 150;
      doc.setFillColor(245, 247, 245); // Very light green backdrop
      doc.rect(15, y, 180, 45, "F");
      doc.setDrawColor(0, 91, 65);
      doc.setLineWidth(0.3);
      doc.rect(15, y, 180, 45, "S");

      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 91, 65);
      doc.text("EXAMINATION DETAILS", 105, y + 8, { align: "center" });
      doc.line(75, y + 10, 135, y + 10);

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      doc.text("Date:", 25, y + 22);
      doc.setFont("helvetica", "normal");
      doc.text("26th April 2026 (Sunday)", 55, y + 22);

      doc.setFont("helvetica", "bold");
      doc.text("Time:", 25, y + 32);
      doc.setFont("helvetica", "normal");
      doc.text("10:00 AM - 12:00 PM (Reporting Time: 09:30 AM)", 55, y + 32);

      doc.setFont("helvetica", "bold");
      doc.text("Venue:", 25, y + 42);
      doc.setFont("helvetica", "normal");
      doc.text("Delhi Public Secondary School, Siddipet Campus.", 55, y + 42);

      // 7. Important Instructions
      y += 63;
      doc.setFont("helvetica", "bold");
      doc.text("Important Instructions to the Candidate:", 20, y);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      const instructions = [
        "1. Please bring a printed copy of this Admit Card along with a valid photo ID.",
        "2. Candidates must reach the examination center strictly by 09:30 AM.",
        "3. Latecomers will not be permitted to enter the examination hall under any circumstances.",
        "4. Electronic devices, calculators, smartwatches, and mobile phones are strictly prohibited.",
        "5. Use a Black or Blue ballpoint pen only for OMR sheets and rough work.",
        "6. Parents are requested to ensure the passport size photograph is firmly attached."
      ];
      
      let instY = y + 8;
      instructions.forEach((inst: string) => {
         doc.text(inst, 20, instY);
         instY += 6;
      });

      // 8. Signatures Block
      y = 265;
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.4);
      
      // Left Signature
      doc.line(25, y, 80, y);
      doc.setFont("helvetica", "bold");
      doc.text("Signature of Candidate", 52.5, y + 5, { align: "center" });
      
      // Right Signature
      doc.line(130, y, 185, y);
      doc.text("Principal / Invigilator", 157.5, y + 5, { align: "center" });

      doc.save(`${data["Hall Ticket Number"] || "Unknown"}_DPSSAT_HallTicket.pdf`);
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
          <motion.div initial={{ y: 0, opacity: 1 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
             <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 text-accent font-bold text-xs tracking-widest uppercase rounded-full mb-4">
                <GraduationCap size={16} /> Admissions Open 2026
             </span>
             <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-4">
                DPSS Scholarship & Admission Test
             </h1>
             <p className="text-white/80 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                Secure up to 100% scholarship for meritorious students. Join Siddipet's premier educational institution.
             </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ CONTENT LAYER ══════════════ */}
      <section className="max-w-6xl mx-auto px-6 relative z-20 -mt-10 mb-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* MARKETING: Left Side */}
          <motion.div initial={{ x: 0, opacity: 1 }} animate={{ x: 0, opacity: 1 }} className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 flex flex-col justify-between">
            <div>
               <h2 className="font-serif text-3xl font-bold text-typography-dark mb-6">Why take DPSSAT?</h2>
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

            <a href="#" className="w-full inline-flex justify-center items-center gap-2 bg-accent text-typography-dark font-bold text-lg px-8 py-5 rounded-2xl hover:bg-yellow-300 transition-colors shadow-lg shadow-accent/20">
               Enroll for Scholarship <ChevronRight size={20} />
            </a>
          </motion.div>


          {/* HALL TICKET DOWNLOAD: Right Side */}
          <motion.div initial={{ x: 0, opacity: 1 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} id="hall-ticket">
            <div className="bg-primary/5 rounded-3xl p-8 md:p-12 border-2 border-primary/20 h-full flex flex-col justify-center">
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
                     <CheckCircle className="shrink-0" size={20} /> Hall Ticket downloaded entirely successfully.
                  </div>
               )}

               <form onSubmit={handleDownload} className="space-y-5">
                  <div>
                     <label className="block text-sm font-bold text-typography-dark mb-1 ml-1">Date of Birth (DOB) e.g. 10-May-2010</label>
                     <input 
                        type="text" 
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        placeholder="e.g. 10-May-2010"
                        className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow text-typography-dark"
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-typography-dark mb-1 ml-1">Registered Mobile Number</label>
                     <input 
                        type="text" 
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="e.g. 9876543210"
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
                  Hall tickets are available from March 23, 2026 onwards. Having issues? <a href="/contact" className="text-primary font-bold hover:underline">Contact Support</a>
               </p>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
