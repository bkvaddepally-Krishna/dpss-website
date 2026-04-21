"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Camera, ZoomIn, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';
import { GALLERY_EVENTS, type GalleryEvent } from '@/lib/gallery-data';

// ── Animation Presets ──────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
};
const viewport = { once: true, margin: '-50px' };

const BADGE_COLORS: Record<string, string> = {
  'Cultural':       'bg-purple-900/70 text-purple-200 border border-purple-500/30',
  'Arts & Culture': 'bg-rose-900/70 text-rose-200 border border-rose-500/30',
  'Festival':       'bg-orange-900/70 text-orange-200 border border-orange-500/30',
  'Milestone':      'bg-blue-900/70 text-blue-200 border border-blue-500/30',
  'Leadership':     'bg-green-900/70 text-green-200 border border-green-500/30',
};

interface Props {
  event: GalleryEvent;
}

export default function EventGalleryClient({ event }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [errorSet, setErrorSet]   = useState<Set<number>>(new Set());
  const [loadedCount, setLoadedCount] = useState(0);

  // Indices that loaded successfully
  const validIndices = event.images
    .map((_, i) => i)
    .filter(i => !errorSet.has(i));
  const photoCount = validIndices.length;

  // ── Lightbox helpers ──────────────────────────────────────────
  const openLightbox = (i: number) => { if (!errorSet.has(i)) setLightboxIndex(i); };
  const closeLightbox = () => setLightboxIndex(null);

  const prevPhoto = useCallback(() => {
    if (lightboxIndex === null) return;
    const pos = validIndices.indexOf(lightboxIndex);
    if (pos > 0) setLightboxIndex(validIndices[pos - 1]);
  }, [lightboxIndex, validIndices]);

  const nextPhoto = useCallback(() => {
    if (lightboxIndex === null) return;
    const pos = validIndices.indexOf(lightboxIndex);
    if (pos < validIndices.length - 1) setLightboxIndex(validIndices[pos + 1]);
  }, [lightboxIndex, validIndices]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'Escape')     closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, prevPhoto, nextPhoto]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  const markError = (i: number) => {
    setErrorSet(prev => new Set(prev).add(i));
  };
  const markLoaded = () => setLoadedCount(c => c + 1);

  // Determine lightbox position label
  const lbPosition = lightboxIndex !== null ? validIndices.indexOf(lightboxIndex) + 1 : 0;

  // ── Helpers ─────────────────────────
  const gridClass =
    photoCount === 1
      ? 'flex justify-center'
      : photoCount === 2
      ? 'grid grid-cols-2 max-w-2xl mx-auto gap-4 md:gap-6'
      : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6';

  const imageCardClass =
    photoCount === 1
      ? 'relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer group bg-primary/10 shadow-lg border-2 border-white'
      : 'relative aspect-square rounded-2xl overflow-hidden cursor-pointer group bg-primary/10 shadow-sm border-2 border-white hover:border-primary/30 transition-all';

  const otherEvents = GALLERY_EVENTS.filter(e => e.slug !== event.slug).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-[#f9fafb]">

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative bg-primary pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-accent/10 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back link & Trust line */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <Link href="/gallery"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white font-semibold text-sm transition-colors group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back to Gallery
            </Link>
            <div className="flex items-center gap-2 text-white/50 text-xs font-semibold uppercase tracking-widest">
              <CheckCircle2 size={14} className="text-accent" />
              Regular activities & student participation
            </div>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-6 max-w-2xl">
              {/* Category badge */}
              {event.badge && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}
                  className="inline-block px-3 py-1 bg-accent/20 text-accent font-bold text-xs tracking-widest uppercase rounded-full border border-accent/30"
                >
                  {event.badge}
                </motion.span>
              )}

              {/* Event title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                className="font-serif text-4xl md:text-6xl font-black text-white leading-tight"
              >
                {event.title}
              </motion.h1>

              {/* Description & Context Bullets */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.2 }}
                className="space-y-4"
              >
                <p className="text-white/80 text-lg font-medium leading-relaxed">
                  {event.description}
                </p>
                {event.context && (
                  <ul className="space-y-2 mt-4 text-white/70 text-sm font-medium">
                    {event.context.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>

              {/* Meta row: date only */}
              {event.date && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.3 }}
                  className="flex items-center gap-2 text-white/55 text-sm font-semibold pt-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                  {event.date}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════ PHOTO GRID ══════════════ */}
      <section className="max-w-7xl mx-auto w-full px-6 py-16">

        {/* Empty State — all images failed to load and we've tried all */}
        {loadedCount === 0 && errorSet.size === event.images.length && event.images.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center space-y-4"
          >
            <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mb-4">
              <Camera size={40} className="text-primary/30" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-typography-dark">Photos Coming Soon</h2>
            <p className="text-typography-body max-w-sm">
              We're uploading photos from this event. Please check back shortly.
            </p>
            <Link href="/gallery"
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-green-800 transition-all">
              <ArrowLeft size={16} /> Back to Gallery
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden" whileInView="show" variants={stagger} viewport={viewport}
            className={gridClass}
          >
            {event.images.map((src, i) => {
              if (errorSet.has(i)) return null;

              // Insert the soft mid-page CTA after the 6th image (if enough images exist)
              const renderCTA = i === 5 && photoCount > 8;

              return (
                <React.Fragment key={src}>
                  <motion.div
                    variants={fadeUp}
                    onClick={() => openLightbox(i)}
                    className={imageCardClass}
                  >
                    <Image
                      src={src}
                      alt={`${event.title} — photo`}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      onLoad={markLoaded}
                      onError={() => markError(i)}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Dark overlay on hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                        <ZoomIn size={18} className="text-white" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Soft Soft-Conversion CTA */}
                  {renderCTA && (
                    <motion.div variants={fadeUp} className="col-span-full my-8 bg-green-50 rounded-3xl p-8 md:p-12 border border-green-100 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                      <div className="space-y-2 text-center md:text-left">
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-typography-dark">Give your child opportunities like these.</h3>
                        <p className="text-typography-body font-medium">Join a school that focuses on holistic growth and exposure.</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                        <Link href="/admissions" className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-center hover:bg-green-800 transition-colors">
                          Apply Now
                        </Link>
                        <Link href="/scholarship" className="px-6 py-3 bg-white text-primary border border-primary/20 rounded-xl font-bold text-center hover:border-primary transition-colors">
                          Scholarship
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </React.Fragment>
              );
            })}
          </motion.div>
        )}
      </section>


      {/* ══════════════ RELATED EVENTS ══════════════ */}
      {otherEvents.length > 0 && (
        <section className="bg-white py-20 px-6 border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-typography-dark">Explore More Events</h2>
              <Link href="/gallery" className="hidden sm:inline-flex items-center gap-1.5 text-primary font-bold hover:gap-2 transition-all">
                View All <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherEvents.map(related => (
                <Link href={`/gallery/${related.slug}`} key={related.slug} className="group block focus:outline-none">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-primary/5 shadow-sm border border-gray-100">
                    <Image 
                      src={related.coverImage} 
                      alt={related.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Badge */}
                    {related.badge && (
                      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${BADGE_COLORS[related.badge] ?? 'bg-black/50 text-white/80 border border-white/20'}`}>
                        {related.badge}
                      </div>
                    )}
                    
                    {/* Title */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-serif text-white font-bold text-lg leading-tight group-hover:text-accent transition-colors drop-shadow-md">
                        {related.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link href="/gallery" className="inline-flex items-center gap-1.5 text-primary font-bold">
                View All Events <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}


      {/* ══════════════ LIGHTBOX ══════════════ */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[9999] bg-black/96 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Top bar: close */}
            <div className="absolute top-0 right-0 p-6 z-10">
              <button
                onClick={closeLightbox}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Event name caption */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-xs font-bold uppercase tracking-widest hidden sm:block">
              {event.title}
            </div>

            {/* Prev */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
              whileHover={{ scale: 1.1, x: -2 }} whileTap={{ scale: 0.92 }}
              disabled={lbPosition <= 1}
              className="absolute left-4 md:left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 flex items-center justify-center text-white transition-all z-10"
              aria-label="Previous photo"
            >
              <ChevronLeft size={26} />
            </motion.button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="relative w-full h-full max-w-5xl max-h-[82vh] mx-16 md:mx-28"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={event.images[lightboxIndex]}
                  alt={`${event.title} — photo`}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Next */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
              whileHover={{ scale: 1.1, x: 2 }} whileTap={{ scale: 0.92 }}
              disabled={lbPosition >= photoCount}
              className="absolute right-4 md:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 flex items-center justify-center text-white transition-all z-10"
              aria-label="Next photo"
            >
              <ChevronRight size={26} />
            </motion.button>

            {/* Bottom caption */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs">
              Click outside or press <kbd className="bg-white/10 rounded px-1.5 py-0.5 mx-1 font-mono">Esc</kbd> to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ══════════════ BOTTOM CTA ══════════════ */}
      <section className="bg-primary py-20 px-6 relative overflow-hidden mt-auto">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-5">
          <motion.span
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewport}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 text-accent font-bold text-xs tracking-widest uppercase rounded-full border border-accent/30"
          >
            <GraduationCap size={14} /> Admissions Open 2026–27
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport}
            className="font-serif text-4xl md:text-5xl font-bold text-white"
          >
            Join Our Vibrant School Community
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewport} transition={{ delay: 0.1 }}
            className="text-white/70 text-lg font-medium"
          >
            Be part of a school where every student thrives. Limited seats for 2026–27.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ delay: 0.15 }}
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
