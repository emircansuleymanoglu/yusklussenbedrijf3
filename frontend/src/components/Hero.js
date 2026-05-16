import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Star } from 'lucide-react';
import { PHONE } from '../data/services';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?crop=entropy&cs=srgb&fm=jpg&w=1920&q=85';

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
      {/* Lighter overlay — welcoming and bright */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/40 to-slate-900/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-24">
        <div className="max-w-2xl">

          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" />
              Klus- en Renovatiebedrijf Nederland
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-5"
          >
            Uw woning in<br />
            de{' '}
            <span className="text-sky-300">beste handen</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35 }}
            className="text-base lg:text-lg text-white/75 leading-relaxed mb-8 max-w-xl"
          >
            Van stucwerk en schilderwerk tot complete badkamer- en keukenrenovaties.
            Vakmanschap van topkwaliteit, op tijd en binnen budget — door heel Nederland.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button
              data-testid="hero-cta-offerte"
              onClick={() => scrollTo('offerte')}
              className="btn-primary text-sm px-8 py-4"
            >
              Gratis offerte aanvragen
              <ArrowRight size={17} />
            </button>
            <button
              data-testid="hero-cta-projecten"
              onClick={() => scrollTo('projecten')}
              className="btn-outline text-sm px-8 py-4"
            >
              Onze projecten
            </button>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} className="text-amber-400 fill-amber-400" />
              ))}
              <span className="text-white/70 text-sm ml-1 font-medium">5.0 beoordeling</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-5">
              {[
                { v: '10+', l: 'jaar ervaring' },
                { v: '250+', l: 'projecten' },
                { v: '100%', l: 'garantie' },
              ].map(({ v, l }) => (
                <div key={l}>
                  <span className="font-heading text-xl font-black text-white">{v}</span>
                  <span className="text-white/55 text-xs ml-1">{l}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom contact bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="absolute bottom-0 left-0 right-0 z-10 bg-accent/90 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-white/85 text-sm">
            Bel voor een snelle reactie of vraag direct uw gratis offerte aan
          </span>
          <a
            href={`tel:${PHONE}`}
            data-testid="hero-phone-link"
            className="flex items-center gap-2 text-white font-bold text-sm hover:text-sky-200 transition-colors"
          >
            <Phone size={14} />
            {PHONE}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
