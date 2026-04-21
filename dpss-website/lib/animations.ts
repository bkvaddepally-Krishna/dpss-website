import { Variants } from 'framer-motion';

// Reusable Framer Motion variants for the entire site
export const fadeUp: Variants = {
  hidden: { opacity: 1, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 1, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 1, x: 30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 1, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Viewport settings — trigger once when element enters view
export const viewport = { once: true, margin: '-80px' };
