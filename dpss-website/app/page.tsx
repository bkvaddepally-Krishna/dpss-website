"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import {
  ChevronLeft, ChevronRight, ChevronDown,
  GraduationCap, Trophy, ShieldCheck,
  BookOpen, FlaskConical, Library, Wifi, Bus, Droplets,
  Music2, Dumbbell, Phone, ArrowRight, CheckCircle2,
  Star, Users, Award, Zap, MapPin, Clock,
} from 'lucide-react';
import {
  fadeUp, fadeLeft, fadeRight, fadeIn, scaleIn,
  staggerContainer, staggerFast, viewport,
  bentoCard, bentoContainer,
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

// ─── Tilt Card ────────────────────────────────────────────────────
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────
const SLIDES = [
  { id: 1, src: '/images/slider1.jpg', alt: 'DPSS Campus Morning', label: 'A Campus Like No Other' },
  { id: 2, src: '/images/slider2.jpg', alt: 'DPSS Students', label: 'Shaping Future Leaders' },
  { id: 3, src: '/images/slider3.jpg', alt: 'DPSS Events', label: 'Beyond The Classroom' },
];

const FACILITIES = [
  { name: 'Smart Classrooms', desc: 'AI-powered interactive learning boards', icon: <Wifi size={28} />, color: 'from-blue-500/20 to-blue-600/10' },
  { name: 'Science Labs', desc: 'Fully equipped with modern apparatus', icon: <FlaskConical size={28} />, color: 'from-purple-500/20 to-purple-600/10' },
  { name: 'Rich Library', desc: '5,000+ books, e-resources & reading zones', icon: <Library size={28} />, color: 'from-amber-500/20 to-amber-600/10' },
  { name: 'CBSE Curriculum', desc: 'Nationally recognised, future-aligned syllabus', icon: <BookOpen size={28} />, color: 'from-green-500/20 to-green-600/10' },
  { name: 'GPS Transport', desc: 'Safe, tracked fleet covering all routes', icon: <Bus size={28} />, color: 'from-sky-500/20 to-sky-600/10' },
  { name: 'RO Water & Infirmary', desc: 'Pure water & on-campus medical care', icon: <Droplets size={28} />, color: 'from-cyan-500/20 to-cyan-600/10' },
  { name: 'Music & Dance Studio', desc: 'Professional-grade arts practice facilities', icon: <Music2 size={28} />, color: 'from-rose-500/20 to-rose-600/10' },
  { name: 'Sports & Fitness', desc: 'Courts, pool, yoga pavilion & gym', icon: <Dumbbell size={28} />, color: 'from-orange-500/20 to-orange-600/10' },
  { name: '24×7 Security', desc: 'Trained staff, CCTV and secure access', icon: <ShieldCheck size={28} />, color: 'from-emerald-500/20 to-emerald-600/10' },
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

// ─── Bento Data ───────────────────────────────────────────────────
const BENTO_ITEMS = [
  {
    id: 'excellence',
    colSpan: 'lg:col-span-2',
    rowSpan: 'lg:row-span-2',
    bg: 'bg-primary',
    content: (
      <div className="h-full flex flex-col justify-between p-8 min-h-[280px]">
        <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mb-6">
          <GraduationCap size={32} className="text-accent" />
        </div>
        <div>
          <p className="text-accent font-bold text-xs tracking-widest uppercase mb-3">Academic</p>
          <h3 className="font-serif text-3xl font-bold text-white leading-tight mb-4">
            Top-Ranked<br />CBSE School
          </h3>
          <p className="text-white/65 text-sm leading-relaxed">
            Consistently achieving outstanding board results with a dedicated team of 30+ experienced educators.
          </p>
        </div>
        <div className="flex gap-3 mt-6">
          <span className="px-3 py-1.5 bg-white/10 rounded-full text-white/80 text-xs font-semibold">CBSE Affiliated</span>
          <span className="px-3 py-1.5 bg-accent/20 rounded-full text-accent text-xs font-semibold">Est. 2022</span>
        </div>
      </div>
    ),
  },
  {
    id: 'students',
    colSpan: 'lg:col-span-1',
    rowSpan: 'lg:row-span-1',
    bg: 'bg-accent',
    content: (
      <div className="h-full flex flex-col justify-between p-7 min-h-[130px]">
        <Users size={28} className="text-typography-dark" />
        <div>
          <p className="font-serif text-4xl font-black text-typography-dark">600+</p>
          <p className="text-typography-dark/70 font-semibold text-sm mt-1">Happy Alumni</p>
        </div>
      </div>
    ),
  },
  {
    id: 'facilities',
    colSpan: 'lg:col-span-1',
    rowSpan: 'lg:row-span-1',
    bg: 'bg-white border border-gray-100',
    content: (
      <div className="h-full flex flex-col justify-between p-7 min-h-[130px]">
        <Zap size={28} className="text-primary" />
        <div>
          <p className="font-serif text-4xl font-black text-typography-dark">25+</p>
          <p className="text-typography-body font-semibold text-sm mt-1">World-Class Facilities</p>
        </div>
      </div>
    ),
  },
  {
    id: 'holistic',
    colSpan: 'lg:col-span-1',
    rowSpan: 'lg:row-span-2',
    bg: 'bg-[#0f172a]',
    content: (
      <div className="h-full flex flex-col justify-between p-7 min-h-[280px]">
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
          <Trophy size={26} className="text-accent" />
        </div>
        <div>
          <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-3">Beyond Books</p>
          <h3 className="font-serif text-2xl font-bold text-white leading-snug mb-3">
            Sports · Arts · Music · Yoga
          </h3>
          <p className="text-white/55 text-sm leading-relaxed">
            A full ecosystem for every child's unique talent to bloom.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {['Cricket', 'Dance', 'Robotics', 'Chess'].map(t => (
            <span key={t} className="px-2.5 py-1 bg-white/8 border border-white/10 rounded-full text-white/70 text-xs font-medium">{t}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'location',
    colSpan: 'lg:col-span-1',
    rowSpan: 'lg:row-span-1',
    bg: 'bg-primary/8 border border-primary/15',
    content: (
      <div className="h-full flex flex-col justify-between p-7 min-h-[130px]">
        <MapPin size={28} className="text-primary" />
        <div>
          <p className="font-bold text-typography-dark text-base">Siddipet, Telangana</p>
          <p className="text-typography-body text-sm mt-1">Easily accessible from all areas</p>
        </div>
      </div>
    ),
  },
  {
    id: 'admissions',
    colSpan: 'lg:col-span-2',
    rowSpan: 'lg:row-span-1',
    bg: 'bg-gradient-to-r from-accent to-yellow-300',
    content: (
      <div className="h-full flex items-center justify-between p-7 min-h-[130px]">
        <div>
          <p className="font-serif text-xl font-bold text-typography-dark">Admissions Open</p>
          <p className="text-typography-dark/70 text-sm font-semibold mt-1">2026–27 · Limited Seats</p>
        </div>
        <Link href="/admissions"
          className="flex items-center gap-2 px-6 py-3 bg-typography-dark text-white rounded-xl font-bold text-sm hover:bg-primary transition-colors duration-300 shrink-0">
          Apply Now <ArrowRight size={16} />
        </Link>
      </div>
    ),
  },
];

// ─── Home Page ────────────────────────────────────────────────────
export default function Home() {
  const [slide, setSlide] = useState(0);
  const total = SLIDES.length;

  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 160]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setSlide(p => (p + 1) % total), 5500);
    return () => clearInterval(t);
  }, [total]);

  const prev = () => setSlide(p => (p === 0 ? total - 1 : p - 1));
  const next = () => setSlide(p => (p + 1) % total);

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >

      {/* ══════════════ HERO ══════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[640px] w-full overflow-hidden bg-black">

        {/* Parallax image layer */}
        <motion.div className="absolute inset-0 scale-110" style={{ y: heroY }}>
          <AnimatePresence mode="sync">
            {SLIDES.map((s, i) => (
              i === slide && (
                <motion.div key={s.id} className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.3, ease: 'easeInOut' }}>
                  <Image src={s.src} alt={s.alt} fill priority={i === 0} quality={90}
                    style={{ objectFit: 'cover', objectPosition: 'center' }} />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Layered gradient for premium look */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

        {/* Hero Content */}
        <motion.div className="absolute inset-0 z-20 flex items-center" style={{ opacity: heroOpacity }}>
          <div className="max-w-7xl mx-auto px-6 w-full mt-24 md:mt-20 lg:mt-16">
            <motion.div
              className="max-w-2xl"
              initial="hidden"
              animate="show"
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="flex gap-5 items-start mb-6">
                <motion.div className="w-1.5 bg-accent rounded-full flex-shrink-0 mt-1 shadow-[0_0_20px_rgba(255,196,0,0.6)]"
                  initial={{ height: 0 }}
                  animate={{ height: 110 }}
                  transition={{ duration: 0.9, delay: 0.6, ease: 'easeOut' }} />
                <h1 className="font-serif text-5xl md:text-8xl font-black text-white leading-[1.05] tracking-tight">
                  Admissions Open <br />
                  <motion.span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-300 to-accent"
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    2026–27
                  </motion.span>
                </h1>
              </motion.div>

              <motion.p variants={fadeUp}
                className="text-white/80 font-medium text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                CBSE School in Siddipet focused on academic excellence, discipline, and all-round development. <br className="hidden md:block" />
                <span className="text-accent/90 font-bold">Limited seats available for the upcoming academic year.</span>
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-10">
                <motion.div whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <Link href="/admissions"
                    className="block px-8 py-4 bg-accent text-typography-dark rounded-xl font-bold text-base shadow-[0_10px_40px_rgba(255,196,0,0.4)] hover:bg-yellow-300 transition-colors text-center">
                    Apply Now
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <Link href="/#explore-campus"
                    className="block px-8 py-4 border-2 border-white/60 text-white rounded-xl font-semibold text-base hover:bg-white hover:text-typography-dark transition-all text-center backdrop-blur-sm">
                    Explore Campus
                  </Link>
                </motion.div>
              </motion.div>

              {/* Trust Micro-signals */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-8 mt-auto">
                {[
                  { label: "CBSE Affiliated", icon: <CheckCircle2 size={16} className="text-accent" /> },
                  { label: "600+ Students", icon: <Users size={16} className="text-accent" /> },
                  { label: "Experienced Faculty", icon: <GraduationCap size={16} className="text-accent" /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-white/60 text-xs font-bold uppercase tracking-[0.15em]">
                    <span className="shrink-0">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Slide label */}
        <AnimatePresence mode="wait">
          <motion.div key={slide}
            className="absolute top-8 right-8 z-20 hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}>
            <p className="text-white/50 text-sm font-semibold tracking-wider">{SLIDES[slide].label}</p>
          </motion.div>
        </AnimatePresence>

        {/* Slide counter + dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
          <motion.span key={slide} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="text-accent font-bold text-sm tracking-widest tabular-nums">
            {String(slide + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </motion.span>
          <div className="flex gap-2">
            {SLIDES.map((_, i) => (
              <motion.button key={i} onClick={() => setSlide(i)}
                className="h-0.5 rounded-full cursor-pointer"
                animate={{ width: i === slide ? 48 : 24, background: i === slide ? '#ffc400' : 'rgba(255,255,255,0.35)' }}
                transition={{ duration: 0.4 }} />
            ))}
          </div>
        </div>

        {/* Arrow nav */}
        <motion.button onClick={prev}
          whileHover={{ scale: 1.1, x: -3 }} whileTap={{ scale: 0.9 }}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-20 text-white/60 hover:text-white transition-colors hidden md:flex w-12 h-12 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/15">
          <ChevronLeft size={24} strokeWidth={2} />
        </motion.button>
        <motion.button onClick={next}
          whileHover={{ scale: 1.1, x: 3 }} whileTap={{ scale: 0.9 }}
          className="absolute right-5 top-1/2 -translate-y-1/2 z-20 text-white/60 hover:text-white transition-colors hidden md:flex w-12 h-12 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/15">
          <ChevronRight size={24} strokeWidth={2} />
        </motion.button>

        {/* Scroll cue */}
        <motion.div className="absolute bottom-8 right-8 z-20 hidden lg:flex flex-col items-center gap-2 text-white/40 text-xs tracking-widest uppercase"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 0.8 }}>
          <span>Scroll</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}>
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </section>


      {/* ══════════════ BENTO GRID ══════════════ */}
      <section className="bg-[#f8faf9] py-24 px-6">
        <div className="max-w-7xl mx-auto">

          <motion.div className="text-center mb-14 space-y-4"
            initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}>
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.25em] text-accent uppercase">Who We Are</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-6xl font-bold text-typography-dark">
              Everything, In One Place
            </motion.h2>
            <motion.p variants={fadeUp} className="text-typography-body max-w-lg mx-auto text-lg">
              A school that gives every child the academic rigour, safety, and joy they deserve.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr"
            initial="hidden"
            whileInView="show"
            variants={bentoContainer}
            viewport={viewport}
          >
            {BENTO_ITEMS.map((item) => (
              <motion.div
                key={item.id}
                variants={bentoCard}
                whileHover={{ y: -6, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                className={`${item.colSpan} ${item.rowSpan} ${item.bg} rounded-2xl overflow-hidden cursor-default shadow-sm hover:shadow-xl transition-shadow duration-400`}
              >
                {item.content}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ══════════════ SCHOLARSHIP HIGHLIGHT ══════════════ */}
      <section className="bg-primary py-20 px-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          <div className="max-w-2xl text-center lg:text-left">
            <motion.span 
              initial="hidden" whileInView="show" variants={fadeUp} viewport={viewport}
              className="inline-block px-4 py-1.5 bg-accent/20 text-accent font-bold text-xs tracking-widest uppercase rounded-full mb-6 border border-accent/30"
            >
              Admissions Open 2026
            </motion.span>
            <motion.h2 
              initial="hidden" whileInView="show" variants={fadeUp} viewport={viewport}
              className="font-serif text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Merit Scholarship Test 2026
            </motion.h2>
            <motion.p 
              initial="hidden" whileInView="show" variants={fadeUp} viewport={viewport}
              className="text-white/80 text-lg font-medium leading-relaxed"
            >
              Secure up to 100% scholarship for meritorious students. <br className="hidden md:block" /> Limited seats available for the upcoming session.
            </motion.p>
          </div>
          
          <motion.div 
            initial="hidden" whileInView="show" variants={fadeUp} viewport={viewport}
            className="flex flex-col sm:flex-row gap-4 shrink-0"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/scholarship"
                className="block px-8 py-4 bg-accent text-typography-dark rounded-xl font-bold text-base hover:bg-yellow-300 transition-all shadow-lg text-center"
              >
                Register Now
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/scholarship"
                className="block px-8 py-4 border-2 border-white/30 text-white rounded-xl font-bold text-base hover:bg-white/10 transition-all text-center"
              >
                Get Hall Ticket
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ══════════════ WELCOME ══════════════ */}
      <section className="bg-white py-28 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">

          {/* Left */}
          <motion.div className="lg:col-span-3 space-y-8"
            initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}>

            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.25em] text-accent uppercase">
              Est. 2022 &bull; Siddipet, Telangana
            </motion.p>

            <motion.h2 variants={fadeUp} className="font-serif text-5xl md:text-7xl font-bold text-typography-dark leading-tight">
              Where{' '}
              <em className="text-primary not-italic italic font-serif">Excellence</em>{' '}
              <span className="text-accent underline decoration-accent/30 underline-offset-8">Begins</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-typography-body text-lg leading-[1.9] max-w-xl">
              Established in 2022, DPSS has quickly become more than just a school — a living, breathing
              community where curiosity is rewarded, character is shaped, and every child is
              empowered to dream bigger.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-bold text-typography-dark">
              {['3+ Years', '600+ Alumni', '25+ Facilities'].map((s, i, arr) => (
                <React.Fragment key={s}>
                  <motion.span
                    className="hover:text-primary transition-colors cursor-default"
                    whileHover={{ scale: 1.05 }}
                  >{s}</motion.span>
                  {i < arr.length - 1 && <span className="text-accent text-xl">|</span>}
                </React.Fragment>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/about"
                  className="block px-7 py-3.5 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all duration-300 text-center">
                  Our Story
                </Link>
              </motion.div>
               <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link href="/facilities"
                  className="block px-7 py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-all duration-300 shadow-lg text-center">
                  View Facilities
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right image with tilt */}
          <motion.div className="lg:col-span-2 relative"
            initial="hidden" whileInView="show" variants={fadeRight} viewport={viewport}>
            <TiltCard className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4]">
              <Image src="/images/school.png" alt="DPSS School Building" fill
                style={{ objectFit: 'cover' }}
                className="hover:scale-105 transition-transform duration-700" />
              {/* Gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
            </TiltCard>

            {/* Floating badge: 5+ Years */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl px-6 py-4 flex items-center gap-3 border border-gray-100 z-10 hidden md:flex">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg shrink-0">3+</div>
              <div>
                <div className="text-xs text-typography-body">Years of</div>
                <div className="font-bold text-typography-dark">Excellence</div>
              </div>
            </motion.div>

            {/* Floating badge: CBSE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.65, type: 'spring', stiffness: 200 }}
              viewport={{ once: true }}
              className="absolute -top-5 -right-5 bg-accent rounded-2xl shadow-xl px-5 py-3.5 flex items-center gap-2.5 z-10 hidden md:flex">
              <CheckCircle2 size={20} className="text-typography-dark shrink-0" />
              <span className="font-bold text-typography-dark text-sm">CBSE Affiliated</span>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ══════════════ FACILITIES ══════════════ */}
      <section className="bg-[#f8faf9] py-28 px-6">
        <div className="max-w-7xl mx-auto">

          <motion.div className="text-center mb-16 space-y-4"
            initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}>
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.25em] text-accent uppercase">Our Campus</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-bold text-typography-dark">
              Everything Your Child Needs to Thrive
            </motion.h2>
            <motion.p variants={fadeUp} className="text-typography-body max-w-xl mx-auto">
              25+ world-class facilities built to fuel curiosity, confidence and character.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}>
            {FACILITIES.map((f, i) => (
              <motion.div key={i} variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                className="group bg-white rounded-2xl p-8 flex flex-col gap-4 cursor-default shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-50 overflow-hidden relative">
                {/* Subtle background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <motion.div
                  className="relative w-14 h-14 rounded-xl bg-primary/8 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-400"
                  whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}>
                  {f.icon}
                </motion.div>
                <div className="relative">
                  <h3 className="font-bold text-typography-dark text-lg mb-1 group-hover:text-primary transition-colors duration-300">{f.name}</h3>
                  <p className="text-sm text-typography-body">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="text-center mt-12"
            initial="hidden" whileInView="show" variants={fadeUp} viewport={viewport}>
           <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link href="/facilities"
                className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all duration-300">
                View All Facilities <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ══════════════ EXPLORE CAMPUS ══════════════ */}
      <section id="explore-campus" className="bg-white py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16 space-y-4"
            initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}
          >
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.25em] text-accent uppercase">Life at DPSS</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-bold text-typography-dark">
              Explore Our Campus
            </motion.h2>
            <motion.p variants={fadeUp} className="text-typography-body max-w-2xl mx-auto text-lg font-medium">
              Take a closer look at our classrooms, labs, and the vibrant life of our students.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}
          >
            {[
              { src: '/images/slider1.jpg', alt: 'Classrooms' },
              { src: '/images/slider2.jpg', alt: 'Laboratories' },
              { src: '/images/slider3.jpg', alt: 'Activities' },
            ].map((img, i) => (
              <motion.div 
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl group border-4 border-white"
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 text-white font-bold text-lg translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {img.alt}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center"
            initial="hidden" whileInView="show" variants={fadeUp} viewport={viewport}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link href="/gallery"
                className="flex items-center gap-2 px-10 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-all shadow-lg"
              >
                View Full Gallery
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ══════════════ WHY DPSS ══════════════ */}
      <section className="bg-primary py-24 px-6 overflow-hidden relative">
        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent/10 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div className="text-center mb-14 space-y-3"
            initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}>
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.25em] text-accent uppercase">Why Choose Us</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-bold text-white">Why DPSS?</motion.h2>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}>
            {WHY_DPSS.map((w, i) => (
              <motion.div key={i} variants={fadeUp}
                whileHover={{ y: -10, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center group hover:bg-white/12 transition-colors duration-300 cursor-default">
                <motion.div
                  className="w-16 h-16 rounded-xl bg-accent/15 flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.2, rotate: 8, transition: { type: 'spring', stiffness: 300 } }}>
                  {w.icon}
                </motion.div>
                <h3 className="font-serif font-bold text-white text-2xl mb-3">{w.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ══════════════ RESULTS & ACHIEVEMENTS ══════════════ */}
      <section className="bg-white py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16 space-y-4"
            initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}
          >
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.25em] text-primary uppercase">Academic Excellence</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-bold text-typography-dark">
              Proven Academic Excellence
            </motion.h2>
            <motion.p variants={fadeUp} className="text-typography-body max-w-2xl mx-auto text-lg font-medium">
              Our students consistently achieve strong academic results and overall development.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}
          >
            {[
              { 
                title: "100% Pass Rate", 
                desc: "All students successfully passed CBSE examinations with flying colors.", 
                icon: <CheckCircle2 className="text-green-600" size={32} />
              },
              { 
                title: "Top Performers", 
                desc: "Many students scoring above 90% across all core subjects and disciplines.", 
                icon: <Star className="text-yellow-500" size={32} />
              },
              { 
                title: "Olympiad Winners", 
                desc: "Consistent winners in various district and state-level competitions.", 
                icon: <Trophy className="text-accent" size={32} />
              },
              { 
                title: "Holistic Success", 
                desc: "Recognized excellence in sports, arts, and creative extracurriculars.", 
                icon: <Award className="text-primary" size={32} />
              },
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                className="bg-surface-soft p-8 rounded-3xl border border-gray-100 transition-all text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm">
                    {item.icon}
                  </div>
                </div>
                <h3 className="font-bold text-typography-dark text-xl mb-3">{item.title}</h3>
                <p className="text-typography-body text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-14"
            initial="hidden" whileInView="show" variants={fadeUp} viewport={viewport}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link href="/academics"
                className="flex items-center gap-2 px-8 py-3.5 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all shadow-md"
              >
                View Detailed Results <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ══════════════ STATS ══════════════ */}
      <section className="py-24 px-6 relative overflow-hidden bg-primary border-t border-white/10">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 100% 0%, rgba(255,196,0,0.15) 0%, transparent 40%), radial-gradient(circle at 0% 100%, rgba(255,196,0,0.15) 0%, transparent 40%)' }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10"
            initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}>
            <StatCard end={3} suffix="+" label="Years of Legacy" />
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
            <TiltCard>
              <motion.div
                className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-accent shadow-xl cursor-pointer"
                whileHover={{ boxShadow: '0 25px 60px rgba(13,111,59,0.3)' }}
                transition={{ duration: 0.4 }}>
                <Image src="/images/principal.jpeg" alt="Principal, DPSS" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
              </motion.div>
            </TiltCard>
            <div className="text-center">
              <p className="font-serif font-bold text-typography-dark text-xl">Principal</p>
              <p className="text-typography-body text-sm">Delhi Public Secondary School, Siddipet</p>
            </div>
          </motion.div>

          <motion.div className="space-y-6"
            initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}>
            <motion.p variants={fadeUp} className="text-accent font-serif font-bold text-sm uppercase tracking-[0.3em]">From The Principal's Desk</motion.p>
            <motion.div variants={fadeUp} className="text-8xl text-accent/20 font-serif leading-none select-none -mb-12 hover:text-accent/30 transition-colors duration-500 cursor-default">"</motion.div>
            <motion.blockquote variants={fadeUp}
              className="font-serif italic text-2xl md:text-3xl text-typography-dark leading-relaxed -mt-4">
              At DPSS, we believe every child carries an extraordinary potential. Our mission is to create
              an environment where that potential is discovered, nurtured and allowed to flourish —
              academically, creatively and as a human being.
            </motion.blockquote>
            <motion.div variants={fadeUp}>
              <motion.div
                className="w-16 h-0.5 bg-accent rounded"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </motion.div>
            <motion.p variants={fadeUp} className="text-typography-body text-sm leading-relaxed">
              We are deeply committed to combining rigorous academic standards with holistic development —
              because tomorrow's leaders need not just knowledge, but wisdom, empathy and purpose.
            </motion.p>
          </motion.div>
        </div>
      </section>


       {/* ══════════════ ADMISSION PROCESS ══════════════ */}
      <section className="bg-white py-24 px-6 border-t border-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16 space-y-4"
            initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-typography-dark">
              Simple Admission Process
            </h2>
            <p className="text-typography-body max-w-lg mx-auto">
              Our streamlined process ensures a smooth transition for your child.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { 
                step: "01", 
                title: "Apply Online", 
                desc: "Fill the admission form with basic student details on our digital portal." 
              },
              { 
                step: "02", 
                title: "Interaction", 
                desc: "Student interaction and basic assessment to understand their academic needs." 
              },
              { 
                step: "03", 
                title: "Confirmation", 
                desc: "Receive admission confirmation and complete the enrollment process." 
              }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial="hidden" whileInView="show" variants={fadeUp} viewport={viewport}
                className="relative p-8 rounded-3xl bg-surface-soft border border-gray-100 group hover:border-primary/20 transition-all"
              >
                <div className="text-5xl font-serif font-black text-primary/10 mb-6 group-hover:text-primary/20 transition-colors">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-typography-dark mb-4">{step.title}</h3>
                <p className="text-typography-body text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center"
            initial="hidden" whileInView="show" variants={fadeUp} viewport={viewport}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link href="/admissions"
                className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-all shadow-lg"
              >
                Apply Now For 2026-27
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section className="bg-[#f9fafb] py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-14 space-y-4"
            initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}>
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.25em] text-accent uppercase">Testimonials</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-bold text-typography-dark">What Parents Say</motion.h2>
          </motion.div>

          <motion.div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-3 md:overflow-visible"
            initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}>
            {[
              { name: 'Parent of Grade 5 Student, Siddipet', cls: 'Class 5', quote: 'Choosing DPSS was the best decision for our daughter. The teachers are very supportive and my child has improved a lot in both studies and confidence.' },
              { name: 'Parent of Grade 8 Student, Siddipet', cls: 'Class 8', quote: 'The infrastructure and sports facilities are excellent. My son is always excited about school, especially the green campus and science labs.' },
              { name: 'Parent of Grade 3 Student, Siddipet', cls: 'Class 3', quote: 'I am impressed by the personal attention each child receives. The combination of academics and activities like coding has helped my child stay engaged and happy.' },
            ].map(({ name, cls, quote }, i) => (
              <motion.div key={i} variants={fadeUp}
                whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0,0,0,0.12)', transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                className="snap-center shrink-0 w-[85vw] md:w-auto bg-white rounded-2xl shadow-sm p-8 flex flex-col gap-5 border border-gray-50 cursor-default">
                <div className="flex gap-0.5">
                  {Array(5).fill(0).map((_, s) => (
                    <motion.svg key={s} className="w-5 h-5 text-accent fill-accent" viewBox="0 0 20 20"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.08 * s, type: 'spring', stiffness: 400 }}
                      viewport={{ once: true }}>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>
                <p className="text-typography-body text-base leading-relaxed flex-grow">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0"
                    whileHover={{ scale: 1.1, backgroundColor: '#0d6f3b', color: '#fff' }}
                    transition={{ duration: 0.2 }}>
                    {name[0]}
                  </motion.div>
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
      <section className="bg-primary py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(255,196,0,0.12) 0%, transparent 60%)' }} />

        <motion.div className="max-w-3xl mx-auto space-y-8 relative z-10"
          initial="hidden" whileInView="show" variants={staggerContainer} viewport={viewport}>

          <motion.h2 variants={fadeUp} className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight">
            Your Child's Future Starts Here
          </motion.h2>
          <motion.p variants={fadeUp} className="text-accent font-semibold text-lg tracking-wide">
            Limited seats for 2026-27 &bull; Apply before they fill up
          </motion.p>
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 text-white/50 text-sm">
            <motion.div
              className="w-2 h-2 rounded-full bg-accent"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            />
            <span>47 seats remaining — Hurry!</span>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
            <motion.div whileHover={{ scale: 1.08, y: -3 }} whileTap={{ scale: 0.96 }} transition={{ type: 'spring', stiffness: 400 }}>
              <Link href="/admissions"
                className="block w-full sm:w-auto px-10 py-5 bg-accent text-typography-dark rounded-2xl font-bold text-lg shadow-[0_15px_50px_rgba(255,196,0,0.4)] hover:bg-yellow-300 transition-colors">
                Apply For Admission
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.08, y: -3 }} whileTap={{ scale: 0.96 }} transition={{ type: 'spring', stiffness: 400 }}>
              <a href="tel:+917660999981"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-5 border-2 border-white/50 text-white rounded-2xl font-bold text-lg hover:bg-white hover:text-primary transition-all backdrop-blur-sm">
                <Phone size={20} /> Call Us Now
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

    </motion.div>
  );
}
