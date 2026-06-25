# Roselle Studio — Real Estate Site

A property listings and lead generation website for Lagos-based property agencies, with full-text search and agent profiles.

## Stack
Next.js 14 (App Router) + TypeScript · Supabase (listings + leads) · Cloudinary · Resend · Vercel

## What's Included
- Property listings with filters (type, bedrooms, price range, location) and grid/list toggle
- Property detail page — image gallery, amenities, virtual tour embed, agent contact card
- "Schedule a Viewing" form — saves to Supabase, emails agent via Resend
- Agent profiles with all their listings
- WhatsApp inquiry button on every property (pre-filled message with property details)
- Admin panel — add/edit/delete listings with multi-image Cloudinary upload, mark as sold/let
- Full-text search via Supabase `tsvector`
- Schema.org `RealEstateListing` structured data per property





## Deployment
- **App** → Vercel
- **Images** → Cloudinary (free tier handles most agencies)

---
Built by [Roselle Studio]