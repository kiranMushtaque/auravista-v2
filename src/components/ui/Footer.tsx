import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface FooterProps {
  onOpenAdStudio: () => void;
  onRequestQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdStudio, onRequestQuote }) => {
  return (
    <footer className="bg-neutral-950 border-t border-white/10 text-neutral-400 py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="text-xl font-display font-bold text-white tracking-tight">
              AURA VISTA
            </a>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Premium physical and digital billboard advertising network. Curated high-impact urban landmark displays engineered for maximum metropolitan visibility and lasting brand recall.
            </p>
            <div className="flex items-center gap-4 text-xs text-neutral-500 font-mono">
              <span>EST. 2020</span>
              <span aria-hidden="true">·</span>
              <span>ISO 9001 CERTIFIED</span>
              <span aria-hidden="true">·</span>
              <span>4K MICROLED NETWORK</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white">Experience</div>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#experience"
                  className="hover:text-amber-400 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  3D Virtual City Tour
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAdStudio}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Interactive Ad Studio
                </button>
              </li>
              <li>
                <a
                  href="#locations"
                  className="hover:text-amber-400 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Billboard Inventory
                </a>
              </li>
              <li>
                <a
                  href="#campaigns"
                  className="hover:text-amber-400 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('campaigns')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Specimen Campaigns
                </a>
              </li>
            </ul>
          </div>

          {/* Billboard Corridors */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white">Locations</div>
            <ul className="space-y-2 text-xs">
              <li>Shahrah-e-Faisal Grand Digital</li>
              <li>Clifton Skyline Mega Rooftop</li>
              <li>Financial District Monolith</li>
              <li>Airport Express Highway Gantry</li>
              <li>Downtown Boulevard Spectacular</li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white">Media Sales</div>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="mailto:media@auravista.network" className="hover:text-white transition-colors">
                  media@auravista.network
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="tel:+922135890000" className="hover:text-white transition-colors">
                  +92 (21) 3589-0000
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Executive Tower 4, Clifton Block 4, Karachi</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onRequestQuote}
                className="w-full py-2 px-3 text-[11px] font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors"
              >
                Request Rate Deck
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} AURA VISTA Media Group. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Placement</span>
            <span className="hover:text-neutral-400 cursor-pointer">OOH Technical Specs</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
