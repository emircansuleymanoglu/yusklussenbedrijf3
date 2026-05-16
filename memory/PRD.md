# Yus Klussenbedrijf - PRD

## Project Overview
Premium, animated Dutch klusbedrijf (renovation company) website for **Yus Klussenbedrijf**.
Landing page only - no login, no payment, no e-commerce.

## Architecture
- **Frontend**: React 18 + Tailwind CSS + Framer Motion
- **Backend**: FastAPI (Python) + MongoDB
- **Hosting**: Emergent platform
- **URL**: https://80b44060-6a48-4996-8a16-63a202c2233d.preview.emergentagent.com

## Company Details
- Name: Yus Klussenbedrijf
- Phone: +31 6 21547256
- WhatsApp: +31621547256 (wa.me link)
- Email: info@yusklussenbedrijf.nl
- Location: Heel Nederland

## Core Requirements (Static)
1. Dutch language throughout
2. Mobile-first responsive design
3. Smooth Framer Motion animations
4. Professional renovation company look
5. No login/auth/payment
6. SEO-optimized HTML (Dutch meta tags)
7. Validated forms with honeypot spam protection
8. WhatsApp floating button
9. Project gallery with category filter

## Services
1. Stucwerk
2. Schilderwerk
3. Timmerwerk
4. Vloerverwarming
5. Elektriciteit
6. Badkamer renovatie
7. Keuken renovatie
8. Algemene verbouwing

## Pages/Sections
- **Home/Hero**: Animated hero with CTA buttons, trust stats
- **Stats**: 4 key statistics (10+ year, 250+ projects, 100% satisfaction, 24h response)
- **Diensten**: 8 service cards with icons and descriptions
- **Projecten**: 6 project photo gallery with category filter
- **Testimonials**: 3 customer reviews (dark navy section)
- **Offerte aanvragen**: Full validated form with honeypot protection
- **Contact**: Contact details + contact form + opening hours
- **Footer**: Brand info, navigation, services list, contact

## What's Been Implemented (Updated: Feb 2026)
- [x] Full React + FastAPI + MongoDB project from scratch
- [x] Professional Dutch landing page with all sections
- [x] Sticky glassmorphism navbar with mobile menu + real YUS logo
- [x] Lighter/brighter hero with stars rating + trust bar
- [x] Stats section with icons
- [x] 8 updated service cards (Stucwerk & Pleisterwerk, Schilderwerk Binnen & Buiten, etc.)
- [x] Clickable service cards → /diensten/{slug} React Router routes
- [x] 8 service detail pages with image carousel, benefits, included, CTAs, pre-select
- [x] Project gallery with GitHub client photos (Badkamer_Toilet, Stukwerk_Schilderwerk, Woonkamer)
- [x] Testimonials section
- [x] Offerte form: validation + honeypot + MongoDB + pre-select from service pages
- [x] Contact form: validation + MongoDB + WhatsApp CTA + no Google Maps
- [x] Contact info: Rotterdam en omgeving, +31 6 12345678
- [x] Footer with YUS logo (white on dark), links, services
- [x] WhatsApp floating button with tooltip (+31 6 12345678)
- [x] Backend API: /api/health, /api/offerte, /api/contact
- [x] SEO meta tags in Dutch + dynamic title per service page
- [x] Google Fonts: Outfit + Manrope
- [x] Framer Motion animations throughout

## Design
- Colors: Primary #0F172A, Accent #0369A1, Background #FFFFFF
- Logo: Real YUS Klussenbedrijf PNG (CSS-filtered white on dark)
- Images: GitHub client photos (categorized) + Unsplash hero

## Prioritized Backlog

### P0 (Critical - must do when client provides)
- Replace YK placeholder logo with actual Yus Klussenbedrijf logo
- Replace stock photos with client's own project photos

### P1 (High value)
- Email notification when form is submitted (e.g. SendGrid/Resend integration)
- Before/after photo slider component in Projecten section
- Google Maps embed in Contact section

### P2 (Nice to have)
- Admin panel to view form submissions
- Google Analytics integration
- WhatsApp direct open (no tooltip) on mobile

## Next Tasks
1. Upload company logo as asset and update Navbar + Footer
2. Upload project photos as assets and update Projecten gallery
3. Add email notification for form submissions

## Test Credentials
N/A - No authentication in this project
