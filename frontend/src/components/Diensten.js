import React from 'react';
import { motion } from 'framer-motion';
import {
  Layers, PaintBucket, Hammer, Thermometer,
  Zap, Droplets, UtensilsCrossed, Wrench, ArrowRight
} from 'lucide-react';

const services = [
  {
    icon: Layers,
    title: 'Stucwerk',
    desc: 'Perfecte muren en plafonds met professioneel stuc- en gipswerk voor een strakke afwerking.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: PaintBucket,
    title: 'Schilderwerk',
    desc: 'Binnen- en buitenschilderwerk met kwalitatieve verf voor een duurzaam en mooi resultaat.',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
  },
  {
    icon: Hammer,
    title: 'Timmerwerk',
    desc: 'Maatwerk timmerwerkzaamheden: van kozijnen en deuren tot op maat gemaakte kasten en meubels.',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    icon: Thermometer,
    title: 'Vloerverwarming',
    desc: 'Installatie van vloerverwarming voor een comfortabel en energiezuinig verwarmingssysteem.',
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
  {
    icon: Zap,
    title: 'Elektriciteit',
    desc: 'Elektrische installaties, groepskastwerkzaamheden en betrouwbare elektrotechnische diensten.',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
  },
  {
    icon: Droplets,
    title: 'Badkamer Renovatie',
    desc: 'Complete badkamerrenovaties: van tegels en sanitair tot douche en ligbad, alles wordt vakkundig geplaatst.',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
  },
  {
    icon: UtensilsCrossed,
    title: 'Keuken Renovatie',
    desc: 'Keukens op maat of renovatie van uw bestaande keuken — modern, functioneel en naar wens.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Wrench,
    title: 'Algemene Verbouwing',
    desc: 'Van kleine klussen tot grote renovatieprojecten — wij pakken elk project professioneel aan.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
];

export default function Diensten() {
  const scrollToOfferte = () => {
    const el = document.querySelector('#offerte');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="diensten" data-testid="diensten-section" className="py-20 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="section-tag">Onze diensten</span>
          <h2 className="section-title mb-4">
            Wat wij voor u kunnen doen
          </h2>
          <p className="section-subtitle mx-auto">
            Van kleine reparaties tot volledige renovaties — wij bieden een compleet pakket
            aan klus- en verbouwdiensten voor uw woning of bedrijfspand.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              data-testid={`service-card-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
              className="card-service group"
            >
              <div className={`w-12 h-12 ${service.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <service.icon size={22} className={service.color} />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
                {service.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <p className="text-slate-500 mb-5">
            Staat uw dienst er niet bij? Neem gerust contact met ons op!
          </p>
          <button
            data-testid="diensten-cta-btn"
            onClick={scrollToOfferte}
            className="btn-primary"
          >
            Vraag een gratis offerte aan
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
