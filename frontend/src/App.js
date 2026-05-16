import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ServiceDetail from './pages/ServiceDetail';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <Router>
      <div className="font-body overflow-x-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/diensten/:slug" element={<ServiceDetail />} />
        </Routes>
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
