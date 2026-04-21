"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewport } from '@/lib/animations';

export default function AcademicsAchievementsClient() {
  return (
    <motion.main className="flex flex-col pt-[104px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-primary py-24 md:py-32 px-6 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent/10 pointer-events-none" />
        
        <motion.div 
          className="relative max-w-7xl mx-auto text-center z-10 space-y-6"
          initial="hidden" animate="show" variants={staggerContainer}
        >
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.25em] text-accent uppercase">Academics</motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-7xl font-bold font-serif text-white leading-tight">
            Academic Excellence <br className="hidden md:block" /> &amp; Achievements
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-medium">
            Our focus is on strong fundamentals, consistent performance, and overall development.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. ACADEMIC APPROACH */}
      <section id="academic-approach" className="bg-[#f8faf9] py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div className="space-y-6" initial="hidden" whileInView="show" viewport={viewport} variants={staggerContainer}>
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.25em] text-primary uppercase">Our Approach</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-typography-dark font-serif">Academic Approach</motion.h2>
            <motion.p variants={fadeUp} className="text-typography-body text-lg leading-relaxed max-w-lg">
              At DPSS Siddipet, we believe in a robust educational framework that moves beyond rote memorization to foster true intellectual understanding.
            </motion.p>
            <motion.ul variants={fadeUp} className="space-y-5 pt-4">
              {[
                { title: "Concept-based learning", desc: "Focusing on practical application and core understanding." },
                { title: "Regular assessments", desc: "Interactive methods to gauge immediate progress." },
                { title: "Individual attention", desc: "Tailoring support to each student's unique learning curve." },
                { title: "Continuous improvement", desc: "Emphasizing steady growth over high-pressure stakes." }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">✓</div>
                  <div>
                    <span className="text-typography-dark font-bold block text-base md:text-lg">{item.title}</span>
                    <span className="text-typography-body text-sm md:text-base leading-snug">{item.desc}</span>
                  </div>
                </li>
              ))}
            </motion.ul>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp} className="bg-white hover:shadow-xl transition-shadow duration-300 rounded-[2rem] p-10 border border-gray-100 shadow-sm relative">
            <h3 className="font-serif text-2xl font-bold text-typography-dark mb-8">The Learning Cycle</h3>
            <div className="space-y-6 relative">
              <div className="absolute left-[1.1rem] top-10 bottom-10 w-px bg-gray-100 z-0 hidden sm:block"></div>
              {[
                { step: 1, title: "Discover", desc: "Real-world concept introduction and guided exploration." },
                { step: 2, title: "Apply", desc: "Practical implementation through class assignments." },
                { step: 3, title: "Evaluate", desc: "Constructive feedback and remediation if needed." }
              ].map((cycle) => (
                <motion.div whileHover={{ scale: 1.02 }} key={cycle.step} className="bg-[#f8faf9] p-6 rounded-2xl border border-gray-50 shadow-sm flex items-center gap-5 relative z-10 hover:shadow-md transition-all">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow-sm">
                    {cycle.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-typography-dark text-lg">{cycle.title}</h4>
                    <p className="text-sm text-typography-body mt-1">{cycle.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. PERFORMANCE SYSTEM */}
      <section id="performance-system" className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16 space-y-4" initial="hidden" whileInView="show" viewport={viewport} variants={staggerContainer}>
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.25em] text-accent uppercase">Evaluation</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-typography-dark font-serif">Performance System</motion.h2>
            <motion.p variants={fadeUp} className="text-typography-body text-lg max-w-2xl mx-auto">
              We monitor academic health through a transparent, consistent evaluation structure designed to support students and identify areas for improvement early on.
            </motion.p>
          </motion.div>
          
          <motion.div className="grid sm:grid-cols-3 gap-6" initial="hidden" whileInView="show" viewport={viewport} variants={staggerContainer}>
            {[
              { icon: "📝", title: "Weekly Tests", desc: "Short cycle assessments to ensure concepts from the week are firmly grasped." },
              { icon: "📊", title: "Monthly Assessments", desc: "Comprehensive evaluations to track retention and analytical skills across topics." },
              { icon: "📈", title: "Progress Tracking", desc: "Structured growth reports to keep students on track and parents well-informed." }
            ].map((perf, idx) => (
               <motion.div variants={fadeUp} whileHover={{ y: -6 }} key={idx} className="bg-[#f8faf9] rounded-[2rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
                 <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 text-3xl">
                   {perf.icon}
                 </div>
                 <h3 className="font-bold text-typography-dark text-xl mb-3">{perf.title}</h3>
                 <p className="text-typography-body">{perf.desc}</p>
               </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. STUDENT DEVELOPMENT */}
      <section id="student-development" className="bg-[#f8faf9] py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={staggerContainer} className="order-2 md:order-1 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <motion.div variants={fadeUp} className="bg-primary text-white p-8 rounded-[2rem] shadow-sm aspect-[4/5] flex flex-col justify-end relative overflow-hidden group">
                <div className="absolute inset-0 bg-black/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <h4 className="font-serif font-bold text-2xl mb-1 relative z-10">Confidence</h4>
                <p className="text-white/70 text-sm relative z-10">Building stage presence.</p>
              </motion.div>
              <motion.div variants={fadeUp} className="bg-accent text-typography-dark p-8 rounded-[2rem] shadow-sm aspect-square flex flex-col justify-end relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <h4 className="font-serif font-bold text-2xl mb-1 relative z-10">Leadership</h4>
                <p className="text-typography-dark/70 text-sm relative z-10">Taking the initiative.</p>
              </motion.div>
            </div>
            <div className="space-y-4 pt-16">
              <motion.div variants={fadeUp} className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm aspect-[4/5] flex flex-col justify-end relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                <h4 className="font-serif font-bold text-typography-dark text-2xl mb-1 relative z-10">Communication</h4>
                <p className="text-typography-body text-sm relative z-10">Expressing ideas precisely.</p>
              </motion.div>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={staggerContainer} className="order-1 md:order-2 space-y-6">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.25em] text-primary uppercase">Beyond Core Academics</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-typography-dark font-serif">Student Development</motion.h2>
            <motion.p variants={fadeUp} className="text-typography-body mb-10 text-lg leading-relaxed">
              Academics form the foundation, but soft skills build the person. We focus heavily on the personal traits that define success in tomorrow's world.
            </motion.p>
            <motion.div variants={fadeUp} className="space-y-6 relative">
              <div className="absolute left-3 top-2 bottom-2 w-px bg-gray-200 z-0"></div>
              
              <div className="relative z-10 pl-10">
                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-primary shadow-sm" />
                <strong className="text-typography-dark block text-lg font-bold mb-1">Confidence Building</strong> 
                <p className="text-base text-typography-body leading-relaxed">Through public speaking events, stage performances, and supportive classroom dynamics, we encourage students to find their voice.</p>
              </div>
              <div className="relative z-10 pl-10">
                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-accent shadow-sm" />
                <strong className="text-typography-dark block text-lg font-bold mb-1">Communication Skills</strong> 
                <p className="text-base text-typography-body leading-relaxed">We foster an environment where constructive discussions, debates, and presentations are part of daily routines.</p>
              </div>
              <div className="relative z-10 pl-10">
                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-primary shadow-sm" />
                <strong className="text-typography-dark block text-lg font-bold mb-1">Leadership Activities</strong> 
                <p className="text-base text-typography-body leading-relaxed">By delegating responsibilities in group projects and house events, we actively cultivate leadership qualities.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. ACHIEVEMENTS SECTION */}
      <section id="achievements" className="bg-primary py-24 px-6 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent/10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={staggerContainer} className="text-center mb-16 space-y-4">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.25em] text-accent uppercase">Highlights</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white font-serif">Achievements & Participation</motion.h2>
            <motion.p variants={fadeUp} className="text-white/80 max-w-2xl mx-auto text-lg">
              Achievement is measured by the courage to participate, the effort required to improve, and the consistency of growth. We take pride in the diverse involvements of our student body.
            </motion.p>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={staggerContainer} className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: "🏆", title: "School-Level Competitions", desc: "Active and enthusiastic involvement in inter-house debates, science fairs, and spelling bees." },
              { icon: "🎭", title: "Cultural Events", desc: "Vibrant participation in dramatic arts, annual day performances, and traditional festivals." },
              { icon: "⭐", title: "Participation Highlights", desc: "Commending the resilience and teamwork shown in district sports meets and community projects." }
            ].map((achv, idx) => (
               <motion.div variants={fadeUp} whileHover={{ y: -8 }} key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center hover:bg-white/12 transition-colors duration-300">
                 <div className="w-16 h-16 bg-accent/15 rounded-xl flex items-center justify-center text-3xl mb-6 mx-auto">
                   {achv.icon}
                 </div>
                 <h3 className="font-serif font-bold text-2xl text-white mb-3">{achv.title}</h3>
                 <p className="text-white/65 leading-relaxed">{achv.desc}</p>
               </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. FUTURE OUTCOMES & 7. CTA */}
      <section className="bg-white py-24 px-6 overflow-hidden">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={staggerContainer} className="max-w-7xl mx-auto text-center space-y-4 mb-16">
          <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl font-bold text-primary italic">
            "Our system prepares students for strong academic performance and future success."
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={staggerContainer} className="max-w-7xl mx-auto bg-primary rounded-[2rem] py-16 px-8 md:px-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          </div>
          
          <div className="relative z-10 max-w-2xl text-center lg:text-left">
            <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 bg-accent/20 text-accent font-bold text-xs tracking-widest uppercase rounded-full mb-6 border border-accent/30">
              Admissions Open 2026
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Start Your Child’s <br className="hidden md:block"/> Academic Journey
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/80 text-lg font-medium leading-relaxed">
              Join a community dedicated to nurturing potential and fostering excellence. Early admission slots are filling up.
            </motion.p>
          </div>
          
          <motion.div variants={fadeUp} className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/admissions" className="block px-8 py-4 bg-accent text-typography-dark rounded-xl font-bold text-base hover:bg-yellow-300 transition-all shadow-lg text-center">
                Apply Now
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/scholarship" className="block px-8 py-4 border-2 border-white/30 text-white rounded-xl font-bold text-base hover:bg-white/10 transition-all text-center">
                Scholarship
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

    </motion.main>
  );
}
