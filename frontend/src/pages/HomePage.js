import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Diensten from '../components/Diensten';
import Projecten from '../components/Projecten';
import Testimonials from '../components/Testimonials';
import OfferteForm from '../components/OfferteForm';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to hash section (e.g. /#diensten from service pages)
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
    // Scroll to section via state (e.g. from service CTA)
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
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Diensten />
        <Projecten />
        <Testimonials />
        <OfferteForm preService={preService} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
