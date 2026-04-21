"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewport, fadeLeft, fadeRight } from '@/lib/animations';
import {
  Wifi, FlaskConical, Library, Monitor, Dumbbell, Bus, Droplets, ShieldCheck, 
  Cctv, UserCheck, HeartPulse
} from 'lucide-react';

export default function FacilitiesClient() {
  const CORE_FACILITIES = [
    { icon: <Wifi size={24} />, title: "Smart Classrooms", desc: "Digitally enabled, interactive learning environments." },
    { icon: <FlaskConical size={24} />, title: "Science Labs", desc: "Equipped for hands-on, practical understanding." },
    { icon: <Library size={24} />, title: "Library", desc: "A quiet space nurturing reading and research." },
    { icon: <Monitor size={24} />, title: "Computer Lab", desc: "Modern systems developing crucial tech-skills." },
    { icon: <Dumbbell size={24} />, title: "Sports Facilities", desc: "Dedicated grounds for physical development." },
    { icon: <Bus size={24} />, title: "Transport", desc: "Safe, GPS-tracked fleet across the city." },
    { icon: <Droplets size={24} />, title: "RO Drinking Water", desc: "Pure and hygienic water stations everywhere." },
    { icon: <ShieldCheck size={24} />, title: "24/7 Security", desc: "Secure perimeter and constant vigilance." },
  ];

  return (
    <motion.main className="flex flex-col pt-[104px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-primary py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent/10 pointer-events-none" />
        
        <motion.div 
          className="relative max-w-7xl mx-auto text-center z-10 space-y-6"
          initial="hidden" animate="show" variants={staggerContainer}
        >
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.25em] text-accent uppercase">Our Campus</motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-7xl font-bold font-serif text-white leading-tight">
            World-Class Facilities <br className="hidden md:block" /> for Holistic Learning
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-medium">
            Designed to support academic excellence, creativity, and student well-being.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. CORE FACILITIES GRID */}
      <section className="bg-[#f8faf9] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16 space-y-4" initial="hidden" whileInView="show" viewport={viewport} variants={staggerContainer}>
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.25em] text-accent uppercase">Infrastructure</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-typography-dark font-serif">Core Facilities</motion.h2>
          </motion.div>
          
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" initial="hidden" whileInView="show" viewport={viewport} variants={staggerContainer}>
            {CORE_FACILITIES.map((f, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -6 }} className="bg-white rounded-2xl p-8 flex flex-col gap-4 border border-gray-50 shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-typography-dark text-lg mb-1">{f.title}</h3>
                  <p className="text-sm text-typography-body">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. FEATURED FACILITIES */}
      <section className="bg-white py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-24">
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeRight} className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-lg">
              <Image src="/images/slider1.jpg" alt="Smart Classrooms" fill className="object-cover" />
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={staggerContainer} className="space-y-6">
              <motion.h3 variants={fadeUp} className="font-serif text-3xl md:text-4xl font-bold text-typography-dark">Smart Classrooms</motion.h3>
              <motion.p variants={fadeUp} className="text-typography-body text-lg leading-relaxed">
                Digitally enabled classrooms deeply integrated with interactive learning tools. We fuse traditional teaching methods with modern visuals to make complex subjects incredibly accessible.
              </motion.p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={staggerContainer} className="order-2 md:order-1 space-y-6">
              <motion.h3 variants={fadeUp} className="font-serif text-3xl md:text-4xl font-bold text-typography-dark">Science Labs</motion.h3>
              <motion.p variants={fadeUp} className="text-typography-body text-lg leading-relaxed">
                Hands-on learning environment for practical understanding. From chemistry experiments to biological dissections, our extensively equipped laboratories fuel scientific curiosity safely.
              </motion.p>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeLeft} className="order-1 md:order-2 relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-lg">
              <Image src="/images/slider2.jpg" alt="Science Labs" fill className="object-cover" />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeRight} className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-lg pt-4 md:pt-0">
               <Image src="/images/slider3.jpg" alt="Sports & Activities" fill className="object-cover" />
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={staggerContainer} className="space-y-6">
              <motion.h3 variants={fadeUp} className="font-serif text-3xl md:text-4xl font-bold text-typography-dark">Sports & Activities</motion.h3>
              <motion.p variants={fadeUp} className="text-typography-body text-lg leading-relaxed">
                Facilities that support physical development and teamwork. Professional-grade courts, expansive fields, and dedicated coaching to train the champions of tomorrow.
              </motion.p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 4. SAFETY & CARE */}
      <section className="bg-primary py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div className="text-center mb-16 space-y-4" initial="hidden" whileInView="show" viewport={viewport} variants={staggerContainer}>
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.25em] text-accent uppercase">Security First</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white font-serif">Safety & Care</motion.h2>
          </motion.div>
          
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" initial="hidden" whileInView="show" viewport={viewport} variants={staggerContainer}>
            {[
              { icon: <Cctv size={32} strokeWidth={1.5}/>, title: "CCTV Surveillance", desc: "Monitored campus with extensive camera coverage naturally." },
              { icon: <UserCheck size={32} strokeWidth={1.5}/>, title: "Trained Staff", desc: "Vigilant, background-verified faculty and security personnel." },
              { icon: <ShieldCheck size={32} strokeWidth={1.5}/>, title: "Secure Campus", desc: "Strict entry/exit protocols enforced at all operational times." },
              { icon: <HeartPulse size={32} strokeWidth={1.5}/>, title: "Health & Hygiene", desc: "On-site infirmary and sanitized operational standards." },
            ].map((f, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-accent text-typography-dark flex items-center justify-center mb-5 shadow-sm">
                  {f.icon}
                </div>
                <h3 className="font-bold text-lg text-white mb-2">{f.title}</h3>
                <p className="text-white/65 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. INFRASTRUCTURE IMAGE SECTION */}
      <section className="bg-[#f8faf9] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" initial="hidden" whileInView="show" viewport={viewport} variants={staggerContainer}>
            {[
               { img: '/images/slider1.jpg', lbl: 'Classrooms' },
               { img: '/images/slider2.jpg', lbl: 'Playground' },
               { img: '/images/school.png', lbl: 'Campus Building' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ scale: 1.02 }} className="relative aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-sm group">
                <Image src={item.img} alt={item.lbl} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-8 left-8 text-white font-bold text-xl translate-y-2 group-hover:translate-y-0 transition-transform">
                  {item.lbl}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. TRUST LINE & 7. CTA */}
      <section className="bg-white py-24 px-6 overflow-hidden">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={staggerContainer} className="max-w-7xl mx-auto text-center space-y-4 mb-16">
          <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl font-bold text-typography-dark italic text-primary/80">
            "Providing a safe, modern, and supportive environment for every student."
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={staggerContainer} className="max-w-7xl mx-auto bg-primary rounded-[2rem] py-16 px-8 md:px-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 pointer-events-none opacity-10">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          </div>
          <div className="relative z-10 max-w-2xl text-center lg:text-left">
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Explore Admissions
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/80 text-lg font-medium leading-relaxed">
              Step into a space built entirely for developmental growth.
            </motion.p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0">
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
          </div>
        </motion.div>
      </section>

    </motion.main>
  );
}
