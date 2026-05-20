import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { SERVICES, LOGO_URL, PHONE, EMAIL, REGIO } from '../data/services';

/* ── Custom SVG icons ─────────────────────────────────────────────────────── */
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const IconTikTok = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.24 8.24 0 004.83 1.55V6.79a4.85 4.85 0 01-1.06-.1z"/>
  </svg>
);

const IconWerkspot = () => (
  <svg viewBox="0 0 100 100" width="15" height="15" aria-hidden="true" fill="none">
    <rect width="100" height="100" rx="22" fill="#1a1033"/>
    <circle cx="50" cy="50" r="37" fill="#3de85a"/>
    {/* Hammer handle */}
    <rect x="46" y="44" width="11" height="30" rx="3.5" fill="#1a1033"
      transform="rotate(45 46 44)"/>
    {/* Hammer head */}
    <rect x="22" y="22" width="30" height="18" rx="4" fill="#1a1033"
      transform="rotate(45 22 22)"/>
  </svg>
);

const SOCIALS = [
  { icon: IconInstagram, label: 'Instagram', href: 'https://www.instagram.com/yus.klussenbedrijf/' },
  { icon: IconTikTok,    label: 'TikTok',    href: 'https://www.tiktok.com/@yusklussenbedrijf' },
  { icon: IconWerkspot,  label: 'Werkspot',  href: 'https://www.werkspot.nl/profiel/yus-klussenbedrijf' },
];

export default function Footer() {
  const navigate = useNavigate();

  const handleHomeNav = (id, e) => {
    e.preventDefault();
    navigate('/', { state: { scrollTo: id } });
  };

  return (
    <footer data-testid="footer" className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img
                src={LOGO_URL}
                alt="Yus Klussenbedrijf"
                className="h-12 w-auto"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Professioneel klus- en renovatiebedrijf actief in {REGIO}.
              Kwaliteit, vakmanschap en klanttevredenheid staan centraal.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`footer-social-${label.toLowerCase()}`}
                  className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-accent hover:text-white transition-colors"
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5">Navigatie</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home',             id: 'home' },
                { label: 'Diensten',         id: 'diensten' },
                { label: 'Projecten',        id: 'projecten' },
                { label: 'Contact',          id: 'contact' },
                { label: 'Offerte aanvragen',id: 'offerte' },
              ].map(({ label, id }) => (
                <li key={id}>
                  <a href={`#${id}`} data-testid={`footer-link-${id}`}
                    onClick={(e) => handleHomeNav(id, e)}
                    className="text-slate-400 text-sm hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5">Onze Diensten</h4>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link to={`/diensten/${s.slug}`}
                    data-testid={`footer-service-${s.slug}`}
                    className="text-slate-400 text-sm hover:text-white transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href={`tel:${PHONE}`} data-testid="footer-phone"
                  className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors group">
                  <Phone size={15} className="mt-0.5 text-accent group-hover:text-sky-400 flex-shrink-0" />
                  <span className="text-sm">{PHONE}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} data-testid="footer-email"
                  className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors group">
                  <Mail size={15} className="mt-0.5 text-accent group-hover:text-sky-400 flex-shrink-0" />
                  <span className="text-sm">{EMAIL}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-slate-400">
                  <MapPin size={15} className="mt-0.5 text-accent flex-shrink-0" />
                  <span className="text-sm">{REGIO}</span>
                </div>
              </li>
            </ul>
            <a href="#offerte" data-testid="footer-cta-btn"
              onClick={(e) => handleHomeNav('offerte', e)}
              className="mt-7 inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors">
              Gratis offerte
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm text-center">
            &copy; {new Date().getFullYear()} Yus Klussenbedrijf. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-5">
            <span className="text-slate-600 text-xs">Privacybeleid</span>
            <span className="text-slate-600 text-xs">Algemene voorwaarden</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
