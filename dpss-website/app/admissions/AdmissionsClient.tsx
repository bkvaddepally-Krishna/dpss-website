"use client";

import React from 'react';
import MultiStepForm from '@/components/admissions/MultiStepForm';
import { Toaster } from 'sonner';

export default function AdmissionsClient() {
  return (
    <div className="min-h-screen bg-surface-soft py-12 px-4 sm:px-6 lg:px-8 pt-28">
      <Toaster position="top-center" richColors />

      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-xs font-bold tracking-[0.25em] text-accent uppercase mb-3">Online Registration Portal</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-typography-dark tracking-tight">
          Admission Form 2026
        </h1>
        <p className="mt-4 text-lg text-typography-body">
          Admissions Open for Session 2026-27
        </p>
        <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full" />
      </div>

      <MultiStepForm />
    </div>
  );
}
