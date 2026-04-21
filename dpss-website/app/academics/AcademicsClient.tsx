"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpen, Brain, Award, Users, MonitorPlay, Database, Bot, DownloadCloud,
  CheckCircle2, Clock, ShieldCheck, HeartPulse, Bus, PaintBucket, Music, BookType,
  Rocket, Shell, ChefHat, ChevronDown, Download
} from 'lucide-react';
import { fadeUp, fadeLeft, staggerContainer, viewport } from '@/lib/animations';

// ─── Shared Components ──────────────────────────────────────────

const SectionHeader = ({ title, subtitle, isDark = false }: { title: string, subtitle: string, isDark?: boolean }) => (
  <motion.div className="text-center space-y-3 mb-16" initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}>
    <motion.h2 variants={fadeUp} className={`font-serif text-3xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-typography-dark'}`}>
      {title}
    </motion.h2>
    <motion.p variants={fadeUp} className={`text-sm md:text-base font-semibold tracking-wide ${isDark ? 'text-accent' : 'text-primary'}`}>
      {subtitle}
    </motion.p>
  </motion.div>
);

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <motion.div variants={fadeUp} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
      {icon}
    </div>
    <h3 className="font-bold text-typography-dark text-lg mb-3">{title}</h3>
    <p className="text-typography-body text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

export default function AcademicsClient() {
  return (
    <div className="flex flex-col pt-24 bg-[#fafafa]">
      
      {/* ══════════════ HERO / INSTITUTIONAL PROFILE ══════════════ */}
      <section className="bg-primary/95 text-white pt-24 pb-48 px-6 text-center relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl -top-48 -left-48" />
          <div className="absolute w-[800px] h-[800px] bg-green-500/10 rounded-full blur-3xl bottom-0 right-0" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight">
            Institutional Profile &<br/>Academic Excellence
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-medium tracking-wide">
            Empowering the next generation with world-class education
          </p>
        </div>
      </section>

      {/* ══════════════ STATS OVERLAP ══════════════ */}
      <section className="max-w-6xl mx-auto px-6 relative z-20 -mt-24 mb-24">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
          {[
            { num: '612', label: 'STUDENTS ENROLLED' },
            { num: '45', label: 'CERTIFIED FACULTY' },
            { num: '96', label: 'SUCCESS RATE %' },
            { num: '4', label: 'YEARS OF LEGACY' },
          ].map((stat, i) => (
             <div key={i} className="text-center px-4 hover:scale-105 transition-transform duration-300">
               <div className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2 tabular-nums">
                 {stat.num}
               </div>
               <div className="text-xs font-bold text-typography-body uppercase tracking-wider">
                 {stat.label}
               </div>
             </div>
          ))}
        </div>
      </section>

      {/* ══════════════ ACADEMIC FRAMEWORK & DIGITAL INFRA ══════════════ */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="text-accent font-bold tracking-[0.2em] text-xs uppercase mb-2 block">Core Values</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">Academic Framework</h2>
            </div>
            
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}>
              <FeatureCard icon={<BookOpen size={28}/>} title="Standards-Based" desc="Comprehensive curriculum aligned with global educational standards and NEP guidelines." />
              <FeatureCard icon={<Brain size={28}/>} title="Competency Learning" desc="Focusing on skill acquisition and practical application rather than rote memorization." />
              <FeatureCard icon={<Award size={28}/>} title="Assessment System" desc="Continuous diagnostic and formative evaluations to track student progress in real-time." />
              <FeatureCard icon={<Users size={28}/>} title="Faculty Excellence" desc="A community of lifelong learners undergoing monthly professional development cycles." />
            </motion.div>
          </div>

          <div className="mb-12">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">Digital Infrastructure</h2>
            </div>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}>
              <FeatureCard icon={<MonitorPlay size={28}/>} title="Smart Classrooms" desc="Equipped with high-definition interactive displays and integrated multimedia tools." />
              <FeatureCard icon={<Database size={28}/>} title="Centralized ERP" desc="Streamlined communication between parents, teachers, and administration via our portal." />
              <FeatureCard icon={<Bot size={28}/>} title="STEM & AI Labs" desc="Hands-on experience with robotics, 3D printing, and artificial intelligence modules." />
              <FeatureCard icon={<DownloadCloud size={28}/>} title="LMS Repository" desc="24/7 access to digital textbooks, recorded lectures, and interactive assignments." />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ FOUNDATION OF EXCELLENCE (HOY BACKGROUND) ══════════════ */}
      <section className="bg-[#788285] py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeader title="The Foundation of Excellence" subtitle="Nurturing curiosity through a 360° holistic curriculum" isDark />
          
          {/* Top 3 Focus Cards */}
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}>
            {[
              { stat: '85%', label: 'Critical Brain Growth by Age 5', icon: <Brain size={24} className="text-blue-500" /> },
              { stat: '1:12', label: 'Teacher-Student Ratio', icon: <Users size={24} className="text-gray-700" /> },
              { stat: 'STEAM', label: 'Integrated Learning Method', icon: <Bot size={24} className="text-primary" /> },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <div className="flex justify-center mb-3">{item.icon}</div>
                <div className="font-serif text-3xl font-bold text-typography-dark mb-1">{item.stat}</div>
                <div className="text-xs font-bold text-typography-body uppercase tracking-wider">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <motion.div className="space-y-6" initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}>
              {/* Level Cards */}
              <motion.div variants={fadeUp} className="bg-white rounded-2xl p-6 border-l-4 border-blue-500 shadow-md">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-typography-dark text-lg">Playgroup (Age 2-3)</h3>
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">Level 1</span>
                </div>
                <p className="text-typography-body text-sm">Focus on sensory play, gross motor skills, and separation anxiety management.</p>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-white rounded-2xl p-6 border-l-4 border-primary shadow-md">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-typography-dark text-lg">Junior & Senior KG</h3>
                  <span className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full">Level 2</span>
                </div>
                <p className="text-typography-body text-sm">Reading simple sentences, basic addition, and logical reasoning for Grade 1 readiness.</p>
              </motion.div>

              {/* A Typical Day */}
              <motion.div variants={fadeUp} className="bg-white rounded-2xl p-8 shadow-md mt-8">
                <h3 className="font-bold text-typography-dark text-xl flex items-center gap-2 mb-6">
                  <Clock size={24} className="text-red-500" /> A Typical Day
                </h3>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                  {[
                    { time: '09:00 AM', label: 'Morning Circle', desc: 'Prayer, weather discussion, and rhymes.' },
                    { time: '10:00 AM', label: 'Literacy & Numeracy', desc: 'Structured learning using Montessori Tools.' },
                    { time: '11:45 AM', label: 'Creative Expression', desc: 'Art, dance, or storytelling sessions.' },
                  ].map((event, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-white bg-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2" />
                      <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold bg-white px-2 py-1 rounded-md shadow-sm">{event.time}</span>
                          <span className="font-bold text-typography-dark text-sm">{event.label}</span>
                        </div>
                        <p className="text-xs text-typography-body">{event.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Safety */}
              <motion.div variants={fadeUp} className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm">
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">Safety Protocols</p>
                <div className="flex flex-wrap gap-3">
                  {['CCTV Monitored', 'GPS Enabled Bus', 'ID Card Restriction'].map(tag => (
                    <span key={tag} className="flex items-center gap-2 text-xs font-bold px-4 py-2 bg-white text-primary rounded-full">
                      <ShieldCheck size={14} /> {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column */}
            <motion.div className="space-y-6" initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}>
              {/* Image Card */}
              <motion.div variants={fadeUp} className="bg-white rounded-3xl p-3 shadow-xl">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <Image src="/images/slider1.jpg" alt="Classroom" fill className="object-cover" />
                  <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md text-white text-sm font-semibold py-3 px-4 rounded-xl text-center shadow-lg">
                    Modern, child-safe furniture
                  </div>
                </div>
              </motion.div>

              {/* Teacher Quote highlighting early years */}
              <motion.div variants={fadeUp} className="bg-[#0066ff] text-white rounded-3xl p-8 text-center shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-xs font-bold tracking-widest uppercase mb-4 shadow-sm border border-white/30 backdrop-blur-md">
                  Head Teacher
                </span>
                <h3 className="text-2xl font-bold mb-1">Ms. Sarah Jenkins</h3>
                <p className="text-white/80 text-sm font-semibold mb-6">Head of Early Years</p>
                <p className="italic text-lg font-serif">"We don't just teach ABCs, we teach confidence, curiosity, and kindness."</p>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ PRE-PRIMARY CURRICULUM ══════════════ */}
      {/* Heavy Image Banner */}
      <section className="relative h-64 md:h-80 flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-primary/95 mix-blend-multiply z-10" />
        <Image src="/images/slider2.jpg" alt="Curriculum Background" fill className="object-cover grayscale" />
        <div className="relative z-20 space-y-3 p-6">
          <p className="text-accent font-bold tracking-[0.3em] font-serif uppercase text-lg md:text-xl">Siddipet</p>
          <h2 className="text-white font-bold text-4xl md:text-5xl border-b-2 border-white pb-4 inline-block">
            PRE-PRIMARY CURRICULUM
          </h2>
          <p className="text-white/90 text-sm md:text-base font-medium">Nurturing joyful learning and development from the start</p>
          <p className="text-white font-serif text-3xl md:text-5xl opacity-30 tracking-widest mt-4">Saturday Activities</p>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#f4f7f6]">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* Highlights */}
          <div>
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="w-6 h-6 bg-blue-400 rounded-md shadow-sm" />
              <h2 className="font-serif text-3xl font-bold text-typography-dark">Curriculum Highlights</h2>
            </div>
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}>
              {[
                { icon: <Brain size={32} className="text-primary"/>, title: 'Multiple Intelligence', desc: 'Identifying and nurturing every child\'s potential.' },
                { icon: <Bot size={32} className="text-blue-500"/>, title: 'Phonics & Speech', desc: 'Using Jolly Phonics and mouth gymnastics for clarity.' },
                { icon: <BookOpen size={32} className="text-red-500"/>, title: 'Math Concepts', desc: 'Innovative play-based numeracy foundation.' },
              ].map((h, i) => (
                <motion.div key={i} variants={fadeUp} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-center mb-6">{h.icon}</div>
                  <h3 className="font-bold text-typography-dark text-lg mb-2">{h.title}</h3>
                  <p className="text-typography-body text-sm px-4">{h.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Methods */}
          <div>
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-400 to-orange-300 shadow-sm" />
              <h2 className="font-serif text-3xl font-bold text-typography-dark">Learning Methods We Use</h2>
            </div>
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}>
              {[
                { icon: <HeartPulse size={36} className="text-green-500"/>, title: 'Joyful Learning', desc: 'Making learning fun and engaging through activity based methods.' },
                { icon: <Music size={36} className="text-blue-500"/>, title: 'Music & Dance', desc: 'Learning rhythm, balance, and expression through movement.' },
                { icon: <BookType size={36} className="text-red-500"/>, title: 'Jolly Phonics', desc: 'Fun sounds based method for reading and spelling skills.' },
              ].map((m, i) => (
                <motion.div key={i} variants={fadeUp} className="bg-white p-8 rounded-2xl shadow-md text-center hover:-translate-y-2 transition-transform duration-300 border-b-4 border-transparent hover:border-accent">
                  <div className="flex justify-center mb-5">{m.icon}</div>
                  <h3 className="font-bold text-typography-dark text-lg mb-3">{m.title}</h3>
                  <p className="text-typography-body text-sm px-2 text-balance">{m.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Themes */}
          <div>
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl font-bold text-typography-dark mb-2">Exploration Themes</h2>
              <p className="text-typography-body text-sm">We introduce a new "World" every month.</p>
            </div>
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6" initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}>
              {[
                { title: 'Dino World', bg: 'bg-green-50 border-green-500', icon: <Shell size={40} className="text-green-600 mb-4" /> },
                { title: 'Space Travel', bg: 'bg-indigo-50 border-indigo-500', icon: <Rocket size={40} className="text-indigo-600 mb-4" /> },
                { title: 'Ocean Life', bg: 'bg-blue-50 border-blue-500', icon: <PaintBucket size={40} className="text-blue-600 mb-4" /> },
                { title: 'Little Chefs', bg: 'bg-orange-50 border-orange-500', icon: <ChefHat size={40} className="text-orange-600 mb-4" /> },
              ].map((t, i) => (
                <motion.div key={i} variants={fadeUp} className={`bg-white rounded-2xl shadow-sm border-b-4 ${t.bg} p-6 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-300`}>
                  {t.icon}
                  <p className="font-bold text-typography-dark text-sm">{t.title}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      {/* ══════════════ BLUE CTA BANNER ══════════════ */}
      <section className="bg-[#0b5cff] py-16 px-6 text-center text-white relative overflow-hidden">
        {/* Decorative rays */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white opacity-[0.03] rounded-full blur-2xl" />
        
        <div className="max-w-2xl mx-auto relative z-10 space-y-6">
          <h2 className="font-serif text-4xl font-bold">Get the Full Syllabus</h2>
          <p className="text-white/80 font-medium">Download our detailed 2026 Academic Calendar & Prospectus.</p>
          <button className="inline-flex items-center gap-3 bg-white text-[#0b5cff] font-bold px-8 py-4 rounded-full hover:bg-gray-50 hover:scale-105 transition-all shadow-xl">
            <Download size={20} /> Download PDF (2MB)
          </button>
        </div>
      </section>

      {/* ══════════════ THE PHILOSOPHY LIST ══════════════ */}
      <section className="pt-24 pb-32 px-6 bg-white overflow-hidden relative border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-typography-dark">Our Educational Philosophy</h2>
          </div>
          
          <motion.div className="space-y-6" initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}>
            {[
              "True development of the mind happens when students are engaged in co-curricular activities along with the usual text-book style education.",
              "No matter how many Physics or Biology problems a student solves, unless they see practically how a ball spins, a Frisbee changes its course, or perhaps a seed germinates, they can't grasp the concepts.",
              "Every time a student stands up after falling down, their overall courage gets stronger.",
              "When a student tries to draw the school building or their own class, their imaginative prowess gets enhanced.",
              "Our school facilitates an environment where creativity, inquisitiveness, and playfulness are not frowned upon."
            ].map((text, idx) => (
              <motion.div key={idx} variants={fadeLeft} className="flex gap-4 p-5 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <CheckCircle2 size={24} className="text-primary shrink-0 mt-0.5" />
                <p className="text-typography-body leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
