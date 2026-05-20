import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { PHONE, PHONE_RAW, EMAIL, REGIO, WA_MSG } from '../data/services';

const WhatsAppSVG = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function Contact() {
  const [form, setForm] = useState({ naam: '', email: '', bericht: '', honeypot: '', _token: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/token.php`)
      .then((r) => r.json())
      .then((d) => { if (d.token) setForm((p) => ({ ...p, _token: d.token })); })
      .catch(() => {});
  }, []);

  const validate = () => {
    const e = {};
    if (!form.naam.trim() || form.naam.trim().length < 2) e.naam = 'Vul uw naam in';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Geldig e-mailadres vereist';
    if (!form.bericht.trim() || form.bericht.trim().length < 10) e.bericht = 'Vul een bericht in (min. 10 tekens)';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setServerError('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setForm({ naam: '', email: '', bericht: '', honeypot: '' });
      } else {
        setServerError('Er is iets misgegaan. Probeer het later opnieuw.');
      }
    } catch {
      setServerError(`Geen verbinding. Bel ons direct op ${PHONE}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag">Neem contact op</span>
          <h2 className="section-title mb-4">Direct in contact komen</h2>
          <p className="section-subtitle mx-auto">
            Heeft u vragen of wilt u een afspraak maken? Wij reageren snel en staan altijd voor u klaar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-2xl font-bold text-slate-900 mb-8">Contactgegevens</h3>

            <div className="space-y-5 mb-10">
              {[
                { icon: Phone, label: 'Telefoon', value: PHONE, href: `tel:${PHONE}` },
                { icon: Mail, label: 'E-mail', value: EMAIL, href: `mailto:${EMAIL}` },
                { icon: MapPin, label: 'Werkgebied', value: REGIO, href: null },
              ].map(({ icon: Icon, label, value, href, external }) => (
                <div key={label} data-testid={`contact-info-${label.toLowerCase()}`} className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">{label}</div>
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="text-slate-800 font-semibold hover:text-accent transition-colors text-sm"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-slate-800 font-semibold text-sm">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Opening hours */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-accent" />
                <h4 className="font-heading font-bold text-slate-900">Openingstijden</h4>
              </div>
              <div className="space-y-2">
                {[
                  { d: 'Maandag – Vrijdag', t: '08:00 – 18:00' },
                  { d: 'Zaterdag', t: '09:00 – 16:00' },
                  { d: 'Zondag', t: 'Gesloten' },
                ].map(({ d, t }) => (
                  <div key={d} className="flex justify-between text-sm">
                    <span className="text-slate-500">{d}</span>
                    <span className={`font-semibold ${t === 'Gesloten' ? 'text-slate-400' : 'text-slate-800'}`}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${PHONE_RAW}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-whatsapp-link"
              className="mt-6 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              <WhatsAppSVG size={16} />
              Stuur een WhatsApp bericht
            </a>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {success ? (
              <div data-testid="contact-success" className="bg-green-50 border border-green-200 rounded-2xl p-10 h-full flex flex-col items-center justify-center text-center">
                <CheckCircle size={40} className="text-green-500 mb-4" />
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">Bericht ontvangen!</h3>
                <p className="text-slate-500 text-sm mb-6">Wij nemen zo spoedig mogelijk contact met u op.</p>
                <button data-testid="contact-new-btn" onClick={() => setSuccess(false)} className="btn-outline-dark">
                  Nieuw bericht sturen
                </button>
              </div>
            ) : (
              <form data-testid="contact-form" onSubmit={handleSubmit} className="space-y-5 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm" noValidate>
                <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange}
                  style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="contact-naam">
                    Naam <span className="text-red-400">*</span>
                  </label>
                  <input id="contact-naam" name="naam" type="text" data-testid="contact-naam"
                    value={form.naam} onChange={handleChange} placeholder="Uw naam"
                    className={`input-field ${errors.naam ? 'input-error' : ''}`} />
                  {errors.naam && <p data-testid="contact-error-naam" className="flex items-center gap-1 text-red-500 text-xs mt-1.5"><AlertCircle size={12} />{errors.naam}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="contact-email">
                    E-mailadres <span className="text-red-400">*</span>
                  </label>
                  <input id="contact-email" name="email" type="email" data-testid="contact-email"
                    value={form.email} onChange={handleChange} placeholder="uw@email.nl"
                    className={`input-field ${errors.email ? 'input-error' : ''}`} />
                  {errors.email && <p data-testid="contact-error-email" className="flex items-center gap-1 text-red-500 text-xs mt-1.5"><AlertCircle size={12} />{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="contact-bericht">
                    Bericht <span className="text-red-400">*</span>
                  </label>
                  <textarea id="contact-bericht" name="bericht" data-testid="contact-bericht"
                    value={form.bericht} onChange={handleChange} rows={5}
                    placeholder="Uw bericht of vraag..."
                    className={`input-field resize-none ${errors.bericht ? 'input-error' : ''}`} />
                  {errors.bericht && <p data-testid="contact-error-bericht" className="flex items-center gap-1 text-red-500 text-xs mt-1.5"><AlertCircle size={12} />{errors.bericht}</p>}
                </div>

                {serverError && (
                  <div data-testid="contact-server-error" className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <AlertCircle size={16} />{serverError}
                  </div>
                )}

                <button type="submit" data-testid="contact-submit-btn" disabled={loading}
                  className="btn-primary w-full justify-center disabled:opacity-60">
                  {loading ? <><Loader size={16} className="animate-spin" />Verzenden...</> : <><Send size={16} />Bericht sturen</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
