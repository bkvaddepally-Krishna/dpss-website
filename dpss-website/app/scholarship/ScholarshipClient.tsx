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
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      
      {/* ══════════════ PREMIUM HERO SECTION ══════════════ */}
      <section className="relative pt-40 pb-32 px-6 text-center overflow-hidden bg-primary">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, 20, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-40 -right-20 w-[600px] h-[600px] bg-green-900/50 rounded-full blur-[100px]" 
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 space-y-8">
          <motion.div 
            initial={{ y: 30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.6 }}
          >
             <span className="inline-flex items-center gap-2 px-5 py-2 bg-accent/20 backdrop-blur-md text-accent font-bold text-[10px] tracking-[0.2em] uppercase rounded-full mb-6 border border-accent/30 shadow-lg shadow-accent/10">
                <GraduationCap size={14} className="animate-pulse" /> Admissions Open 2026–27
             </span>
             
             <h1 className="font-serif text-5xl md:text-8xl font-black leading-[1.1] mb-6 text-white drop-shadow-sm">
                Unlock Their <br/>
                <span className="text-accent italic">Full Potential.</span>
             </h1>
             
             <p className="text-white/80 text-lg md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
                Empowering the future leaders of Siddipet. Our <span className="text-white font-bold underline decoration-accent underline-offset-4">Merit Scholarship Test</span> offers up to 100% financial support for extraordinary students.
             </p>

             <div className="flex flex-wrap justify-center gap-6 mt-12">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsApplying(true);
                    setTimeout(() => document.getElementById('main-form-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
                  }}
                  className="group bg-accent text-typography-dark font-black px-10 py-5 rounded-2xl transition-all shadow-2xl shadow-accent/40 flex items-center gap-3 relative overflow-hidden"
                >
                   <span className="relative z-10">Register for Test</span>
                   <ChevronRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </motion.button>

                <motion.button 
                   whileHover={{ scale: 1.05, bg: "rgba(255,255,255,0.15)" }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => {
                     setIsApplying(false);
                     setTimeout(() => document.getElementById('hall-ticket-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
                   }}
                   className="bg-white/5 backdrop-blur-lg text-white border border-white/20 font-bold px-10 py-5 rounded-2xl transition-all flex items-center gap-3"
                >
                   <FileText size={20} /> Get Hall Ticket
                </motion.button>
             </div>

             <div className="flex justify-center gap-12 pt-16 mt-8 border-t border-white/10 opacity-60">
                {[
                  { label: "Applicants", value: "500+" },
                  { label: "Waiver Up To", value: "100%" },
                  { label: "Exam Date", value: "26 April" }
                ].map((stat, i) => (
                  <div key={i} className="text-center group">
                    <div className="text-accent font-serif font-black text-2xl group-hover:scale-110 transition-transform">{stat.value}</div>
                    <div className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-1">{stat.label}</div>
                  </div>
                ))}
             </div>
          </motion.div>
        </div>

        {/* Waves bottom separator */}
        <div className="absolute bottom-0 left-0 w-full translate-y-1/2">
           <svg viewBox="0 0 1440 120" className="fill-[#f8f9fa] w-full h-20">
             <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
           </svg>
        </div>
      </section>

      {/* ══════════════ MAIN INTERACTIVE LAYER ══════════════ */}
      <section id="main-form-anchor" className="max-w-7xl mx-auto px-6 relative z-20 -mt-8 mb-32 w-full">
        <AnimatePresence mode="wait">
          {isApplying ? (
            <motion.div 
              key="apply-form"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              className="space-y-8"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-[32px] blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[28px] border border-gray-100 shadow-2xl">
                  <div className="text-center md:text-left mb-6 md:mb-0">
                    <h2 className="text-3xl font-serif font-black text-typography-dark flex items-center gap-3 justify-center md:justify-start">
                      <GraduationCap className="text-primary" size={32} /> Scholarship Application
                    </h2>
                    <p className="text-typography-body mt-1">Join the batch of 2026-27. Registration takes only 3 minutes.</p>
                  </div>
                  <button 
                    onClick={() => setIsApplying(false)}
                    className="group px-6 py-3 rounded-xl border-2 border-primary/10 text-primary font-bold hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                  >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Cancel registration
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-[32px] shadow-2xl p-1 md:p-2 border border-white overflow-hidden ring-1 ring-black/5">
                <ScholarshipForm />
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="marketing-view"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch"
            >
              {/* MARKETING: Left Side (7/12) */}
              <div className="lg:col-span-7 bg-white rounded-[40px] shadow-2xl p-10 md:p-14 border border-gray-100 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20" />
                <div className="relative">
                  <h2 className="font-serif text-4xl md:text-5xl font-black text-typography-dark mb-10 leading-tight">
                    Your Gateway to <br/><span className="text-primary italic">Global Standards.</span>
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                      {[
                        { title: "Financial Aid", desc: "Up to 100% tuition fee waiver for top meritorious students.", color: "bg-blue-50 text-blue-600" },
                        { title: "Smart Assessment", desc: "Standardized testing aligned with international CBSE norms.", color: "bg-purple-50 text-purple-600" },
                        { title: "Assured Seats", desc: "Qualifying candidates receive priority during the final admission round.", color: "bg-emerald-50 text-emerald-600" },
                        { title: "Growth Mindset", desc: "Detailed performance analysis provided to every test-taker.", color: "bg-rose-50 text-rose-600" }
                      ].map((item, i) => (
                        <div key={i} className="group flex gap-5 items-start p-2 rounded-2xl hover:bg-gray-50 transition-colors">
                          <div className={`w-12 h-12 shrink-0 rounded-xl ${item.color} flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform`}>
                            {i + 1}
                          </div>
                          <div>
                            <h4 className="font-bold text-typography-dark mb-1">{item.title}</h4>
                            <p className="text-typography-body text-xs leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-[#f1f5f9] p-4 rounded-3xl mb-12">
                      <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4">
                        <Calendar className="text-primary" size={24} />
                        <div>
                          <p className="text-[10px] uppercase font-bold text-typography-body tracking-wider">Exam Date</p>
                          <p className="font-serif font-bold text-typography-dark">26 April 2026</p>
                        </div>
                      </div>
                      <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4">
                        <MapPin className="text-primary" size={24} />
                        <div>
                          <p className="text-[10px] uppercase font-bold text-typography-body tracking-wider">Venue</p>
                          <p className="font-serif font-bold text-typography-dark">DPSS Campus</p>
                        </div>
                      </div>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsApplying(true)}
                    className="w-full relative group bg-primary text-white font-black text-lg py-6 rounded-[22px] overflow-hidden shadow-2xl shadow-primary/20"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Start Application Now <ArrowLeft className="rotate-180" size={20} />
                    </span>
                    <div className="absolute inset-0 bg-green-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </motion.button>
                </div>
              </div>

              {/* HALL TICKET DOWNLOAD: Right Side (5/12) */}
              <div id="hall-ticket-anchor" className="lg:col-span-5 relative group h-full">
                <div className="absolute -inset-1 bg-gradient-to-b from-primary to-green-950 rounded-[44px] blur-lg opacity-10"></div>
                <div className="relative h-full bg-[#005B41] rounded-[40px] p-10 md:p-14 border border-white/10 flex flex-col shadow-2xl text-white">
                  <div className="mb-10">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform">
                          <Download size={32} className="text-accent" />
                      </div>
                      <h2 className="font-serif text-4xl font-bold mb-4 leading-tight">Retrieve Your <br/>Hall Ticket</h2>
                      <p className="text-white/60 text-sm leading-relaxed">
                          Enter your registration credentials to download your formal Admit Card for the 2026 Scholarship Test.
                      </p>
                  </div>

                  {error && (
                      <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-red-500/20 text-red-100 p-4 rounded-2xl border border-red-500/30 flex gap-3 text-xs font-semibold mb-8">
                          <AlertCircle className="shrink-0" size={18} /> {error}
                      </motion.div>
                  )}
                  {success && (
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-accent/20 text-accent p-4 rounded-2xl border border-accent/40 flex gap-3 text-xs font-bold mb-8">
                          <CheckCircle className="shrink-0" size={18} /> Download processing... check your downloads folder.
                      </motion.div>
                  )}

                  <form onSubmit={handleDownload} className="space-y-6 flex-grow">
                      <div>
                          <label className="block text-[10px] font-black uppercase tracking-[0.1em] text-white/50 mb-2 ml-1">Student DOB</label>
                          <input 
                            type="date" 
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full bg-white/5 border border-white/20 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white/10 transition-all text-white placeholder-white/30"
                          />
                      </div>
                      <div>
                          <label className="block text-[10px] font-black uppercase tracking-[0.1em] text-white/50 mb-2 ml-1">Registered Mobile</label>
                          <input 
                            type="text" 
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                            placeholder="Enter 10-digit number"
                            maxLength={10}
                            className="w-full bg-white/5 border border-white/20 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white/10 transition-all text-white placeholder-white/20"
                          />
                      </div>
                      
                      <div className="pt-6">
                        <motion.button 
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            type="submit" 
                            disabled={loading}
                            className="w-full group inline-flex items-center justify-center gap-3 bg-accent text-typography-dark font-black px-8 py-5 rounded-2xl hover:bg-yellow-300 transition-all shadow-xl shadow-black/20"
                        >
                            {loading ? (
                              <div className="w-5 h-5 border-2 border-typography-dark border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <>
                                 Generate PDF Card <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
                              </>
                            )}
                        </motion.button>
                      </div>
                  </form>

                  <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-center gap-6">
                     <p className="text-xs text-white/40">Need help?</p>
                     <a href="/contact" className="text-xs font-black uppercase tracking-widest text-accent hover:underline">Contact registrar</a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
