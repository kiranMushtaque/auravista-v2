import React from 'react';
import { Billboard } from '../../types/billboard';
import { ArrowUpRight, Sparkles, Navigation } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface HeroOverlayProps {
  billboards: Billboard[];
  selectedBillboardId: string | null;
  onSelectBillboard: (id: string) => void;
  onOpenAdStudio: () => void;
  onRequestQuote: () => void;
  isNight: boolean;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({
  billboards,
  selectedBillboardId,
  onSelectBillboard,
  onOpenAdStudio,
  onRequestQuote,
  isNight
}) => {
  // If a billboard is already selected, minimize the hero overlay so user can inspect the billboard cleanly
  if (selectedBillboardId) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 pt-24 sm:pt-28">
      {/* Top Hero Typography */}
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/10 text-xs font-mono tracking-wider text-amber-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>IMMERSIVE 3D METROPOLITAN NETWORK</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.08] mb-4 text-balance drop-shadow-md">
          MAKE YOUR BRAND <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
            IMPOSSIBLE TO MISS.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed max-w-lg mb-8 drop-shadow">
          Explore prime urban billboard locations in an interactive 360° virtual city.
          Preview your custom creative live in photorealistic scale and lighting.
        </p>

        {/* Action CTAs */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-4">
          <button
            onClick={() => {
              onSelectBillboard(billboards[0].id);
              soundEngine.playTick(520);
            }}
            className="flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-wider uppercase text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-lg hover:shadow-amber-400/20 transition-all duration-200"
          >
            <span>Explore Billboards</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              onOpenAdStudio();
              soundEngine.playTick(460);
            }}
            className="flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-wider uppercase text-white bg-neutral-900/80 hover:bg-neutral-800/90 backdrop-blur-md border border-white/15 rounded-lg transition-all duration-200"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Put Your Ad Here</span>
          </button>
        </div>
      </div>

      {/* Bottom Quick-Jump Billboard Strip */}
      <div className="pointer-events-auto w-full max-w-5xl mx-auto mt-auto pt-6">
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
            <Navigation className="w-3.5 h-3.5 text-amber-400" />
            <span>Prime City Inventory ({billboards.length} Active Screens)</span>
          </div>
          <span className="text-xs text-neutral-400 hidden sm:inline">
            Click any location to glide camera
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {billboards.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                onSelectBillboard(b.id);
                soundEngine.playTick(500);
              }}
              className="group text-left p-3 rounded-lg bg-neutral-950/80 hover:bg-neutral-900/90 backdrop-blur-md border border-white/10 hover:border-amber-400/40 transition-all duration-200"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1">
                <span>{b.size}</span>
                <span className="text-amber-400">{b.visibilityScore}</span>
              </div>
              <h4 className="text-xs font-semibold text-neutral-200 group-hover:text-white truncate">
                {b.name.split(' ')[0]} {b.name.split(' ')[1]}
              </h4>
              <p className="text-[11px] text-neutral-400 truncate">
                {b.dailyTraffic.toLocaleString()} daily reach
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
