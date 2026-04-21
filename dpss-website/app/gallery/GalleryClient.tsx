"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Images, GraduationCap, Camera } from 'lucide-react';
import { GALLERY_EVENTS } from '@/lib/gallery-data';

// ── Animation Presets ──────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const viewport = { once: true, margin: '-60px' };

// ── Badge Colors ───────────────────────────────────────────────
const BADGE_COLORS: Record<string, string> = {
  'Cultural':       'bg-purple-900/70 text-purple-200 border border-purple-500/30',
  'Arts & Culture': 'bg-rose-900/70 text-rose-200 border border-rose-500/30',
  'Festival':       'bg-orange-900/70 text-orange-200 border border-orange-500/30',
  'Milestone':      'bg-blue-900/70 text-blue-200 border border-blue-500/30',
  'Leadership':     'bg-green-900/70 text-green-200 border border-green-500/30',
};

export default function GalleryClient() {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  return (
    <div className="flex flex-col min-h-screen bg-[#f9fafb]">

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative bg-primary pt-36 pb-24 px-6 text-center overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-accent/10 pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 text-accent font-bold text-xs tracking-widest uppercase rounded-full border border-accent/30"
          >
            <Images size={14} /> School Life
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl font-black text-white leading-tight"
          >
            Life at DPSS Siddipet
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
            className="text-white/75 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
          >
            From Annual Day performances to cultural festivals and graduation ceremonies —
            every moment tells a story of growth, joy, and community.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center gap-10 pt-4"
          >
            {[
              { num: `${GALLERY_EVENTS.length}`, label: 'Events' },
              { num: '100+', label: 'Photos' },
              { num: '6', label: 'Categories' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-accent font-serif font-black text-3xl">{s.num}</div>
                <div className="text-white/60 text-xs font-bold uppercase tracking-widest mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ══════════════ EVENT GRID ══════════════ */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20">
        <motion.div
          initial="hidden" whileInView="show" variants={stagger} viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {GALLERY_EVENTS.map((event) => {
            const hasError = imgErrors[event.slug];
            // Approximate photo count from images array length (actual loaded will differ)
            const photoCount = event.images.length;

            return (
              <motion.div key={event.slug} variants={fadeUp}>
                <Link href={`/gallery/${event.slug}`} className="group block h-full">
                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100
                                  hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">

                    {/* ── Cover Image with full overlay ── */}
                    <div className="relative aspect-[4/3] bg-primary/10 overflow-hidden flex-shrink-0">

                      {!hasError ? (
                        <Image
                          src={event.coverImage}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={() => setImgErrors(prev => ({ ...prev, [event.slug]: true }))}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 gap-3">
                          <Camera size={40} className="text-primary/30" />
                          <p className="text-primary/50 text-xs font-bold uppercase tracking-widest">Photos Coming Soon</p>
                        </div>
                      )}

                      {/* Permanent bottom gradient — always visible */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                      {/* Category Badge — top left, glassmorphism */}
                      {event.badge && (
                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${BADGE_COLORS[event.badge] ?? 'bg-black/50 text-white/80 border border-white/20'}`}>
                          {event.badge}
                        </div>
                      )}

                      {/* Event Title overlay — always on image at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h2 className="font-serif font-bold text-white text-xl leading-snug
                                       drop-shadow-lg group-hover:text-accent transition-colors duration-300">
                          {event.title}
                        </h2>
                        {event.date && (
                          <p className="text-white/60 text-xs font-semibold mt-1 tracking-wider">{event.date}</p>
                        )}
                      </div>
                    </div>

                    {/* ── Card Body — description + CTA ── */}
                    <div className="p-5 flex flex-col flex-grow">
                      <p className="text-typography-body text-sm leading-relaxed line-clamp-2 flex-grow">
                        {event.description}
                      </p>
                      <div className="flex items-center justify-start mt-4 pt-4 border-t border-gray-50">
                        <span className="flex items-center gap-1.5 text-primary font-bold text-sm group-hover:gap-2.5 transition-all duration-200">
                          View Photos <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>


      {/* ══════════════ BOTTOM CTA ══════════════ */}
      <section className="bg-primary py-24 px-6 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent/10 pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 text-accent font-bold text-xs tracking-widest uppercase rounded-full border border-accent/30"
          >
            <GraduationCap size={14} /> Admissions Open 2026–27
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.55, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold text-white"
          >
            Join Our Vibrant School Community
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/75 text-lg font-medium max-w-xl mx-auto"
          >
            Be part of a school where every student thrives. Limited seats available for 2026–27.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-2"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link href="/admissions"
                className="block px-8 py-4 bg-accent text-typography-dark rounded-xl font-bold hover:bg-yellow-300 transition-all shadow-lg text-center">
                Apply Now
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link href="/scholarship"
                className="block px-8 py-4 border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition-all text-center">
                Merit Scholarship
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
