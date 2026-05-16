import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone } from 'lucide-react';

const WA_NUMBER = '31621547256';
const WA_MESSAGE = encodeURIComponent('Hallo Yus Klussenbedrijf, ik heb interesse in uw diensten. Kunt u mij meer informatie geven?');

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            data-testid="whatsapp-tooltip"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="bg-white border border-slate-200 rounded-2xl shadow-xl p-4 max-w-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
                  <MessageCircle size={16} className="text-white" />
                </div>
                <div>
                  <div className="font-heading font-bold text-slate-900 text-sm">WhatsApp</div>
                  <div className="text-xs text-green-500 font-medium">Online</div>
                </div>
              </div>
              <button
                data-testid="whatsapp-close"
                onClick={() => setShowTooltip(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed mb-3">
              Stuur ons een WhatsApp bericht voor snelle hulp of een gratis offerte aanvraag!
            </p>
            <div className="flex gap-2">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
                data-testid="whatsapp-chat-link"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold py-2 px-3 rounded-xl text-center transition-colors flex items-center justify-center gap-1"
              >
                <MessageCircle size={13} />
                WhatsApp chat
              </a>
              <a
                href="tel:+31621547256"
                data-testid="whatsapp-phone-link"
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 px-3 rounded-xl text-center transition-colors flex items-center justify-center gap-1"
              >
                <Phone size={13} />
                Bellen
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp button */}
      <motion.button
        data-testid="whatsapp-btn"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 1.5, stiffness: 200 }}
        onClick={() => setShowTooltip(!showTooltip)}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        aria-label="WhatsApp contact"
      >
        <MessageCircle size={26} />
      </motion.button>
    </div>
  );
}
