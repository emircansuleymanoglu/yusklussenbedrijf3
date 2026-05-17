import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './pages/HomePage';
import ServiceDetail from './pages/ServiceDetail';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="font-body overflow-x-hidden">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/diensten/:slug" element={<ServiceDetail />} />
          </Routes>
          <WhatsAppButton />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
