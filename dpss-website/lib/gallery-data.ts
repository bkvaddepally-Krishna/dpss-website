// ══════════════════════════════════════════
// DPSS Gallery — Event Data Configuration
// ══════════════════════════════════════════
// To add images: place them in /public/gallery/[slug]/
// Supported: .jpg, .jpeg, .png, .webp
// Image naming: 1.jpg, 2.jpg ... etc. for clean ordering.

export interface GalleryEvent {
  slug: string;
  title: string;
  description: string;
  coverImage: string; // path relative to /public
  images: string[];   // all images for this event
  date?: string;
  badge?: string;
  context?: string[]; // short bullet points for event details
}

// ══════════════════════════════════════════
// EVENT DEFINITIONS
// ══════════════════════════════════════════
// Update 'images' array when you add files to each folder.
// Cover image = first image in the event folder.

export const GALLERY_EVENTS: GalleryEvent[] = [
  {
    slug: 'annual-day',
    title: 'Annual Day',
    description: 'Celebrating talent, performances, and student creativity with a grand end-of-year showcase.',
    coverImage: '/gallery/annual-day/1.JPG',
    date: '2025',
    badge: 'Cultural',
    context: [
      'Students performed cultural and academic showcases',
      'Parents attended and participated actively',
      'Focus on confidence, creativity, and stage exposure'
    ],
    images: Array.from({ length: 11 }, (_, i) => `/gallery/annual-day/${i + 1}.JPG`),
  },
  {
    slug: 'bharatiya-kalamahotsav',
    title: 'Bharatiya Kalamahotsav',
    description: 'A vibrant celebration of Indian classical arts, music, and dance traditions.',
    coverImage: '/gallery/bharatiya-kalamahotsav/1.jpg',
    date: '2025',
    badge: 'Arts & Culture',
    context: [
      'Showcasing traditional Indian art forms',
      'Encouraging deep appreciation for classical music and dance',
      'Fostering cultural pride through student-led performances'
    ],
    images: Array.from({ length: 1 }, (_, i) => `/gallery/bharatiya-kalamahotsav/${i + 1}.jpg`),
  },
  {
    slug: 'dussehra-bathukamma',
    title: 'Dussehra & Bathukamma',
    description: 'Honoring the spirit of Telugu heritage through Bathukamma floral celebrations and Dussehra festivities.',
    coverImage: '/gallery/dussehra-bathukamma/1.jpg',
    date: '2024',
    badge: 'Festival',
    context: [
      'Celebrated the vibrant Bathukamma floral festival',
      'Traditional attire and local customs highlighted',
      'Community bonding among students and faculty'
    ],
    images: Array.from({ length: 5 }, (_, i) => `/gallery/dussehra-bathukamma/${i + 1}.jpg`),
  },
  {
    slug: 'graduation',
    title: 'Graduation Ceremony',
    description: 'Marking a proud milestone as our students step into their next chapter with confidence.',
    coverImage: '/gallery/graduation/1.JPG',
    date: '2025',
    badge: 'Milestone',
    context: [
      'Acknowledging academic milestones and student readiness',
      'Ceremony of transition into higher grades',
      'Inspiring speeches and presentation of certificates'
    ],
    images: Array.from({ length: 7 }, (_, i) => `/gallery/graduation/${i + 1}.JPG`),
  },
  {
    slug: 'mok-parliament',
    title: 'MOK Parliament',
    description: 'Students experience democracy first-hand through a spirited and engaging mock parliament session.',
    coverImage: '/gallery/mok-parliament/1.jpg',
    date: '2025',
    badge: 'Leadership',
    context: [
      'Interactive sessions mirroring real parliament proceedings',
      'Developing public speaking and critical thinking skills',
      'Understanding democracy and civic responsibilities'
    ],
    images: Array.from({ length: 2 }, (_, i) => `/gallery/mok-parliament/${i + 1}.jpg`),
  },
  {
    slug: 'sankranthi-fest',
    title: 'Sankranthi Fest',
    description: 'Embracing the harvest festival with traditional attire, kite flying, and cultural programs.',
    coverImage: '/gallery/sankranthi-fest/1.jpg',
    date: '2025',
    badge: 'Festival',
    context: [
      'Kite flying activities and harvest celebrations',
      'Learning the agricultural significance of the festival',
      'Traditional programs fostering a cultural connection'
    ],
    images: Array.from({ length: 4 }, (_, i) => `/gallery/sankranthi-fest/${i + 1}.jpg`),
  },
];

export function getEventBySlug(slug: string): GalleryEvent | undefined {
  return GALLERY_EVENTS.find((e) => e.slug === slug);
}
