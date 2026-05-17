import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { SERVICES, LOGO_URL, PHONE, EMAIL, REGIO } from '../data/services';

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
              {[
                { icon: Facebook, label: 'Facebook', href: '#' },
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} data-testid={`footer-social-${label.toLowerCase()}`}
                  className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-accent hover:text-white transition-colors"
                  aria-label={label}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5">Navigatie</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Diensten', id: 'diensten' },
                { label: 'Projecten', id: 'projecten' },
                { label: 'Contact', id: 'contact' },
                { label: 'Offerte aanvragen', id: 'offerte' },
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
