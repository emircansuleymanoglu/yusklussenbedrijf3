import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const FAQS = [
  {
    q: 'Wat doet een klussenbedrijf?',
    a: 'Een klussenbedrijf voert allerlei klus- en renovatiewerkzaamheden uit aan woningen en bedrijfspanden. Bij YUS Klussenbedrijf kunt u terecht voor stucwerk, schilderwerk, badkamer renovaties, vloeren, timmerwerk, elektriciteit, vloerverwarming en complete verbouwingen.',
  },
  {
    q: 'In welke regio werkt YUS Klussenbedrijf?',
    a: 'Wij zijn actief door heel Nederland, met opdrachten in Rotterdam, Amsterdam, Den Haag, Utrecht, Eindhoven, Tilburg, Breda, Den Bosch en omstreken. Neem contact op voor uw locatie.',
  },
  {
    q: 'Kan ik vrijblijvend een offerte aanvragen?',
    a: 'Ja, zeker! Via ons offerteformulier kunt u gratis en vrijblijvend een offerte aanvragen. Wij nemen binnen 24 uur contact met u op voor een persoonlijke afspraak.',
  },
  {
    q: 'Doen jullie ook complete renovaties?',
    a: 'Absoluut. Wij verzorgen complete verbouwingen van A tot Z: van het slopen van wanden tot de strakke eindafwerking. U hoeft maar één aannemer in te schakelen voor uw hele project.',
  },
  {
    q: 'Hoe snel kunnen jullie starten?',
    a: 'Na de offerte en akkoord plannen we zo snel mogelijk een startdatum in. Voor kleinere klussen is dit vaak binnen een week. Voor grotere projecten stemmen we de planning in overleg af.',
  },
  {
    q: 'Werken jullie ook voor kleine klussen?',
    a: 'Ja, wij helpen ook bij kleinere klussen zoals het stuken van een muur, schilderen van een kamer of het vervangen van een stopcontact. Geen klus is te klein voor ons.',
  },
  {
    q: 'Doen jullie badkamer renovaties?',
    a: 'Ja, wij doen complete badkamer renovaties inclusief tegelwerk, sanitair, inloopdouche, betegeling en afwerking. Van ontwerp tot oplevering regelen wij alles voor u.',
  },
  {
    q: 'Kunnen jullie stucwerk en schilderwerk combineren?',
    a: 'Zeker. Veel klanten laten stucwerk en schilderwerk in één project uitvoeren. Dat is efficiënter en zorgt voor een mooier eindresultaat. Wij combineren diensten graag voor u.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-slate-50">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-tag">Veelgestelde vragen</span>
          <h2 className="section-title mb-4">Alles wat u wil weten</h2>
          <p className="section-subtitle mx-auto">
            Heeft u een andere vraag? Neem gerust contact met ons op.
          </p>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map(({ q, a }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50 transition-colors"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-slate-900 text-sm lg:text-base">{q}</span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 text-slate-400 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                      {a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
