import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Directories setup
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const PROPERTIES_FILE = path.join(DATA_DIR, 'properties.json');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

// --- Seed Data ---
const INITIAL_AGENTS = [
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
    listingsCount: 1,
    email: 'chinedu@lagosarch.com',
    phone: '+234 809 555 6666',
    whatsapp: '2348095556666',
    bio: 'Chinedu handles luxury duplexes and land acquisition portfolios across Lagos Mainland. His analytical background ensures developers achieve maximum yield of premium residential assets.'
  }
];

const INITIAL_PROPERTIES = [
  {
    id: 'listing-1',
    title: 'The Obsidian Pavilion Penthouse',
    description: 'Poised on the highest heights of Banana Island, this duplex penthouse features dramatic 6-meter floor-to-ceiling glass pavilions framing the Lagos lagoon. An unparalleled structural design by local leading architects, it seamlessly merges raw board-marked concrete with warm sustainable woods and automated glass screens. Featuring a private pool suspended over the lagoon, two professional chef kitchens, an automated security sensory system, and a temperature-controlled vault space.',
    location: 'Banana Island',
    address: 'Block B, Lagoon Front Estates, Banana Island, Ikoyi, Lagos',
    type: 'Penthouse',
    price: 3850000,
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
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
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
    status: 'Sold',
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
    description: 'Tucked away in the quiet, secure, and prestigious gated neighborhood of Ikeja GRA, the Mahogany Forest Villa has a bold, horizontal footprint nested in a manicured tropical forest. Incorporates masterfully shaped Mahogany wood panelings, slate tile rooftops, a massive detached guest house, dual swimming pools, dynamic visual water features, and separate secure vehicle bays.',
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
      'Redundant Power Array'
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

const INITIAL_LEADS = [
  {
    id: 'lead-1',
    listingId: 'listing-1',
    listingTitle: 'The Obsidian Pavilion Penthouse',
    name: 'Tunde Folawiyo',
    email: 'tunde@yopmail.com',
    phone: '+234 805 999 8888',
    preferredDate: '2026-06-25',
    preferredTime: '14:00',
    message: 'Seeking a highly confidential viewing for a luxury island listing. Please coordinate with my office.',
    status: 'Pending',
    createdAt: '2026-06-18T10:00:00Z'
  },
  {
    id: 'lead-2',
    listingId: 'listing-2',
    listingTitle: 'Aura Waterfront Cantilever Villa',
    name: 'Fatima Aliko',
    email: 'fatima@yopmail.com',
    phone: '+234 810 222 3333',
    preferredDate: '2026-06-28',
    preferredTime: '11:00',
    message: 'Extremely interested in this cantilever property with jetty access. Please let me know if a docking trial is possible.',
    status: 'Pending',
    createdAt: '2026-06-19T08:15:00Z'
  }
];

// Read/Write helper functions
function readProperties() {
  try {
    if (!fs.existsSync(PROPERTIES_FILE)) {
      fs.writeFileSync(PROPERTIES_FILE, JSON.stringify(INITIAL_PROPERTIES, null, 2));
      return INITIAL_PROPERTIES;
    }
    const data = fs.readFileSync(PROPERTIES_FILE, 'utf-8');
    return JSON.parse(data) || INITIAL_PROPERTIES;
  } catch (error) {
    console.error('Error reading properties:', error);
    return INITIAL_PROPERTIES;
  }
}

function writeProperties(properties: any) {
  try {
    fs.writeFileSync(PROPERTIES_FILE, JSON.stringify(properties, null, 2));
  } catch (error) {
    console.error('Error writing properties:', error);
  }
}

function readLeads() {
  try {
    if (!fs.existsSync(LEADS_FILE)) {
      fs.writeFileSync(LEADS_FILE, JSON.stringify(INITIAL_LEADS, null, 2));
      return INITIAL_LEADS;
    }
    const data = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(data) || INITIAL_LEADS;
  } catch (error) {
    console.error('Error reading leads:', error);
    return INITIAL_LEADS;
  }
}

function writeLeads(leads: any) {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
  } catch (error) {
    console.error('Error writing leads:', error);
  }
}

// Ensure database files are loaded/created at boot
readProperties();
readLeads();

// --- API Endpoints ---

// Get all agents
app.get('/api/agents', (req, res) => {
  res.json(INITIAL_AGENTS);
});

// Full-text & filtered Property Search
app.get('/api/properties', (req, res) => {
  const {
    location,
    type,
    minPrice,
    maxPrice,
    beds,
    baths,
    amenities,
    search,
    sort,
    page = '1',
    limit = '8'
  } = req.query;

  let properties = readProperties();

  // 1. Text Search (Supabase / Algolia custom tsvector emulation on server)
  if (search && typeof search === 'string' && search.trim() !== '') {
    const term = search.toLowerCase().trim();
    properties = properties.filter((p: any) => {
      const matchTitle = p.title.toLowerCase().includes(term);
      const matchDesc = p.description.toLowerCase().includes(term);
      const matchLoc = p.location.toLowerCase().includes(term);
      const matchAddr = p.address.toLowerCase().includes(term);
      const matchType = p.type.toLowerCase().includes(term);
      const matchAmenities = p.amenities.some((a: string) => a.toLowerCase().includes(term));
      return matchTitle || matchDesc || matchLoc || matchAddr || matchType || matchAmenities;
    });
  }

  // 2. Filter by Location Neighborhood
  if (location && typeof location === 'string' && location !== 'All') {
    properties = properties.filter((p: any) => p.location.toLowerCase() === location.toLowerCase());
  }

  // 3. Filter by Property Class/Type
  if (type && typeof type === 'string' && type !== 'All') {
    properties = properties.filter((p: any) => p.type.toLowerCase() === type.toLowerCase());
  }

  // 4. Prices
  if (minPrice) {
    const minVal = parseFloat(minPrice as string);
    if (!isNaN(minVal)) {
      properties = properties.filter((p: any) => p.price >= minVal);
    }
  }
  if (maxPrice) {
    const maxVal = parseFloat(maxPrice as string);
    if (!isNaN(maxVal)) {
      properties = properties.filter((p: any) => p.price <= maxVal);
    }
  }

  // 5. Rooms Specs
  if (beds && beds !== 'Any') {
    const bedVal = parseInt(beds as string, 10);
    if (!isNaN(bedVal)) {
      properties = properties.filter((p: any) => p.beds >= bedVal);
    }
  }
  if (baths && baths !== 'Any') {
    const bathVal = parseInt(baths as string, 10);
    if (!isNaN(bathVal)) {
      properties = properties.filter((p: any) => p.baths >= bathVal);
    }
  }

  // 6. Amenities checklists
  if (amenities) {
    const amendsList = Array.isArray(amenities)
      ? (amenities as string[])
      : [amenities as string];
    properties = properties.filter((p: any) => {
      return amendsList.every((a: string) => p.amenities.includes(a));
    });
  }

  // 7. Sort listings
  if (sort) {
    switch (sort) {
      case 'newest':
        properties.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price_asc':
        properties.sort((a: any, b: any) => a.price - b.price);
        break;
      case 'price_desc':
        properties.sort((a: any, b: any) => b.price - a.price);
        break;
      case 'sqm_desc':
        properties.sort((a: any, b: any) => b.sqm - a.sqm);
        break;
      default:
        properties.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  } else {
    // Default sort by featured, then newest
    properties.sort((a: any, b: any) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  // Pagination
  const pNum = parseInt(page as string, 10) || 1;
  const pLimit = parseInt(limit as string, 10) || 8;
  const totalCount = properties.length;
  const startIdx = (pNum - 1) * pLimit;
  const paginatedProperties = properties.slice(startIdx, startIdx + pLimit);

  res.json({
    properties: paginatedProperties,
    total: totalCount,
    pages: Math.ceil(totalCount / pLimit),
    currentPage: pNum
  });
});

// Get detailed individual property
app.get('/api/properties/:id', (req, res) => {
  const properties = readProperties();
  const property = properties.find((p: any) => p.id === req.params.id);
  if (!property) {
    return res.status(404).json({ error: 'Property not found' });
  }
  res.json(property);
});

// Admin Add Listing
app.post('/api/properties', (req, res) => {
  const properties = readProperties();
  const newProperty = {
    ...req.body,
    id: `listing-${Date.now()}`,
    createdAt: new Date().toISOString(),
    featured: req.body.featured || false,
    status: req.body.status || 'Available',
    price: parseFloat(req.body.price) || 0,
    beds: parseInt(req.body.beds, 10) || 0,
    baths: parseInt(req.body.baths, 10) || 0,
    sqm: parseInt(req.body.sqm, 10) || 0,
    parking: parseInt(req.body.parking, 10) || 0
  };

  if (!newProperty.title || !newProperty.location || !newProperty.price) {
    return res.status(400).json({ error: 'Missing core attributes (title, location, price)' });
  }

  properties.push(newProperty);
  writeProperties(properties);
  res.status(201).json(newProperty);
});

// Admin Edit Listing
app.put('/api/properties/:id', (req, res) => {
  const properties = readProperties();
  const idx = properties.findIndex((p: any) => p.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Property listing not found' });
  }

  const updatedProperty = {
    ...properties[idx],
    ...req.body,
    price: parseFloat(req.body.price) || properties[idx].price,
    beds: parseInt(req.body.beds, 10) || properties[idx].beds,
    baths: parseInt(req.body.baths, 10) || properties[idx].baths,
    sqm: parseInt(req.body.sqm, 10) || properties[idx].sqm,
    parking: parseInt(req.body.parking, 10) || properties[idx].parking
  };

  properties[idx] = updatedProperty;
  writeProperties(properties);
  res.json(updatedProperty);
});

// Admin Delete Listing
app.delete('/api/properties/:id', (req, res) => {
  let properties = readProperties();
  const initialLen = properties.length;
  properties = properties.filter((p: any) => p.id !== req.params.id);
  if (properties.length === initialLen) {
    return res.status(404).json({ error: 'Property not found' });
  }
  writeProperties(properties);
  res.json({ success: true, message: 'Property deleted successfully' });
});

// Schedule standard lead Viewing request
app.post('/api/leads', (req, res) => {
  const { listingId, listingTitle, name, email, phone, preferredDate, preferredTime, message } = req.body;
  if (!name || !email || !phone || !preferredDate || !preferredTime) {
    return res.status(400).json({ error: 'All core lead attributes are required' });
  }

  const leads = readLeads();
  const newLead = {
    id: `lead-${Date.now()}`,
    listingId: listingId || 'General Inquiry',
    listingTitle: listingTitle || 'Lagos Premium General Inquiry',
    name,
    email,
    phone,
    preferredDate,
    preferredTime,
    message: message || '',
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  leads.push(newLead);
  writeLeads(leads);

  // Simulated Resend Email Logic
  console.log('--------------------------------------------------');
  console.log('SIMULATED LEAD FORM DELIVERY TO AGENCY PARTNER via RESEND:');
  console.log(`To: partner@lagosarch.com, agents@lagosarch.com`);
  console.log(`Subject: [Viewing Request] ${newLead.listingTitle} - from ${newLead.name}`);
  console.log(`Body:
    Dear Agent Partner,

    A new premium listing viewing request has been received on the Lagos Real Estate Portal.

    Requester Details:
    - Name: ${newLead.name}
    - Email: ${newLead.email}
    - Phone: ${newLead.phone}

    Selected Viewing Appointment:
    - Date: ${newLead.preferredDate}
    - Time: ${newLead.preferredTime}

    Optional Message:
    "${newLead.message}"

    Go to your Admin Panel to approve or reschedule.
  `);
  console.log('--------------------------------------------------');

  res.status(201).json({
    success: true,
    lead: newLead,
    message: 'Viewing application booked successfully! Lead dispatch log emitted.'
  });
});

// Get all leads (Admin)
app.get('/api/leads', (req, res) => {
  res.json(readLeads());
});

// Update lead status (Admin)
app.put('/api/leads/:id', (req, res) => {
  const leads = readLeads();
  const idx = leads.findIndex((l: any) => l.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Lead request not found' });
  }
  leads[idx].status = req.body.status || leads[idx].status;
  writeLeads(leads);
  res.json(leads[idx]);
});

// --- Optional AI-powered Premium Description Generator using Google Gemini ---
app.post('/api/ai/describe', async (req, res) => {
  const { title, location, type, beds, baths, sqm, architecturalHighlights } = req.body;
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return res.status(400).json({ 
      error: 'AI Description is currently unavailable. Please check that GEMINI_API_KEY is configured in your platform Secrets!' 
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Write a premium, editorial, highly compelling architectural description suitable for a ultra-luxury real estate portal for high-end properties in Lagos, Nigeria.
    
    Property Profile:
    - Title: ${title}
    - Location: ${location}, Lagos
    - Type: ${type}
    - Layout: ${beds} Bedrooms, ${baths} Bathrooms, covering ${sqm}sqm
    - Custom Architectural Highlights: ${architecturalHighlights || 'Modern luxury, sustainable raw materials, floor-to-ceiling glass, private terrace elevation'}

    Requirements:
    1. Write in a sophisticated, architectural-journal voice (reminiscent of Architectural Digest).
    2. Incorporate sensory imagery and structural terms (e.g. "cantilevers", "board-formed concrete", "atrium wells", "cladding").
    3. Maximum length: 140 words.
    4. Return ONLY the high-end prose paragraph description. No intros, no list items.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const description = response.text ? response.text.trim() : '';
    res.json({ description });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: `AI generation failed: ${error.message || 'Unknown error'}` });
  }
});

// --- Server Ingress & Dev/Prop Handlers ---

if (process.env.NODE_ENV !== 'production') {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  // Serve Single-Page React Application
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Lagos Real Estate Portal running at http://localhost:${PORT}`);
});
