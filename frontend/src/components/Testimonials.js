import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Jan de Vries',
    role: 'Woningeigenaar, Amsterdam',
    rating: 5,
    text: 'Yus heeft onze badkamer volledig gerenoveerd. Vakkundig werk, op tijd klaar en netjes opgeleverd. Absoluut een aanrader voor iedereen die op zoek is naar betrouwbaar renovatiewerk.',
  },
  {
    id: 2,
    name: 'Fatima El Bouzidi',
    role: 'Huiseigenaar, Rotterdam',
    rating: 5,
    text: 'Wij hebben Yus Klussenbedrijf ingeschakeld voor de renovatie van onze keuken en woonkamer. Het resultaat overtrof onze verwachtingen. Professioneel, vriendelijk en transparant in communicatie.',
  },
  {
    id: 3,
    name: 'Peter Janssen',
    role: 'Appartementseigenaar, Utrecht',
    rating: 5,
    text: 'Geweldig bedrijf! Stucwerk en schilderwerk in het hele appartement perfect uitgevoerd. Schone werkplek, nette afwerking en een eerlijke prijs. Meer dan tevreden!',
  },
];

export default function Testimonials() {
  return (
    <section data-testid="testimonials-section" className="py-20 lg:py-32 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-sky-400 mb-4">
            Wat klanten zeggen
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Tevreden klanten zijn onze trots
          </h2>
          <p className="text-slate-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Lees wat onze klanten over ons zeggen na het voltooien van hun renovatieproject.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              data-testid={`testimonial-${t.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-sky-700/50 transition-colors"
            >
              {/* Quote icon */}
              <Quote size={28} className="text-sky-500 mb-5 opacity-60" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={15} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                "{t.text}"
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-sky-400 font-bold text-sm font-heading">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
