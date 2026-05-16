import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, MessageCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { SERVICES, PHONE, PHONE_RAW } from '../data/services';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = SERVICES.find((s) => s.slug === slug);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (service) {
      document.title = `${service.title} | Yus Klussenbedrijf`;
      window.scrollTo(0, 0);
    }
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-slate-500 text-lg mb-4">Dienst niet gevonden.</p>
        <Link to="/" className="btn-primary">Terug naar home</Link>
      </div>
    );
  }

  const handleOfferte = () => {
    navigate('/', { state: { preService: service.formValue, scrollTo: 'offerte' } });
  };

  const prev = () => setActiveImg((i) => (i - 1 + service.images.length) % service.images.length);
  const next = () => setActiveImg((i) => (i + 1) % service.images.length);

  const otherServices = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm text-slate-500">
              <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              <span>/</span>
              <button
                onClick={() => navigate('/', { state: { scrollTo: 'diensten' } })}
                className="hover:text-accent transition-colors"
              >
                Diensten
              </button>
              <span>/</span>
              <span className="text-slate-800 font-medium">{service.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-white py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <button
                  onClick={() => navigate('/', { state: { scrollTo: 'diensten' } })}
                  className="inline-flex items-center gap-2 text-accent text-sm font-semibold mb-6 hover:text-accent-hover transition-colors group"
                  data-testid="back-to-diensten"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  Alle diensten
                </button>

                <div className={`w-14 h-14 ${service.bg} rounded-2xl flex items-center justify-center mb-6`}>
                  <service.icon size={26} className={service.color} />
                </div>

                <span className="section-tag">{service.shortTitle}</span>
                <h1 className="font-heading text-4xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
                  {service.title}
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed mb-8">
                  {service.tagline}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    data-testid="service-offerte-btn"
                    onClick={handleOfferte}
                    className="btn-primary"
                  >
                    Offerte aanvragen
                    <ArrowRight size={16} />
                  </button>
                  <a
                    href={`https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(`Hallo, ik heb interesse in ${service.title}. Kunt u mij meer informatie geven?`)}`}
                    data-testid="service-whatsapp-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm uppercase tracking-wide rounded-xl transition-all duration-200"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                </div>

                {/* Quick stats */}
                <div className="mt-10 flex flex-wrap gap-6 pt-8 border-t border-slate-100">
                  {['Gratis offerte', 'Snel gerealiseerd', 'Kwaliteitsgarantie'].map((tag) => (
                    <div key={tag} className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-accent flex-shrink-0" />
                      <span className="text-sm font-semibold text-slate-700">{tag}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right: image carousel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 shadow-2xl">
                  <img
                    key={activeImg}
                    src={service.images[activeImg]}
                    alt={`${service.title} - afbeelding ${activeImg + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {service.images.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        data-testid="img-prev"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow"
                      >
                        <ChevronLeft size={18} className="text-slate-700" />
                      </button>
                      <button
                        onClick={next}
                        data-testid="img-next"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow"
                      >
                        <ChevronRight size={18} className="text-slate-700" />
                      </button>
                      {/* Dots */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {service.images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveImg(i)}
                            className={`w-2 h-2 rounded-full transition-all ${i === activeImg ? 'bg-white w-5' : 'bg-white/50'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Description + benefits + included */}
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Description */}
              <div className="lg:col-span-2 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    Over {service.shortTitle}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-base lg:text-lg">
                    {service.description}
                  </p>
                </motion.div>

                {/* Gallery strip */}
                {service.images.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <h3 className="font-heading text-lg font-bold text-slate-900 mb-4">Projectfoto's</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {service.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImg(i)}
                          className={`rounded-xl overflow-hidden aspect-square bg-slate-100 border-2 transition-all ${
                            i === activeImg ? 'border-accent shadow-md' : 'border-transparent hover:border-slate-300'
                          }`}
                        >
                          <img
                            src={img}
                            alt={`${service.title} ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sidebar: Benefits + Included */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-2xl border border-slate-200 p-6"
                >
                  <h3 className="font-heading font-bold text-slate-900 mb-5">Voordelen</h3>
                  <ul className="space-y-3">
                    {service.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <CheckCircle size={17} className="text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white rounded-2xl border border-slate-200 p-6"
                >
                  <h3 className="font-heading font-bold text-slate-900 mb-5">Wat is inbegrepen?</h3>
                  <ul className="space-y-3">
                    {service.included.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Contact card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`${service.bg} rounded-2xl border border-slate-200 p-6`}
                >
                  <h3 className="font-heading font-bold text-slate-900 mb-2">Vragen?</h3>
                  <p className="text-slate-500 text-sm mb-4">
                    Neem direct contact met ons op voor advies of een gratis offerte.
                  </p>
                  <a
                    href={`tel:${PHONE}`}
                    className="block text-center font-bold text-slate-900 hover:text-accent transition-colors mb-2 text-sm"
                  >
                    {PHONE}
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-slate-900 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-sky-400 mb-4">
                Gratis & vrijblijvend
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
                Interesse in {service.shortTitle.toLowerCase()}?
              </h2>
              <p className="text-slate-400 mb-8 text-lg">
                Vraag vandaag nog een gratis offerte aan. Wij nemen binnen 24 uur contact met u op.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  data-testid="service-cta-offerte"
                  onClick={handleOfferte}
                  className="btn-primary text-base px-8 py-4"
                >
                  Gratis offerte aanvragen
                  <ArrowRight size={18} />
                </button>
                <a
                  href={`https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(`Hallo, ik heb interesse in ${service.title}. Kunt u mij meer informatie geven?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm uppercase tracking-wide rounded-xl transition-all duration-200"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Other services */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-8">
              Andere diensten
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  to={`/diensten/${s.slug}`}
                  data-testid={`related-service-${s.slug}`}
                  className="group flex items-start gap-4 p-5 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <s.icon size={20} className={s.color} />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-slate-900 text-base mb-1 group-hover:text-accent transition-colors">
                      {s.title}
                    </div>
                    <div className="text-slate-500 text-xs line-clamp-2">{s.tagline}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
