"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Eye, Heart, GraduationCap, Quote } from 'lucide-react';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewport } from '@/lib/animations';

export default function AboutClient() {
  return (
    <div className="flex flex-col pt-24 bg-white">
      
      {/* ══════════════ HERO TITLE ══════════════ */}
      <section className="bg-primary pt-20 pb-28 px-6 text-center relative overflow-hidden">
        {/* Subtle background pattern or gradient overlay could go here */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10" />
        
        <motion.div 
          className="max-w-4xl mx-auto relative z-20 space-y-4"
          initial="hidden" animate="show" variants={staggerContainer}
        >
          <motion.p variants={fadeUp} className="text-accent font-bold tracking-[0.25em] text-sm uppercase">
            Discover Our Roots
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-6xl font-bold text-white">
            About DPSS Siddipet
          </motion.h1>
          <motion.div variants={fadeUp} className="w-24 h-1.5 bg-accent mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Wave Divider connecting to next section */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 translate-y-px">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12 md:h-16">
            <path d="M0,60 L0,30 C360,60 1080,0 1440,30 L1440,60 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ══════════════ CHAIRMAN'S DESK ══════════════ */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Chairman Image with offset green background */}
          <motion.div 
            className="relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto"
            initial="hidden" whileInView="show" variants={fadeRight} viewport={viewport}
          >
            {/* The offset green background block */}
            <div className="absolute -top-6 -left-6 w-full h-full bg-primary rounded-3xl" />
            
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <Image 
                src="/images/chairman.jpeg" 
                alt="Chairman, DPSS" 
                fill 
                className="object-cover object-top"
              />
            </div>
            
            {/* Name badge */}
            <div className="absolute -bottom-6 right-6 bg-white py-4 px-8 rounded-xl shadow-xl border border-gray-100 z-10 text-center">
              <p className="font-bold text-typography-dark text-lg uppercase tracking-wide">Chairman</p>
              <p className="text-typography-body text-sm">DPSS Educational Society</p>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div 
            className="space-y-8"
            initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}
          >
            <div>
              <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 bg-[#eaffee] text-primary font-bold text-xs tracking-widest uppercase rounded-full mb-4">
                Chairman's Desk
              </motion.span>
              <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-bold text-primary leading-tight">
                Building The Future,<br/>One Student at a Time.
              </motion.h2>
            </div>

            <motion.p variants={fadeUp} className="text-typography-body text-base leading-[1.8]">
              Welcome to <strong className="text-typography-dark font-bold">Delhi Public Secondary School</strong>. 
              It is with great pride that I extend a warm greeting to you. As the Chairman, I am honored to lead 
              an institution deeply committed to nurturing the intellectual, emotional, and social growth of its 
              students. We strive to provide tools and guidance they need to excel in all areas of life.
            </motion.p>

            <div className="space-y-4 pt-4">
              {/* Feature 1 */}
              <motion.div variants={fadeUp} className="flex gap-5 bg-gray-50/80 p-6 rounded-2xl border border-gray-100 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                  <Eye className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-typography-dark text-lg mb-1">Our Vision</h3>
                  <p className="text-sm text-typography-body leading-relaxed">
                    To empower students to acquire, demonstrate, and value knowledge and skills that will support them as life-long learners.
                  </p>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div variants={fadeUp} className="flex gap-5 bg-gray-50/80 p-6 rounded-2xl border border-gray-100 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                  <Heart className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-typography-dark text-lg mb-1">Core Values</h3>
                  <p className="text-sm text-typography-body leading-relaxed">
                    We emphasize the importance of ethics, discipline, and character building, which are the cornerstones of a successful life.
                  </p>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div variants={fadeUp} className="flex gap-5 bg-gray-50/80 p-6 rounded-2xl border border-gray-100 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                  <GraduationCap className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-typography-dark text-lg mb-1">Holistic Education</h3>
                  <p className="text-sm text-typography-body leading-relaxed">
                    Beyond academics, we focus on sports, arts, and emotional growth to create confident and compassionate individuals.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ══════════════ PRINCIPAL'S MESSAGE ══════════════ */}
      <section className="bg-[#fafafa] py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Principal Image inside column layout */}
          <motion.div 
            className="lg:col-span-4"
            initial="hidden" whileInView="show" variants={fadeRight} viewport={viewport}
          >
            <div className="bg-white p-4 rounded-3xl shadow-xl sticky top-32">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-5 bg-gray-100">
                <Image 
                  src="/images/principal.jpeg" 
                  alt="Principal, DPSS" 
                  fill 
                  className="object-cover object-top"
                />
              </div>
              <div className="text-center pb-2">
                <h3 className="font-bold text-typography-dark text-xl">Ms. Garima Singh</h3>
                <p className="text-xs font-bold text-typography-body uppercase tracking-[0.2em] mt-1 text-primary">Principal</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div 
            className="lg:col-span-8 space-y-8"
            initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}
          >
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-bold text-typography-dark">
              Principal's Message
            </motion.h2>

            <motion.div variants={fadeUp} className="flex gap-4 border-l-4 border-primary pl-6 py-2">
              <Quote className="text-primary/40 shrink-0" size={32} />
              <p className="font-serif italic text-2xl text-typography-dark leading-snug">
                "Teachers can open the door but you must enter it yourself."
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-6 text-typography-body leading-[1.8] text-base">
              <p>
                Education improves the lives of people and brings growth and stability to the nation. 
                Coupled with this, it is important that equal opportunities are given to both men and women 
                in society so that the growth of the nation would be more exponential. As citizens of this 
                amazing country, it is our duty to do our bit to address this gross inequality among the youth. 
                This has actually been our reason to foray into the realm of education.
              </p>
              
              <p>
                The teachers at <strong className="text-typography-dark">DPSS Siddipet</strong> are quite talented 
                and continuously sharpen their skills, bringing more and more innovations to their teaching methodology. 
                The students are also exposed to frequent workshops that enrich their knowledge and teach them the skills 
                of application.
              </p>

              {/* Highlight box */}
              <div className="bg-[#eaffee] border-2 border-dashed border-primary/40 rounded-2xl p-6 md:p-8 my-8 text-center shadow-sm">
                <p className="font-bold text-typography-dark text-lg leading-relaxed">
                  "It has been two years since I helped to lay the cornerstone for DPSS Siddipet. It is heartening to see the school flourishing and scaling new heights."
                </p>
              </div>

              <p>
                The students are being nurtured well and made ready to face the world and its challenges. 
                We are not here just to impart bookish knowledge but also to groom them into kind, compassionate, 
                courageous, just, and reliable human beings and assets to society.
              </p>

              <p>
                The infrastructure of the school is comparable to world standards, with state-of-the-art security 
                systems and sports facilities. The medical and support staff are highly trained to act quickly in 
                an emergency and are always vigilant and alert.
              </p>

              <p>
                We are confident that this school is the best place for your child. We welcome your active interest 
                and involvement in the progress and activities of your child. We look forward to your continuous support.
              </p>

              <p>
                My best wishes to DPSS Siddipet for working towards quality education and developing positive 
                attitudes in our students in all areas of life and character.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="pt-8 mt-8 border-t border-gray-200">
              <p className="text-sm text-typography-body mb-1">Sincerely,</p>
              <h4 className="font-bold text-typography-dark text-xl uppercase tracking-wide">MS. GARIMA SINGH</h4>
              <p className="text-primary font-semibold text-sm">Principal, DPSS Siddipet</p>
            </motion.div>

          </motion.div>

        </div>
      </section>

    </div>
  );
}
