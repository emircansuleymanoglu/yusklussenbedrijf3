import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Send, Loader } from 'lucide-react';

const SERVICES = [
  'Stucwerk',
  'Schilderwerk',
  'Timmerwerk',
  'Vloerverwarming',
  'Elektriciteit',
  'Badkamer renovatie',
  'Keuken renovatie',
  'Algemene verbouwing',
  'Meerdere diensten',
  'Anders',
];

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const initialForm = {
  naam: '',
  email: '',
  telefoon: '',
  adres: '',
  dienst: '',
  omschrijving: '',
  honeypot: '',
};

const initialErrors = {
  naam: '',
  email: '',
  telefoon: '',
  dienst: '',
  omschrijving: '',
};

function validate(form) {
  const errors = { ...initialErrors };
  if (!form.naam.trim() || form.naam.trim().length < 2)
    errors.naam = 'Vul uw volledige naam in (minimaal 2 tekens)';
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Vul een geldig e-mailadres in';
  if (!form.telefoon.trim())
    errors.telefoon = 'Vul uw telefoonnummer in';
  if (!form.dienst)
    errors.dienst = 'Selecteer een dienst';
  if (!form.omschrijving.trim() || form.omschrijving.trim().length < 10)
    errors.omschrijving = 'Omschrijf uw project (minimaal 10 tekens)';
  return errors;
}

function hasErrors(errors) {
  return Object.values(errors).some((e) => e !== '');
}

export default function OfferteForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate(form);
    setErrors(newErrors);
    if (hasErrors(newErrors)) return;

    setLoading(true);
    setServerError('');

    try {
      const res = await fetch(`${BACKEND_URL}/api/offerte`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setForm(initialForm);
      } else {
        setServerError('Er is iets misgegaan. Probeer het opnieuw of bel ons.');
      }
    } catch {
      setServerError('Geen verbinding mogelijk. Bel ons op +31 6 21547256.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="offerte" data-testid="offerte-section" className="py-20 lg:py-32 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-tag">Gratis & vrijblijvend</span>
          <h2 className="section-title mb-4">Offerte aanvragen</h2>
          <p className="section-subtitle mx-auto">
            Vul het formulier in en wij nemen binnen 24 uur contact met u op voor een gratis en
            vrijblijvende offerte op maat.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            data-testid="offerte-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl border border-green-200 p-12 text-center shadow-sm"
          >
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={36} className="text-green-500" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-slate-900 mb-3">
              Aanvraag ontvangen!
            </h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              Bedankt voor uw offerte aanvraag. Wij nemen binnen 24 uur contact met u op.
            </p>
            <button
              data-testid="offerte-new-btn"
              onClick={() => setSubmitted(false)}
              className="btn-outline-dark"
            >
              Nog een aanvraag indienen
            </button>
          </motion.div>
        ) : (
          <motion.form
            ref={formRef}
            data-testid="offerte-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-10 shadow-sm"
            noValidate
          >
            {/* Honeypot (spam protection) */}
            <input
              type="text"
              name="honeypot"
              value={form.honeypot}
              onChange={handleChange}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Naam */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="naam">
                  Naam <span className="text-red-400">*</span>
                </label>
                <input
                  id="naam"
                  name="naam"
                  type="text"
                  data-testid="offerte-naam"
                  value={form.naam}
                  onChange={handleChange}
                  placeholder="Uw volledige naam"
                  className={`input-field ${errors.naam ? 'input-error' : ''}`}
                  autoComplete="name"
                />
                {errors.naam && (
                  <p data-testid="error-naam" className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
                    <AlertCircle size={12} /> {errors.naam}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="email">
                  E-mailadres <span className="text-red-400">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  data-testid="offerte-email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="uw@email.nl"
                  className={`input-field ${errors.email ? 'input-error' : ''}`}
                  autoComplete="email"
                />
                {errors.email && (
                  <p data-testid="error-email" className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
                    <AlertCircle size={12} /> {errors.email}
                  </p>
                )}
              </div>

              {/* Telefoon */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="telefoon">
                  Telefoonnummer <span className="text-red-400">*</span>
                </label>
                <input
                  id="telefoon"
                  name="telefoon"
                  type="tel"
                  data-testid="offerte-telefoon"
                  value={form.telefoon}
                  onChange={handleChange}
                  placeholder="+31 6 12345678"
                  className={`input-field ${errors.telefoon ? 'input-error' : ''}`}
                  autoComplete="tel"
                />
                {errors.telefoon && (
                  <p data-testid="error-telefoon" className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
                    <AlertCircle size={12} /> {errors.telefoon}
                  </p>
                )}
              </div>

              {/* Adres */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="adres">
                  Adres <span className="text-slate-400 font-normal">(optioneel)</span>
                </label>
                <input
                  id="adres"
                  name="adres"
                  type="text"
                  data-testid="offerte-adres"
                  value={form.adres}
                  onChange={handleChange}
                  placeholder="Straat, stad"
                  className="input-field"
                  autoComplete="street-address"
                />
              </div>

              {/* Dienst */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="dienst">
                  Gewenste dienst <span className="text-red-400">*</span>
                </label>
                <select
                  id="dienst"
                  name="dienst"
                  data-testid="offerte-dienst"
                  value={form.dienst}
                  onChange={handleChange}
                  className={`input-field ${errors.dienst ? 'input-error' : ''}`}
                >
                  <option value="">Selecteer een dienst...</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.dienst && (
                  <p data-testid="error-dienst" className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
                    <AlertCircle size={12} /> {errors.dienst}
                  </p>
                )}
              </div>

              {/* Omschrijving */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="omschrijving">
                  Omschrijving project <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="omschrijving"
                  name="omschrijving"
                  data-testid="offerte-omschrijving"
                  value={form.omschrijving}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Beschrijf uw project zo uitgebreid mogelijk..."
                  className={`input-field resize-none ${errors.omschrijving ? 'input-error' : ''}`}
                />
                {errors.omschrijving && (
                  <p data-testid="error-omschrijving" className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
                    <AlertCircle size={12} /> {errors.omschrijving}
                  </p>
                )}
              </div>
            </div>

            {serverError && (
              <div data-testid="server-error" className="mt-4 flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <AlertCircle size={16} />
                {serverError}
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-slate-400 text-xs">
                Uw gegevens worden vertrouwelijk behandeld en nooit gedeeld met derden.
              </p>
              <button
                type="submit"
                data-testid="offerte-submit-btn"
                disabled={loading}
                className="btn-primary w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Verzenden...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Offerte aanvragen
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
