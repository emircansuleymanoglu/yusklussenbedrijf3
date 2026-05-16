import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Diensten', href: '#diensten' },
  { label: 'Projecten', href: '#projecten' },
  { label: 'Contact', href: '#contact' },
  { label: 'Offerte aanvragen', href: '#offerte' },
];

const services = [
  'Stucwerk', 'Schilderwerk', 'Timmerwerk', 'Vloerverwarming',
  'Elektriciteit', 'Badkamer renovatie', 'Keuken renovatie', 'Algemene verbouwing',
];

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer data-testid="footer" className="bg-slate-900 text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-heading font-black text-white text-lg">
                YK
              </div>
              <div>
                <div className="font-heading font-bold text-white text-lg leading-tight">Yus Klussenbedrijf</div>
                <div className="text-slate-400 text-xs">Renovatie & Verbouw</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Professioneel klus- en renovatiebedrijf actief door heel Nederland.
              Kwaliteit, vakmanschap en klanttevredenheid staan centraal.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: 'Facebook', href: '#' },
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  data-testid={`footer-social-${label.toLowerCase()}`}
                  className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-accent hover:text-white transition-colors"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5">Navigatie</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="text-slate-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5">Onze Diensten</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#diensten"
                    data-testid={`footer-service-${s.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={(e) => { e.preventDefault(); scrollTo('#diensten'); }}
                    className="text-slate-400 text-sm hover:text-white transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+31621547256"
                  data-testid="footer-phone"
                  className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors group"
                >
                  <Phone size={16} className="mt-0.5 text-accent group-hover:text-sky-400 flex-shrink-0" />
                  <span className="text-sm">+31 6 21547256</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@yusklussenbedrijf.nl"
                  data-testid="footer-email"
                  className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors group"
                >
                  <Mail size={16} className="mt-0.5 text-accent group-hover:text-sky-400 flex-shrink-0" />
                  <span className="text-sm">info@yusklussenbedrijf.nl</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-slate-400">
                  <MapPin size={16} className="mt-0.5 text-accent flex-shrink-0" />
                  <span className="text-sm">Werkzaam door heel Nederland</span>
                </div>
              </li>
            </ul>

            {/* CTA */}
            <a
              href="#offerte"
              data-testid="footer-cta-btn"
              onClick={(e) => { e.preventDefault(); scrollTo('#offerte'); }}
              className="mt-8 inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
            >
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
            <span className="text-slate-500 text-xs">Privacybeleid</span>
            <span className="text-slate-500 text-xs">Algemene voorwaarden</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
