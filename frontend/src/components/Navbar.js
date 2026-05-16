import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Diensten', href: '#diensten' },
  { label: 'Projecten', href: '#projecten' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#home"
            data-testid="navbar-logo"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-heading font-black text-white text-lg group-hover:bg-accent-hover transition-colors">
              YK
            </div>
            <div className="leading-tight">
              <div className={`font-heading font-bold text-lg transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                Yus Klussenbedrijf
              </div>
              <div className={`text-xs font-medium transition-colors ${scrolled ? 'text-slate-500' : 'text-white/70'}`}>
                Renovatie & Verbouw
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`font-medium text-sm hover:text-accent transition-colors ${
                  scrolled ? 'text-slate-700' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+31621547256"
              data-testid="navbar-phone"
              className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                scrolled ? 'text-slate-700 hover:text-accent' : 'text-white/90 hover:text-white'
              }`}
            >
              <Phone size={15} />
              +31 6 21547256
            </a>
            <a
              href="#offerte"
              data-testid="navbar-cta"
              onClick={(e) => { e.preventDefault(); handleNavClick('#offerte'); }}
              className="btn-primary text-xs py-2.5 px-5"
            >
              Offerte aanvragen
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Menu openen"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
            <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="text-slate-700 font-semibold text-base py-2 border-b border-slate-100 hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#offerte"
                data-testid="mobile-offerte-btn"
                onClick={(e) => { e.preventDefault(); handleNavClick('#offerte'); }}
                className="btn-primary mt-2 justify-center"
              >
                Gratis offerte aanvragen
              </a>
              <a
                href="tel:+31621547256"
                data-testid="mobile-phone-link"
                className="flex items-center justify-center gap-2 text-accent font-semibold"
              >
                <Phone size={16} />
                +31 6 21547256
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
