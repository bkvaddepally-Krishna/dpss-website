"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
      {/* Pulse Logo Layer */}
      <div className="relative mb-8">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-4 bg-primary/10 rounded-full blur-xl"
        />
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           className="relative w-24 h-24"
        >
          <Image 
            src="/images/logo.png" 
            alt="DPSS Logo" 
            fill 
            className="object-contain"
            priority 
          />
        </motion.div>
      </div>

      {/* Loading Text */}
      <div className="flex flex-col items-center gap-2">
        <motion.h2 
          className="font-serif text-2xl font-bold text-typography-dark"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Delhi Public Secondary School
        </motion.h2>
        <p className="text-sm text-typography-body font-medium tracking-[0.2em] uppercase opacity-60">
          Siddipet
        </p>
      </div>

      {/* Skeleton Shimmer Background (Subtle) */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-32 space-y-12">
          <div className="h-64 bg-typography-dark rounded-3xl w-full" />
          <div className="grid grid-cols-3 gap-6">
            <div className="h-48 bg-typography-dark rounded-2xl" />
            <div className="h-48 bg-typography-dark rounded-2xl" />
            <div className="h-48 bg-typography-dark rounded-2xl" />
          </div>
        </div>
        <motion.div 
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-1/2"
        />
      </div>
    </div>
  );
}
