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

## What's Been Implemented (Date: Feb 2026)
- [x] Full React + FastAPI + MongoDB project from scratch
- [x] Professional Dutch landing page with all sections
- [x] Sticky glassmorphism navbar with mobile menu
- [x] Animated hero with background image, CTA buttons
- [x] Stats section with icons
- [x] 8 service cards with colored icons
- [x] Project gallery with 6 projects, category filter
- [x] Testimonials section
- [x] Offerte form: full validation + honeypot spam protection + MongoDB storage
- [x] Contact form: validation + MongoDB storage
- [x] Footer with all links and company info
- [x] WhatsApp floating button with tooltip
- [x] Backend API: /api/health, /api/offerte, /api/contact
- [x] SEO meta tags in Dutch
- [x] Google Fonts: Outfit (headings) + Manrope (body)
- [x] Framer Motion animations throughout

## Design
- Colors: Primary #0F172A, Accent #0369A1, Background #FFFFFF
- Logo: Placeholder YK text logo (to be replaced with client logo)
- Images: Unsplash stock photos (to be replaced with client photos)

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
