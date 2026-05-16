import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOGO_URL, PHONE } from '../data/services';

const NAV_LINKS = [
  { label: 'Home', hash: '#home' },
  { label: 'Diensten', hash: '#diensten' },
  { label: 'Projecten', hash: '#projecten' },
  { label: 'Contact', hash: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  // On non-home pages, always show white nav
  const showLight = !isHome || scrolled;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

  const handleNav = (hash, e) => {
    e.preventDefault();
    setIsOpen(false);
    if (isHome) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/${hash}`);
    }
  };

  const handleOfferte = (e) => {
    e.preventDefault();
    setIsOpen(false);
    if (isHome) {
      const el = document.getElementById('offerte');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: 'offerte' } });
    }
  };

  const navTextClass = showLight ? 'text-slate-700 hover:text-accent' : 'text-white/90 hover:text-white';

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showLight ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link
            to="/"
            data-testid="navbar-logo"
            className="flex items-center"
          >
            <img
              src={LOGO_URL}
              alt="Yus Klussenbedrijf"
              className="h-12 w-auto max-w-[180px] object-contain"
              style={!showLight ? { filter: 'brightness(0) invert(1)' } : {}}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.hash}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                onClick={(e) => handleNav(link.hash, e)}
                className={`font-medium text-sm transition-colors ${navTextClass}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${PHONE}`}
              data-testid="navbar-phone"
              className={`flex items-center gap-2 text-sm font-semibold transition-colors ${navTextClass}`}
            >
              <Phone size={14} />
              {PHONE}
            </a>
            <a
              href="#offerte"
              data-testid="navbar-cta"
              onClick={handleOfferte}
              className="btn-primary text-xs py-2.5 px-5"
            >
              Offerte aanvragen
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              showLight ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.hash}
                  data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                  onClick={(e) => handleNav(link.hash, e)}
                  className="text-slate-700 font-semibold text-base py-2.5 border-b border-slate-100 hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#offerte"
                data-testid="mobile-offerte-btn"
                onClick={handleOfferte}
                className="btn-primary mt-2 justify-center text-sm"
              >
                Gratis offerte aanvragen
              </a>
              <a
                href={`tel:${PHONE}`}
                data-testid="mobile-phone-link"
                className="flex items-center justify-center gap-2 text-accent font-semibold text-sm py-1"
              >
                <Phone size={15} />
                {PHONE}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
