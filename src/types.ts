/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  address: string;
  type: 'Apartment' | 'Penthouse' | 'Maisonette' | 'Duplex' | 'Villa' | 'Terrace';
  price: number;
  beds: number;
  baths: number;
  sqm: number;
  floor?: number;
  parking: number;
  amenities: string[];
  images: string[];
  videoUrl?: string; // YouTube embed or Virtual Tour link
  featured: boolean;
  status: 'Available' | 'Sold' | 'Let';
  agentId: string;
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  photo: string;
  specialization: string;
  listingsCount: number;
  email: string;
  phone: string;
  whatsapp: string;
  bio: string;
}

export interface ViewingRequest {
  id: string;
  listingId: string;
  listingTitle: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: 'Pending' | 'Approved' | 'Contacted';
  createdAt: string;
}

export interface FilterParams {
  location?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  amenities?: string[];
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}
