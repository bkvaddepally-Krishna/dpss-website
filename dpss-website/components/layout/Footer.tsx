"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { schoolInfo } from '@/lib/constants';
import { MapPin, Phone, Mail } from 'lucide-react';

// Social icons as inline SVGs so there's no lucide brand icon dependency issue
const SocialLinks = () => (
  <div className="flex gap-3 mt-4">
    {[
      { label: 'Facebook', path: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' },
      { label: 'Instagram', path: 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z' },
      { label: 'YouTube', path: 'M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 01-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 01-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 011.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z' },
    ].map(({ label, path }) => (
      <a key={label} href="#" aria-label={label}
        className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-accent hover:border-accent hover:text-typography-dark transition-all duration-200">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d={path} clipRule="evenodd" />
        </svg>
      </a>
    ))}
  </div>
);

export default function Footer() {
  return (
    <>
      {/* Gold top border */}
      <div className="h-1 bg-accent w-full" />

      <footer className="bg-primary text-white">
        {/* Newsletter Bar */}
        <div className="bg-primary-hover py-6 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-semibold text-white tracking-wide">📬 Stay Updated with DPSS News & Events</p>
            <form className="flex gap-2 w-full sm:w-auto" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 sm:w-64 px-4 py-2.5 rounded-lg text-typography-dark text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button type="submit"
                className="px-5 py-2.5 bg-accent text-typography-dark rounded-lg font-bold text-sm hover:bg-yellow-300 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Col 1: Brand */}
            <div className="space-y-4">
              <div className="relative w-14 h-14 transition-transform duration-300 hover:scale-105">
                <Image src="/images/logo.png" alt="DPSS" fill
                  style={{ objectFit: 'contain', objectPosition: 'left' }} />
              </div>
              <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                Nurturing future leaders with a world-class CBSE education in the heart of Siddipet, Telangana.
              </p>
              <p className="text-accent text-sm font-semibold italic">&ldquo;{schoolInfo.tagline}&rdquo;</p>
              <SocialLinks />
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="text-accent font-bold uppercase tracking-widest text-xs mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'About Us', 'Academics', 'Gallery', 'Contact'].map(item => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(/ /g, '-')}`}
                      className="text-white/70 hover:text-accent hover:translate-x-1.5 inline-flex items-center gap-1.5 transition-all duration-200 text-sm">
                      <span className="text-accent/60">›</span> {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Admissions */}
            <div>
              <h4 className="text-accent font-bold uppercase tracking-widest text-xs mb-6">Admissions</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Apply Now', path: '/admissions' },
                  { label: 'Scholarship Test', path: '/scholarship' },
                  { label: 'Hall Ticket Download', path: '/scholarship#hall-ticket' },
                  { label: 'Fee Structure', path: '/admissions#fees' },
                  { label: 'Prospectus', path: '/admissions#prospectus' },
                ].map(({ label, path }) => (
                  <li key={label}>
                    <Link href={path}
                      className="text-white/70 hover:text-accent hover:translate-x-1.5 inline-flex items-center gap-1.5 transition-all duration-200 text-sm">
                      <span className="text-accent/60">›</span> {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Contact */}
            <div>
              <h4 className="text-accent font-bold uppercase tracking-widest text-xs mb-6">Contact Us</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li className="flex gap-3 items-start">
                  <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{schoolInfo.address}</span>
                </li>
                <li className="flex gap-3 items-center">
                  <Phone size={16} className="text-accent shrink-0" />
                  <a href={`tel:${schoolInfo.phone}`} className="hover:text-accent transition-colors">{schoolInfo.phone}</a>
                </li>
                <li className="flex gap-3 items-center">
                  <Mail size={16} className="text-accent shrink-0" />
                  <a href={`mailto:${schoolInfo.email}`} className="hover:text-accent transition-colors">{schoolInfo.email}</a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-[#094f2a]">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
            <p>&copy; {new Date().getFullYear()} {schoolInfo.name}. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Designed with <span className="text-red-400 mx-0.5">❤️</span> for DPSS Siddipet
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
