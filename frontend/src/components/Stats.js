import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Star, Award } from 'lucide-react';

const stats = [
  { icon: Award, value: '10+', label: 'Jaar vakmanschap', desc: 'Ruime ervaring in renovatie' },
  { icon: Star, value: '250+', label: 'Voltooide projecten', desc: 'Blije klanten door heel NL' },
  { icon: Shield, value: '100%', label: 'Kwaliteitsgarantie', desc: 'Wij staan voor ons werk' },
  { icon: Clock, value: '24u', label: 'Reactietijd', desc: 'Snel en betrouwbaar contact' },
];

export default function Stats() {
  return (
    <section id="stats" data-testid="stats-section" className="bg-white py-16 lg:py-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              data-testid={`stat-item-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-sky-100 transition-colors">
                <stat.icon size={22} className="text-accent" />
              </div>
              <div className="font-heading text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
              <div className="font-semibold text-slate-800 text-sm mb-1">{stat.label}</div>
              <div className="text-slate-500 text-xs">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
