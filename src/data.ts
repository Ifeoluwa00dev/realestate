/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Property, Agent } from './types';

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'Olumide Bakare',
    role: 'Principal Partner & Executive Agent',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=500&q=80',
    specialization: 'Banana Island Penthouse Collections & Luxury Waterfronts',
    listingsCount: 4,
    email: 'olumide@lagosarch.com',
    phone: '+234 803 111 2222',
    whatsapp: '2348031112222',
    bio: 'With over 15 years representing prestigious families and institutional investors in Ikoyi and Banana Island, Olumide is renown for discretion and securing off-market architectural masterpieces.'
  },
  {
    id: 'agent-2',
    name: 'Amina Yusuf',
    role: 'Senior Portfolio Advisor',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=500&q=80',
    specialization: 'Lekki Phase 1 Residential Terraces & Victoria Island Developments',
    listingsCount: 3,
    email: 'amina@lagosarch.com',
    phone: '+234 812 333 4444',
    whatsapp: '2348123334444',
    bio: 'Amina specializes in clean, contemporary maisonettes and waterfront villas. Her keen eye for spatial design and local Lagos market trends offers buyers exceptional portfolio appreciation advisory.'
  },
  {
    id: 'agent-3',
    name: 'Chinedu Okafor',
    role: 'Associate Partner & Investment Specialist',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=500&q=80',
    specialization: 'Ikeja GRA Period Homes & High-Return Commercial Portfolios',
    listingsCount: 2,
    email: 'chinedu@lagosarch.com',
    phone: '+234 809 555 6666',
    whatsapp: '2348095556666',
    bio: 'Chinedu handles luxury duplexes and land acquisition portfolios across Lagos Mainland. His analytical background ensures developers achieve maximum yield of premium residential assets.'
  }
];

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'listing-1',
    title: 'The Obsidian Pavilion Penthouse',
    description: 'Poised on the highest heights of Banana Island, this duplex penthouse features dramatic 6-meter floor-to-ceiling glass pavilions framing the Lagos lagoon. An unparalleled structural design by local leading architects, it seamlessly merges raw board-marked concrete with warm sustainable woods and automated glass screens. Featuring a private pool suspended over the lagoon, two professional chef kitchens, an automated security sensory system, and a temperature-controlled vault space.',
    location: 'Banana Island',
    address: 'Block B, Lagoon Front Estates, Banana Island, Ikoyi, Lagos',
    type: 'Penthouse',
    price: 3850000, // $3.85 Million USD equivalent / standard premium pricing
    beds: 5,
    baths: 6,
    sqm: 850,
    floor: 12,
    parking: 4,
    amenities: [
      'Infinity Pool',
      'Lagoon View',
      'Private Lift',
      'Smart Home Server',
      'Wine Cellar',
      '24/7 Redundant Power',
      'Armed Patrol Gate',
      'Home Cinema',
      'Fully Furnished Studio'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder virtual tour Video
    featured: true,
    status: 'Available',
    agentId: 'agent-1',
    createdAt: '2026-06-15T12:00:00Z'
  },
  {
    id: 'listing-2',
    title: 'Aura Waterfront Cantilever Villa',
    description: 'This architectural marvel in Lekki Phase 1 redefines tropical waterfront living. Built as a sequence of interlocking concrete boxes stacked in a physics-defying 4-meter cantilever, the residence frames direct cinematic sights of Lekki-Ikoyi Link Bridge sunsets. Built with absolute premium imported marble, features automated skylights, custom rose-gold hardware, automated zero-edge plunge pool, yacht docking deck, and double integrated staff quarters.',
    location: 'Lekki Phase 1',
    address: 'Admiralty Way Waterfront, Lekki Phase 1, Lagos',
    type: 'Villa',
    price: 2450000,
    beds: 4,
    baths: 5,
    sqm: 620,
    floor: 3,
    parking: 3,
    amenities: [
      'Yacht Slip Dock',
      'Swimming Pool',
      'Lekki Bridge View',
      'Chef Kitchen',
      'Rooftop Lounge',
      'Smart Automations',
      'Industrial Jet Borehole',
      'Staff Quarters'
    ],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    featured: true,
    status: 'Available',
    agentId: 'agent-2',
    createdAt: '2026-06-10T09:30:00Z'
  },
  {
    id: 'listing-3',
    title: 'The Brutalist Monolith Duplex',
    description: 'Set within the strict guarded enclave of Ikoyi, the Brutalist Monolith is a pristine statement of minimalist living. Bold vertical board-formed concrete slabs act as structural elements, creating deep light wells that capture natural ambient shadows throughout the day. Features a bespoke black basalt stone reflection pool, dedicated library mezzanine, hidden panels concealing dual master suites, fully voice-powered smart home grid, and high-security biodome safe room.',
    location: 'Ikoyi',
    address: 'Glover Road Enclave, Ikoyi, Lagos',
    type: 'Duplex',
    price: 1950000,
    beds: 4,
    baths: 4,
    sqm: 550,
    floor: 2,
    parking: 4,
    amenities: [
      'Reflection Pool',
      'Atrium Lightwells',
      'Library & Den',
      'High Security Bunker',
      'Solar Grid System',
      'Pristine Acoustic Studio',
      '24/7 Concierge Guard'
    ],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    featured: true,
    status: 'Available',
    agentId: 'agent-1',
    createdAt: '2026-06-18T15:45:00Z'
  },
  {
    id: 'listing-4',
    title: 'The Brass & Terrazzo Maisonette',
    description: 'Located in the residential heart of Victoria Island, this dual-level apartment couples high-touch luxury finishes with ultimate urban centrality. Bold bespoke brass trims pair beautifully with custom rose-and-emerald-tinted terrazzo floors. Features wrap-around landscaped garden balconies, fully-integrated modern European appliances, a state-of-the-art climate cellar, master suite with a skylit standalone stone tub, and standard executive concierge desk.',
    location: 'Victoria Island',
    address: 'Oniru Waterfront Crescent, Victoria Island, Lagos',
    type: 'Maisonette',
    price: 1200000,
    beds: 3,
    baths: 4,
    sqm: 410,
    floor: 6,
    parking: 2,
    amenities: [
      'Sky Balcony Garden',
      'Bespoke Terrazzo Floors',
      'Concierge Service',
      'Sauna & Spa Room',
      'Redundant Battery Array',
      'Subzero Wine Storage'
    ],
    images: [
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    featured: false,
    status: 'Available',
    agentId: 'agent-2',
    createdAt: '2026-06-12T11:15:00Z'
  },
  {
    id: 'listing-5',
    title: 'The Sovereign Oak Manor',
    description: 'Situated inside the prestigious leafy streets of Ikeja GRA on the Lagos mainland, this double-winged duplex pay homage to classical tropical layouts updated with striking architectural details. Structured with soaring European timber headers, massive sand-colored clay plaster finishes, and fully custom cast-iron tall windows. It surrounds a century-old African Oak tree which acts as the scenic centerpiece of the private courtyard, swimming pool, and detached high-end wellness cabana.',
    location: 'Ikeja GRA',
    address: 'Joel Ogunnaike Way, Ikeja GRA, Lagos',
    type: 'Duplex',
    price: 1850000,
    beds: 5,
    baths: 6,
    sqm: 720,
    floor: 2,
    parking: 6,
    amenities: [
      'Courtyard Swimming Pool',
      'Wellness Cabana & Gym',
      '100% Off-Grid Solar Power',
      'Detached Guest Lodge',
      'Double Staff Apartments',
      'Artisanal Timber Details'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    featured: true,
    status: 'Available',
    agentId: 'agent-3',
    createdAt: '2026-06-14T08:00:00Z'
  },
  {
    id: 'listing-6',
    title: 'The Coral Crest Waterfront Penthouse',
    description: 'Boasting infinite panoramas of the Atlantic ocean and Eko Atlantic City skyline, this high-rise penthouse combines dramatic horizontal spaces with ultimate security. Designed as a series of open steps, it features a 12-meter personal lap pool, natural coral stone statement pieces, raw quartzite finishes, dual primary quarters, a climate-regulated cedar vault, and biometric access points directly from the private helipad elevators.',
    location: 'Victoria Island',
    address: 'Eko Atlantic Gateway, Victoria Island, Lagos',
    type: 'Penthouse',
    price: 3100000,
    beds: 4,
    baths: 5,
    sqm: 690,
    floor: 25,
    parking: 3,
    amenities: [
      'Rooftop Ocean Pool',
      'Atlantic View Panels',
      'Helipad Lift Access',
      'Smart Climate Zones',
      'Quartzite Chef Island',
      'Dual Staff Suites',
      'Seawall Level Yacht Dock'
    ],
    images: [
      'https://images.unsplash.com/photo-1542628682-883b13abc037?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    featured: false,
    status: 'Sold', // Showing that some are sold to fulfill stats/filtering
    agentId: 'agent-1',
    createdAt: '2026-06-05T14:20:00Z'
  },
  {
    id: 'listing-7',
    title: 'The Atrium Terrace Townhouse',
    description: 'An elegant statement of high-density master planning in Ikoyi, this three-level townhome centres entirely around an open private internal rainforest atrium. Sunlight penetrates deep, nourishing a gorgeous double-floor indoor garden framed by sliding black aluminum doors. Equipped with professional Miele kitchen fittings, robust high-efficiency solar battery systems, and customized smart heating & sensory systems.',
    location: 'Ikoyi',
    address: 'Kingsway Road Crescent, Ikoyi, Lagos',
    type: 'Terrace',
    price: 1550000,
    beds: 3,
    baths: 4,
    sqm: 480,
    floor: 3,
    parking: 2,
    amenities: [
      'Indoor Rain Forest Atrium',
      'Stained Concrete Slab Floors',
      'Redundant Power Array',
      'Private Rooftop Spa',
      'Integrated Security Tech'
    ],
    images: [
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    featured: false,
    status: 'Available',
    agentId: 'agent-2',
    createdAt: '2026-06-08T16:10:00Z'
  },
  {
    id: 'listing-8',
    title: 'The Mahogany Forest Villa',
    description: 'Tucked away in the quiet, secure, and prestigious gated neighborhood of Ikeja GRA, the Mahogany Forest Villa has a bold, horizontal footprint nestled in a manicured tropical forest. Incorporates masterfully shaped Mahogany wood panelings, slate tile rooftops, a massive detached guest house, dual swimming pools, dynamic visual water features, and separate secure vehicle bays.',
    location: 'Ikeja GRA',
    address: 'Oduduwa Crescent, Ikeja GRA, Lagos',
    type: 'Villa',
    price: 2800000,
    beds: 6,
    baths: 7,
    sqm: 950,
    floor: 2,
    parking: 8,
    amenities: [
      'Manicured Gated Forest',
      'Dual Heated Pools',
      'Detached Luxury Guest Pavilion',
      'Raw Slate Tiled Slabs',
      '8-Car Secured Fleet Bay',
      'Redundant Battery Array'
    ],
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    featured: false,
    status: 'Let',
    agentId: 'agent-3',
    createdAt: '2026-06-01T10:00:00Z'
  }
];
