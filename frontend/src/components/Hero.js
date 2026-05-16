import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Phone } from 'lucide-react';

const HERO_IMAGE = "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?crop=entropy&cs=srgb&fm=jpg&w=1920&q=85";

export default function Hero() {
  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20">
        <div className="max-w-3xl">
          {/* Overline tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 text-sky-300 text-sm font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
              Professioneel Klus- en Renovatiebedrijf
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6"
          >
            Uw woning in de{' '}
            <span className="text-sky-400">beste handen</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg lg:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl"
          >
            Van stucwerk en schilderwerk tot complete badkamer- en keukenrenovaties.
            Wij leveren vakmanschap van topkwaliteit, op tijd en binnen budget — door heel Nederland.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              data-testid="hero-cta-offerte"
              onClick={() => scrollToSection('#offerte')}
              className="btn-primary text-base px-8 py-4"
            >
              Gratis offerte aanvragen
              <ArrowRight size={18} />
            </button>
            <button
              data-testid="hero-cta-projecten"
              onClick={() => scrollToSection('#projecten')}
              className="btn-outline text-base px-8 py-4"
            >
              Bekijk onze projecten
            </button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 flex flex-wrap gap-6"
          >
            {[
              { value: '10+', label: 'Jaar ervaring' },
              { value: '250+', label: 'Projecten afgerond' },
              { value: '100%', label: 'Klanttevredenheid' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div>
                  <div className="font-heading text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-xs text-white/60 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Phone strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="absolute bottom-0 left-0 right-0 z-10 bg-accent/90 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-white/90 text-sm font-medium">
            Bel ons voor een snelle reactie of vraag direct een offerte aan
          </span>
          <div className="flex items-center gap-4">
            <a
              href="tel:+31621547256"
              data-testid="hero-phone-link"
              className="flex items-center gap-2 text-white font-bold text-sm hover:text-sky-200 transition-colors"
            >
              <Phone size={15} />
              +31 6 21547256
            </a>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => scrollToSection('#stats')}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors animate-bounce hidden md:block"
        aria-label="Scroll naar beneden"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  );
}
