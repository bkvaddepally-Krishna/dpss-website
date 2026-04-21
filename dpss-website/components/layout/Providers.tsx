"use client";

import React from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProgressBar
        height="3px"
        color="#0d6f3b"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  );
}
