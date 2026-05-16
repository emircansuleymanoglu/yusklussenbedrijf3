import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Diensten from './components/Diensten';
import Projecten from './components/Projecten';
import Testimonials from './components/Testimonials';
import OfferteForm from './components/OfferteForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <div className="font-body overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Diensten />
        <Projecten />
        <Testimonials />
        <OfferteForm />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
