import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Diensten from '../components/Diensten';
import Projecten from '../components/Projecten';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Werkgebied from '../components/Werkgebied';
import OfferteForm from '../components/OfferteForm';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(location.state.scrollTo);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, [location.hash, location.state]);

  const preService = location.state?.preService || null;

  return (
    <>
      <SEO
        title="YUS Klussenbedrijf | Renovatie, Stucwerk & Schilderwerk in Nederland"
        description="YUS Klussenbedrijf – betrouwbaar klus- en renovatiebedrijf in Nederland. Stucwerk, schilderwerk, badkamer renovatie, verbouwingen, vloeren en meer. Vraag vrijblijvend een offerte aan."
        canonical="/"
      />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Diensten />
        <Projecten />
        <Testimonials />
        <Werkgebied />
        <FAQ />
        <OfferteForm preService={preService} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
