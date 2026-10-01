import React from 'react';
import { Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface NavbarProps {
  isNight: boolean;
  onToggleNight: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
  onRequestQuote: () => void;
  onOpenAdStudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isNight,
  onToggleNight,
  isMuted,
  onToggleSound,
  onRequestQuote,
  onOpenAdStudio
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 lg:px-10 h-16 bg-neutral-950/75 backdrop-blur-md border-b border-white/10 transition-colors">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="text-lg font-display font-bold tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap"
      >
        AURA VISTA
      </a>

      {/* Zone 2: 4-6 clean text navigation links */}
      <nav className="hidden md:flex items-center gap-7 text-xs font-medium tracking-wide uppercase text-neutral-300">
        <a
          href="#experience"
          className="hover:text-white transition-colors"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          3D Experience
        </a>
        <button
          onClick={onOpenAdStudio}
          className="hover:text-amber-400 transition-colors text-xs font-medium tracking-wide uppercase"
        >
          Ad Studio
        </button>
        <a
          href="#locations"
          className="hover:text-white transition-colors"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Locations
        </a>
        <a
          href="#why-us"
          className="hover:text-white transition-colors"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Why Us
        </a>
        <a
          href="#campaigns"
          className="hover:text-white transition-colors"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('campaigns')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Campaigns
        </a>
      </nav>

      {/* Zone 3: 1-2 primary actions + day/night & sound controls */}
      <div className="flex items-center gap-3">
        {/* Day / Night Toggle */}
        <button
          onClick={() => {
            onToggleNight();
            soundEngine.playTick(isNight ? 580 : 360);
          }}
          title={isNight ? 'Switch to Day Light' : 'Switch to Cinematic Night'}
          className="p-2 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-white/10 text-neutral-300 hover:text-white transition-colors"
          aria-label={isNight ? 'Switch to Day Mode' : 'Switch to Night Mode'}
        >
          {isNight ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
        </button>

        {/* Ambient City Sound Toggle */}
        <button
          onClick={() => {
            onToggleSound();
          }}
          title={isMuted ? 'Turn Ambient Sound On' : 'Mute Ambient Sound'}
          className="p-2 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-white/10 text-neutral-300 hover:text-white transition-colors"
          aria-label="Toggle Sound"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
        </button>

        {/* Primary CTA */}
        <button
          onClick={() => {
            onRequestQuote();
            soundEngine.playTick(500);
          }}
          className="px-4 py-2 text-xs font-semibold tracking-wide uppercase text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shadow-sm"
        >
          Request Quote
        </button>
      </div>
    </header>
  );
};
