"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, fadeLeft, fadeRight } from '@/lib/animations';
import { 
  Music, Trophy, Palette, Users, Shield, Edit3,
  Calendar, BookOpen, Coffee, Activity, ArrowRight, Compass
} from 'lucide-react';

// Using a much safer viewport trigger for the bottom of the page
const safeViewport = { once: true, amount: 0.1, margin: "50px" };

export default function StudentLifeClient() {
  return (
    <motion.main 
      className="flex flex-col pt-[104px]" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0d6f3b] py-24 md:py-32 px-6 overflow-hidden">
        {/* Decorative accents */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent/10 pointer-events-none" />
        
        <motion.div 
          className="relative max-w-7xl mx-auto text-center z-10 space-y-6"
          initial="hidden" animate="show" variants={staggerContainer}
        >
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.25em] text-accent uppercase">Campus Experience</motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-7xl font-bold font-serif text-white leading-tight">
            Life at DPSS Siddipet
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-medium">
            A vibrant environment where students learn, grow, and interact every day.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. DAILY SCHOOL LIFE */}
      <section className="bg-white py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden" 
              whileInView="show" 
              viewport={safeViewport} 
              variants={fadeRight}
              className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-sm border border-gray-100"
            >
              <Image src="/images/slider1.jpg" alt="Classroom Learning" fill className="object-cover" />
            </motion.div>
            
            <motion.div 
              className="space-y-8"
              initial="hidden" 
              whileInView="show" 
              viewport={safeViewport} 
              variants={staggerContainer}
            >
              <div className="space-y-4">
                <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.25em] text-primary uppercase">Daily Routine</motion.p>
                <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-typography-dark font-serif leading-tight">
                  A Typical Day at DPSS Siddipet
                </motion.h2>
              </div>
              
              <div className="space-y-6">
                {[
                  { icon: <BookOpen />, title: "Classroom Learning", desc: "Structured subject periods with regular teacher assessments." },
                  { icon: <Activity />, title: "Activities", desc: "Designated time for physical education and practical labs." },
                  { icon: <Users />, title: "Interaction with Teachers", desc: "Dedicated mentoring to ensure concept understanding." },
                  { icon: <Coffee />, title: "Balanced Routine", desc: "Scheduled intervals and lunch periods to maintain focus." }
                ].map((item, i) => (
                  <motion.div variants={fadeUp} key={i} className="flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0 border border-primary/10">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-typography-dark text-lg mb-1">{item.title}</h4>
                      <p className="text-typography-body leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. EVENTS & CELEBRATIONS */}
      <section className="bg-[#f8faf9] py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16 space-y-4"
            initial="hidden" whileInView="show" viewport={safeViewport} variants={staggerContainer}
          >
            <p className="text-xs font-bold tracking-[0.25em] text-primary uppercase">School Calendar</p>
            <h2 className="text-4xl md:text-5xl font-bold text-typography-dark font-serif">Events & Celebrations</h2>
          </motion.div>
          
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="show" viewport={safeViewport} variants={staggerContainer}
          >
            {[
              { title: "Annual Day", desc: "A school-wide event featuring student performances in drama, music, and dance." },
              { title: "Sankranthi Fest", desc: "Cultural activities including rangoli making and kite flying organized on campus." },
              { title: "Dussehra", desc: "Traditional flower arrangements and regional celebrations before the holidays." },
              { title: "Graduation", desc: "Formal farewell ceremonies organized to recognize outgoing senior students." }
            ].map((event, i) => (
              <motion.div variants={fadeUp} whileHover={{ y: -6 }} key={i} className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <Calendar size={24} />
                </div>
                <h3 className="font-serif font-bold text-xl text-typography-dark mb-3">{event.title}</h3>
                <p className="text-typography-body text-sm leading-relaxed">{event.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. CO-CURRICULAR ACTIVITIES */}
      <section className="bg-white py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="space-y-8 order-2 lg:order-1"
            initial="hidden" whileInView="show" viewport={safeViewport} variants={staggerContainer}
          >
            <div className="space-y-4">
              <p className="text-xs font-bold tracking-[0.25em] text-primary uppercase">Co-Curriculars</p>
              <h2 className="text-4xl md:text-5xl font-bold text-typography-dark font-serif leading-tight">
                Activities Beyond the Classroom
              </h2>
              <p className="text-typography-body text-lg leading-relaxed max-w-lg">
                We incorporate various co-curricular activities to ensure students acquire practical skills outside of their regular academic syllabus.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <Music size={20}/>, title: "Music & Dance", desc: "Vocal and instrumental." },
                { icon: <Trophy size={20}/>, title: "Sports", desc: "Cricket, basketball, athletics." },
                { icon: <Palette size={20}/>, title: "Arts & Crafts", desc: "Drawing and design." },
                { icon: <Users size={20}/>, title: "Clubs", desc: "Science and debate clubs." }
              ].map((activity, i) => (
                <motion.div variants={fadeUp} key={i} className="bg-[#f8faf9] p-6 rounded-2xl border border-gray-50 flex flex-col gap-3 hover:border-gray-200 transition-colors">
                  <div className="text-primary bg-white w-10 h-10 flex items-center justify-center rounded-lg shadow-sm">{activity.icon}</div>
                  <div>
                    <h4 className="font-bold text-typography-dark text-sm mb-1">{activity.title}</h4>
                    <p className="text-xs text-typography-body">{activity.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial="hidden" 
            whileInView="show" 
            viewport={safeViewport} 
            variants={fadeLeft}
            className="relative aspect-[4/3] lg:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 order-1 lg:order-2"
          >
            {/* Using slider3 instead of slider2 to explicitly show variety (activities/robotics vs standard classroom) */}
            <Image src="/images/slider3.jpg" alt="Co-Curricular Activities" fill className="object-cover" />
          </motion.div>
        </div>
      </section>

      {/* 5. STUDENT DEVELOPMENT */}
      <section className="bg-primary py-24 px-6 overflow-hidden isolate relative">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/pattern.svg')] bg-repeat" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div className="text-center mb-16 space-y-4" initial="hidden" whileInView="show" viewport={safeViewport} variants={staggerContainer}>
            <p className="text-xs font-bold tracking-[0.25em] text-accent uppercase">Development</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-serif">Skills We Focus On</h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Shield size={28} />, title: "Confidence", desc: "Developed through classroom participation, public speaking exercises, and stage events." },
              { icon: <Edit3 size={28} />, title: "Communication", desc: "Practiced via group discussions, language activities, and academic presentations." },
              { icon: <Compass size={28} />, title: "Leadership", desc: "Built by managing school events, house coordination systems, and group projects." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial="hidden" whileInView="show" viewport={safeViewport} variants={fadeUp}
                className="p-8 rounded-[2rem] bg-white/5 border border-white/10 text-left hover:bg-white/10 transition-all flex flex-col gap-4"
              >
                <div className="w-14 h-14 rounded-xl bg-accent text-typography-dark flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-bold text-white text-xl">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GALLERY PREVIEW */}
      <section className="bg-white py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <p className="text-xs font-bold tracking-[0.25em] text-primary uppercase">School Photos</p>
              <h2 className="text-3xl md:text-4xl font-bold text-typography-dark font-serif">Campus & Events</h2>
            </div>
            <Link href="/gallery" className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all shrink-0 bg-primary/5 px-5 py-2.5 rounded-lg border border-primary/10">
              Explore full gallery <ArrowRight size={18} />
            </Link>
          </div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial="hidden" whileInView="show" viewport={safeViewport} variants={staggerContainer}
          >
            {[
              { src: '/images/school.png', span: 'md:col-span-2 md:row-span-2' },
              { src: '/images/slider3.jpg', span: 'md:col-span-1' },
              { src: '/images/slider1.jpg', span: 'md:col-span-1' },
              { src: '/images/vision.jpg', span: 'md:col-span-2' },
            ].map((img, i) => (
              <motion.div key={i} variants={fadeUp} className={`relative min-h-[200px] rounded-2xl overflow-hidden shadow-sm group border border-gray-100 ${img.span}`}>
                <Image src={img.src} alt="School Event" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. STUDENT EXPERIENCE LINE & 8. CTA */}
      <section className="bg-[#f8faf9] py-24 px-6 overflow-hidden text-center">
        <motion.div initial="hidden" whileInView="show" viewport={safeViewport} variants={staggerContainer} className="max-w-7xl mx-auto space-y-4 mb-20">
          <motion.h2 variants={fadeUp} className="font-serif text-2xl md:text-4xl font-bold text-typography-dark italic max-w-4xl mx-auto leading-relaxed md:text-center">
            "Every child is encouraged to explore, participate, and grow with confidence."
          </motion.h2>
        </motion.div>

        {/* Fixing the blank space error by ensuring z-index and safe variants are explicitly rendering children */}
        <motion.div 
          initial="hidden" 
          whileInView="show" 
          viewport={safeViewport} 
          variants={fadeUp} 
          className="max-w-7xl mx-auto bg-primary rounded-[2rem] py-16 px-8 md:px-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative shadow-xl overflow-hidden"
        >
          {/* subtle design touch without breaking z-index */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-2xl text-center lg:text-left">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
              Join DPSS Siddipet
            </h2>
            <p className="text-white/80 text-lg font-medium leading-relaxed">
              Admissions are now open. Enroll your child in a structured, supportive learning environment.
            </p>
          </div>
          
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0">
            <Link href="/admissions" className="block px-8 py-4 bg-accent text-typography-dark rounded-xl font-bold text-base hover:bg-yellow-300 transition-all shadow-lg text-center">
              Apply Now
            </Link>
            <Link href="/scholarship" className="block px-8 py-4 border-2 border-white/30 text-white rounded-xl font-bold text-base hover:bg-white/10 transition-all text-center">
              Scholarship
            </Link>
          </div>
        </motion.div>
      </section>

    </motion.main>
  );
}
