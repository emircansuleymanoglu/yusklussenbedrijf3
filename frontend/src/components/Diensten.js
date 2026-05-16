import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/services';

export default function Diensten() {
  return (
    <section id="diensten" data-testid="diensten-section" className="py-20 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag">Onze diensten</span>
          <h2 className="section-title mb-4">Wat wij voor u kunnen doen</h2>
          <p className="section-subtitle mx-auto">
            Van stucwerk en schilderwerk tot complete badkamer- en keukenrenovaties.
            Klik op een dienst voor meer informatie en een gratis offerte.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.slug}
              data-testid={`service-card-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link
                to={`/diensten/${service.slug}`}
                className="group flex flex-col h-full bg-white border border-slate-200 rounded-2xl p-7 hover:-translate-y-1.5 hover:shadow-xl hover:border-sky-400 transition-all duration-300"
              >
                {/* Icon */}
                <div className={`w-12 h-12 ${service.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon size={22} className={service.color} />
                </div>
                {/* Title */}
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-2 group-hover:text-accent transition-colors leading-snug">
                  {service.title}
                </h3>
                {/* Tagline */}
                <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-5">
                  {service.tagline}
                </p>
                {/* More link */}
                <div className="flex items-center gap-1.5 text-accent text-sm font-semibold group-hover:gap-2.5 transition-all">
                  <span>Meer info</span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <p className="text-slate-500 mb-5">Staat uw dienst er niet bij? Neem gerust contact op.</p>
          <button
            data-testid="diensten-cta-btn"
            onClick={() => {
              const el = document.getElementById('offerte');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
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
