"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, ChevronDown,
  GraduationCap, Trophy, ShieldCheck,
  BookOpen, FlaskConical, Library, Wifi, Bus, Droplets,
  Music2, Dumbbell, Phone, ArrowRight, CheckCircle2,
} from 'lucide-react';
import {
  fadeUp, fadeLeft, fadeRight, fadeIn, scaleIn,
  staggerContainer, staggerFast, viewport,
} from '@/lib/animations';

// ─── CountUp ──────────────────────────────────────────────────────
function useCountUp(end: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect(); }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start: number;
    const frame = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [started, end, duration]);

  return { count, ref };
}

function StatCard({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(end);
  return (
    <motion.div variants={fadeUp} className="flex flex-col items-center text-center px-4 group">
      <span ref={ref} className="font-serif text-7xl md:text-8xl font-bold text-white tabular-nums leading-none mb-2">
        {count}{suffix}
      </span>
      <span className="uppercase tracking-widest text-xs md:text-sm text-white/70 font-semibold">{label}</span>
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────
const SLIDES = [
  { id: 1, src: '/images/slider1.jpg', alt: 'DPSS Campus' },
  { id: 2, src: '/images/slider2.jpg', alt: 'DPSS Students' },
  { id: 3, src: '/images/slider3.jpg', alt: 'DPSS Events' },
];

const FACILITIES = [
  { name: 'Smart Classrooms', desc: 'AI-powered interactive learning boards', icon: <Wifi size={28} /> },
  { name: 'Science Labs', desc: 'Fully equipped with modern apparatus', icon: <FlaskConical size={28} /> },
  { name: 'Rich Library', desc: '5,000+ books, e-resources & reading zones', icon: <Library size={28} /> },
  { name: 'CBSE Curriculum', desc: 'Nationally recognised, future-aligned syllabus', icon: <BookOpen size={28} /> },
  { name: 'GPS Transport', desc: 'Safe, tracked fleet covering all routes', icon: <Bus size={28} /> },
  { name: 'RO Water & Infirmary', desc: 'Pure water & on-campus medical care', icon: <Droplets size={28} /> },
  { name: 'Music & Dance Studio', desc: 'Professional-grade arts practice facilities', icon: <Music2 size={28} /> },
  { name: 'Sports & Fitness', desc: 'Courts, pool, yoga pavilion & gym', icon: <Dumbbell size={28} /> },
  { name: '24×7 Security', desc: 'Trained staff, CCTV and secure access', icon: <ShieldCheck size={28} /> },
];

const WHY_DPSS = [
  {
    icon: <GraduationCap size={36} className="text-accent" />,
    title: 'Academic Excellence',
    desc: 'CBSE board with experienced faculty, smart classrooms, digital labs and a proven track record of outstanding results.',
  },
  {
    icon: <Trophy size={36} className="text-accent" />,
    title: 'Holistic Development',
    desc: 'Sports, performing arts, music, yoga, life-skill workshops — education is far more than textbooks.',
  },
  {
    icon: <ShieldCheck size={36} className="text-accent" />,
    title: 'Safe Environment',
    desc: '24×7 CCTV surveillance, GPS transportation, trained security personnel and a dedicated medical infirmary.',
  },
];

// ─── Home Page ────────────────────────────────────────────────────
export default function Home() {
  const [slide, setSlide] = useState(0);
  const total = SLIDES.length;

  // Hero parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 160]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setSlide(p => (p + 1) % total), 5000);
    return () => clearInterval(t);
  }, [total]);

  const prev = () => setSlide(p => (p === 0 ? total - 1 : p - 1));
  const next = () => setSlide(p => (p + 1) % total);

  return (
    <div className="flex flex-col">

      {/* ══════════════ HERO ══════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[640px] w-full overflow-hidden bg-black">

        {/* Parallax image layer */}
        <motion.div className="absolute inset-0 scale-110" style={{ y: heroY }}>
          <AnimatePresence mode="sync">
            {SLIDES.map((s, i) => (
              i === slide && (
                <motion.div key={s.id} className="absolute inset-0"
                  initial={{ opacity: 1, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1, ease: 'easeInOut' }}>
                  <Image src={s.src} alt={s.alt} fill priority={i === 0} quality={90}
                    style={{ objectFit: 'cover', objectPosition: 'center' }} />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Gradient overlay - deepened for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent z-10" />

        {/* Hero Content */}
        <motion.div className="absolute inset-0 z-20 flex items-center" style={{ opacity: heroOpacity }}>
          <div className="max-w-7xl mx-auto px-6 w-full">
              <motion.div className="max-w-2xl">

              <motion.span variants={fadeUp}
                className="inline-flex items-center gap-2 px-5 py-2 bg-accent/20 backdrop-blur-md border border-accent/30 rounded-full text-accent font-bold text-xs md:text-sm tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Admissions Open 2026-27
              </motion.span>

              <motion.div variants={fadeUp} className="flex gap-5 items-start mb-6">
                <motion.div className="w-1.5 bg-accent rounded-full flex-shrink-0 mt-1 shadow-[0_0_15px_rgba(255,196,0,0.5)]"
                  initial={{ height: 0 }}
                  animate={{ height: 110 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }} />
                <h1 className="font-serif text-5xl md:text-8xl font-black text-white leading-[1.05] tracking-tight">
                  Education That <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-500">Builds Leaders</span>
                </h1>
              </motion.div>

              <motion.p variants={fadeUp}
                className="text-white/80 font-medium text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                Empowering students with a blend of <span className="text-accent font-bold">tradition</span> and <span className="text-accent font-bold">technology</span> in the heart of Siddipet.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/admissions"
                    className="block px-8 py-4 bg-accent text-typography-dark rounded-xl font-bold text-base shadow-2xl hover:bg-yellow-300 transition-colors text-center">
                    Apply Now
                  </Link>
                </motion.div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 border-2 border-white/60 text-white rounded-xl font-semibold text-base hover:bg-white hover:text-typography-dark transition-all flex items-center justify-center gap-2">
                  <span className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-white ml-0.5" />
                  </span>
                  Watch Our Story
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Slide counter + line dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
          <motion.span key={slide} initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }}
            className="text-accent font-bold text-sm tracking-widest tabular-nums">
            {String(slide + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </motion.span>
          <div className="flex gap-2">
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)}
                className="h-0.5 rounded-full transition-all duration-500 cursor-pointer"
                style={{ width: i === slide ? 48 : 24, background: i === slide ? '#ffc400' : 'rgba(255,255,255,0.4)' }} />
            ))}
          </div>
        </div>

        {/* Minimal arrow nav */}
        <button onClick={prev}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-20 text-white/60 hover:text-white transition-colors hidden md:block group">
          <ChevronLeft size={44} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform duration-200" />
        </button>
        <button onClick={next}
          className="absolute right-5 top-1/2 -translate-y-1/2 z-20 text-white/60 hover:text-white transition-colors hidden md:block group">
          <ChevronRight size={44} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-200" />
        </button>

        {/* Scroll cue */}
        <motion.div className="absolute bottom-8 right-8 z-20 hidden lg:flex flex-col items-center gap-2 text-white/40 text-xs tracking-widest uppercase"
          initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
          <span>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}>
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </section>


      {/* ══════════════ WELCOME ══════════════ */}
      <section className="bg-[#fafafa] py-28 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">

          {/* Left */}
          <motion.div className="lg:col-span-3 space-y-8">

            <motion.p variants={fadeUp}
              className="text-xs font-bold tracking-[0.25em] text-accent uppercase">
              Est. 2019 &bull; Siddipet, Telangana
            </motion.p>

            <motion.h2 variants={fadeUp}
              className="font-serif text-5xl md:text-7xl font-bold text-typography-dark leading-tight">
              Where{' '}
              <em className="text-primary not-italic italic font-serif">Excellence</em>{' '}
              <span className="text-accent underline decoration-accent/30 underline-offset-8">Begins</span>
            </motion.h2>

            <motion.p variants={fadeUp}
              className="text-typography-body text-lg leading-[1.9] max-w-xl">
              For over five years, DPSS has been more than just a school — a living, breathing
              community where curiosity is rewarded, character is shaped, and every child is
              empowered to dream bigger.
            </motion.p>

            {/* Inline stats with dividers */}
            <motion.div variants={fadeUp}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-bold text-typography-dark">
              {['5+ Years', '600+ Alumni', '25+ Facilities'].map((s, i, arr) => (
                <React.Fragment key={s}>
                  <span className="hover:text-primary transition-colors cursor-default">{s}</span>
                  {i < arr.length - 1 && <span className="text-accent text-xl">|</span>}
                </React.Fragment>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/about"
                  className="block px-7 py-3.5 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all duration-300 text-center">
                  Our Story
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/facilities"
                  className="block px-7 py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-all duration-300 shadow-lg text-center">
                  View Facilities
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right image */}
          <motion.div className="lg:col-span-2 relative"
            initial="hidden" whileInView="show" variants={fadeRight} viewport={viewport}>
            <motion.div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] group"
              whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}>
              <Image src="/images/school.png" alt="DPSS School Building" fill
                style={{ objectFit: 'cover' }}
                className="group-hover:scale-105 transition-transform duration-700" />
            </motion.div>

            {/* Floating badge: 5+ Years */}
            <motion.div
              initial={{ opacity: 1, x: 0, y: 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl px-6 py-4 flex items-center gap-3 border border-gray-100 z-10 hidden md:flex">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg shrink-0">5+</div>
              <div>
                <div className="text-xs text-typography-body">Years of</div>
                <div className="font-bold text-typography-dark">Excellence</div>
              </div>
            </motion.div>

            {/* Floating badge: CBSE */}
            <motion.div
              initial={{ opacity: 1, x: 0, y: 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              viewport={{ once: true }}
              className="absolute -top-5 -right-5 bg-accent rounded-2xl shadow-xl px-5 py-3.5 flex items-center gap-2.5 z-10 hidden md:flex">
              <CheckCircle2 size={20} className="text-typography-dark shrink-0" />
              <span className="font-bold text-typography-dark text-sm">CBSE Affiliated</span>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ══════════════ FACILITIES ══════════════ */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-7xl mx-auto">

          <motion.div className="text-center mb-16 space-y-4">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.25em] text-accent uppercase">Our Campus</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-bold text-typography-dark">
              Everything Your Child Needs to Thrive
            </motion.h2>
            <motion.p variants={fadeUp} className="text-typography-body max-w-xl mx-auto">
              25+ world-class facilities built to fuel curiosity, confidence and character.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
            {FACILITIES.map((f, i) => (
              <motion.div key={i} variants={scaleIn}
                whileHover={{ backgroundColor: '#0d6f3b', transition: { duration: 0.25 } }}
                className="group bg-white p-8 flex flex-col gap-4 cursor-default transition-colors duration-300">
                <motion.div
                  className="w-14 h-14 rounded-xl bg-primary/8 flex items-center justify-center text-primary group-hover:text-white group-hover:bg-white/15 transition-colors duration-300"
                  whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}>
                  {f.icon}
                </motion.div>
                <div>
                  <h3 className="font-bold text-typography-dark text-lg mb-1 group-hover:text-white transition-colors duration-300">{f.name}</h3>
                  <p className="text-sm text-typography-body group-hover:text-white/80 transition-colors duration-300">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="text-center mt-10"
            initial="hidden" whileInView="show" variants={fadeUp} viewport={viewport}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link href="/facilities"
                className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all duration-300">
                View All Facilities <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ══════════════ WHY DPSS ══════════════ */}
      <section className="bg-primary py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-14 space-y-3"
            initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}>
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.25em] text-accent uppercase">Why Choose Us</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-bold text-white">Why DPSS?</motion.h2>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHY_DPSS.map((w, i) => (
              <motion.div key={i} variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center group hover:bg-white/10 transition-colors duration-300">
                <motion.div
                  className="w-16 h-16 rounded-xl bg-accent/15 flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.15, rotate: 5, transition: { type: 'spring', stiffness: 300 } }}>
                  {w.icon}
                </motion.div>
                <h3 className="font-serif font-bold text-white text-2xl mb-3">{w.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ══════════════ STATS ══════════════ */}
      <section className="py-24 px-6 relative overflow-hidden bg-primary">
        {/* Mesh Gradient Overlay */}
        <div className="absolute inset-0 opacity-30 pointer-events-none" 
          style={{ background: 'radial-gradient(circle at 100% 0%, #ffc400 0%, transparent 40%), radial-gradient(circle at 0% 100%, #ffc400 0%, transparent 40%)' }} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10">
            <StatCard end={5} suffix="+" label="Years of Legacy" />
            <StatCard end={25} suffix="+" label="Modern Facilities" />
            <StatCard end={600} suffix="+" label="Happy Alumni" />
            <StatCard end={100} suffix="%" label="Parent Trust" />
          </motion.div>
        </div>
      </section>


      {/* ══════════════ PRINCIPAL ══════════════ */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          <motion.div className="flex flex-col items-center gap-5"
            initial="hidden" whileInView="show" variants={scaleIn} viewport={viewport}>
            <motion.div
              className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-accent shadow-xl"
              whileHover={{ scale: 1.03, boxShadow: '0 20px 60px rgba(13,111,59,0.25)' }}
              transition={{ duration: 0.4 }}>
              <Image src="/images/principal.jpeg" alt="Principal, DPSS" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
            </motion.div>
            <div className="text-center">
              <p className="font-serif font-bold text-typography-dark text-xl">Principal</p>
              <p className="text-typography-body text-sm">Delhi Public Secondary School, Siddipet</p>
            </div>
          </motion.div>

          <motion.div className="space-y-6">
            <motion.p variants={fadeUp} className="text-accent font-serif font-bold text-sm uppercase tracking-[0.3em]">From The Principal's Desk</motion.p>
            <motion.div variants={fadeUp} className="text-8xl text-accent/20 font-serif leading-none select-none -mb-12 transition-transform hover:scale-110">“</motion.div>
            <motion.blockquote variants={fadeUp}
              className="font-serif italic text-2xl md:text-3xl text-typography-dark leading-relaxed -mt-4">
              At DPSS, we believe every child carries an extraordinary potential. Our mission is to create
              an environment where that potential is discovered, nurtured and allowed to flourish —
              academically, creatively and as a human being.
            </motion.blockquote>
            <motion.div variants={fadeUp} className="w-16 h-0.5 bg-accent rounded" />
            <motion.p variants={fadeUp} className="text-typography-body text-sm leading-relaxed">
              We are deeply committed to combining rigorous academic standards with holistic development —
              because tomorrow's leaders need not just knowledge, but wisdom, empathy and purpose.
            </motion.p>
          </motion.div>
        </div>
      </section>


      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section className="bg-[#f9fafb] py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-14 space-y-4">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.25em] text-accent uppercase">Testimonials</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-bold text-typography-dark">What Parents Say</motion.h2>
          </motion.div>

          <motion.div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-3 md:overflow-visible">
            {[
              { name: 'Priya Sharma', cls: 'Mother – Class 5', quote: 'Best decision for my child. The teachers genuinely care and the holistic focus is phenomenal. We couldn\'t be happier.' },
              { name: 'Rajesh Kumar', cls: 'Father – Class 8', quote: 'Excellent infrastructure and sports facilities. I am truly a proud parent. The lush green campus creates a perfect learning environment.' },
              { name: 'Anita Desai', cls: 'Mother – Class 3', quote: 'The new computer lab is amazing. My son loves coding and looks forward to school every single morning — that says it all.' },
            ].map(({ name, cls, quote }, i) => (
              <motion.div key={i} variants={fadeUp}
                whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.1)', transition: { duration: 0.3 } }}
                className="snap-center shrink-0 w-[85vw] md:w-auto bg-white rounded-2xl shadow-md p-8 flex flex-col gap-5">
                <div className="flex gap-0.5">
                  {Array(5).fill(0).map((_, s) => (
                    <motion.svg key={s} className="w-5 h-5 text-accent fill-accent" viewBox="0 0 20 20"
                      initial={{ opacity: 1, scale: 1 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * s, type: 'spring' }}
                      viewport={{ once: true }}>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>
                <p className="text-typography-body text-base leading-relaxed flex-grow">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                    {name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-typography-dark text-sm">{name}</p>
                    <p className="text-xs text-typography-body">{cls}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Wave divider */}
      <div className="w-full overflow-hidden -mb-px bg-[#f9fafb]">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12 md:h-16">
          <path d="M0,60 L0,30 C360,60 1080,0 1440,30 L1440,60 Z" fill="#0d6f3b" />
        </svg>
      </div>


      {/* ══════════════ CTA ══════════════ */}
      <section className="bg-primary py-24 px-6 text-center">
        <motion.div className="max-w-3xl mx-auto space-y-8"
          initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}>

          <motion.h2 variants={fadeUp} className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight">
            Your Child's Future Starts Here
          </motion.h2>
          <motion.p variants={fadeUp} className="text-accent font-semibold text-lg tracking-wide">
            Limited seats for 2026-27 &bull; Apply before they fill up
          </motion.p>
          <motion.p variants={fadeUp} className="text-white/60 text-sm">⚡ 47 seats remaining — Hurry!</motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
            <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.96 }}>
              <Link href="/admissions"
                className="block w-full sm:w-auto px-10 py-5 bg-accent text-typography-dark rounded-2xl font-bold text-lg shadow-2xl hover:bg-yellow-300 transition-colors">
                Apply For Admission
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.96 }}>
              <a href="tel:+917660999981"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-5 border-2 border-white/50 text-white rounded-2xl font-bold text-lg hover:bg-white hover:text-primary transition-all">
                <Phone size={20} /> Call Us Now
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
