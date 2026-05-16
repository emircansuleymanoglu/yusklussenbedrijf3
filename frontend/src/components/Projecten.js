import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Badkamer Renovatie',
    location: 'Amsterdam',
    category: 'Badkamer',
    desc: 'Volledige renovatie inclusief nieuwe tegels, douche en sanitair.',
    image: 'https://images.unsplash.com/photo-1639405069836-f82aa6dcb900?crop=entropy&cs=srgb&fm=jpg&w=800&q=80',
  },
  {
    id: 2,
    title: 'Keuken Renovatie',
    location: 'Rotterdam',
    category: 'Keuken',
    desc: 'Moderne keuken met eiland, marmeren aanrechtblad en inbouwapparatuur.',
    image: 'https://images.unsplash.com/photo-1628745277862-bc0b2d68c50c?crop=entropy&cs=srgb&fm=jpg&w=800&q=80',
  },
  {
    id: 3,
    title: 'Woonkamer Verbouwing',
    location: 'Den Haag',
    category: 'Verbouwing',
    desc: 'Complete make-over van de woonkamer met stucwerk, schilderwerk en vloer.',
    image: 'https://images.unsplash.com/photo-1628744876497-eb30460be9f6?crop=entropy&cs=srgb&fm=jpg&w=800&q=80',
  },
  {
    id: 4,
    title: 'Schilderwerk & Stucwerk',
    location: 'Utrecht',
    category: 'Schilderwerk',
    desc: 'Volledige binnenschildering en stucwerk voor een strakke, frisse uitstraling.',
    image: 'https://images.unsplash.com/photo-1674649207083-281c2517ab49?crop=entropy&cs=srgb&fm=jpg&w=800&q=80',
  },
  {
    id: 5,
    title: 'Luxe Keuken Installatie',
    location: 'Eindhoven',
    category: 'Keuken',
    desc: 'Installatie van een volledig nieuwe keuken op maat, inclusief elektra en loodgieterswerk.',
    image: 'https://images.unsplash.com/photo-1682888813913-e13f18692019?crop=entropy&cs=srgb&fm=jpg&w=800&q=80',
  },
  {
    id: 6,
    title: 'Timmerwerk & Renovatie',
    location: 'Haarlem',
    category: 'Timmerwerk',
    desc: 'Maatwerk timmerwerk: nieuwe deuren, kozijnen en vloer gelegd.',
    image: 'https://images.unsplash.com/photo-1505798577917-a65157d3320a?crop=entropy&cs=srgb&fm=jpg&w=800&q=80',
  },
];

const categories = ['Alle', 'Badkamer', 'Keuken', 'Verbouwing', 'Schilderwerk', 'Timmerwerk'];

export default function Projecten() {
  const [activeCategory, setActiveCategory] = useState('Alle');

  const filtered = activeCategory === 'Alle'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projecten" data-testid="projecten-section" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-tag">Onze projecten</span>
          <h2 className="section-title mb-4">
            Resultaten waar we trots op zijn
          </h2>
          <p className="section-subtitle mx-auto">
            Bekijk een selectie van onze recente renovatie- en verbouwprojecten door heel Nederland.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
          data-testid="category-filter"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              data-testid={`filter-${cat.toLowerCase()}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-accent text-white shadow-md shadow-sky-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              data-testid={`project-card-${project.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-2xl overflow-hidden border border-slate-200 hover:border-sky-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white/90 text-sm leading-relaxed">{project.desc}</p>
                </div>
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-bold px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5 bg-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1 text-slate-500 text-sm">
                      <MapPin size={13} />
                      {project.location}
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-sky-50 transition-colors">
                    <ExternalLink size={14} className="text-slate-400 group-hover:text-accent transition-colors" />
                  </div>
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
          <p className="text-slate-500 mb-5">Heeft u interesse? Vraag vandaag nog een vrijblijvende offerte aan.</p>
          <button
            data-testid="projecten-cta-btn"
            onClick={() => {
              const el = document.querySelector('#offerte');
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
