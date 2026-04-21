"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { X, Menu, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { schoolInfo } from '@/lib/constants';

const navLinks = [
  { name: 'Home', path: '/' },
  { 
    name: 'About', 
    path: '/about',
    subLinks: [
      { name: 'About Us', path: '/about' },
      { name: 'Student Life', path: '/student-life' }
    ]
  },
  { 
    name: 'Academics', 
    path: '/academics',
    subLinks: [
      { name: 'Overview', path: '/academics' },
      { name: 'Facilities', path: '/facilities' },
      { name: 'Achievements', path: '/academics/achievements' }
    ]
  },
  { name: 'Admissions', path: '/admissions' },
  { name: 'Scholarship', path: '/scholarship' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsDrawerOpen(false); }, [pathname]);

  const transparent = isHome && !isScrolled;

  return (
    <>
      {/* Main Navbar */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          transparent 
            ? 'bg-transparent py-5' 
            : 'bg-white/90 backdrop-blur-md shadow-xl py-3 border-b border-gray-100'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">

          {/* Logo + Name */}
          <Link href="/" className="group flex items-center gap-3 flex-shrink-0">
            <div className="relative w-12 h-12 md:w-14 md:h-14 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/images/logo.png"
                alt="DPSS"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-serif text-lg md:text-xl font-black leading-tight tracking-tight transition-colors duration-300 ${
                transparent ? 'text-white' : 'text-primary'
              }`} style={{ textShadow: transparent ? '0 2px 4px rgba(0,0,0,0.3)' : 'none' }}>
                DELHI PUBLIC
              </span>
              <span className={`font-sans text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
                transparent ? 'text-accent' : 'text-typography-body'
              }`}>
                SECONDARY SCHOOL
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-5">
            {navLinks.map((link, i) => {
              const active = pathname === link.path || (link.subLinks && link.subLinks.some(s => pathname === s.path));
              return (
                <motion.div key={link.name}
                  className="relative group py-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}>
                  <Link href={link.path}
                    className={`relative text-sm font-semibold tracking-wide inline-flex items-center gap-1.5 transition-colors duration-200 ${
                      transparent ? 'text-white hover:text-accent' : 'text-typography-dark hover:text-primary'
                    } ${active ? '!text-accent' : ''}`}
                  >
                    {link.name}
                    {link.subLinks && (
                      <svg className="w-3.5 h-3.5 opacity-80 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </Link>

                  {/* Dropdown Menu */}
                  {link.subLinks && (
                    <div className="absolute top-[85%] left-0 w-48 bg-white shadow-xl rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden z-50">
                      <div className="py-2">
                        {link.subLinks.map(subLink => (
                          <Link key={subLink.name} href={subLink.path} 
                            className={`block px-5 py-3 text-sm font-medium transition-colors ${
                              pathname === subLink.path ? 'text-primary bg-emerald-50' : 'text-typography-dark hover:text-primary hover:bg-gray-50'
                            }`}>
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </nav>

          {/* Right Side */}
          <div className="hidden xl:flex items-center gap-5">
            <a href={`tel:${schoolInfo.phone}`}
              className={`flex items-center gap-1.5 text-xs font-medium tracking-wide transition-colors ${transparent ? 'text-white/80 hover:text-white' : 'text-typography-body hover:text-primary'}`}>
              <Phone size={13} />
              {schoolInfo.phone}
            </a>
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
              <Link href="/admissions"
                onClick={() => {
                  if (typeof window !== "undefined" && window.gtag) {
                    window.gtag("event", "apply_now_click", {
                      event_category: "engagement",
                      event_label: "Apply Now Button",
                    });
                  }
                }}
                className="px-6 py-2.5 bg-accent text-typography-dark rounded-lg font-bold text-sm hover:bg-yellow-300 transition-colors shadow-sm">
                Apply Now
              </Link>
            </motion.div>
          </div>

          {/* Mobile Hamburger */}
          <motion.button
            onClick={() => setIsDrawerOpen(true)}
            whileTap={{ scale: 0.9 }}
            className={`xl:hidden p-2 rounded-md transition-colors ${transparent ? 'text-white hover:bg-white/10' : 'text-typography-dark hover:bg-gray-100'}`}>
            <Menu size={26} />
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Drawer Backdrop */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 z-50 xl:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-[60] shadow-2xl flex flex-col xl:hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="relative w-[130px] h-[44px]">
                <Image src="/images/logo.png" alt="DPSS" fill style={{ objectFit: 'contain', objectPosition: 'left' }} />
              </div>
              <motion.button onClick={() => setIsDrawerOpen(false)}
                whileTap={{ rotate: 90, scale: 0.9 }}
                className="p-2 rounded-full hover:bg-gray-100 text-typography-dark transition-colors">
                <X size={22} />
              </motion.button>
            </div>
            <nav className="flex flex-col px-6 py-4 gap-1 flex-grow overflow-y-auto">
              {navLinks.map((link, i) => {
                const active = pathname === link.path || (link.subLinks && link.subLinks.some(s => pathname === s.path));
                return (
                  <motion.div key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}>
                    <Link href={link.path}
                      className={`block py-4 border-b border-gray-50 text-base font-semibold transition-colors ${active ? 'text-primary' : 'text-typography-dark hover:text-primary'}`}>
                      {link.name}
                    </Link>
                    {link.subLinks && (
                      <div className="flex flex-col pl-4 border-b border-gray-50 pb-2">
                        {link.subLinks.map(subLink => (
                          <Link key={subLink.name} href={subLink.path}
                            className={`py-3 text-sm font-medium transition-colors ${pathname === subLink.path ? 'text-accent' : 'text-gray-500 hover:text-primary'}`}>
                            › {subLink.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </nav>
            <div className="p-6 border-t border-gray-100 space-y-4">
              <div className="flex items-center justify-center">
                <a href={`tel:${schoolInfo.phone}`} className="flex items-center gap-2 text-sm text-typography-dark font-medium">
                  <Phone size={16} className="text-primary shrink-0" /> {schoolInfo.phone}
                </a>
              </div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="/admissions"
                  onClick={() => {
                    if (typeof window !== "undefined" && window.gtag) {
                      window.gtag("event", "apply_now_click", {
                        event_category: "engagement",
                        event_label: "Apply Now Button",
                      });
                    }
                  }}
                  className="flex items-center justify-center w-full py-4 bg-accent text-typography-dark rounded-xl font-bold text-base hover:bg-yellow-300 transition-colors shadow-md">
                  Apply Now 2026-27
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
