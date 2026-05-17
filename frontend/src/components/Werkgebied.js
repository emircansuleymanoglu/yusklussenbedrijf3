import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const STEDEN = [
  'Rotterdam', 'Amsterdam', 'Den Haag', 'Utrecht',
  'Eindhoven', 'Tilburg', 'Breda', 'Den Bosch',
  'Dordrecht', 'Leiden', 'Haarlem', 'Delft',
  'Zoetermeer', 'Almere', 'Zwolle', 'Arnhem',
];

export default function Werkgebied() {
  return (
    <section id="werkgebied" className="py-16 lg:py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="section-tag">Werkgebied</span>
          <h2 className="section-title mb-3">Actief door heel Nederland</h2>
          <p className="section-subtitle mx-auto">
            YUS Klussenbedrijf voert werkzaamheden uit in de volgende steden en omstreken.
            Staat uw stad er niet bij? Neem gerust contact op.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {STEDEN.map((stad) => (
            <div
              key={stad}
              className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:border-sky-300 hover:bg-sky-50 transition-colors"
            >
              <MapPin size={13} className="text-accent flex-shrink-0" />
              <span>Klusbedrijf {stad}</span>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-slate-400 text-sm mt-6"
        >
          Werkzaam in heel Nederland · Geen reiskosten binnen 50 km
        </motion.p>
      </div>
    </section>
  );
}
