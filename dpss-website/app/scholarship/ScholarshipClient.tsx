"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Calendar, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ScholarshipClient() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-900 overflow-hidden relative font-sans">
      
      {/* ══════════════ DYNAMIC BACKGROUND ══════════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, -60, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-accent/10 blur-[150px]"
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.15]" />
        
        {/* Abstract geometric lines */}
        <svg className="absolute w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M0,0 L100,100" stroke="white" strokeWidth="0.05" vectorEffect="non-scaling-stroke"/>
           <path d="M100,0 L0,100" stroke="white" strokeWidth="0.05" vectorEffect="non-scaling-stroke"/>
           <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="0.05" fill="none" vectorEffect="non-scaling-stroke"/>
        </svg>
      </div>

      {/* ══════════════ MAIN CONTENT ══════════════ */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-32 pb-24">
        
        <motion.div 
          initial={{ y: 40, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl w-full text-center space-y-8"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl shadow-primary/20 hover:bg-white/10 transition-colors cursor-default"
          >
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </div>
            <span className="text-white/90 text-sm font-bold tracking-[0.15em] uppercase">Merit Scholarship Test 2026</span>
          </motion.div>

          {/* Epic Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white font-serif leading-[1.05] tracking-tight drop-shadow-2xl">
            Download Your <br />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-200 to-accent bg-[length:200%_auto] animate-pulse">
                Hall Ticket.
              </span>
              <div className="absolute -inset-2 bg-accent/20 blur-2xl rounded-full z-0 pointer-events-none"></div>
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-white/70 max-w-2xl mx-auto font-medium leading-relaxed">
            The gateway to your future begins here. Access your official admit card to secure your seat for the upcoming examination.
          </p>

          {/* Interactive CTA */}
          <div className="pt-10 pb-16 flex justify-center">
            <motion.a 
              href="https://citizenhighschoolsiddipet.in/mst/public/hallticket.php"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center gap-4 bg-accent text-neutral-900 font-black text-xl md:text-2xl px-12 py-6 rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,196,0,0.4)] transition-all hover:shadow-[0_0_60px_rgba(255,196,0,0.6)]"
            >
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              
              <Download size={28} className="relative z-10 group-hover:-translate-y-1 transition-transform" />
              <span className="relative z-10">Get Hall Ticket Now</span>
              <ArrowRight size={28} className="relative z-10 opacity-0 -ml-8 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
            </motion.a>
          </div>

        </motion.div>

        {/* ══════════════ INFORMATION CARDS ══════════════ */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full max-w-6xl mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20"
        >
          {/* Card 1 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary/30">
              <Calendar className="text-accent" size={32} />
            </div>
            <h3 className="text-white font-bold text-2xl mb-3 font-serif">Exam Schedule</h3>
            <p className="text-white/60 leading-relaxed text-sm md:text-base">
              Ensure you arrive at least 30 minutes prior to the examination time printed on your hall ticket.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary/30">
              <MapPin className="text-accent" size={32} />
            </div>
            <h3 className="text-white font-bold text-2xl mb-3 font-serif">Test Venue</h3>
            <p className="text-white/60 leading-relaxed text-sm md:text-base">
              The test will be conducted at the main DPSS Siddipet Campus. Verify the exact details on your admit card.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary/30">
              <ShieldCheck className="text-accent" size={32} />
            </div>
            <h3 className="text-white font-bold text-2xl mb-3 font-serif">Instructions</h3>
            <p className="text-white/60 leading-relaxed text-sm md:text-base">
              Carry a printed copy of your hall ticket and a valid ID proof. Electronic devices are strictly prohibited.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
