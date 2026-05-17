import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const GH = 'https://raw.githubusercontent.com/emircansuleymanoglu/yusklussenbedrijf2/main/Resimler/';
const img = (n) => `${GH}image${String(n).padStart(5, '0')}.png`;

const PROJECTS = [
  {
    id: 1,
    title: 'Luxe Badkamer Renovatie',
    location: 'Rotterdam',
    category: 'Badkamer',
    desc: 'Volledige badkamerrenovatie met premium tegels, inloopdouche en modern sanitair.',
    image: 'https://images.unsplash.com/photo-1661107259637-4e1c55462428?crop=entropy&cs=srgb&fm=jpg&w=800&q=85',
  },
  {
    id: 2,
    title: 'Stucwerk & Pleisterwerk',
    location: 'Den Haag',
    category: 'Stucwerk',
    desc: 'Vers gepleisterde wanden en plafonds — strak, egaal en vakkundig afgewerkt.',
    // GitHub: authentic stucwerk - freshly plastered white walls (Heemskerk)
    image: '/images/stucwerk/stuc-3.jpg',
  },
  {
    id: 3,
    title: 'Schilderwerk Woonkamer',
    location: 'Amsterdam',
    category: 'Schilderwerk',
    desc: 'Volledig binnenschilderwerk in moderne navy-blauwe accentkleur.',
    image: '/images/schilderwerk/schil-7.jpg',
  },
  {
    id: 4,
    title: 'Algemene Verbouwing',
    location: 'Utrecht',
    category: 'Verbouwing',
    desc: 'Volledige woningrenovatie van A tot Z — van slopen tot strakke eindafwerking.',
    // Unsplash: interior renovation in progress (unique, clearly verbouwing)
    image: 'https://images.unsplash.com/photo-1692890659047-079b769ee3e6?crop=entropy&cs=srgb&fm=jpg&w=800&q=85',
  },
  {
    id: 5,
    title: 'Badkamer & Toilet Renovatie',
    location: 'Eindhoven',
    category: 'Badkamer',
    desc: 'Moderne badkamer en toilet volledig gerenoveerd met checker-vloertegels.',
    image: img(5),
  },
  {
    id: 6,
    title: 'Moderne Keuken Renovatie',
    location: 'Haarlem',
    category: 'Keuken',
    desc: 'Complete keukenrenovatie met eiland, marmeren aanrechtblad en inbouwapparatuur.',
    image: 'https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?crop=entropy&cs=srgb&fm=jpg&w=800&q=85',
  },
  {
    id: 7,
    title: 'Visgraat Vloer Installatie',
    location: 'Rotterdam',
    category: 'Vloerverwarming',
    desc: 'Visgraat parketvloer voor/na — compleet met vloerverwarming installatie.',
    image: '/images/vloerverwarming/vloer-3.jpeg',
  },
  {
    id: 8,
    title: 'Stucwerk Afwerking',
    location: 'Den Haag',
    category: 'Stucwerk',
    desc: 'Professioneel stucwerk en pleisterwerk voor strakke wanden en plafonds.',
    image: '/images/stucwerk/stuc-1.jpg',
  },
  {
    id: 9,
    title: 'Schilderwerk in Uitvoering',
    location: 'Utrecht',
    category: 'Schilderwerk',
    desc: 'Binnenschilderwerk met verfschilders aan het werk, professioneel en netjes.',
    image: '/images/schilderwerk/schil-5.jpg',
  },
];

const CATS = ['Alle', 'Badkamer', 'Stucwerk', 'Schilderwerk', 'Keuken', 'Vloerverwarming', 'Verbouwing'];

export default function Projecten() {
  const [active, setActive] = useState('Alle');

  const filtered =
    active === 'Alle' ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section id="projecten" data-testid="projecten-section" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-tag">Onze projecten</span>
          <h2 className="section-title mb-4">Resultaten waar we trots op zijn</h2>
          <p className="section-subtitle mx-auto">
            Een selectie van onze recente renovatie- en verbouwprojecten door heel Nederland.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
          data-testid="category-filter"
        >
          {CATS.map((cat) => (
            <button
              key={cat}
              data-testid={`filter-${cat.toLowerCase()}`}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                active === cat
                  ? 'bg-accent text-white shadow-md shadow-sky-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              data-testid={`project-card-${project.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group rounded-2xl overflow-hidden border border-slate-200 hover:border-sky-300 hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <p className="text-white/90 text-sm leading-relaxed">{project.desc}</p>
                </div>
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-bold px-3 py-1 rounded-full">
                  {project.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">{project.title}</h3>
                <div className="flex items-center gap-1 text-slate-400 text-sm">
                  <MapPin size={13} />
                  {project.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 text-center"
        >
          <p className="text-slate-500 mb-5">Heeft u interesse? Vraag vandaag uw vrijblijvende offerte aan.</p>
          <button
            data-testid="projecten-cta-btn"
            onClick={() => {
              const el = document.getElementById('offerte');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary"
          >
            Offerte aanvragen
          </button>
        </motion.div>
      </div>
    </section>
  );
}
