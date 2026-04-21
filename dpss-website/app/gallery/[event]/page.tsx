import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GALLERY_EVENTS, getEventBySlug } from '@/lib/gallery-data';
import EventGalleryClient from './EventGalleryClient';

interface Props {
  params: Promise<{ event: string }>;
}

export async function generateStaticParams() {
  return GALLERY_EVENTS.map((e) => ({ event: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { event: slug } = await params;
  const evt = getEventBySlug(slug);
  if (!evt) return { title: 'Event Not Found | DPSS Gallery' };
  return {
    title: `${evt.title} | Gallery — DPSS Siddipet`,
    description: evt.description,
  };
}

export default async function EventGalleryPage({ params }: Props) {
  const { event: slug } = await params;
  const evt = getEventBySlug(slug);
  if (!evt) notFound();
  return <EventGalleryClient event={evt} />;
}
