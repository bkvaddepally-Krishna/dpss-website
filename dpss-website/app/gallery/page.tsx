import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'School Gallery',
  description: 'View photos of vibrant student life, cultural events, sports, and daily activities at Delhi Public Secondary School in Siddipet.',
};

export default function GalleryPage() {
  return <GalleryClient />;
}
