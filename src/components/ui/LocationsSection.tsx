import React from 'react';
import { Billboard } from '../../types/billboard';
import { ArrowUpRight, Eye, Users, Clock, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface LocationsSectionProps {
  billboards: Billboard[];
  onExploreIn3D: (billboardId: string) => void;
  onRequestQuote: (billboardId: string) => void;
  onOpenAdStudio: (billboardId: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({
  billboards,
  onExploreIn3D,
  onRequestQuote,
  onOpenAdStudio
}) => {
  return (
    <section id="locations" className="py-24 px-6 lg:px-12 bg-neutral-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              Citywide Digital & Physical Inventory
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              Find Your Perfect Location
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            Every screen is strategically placed at major urban arteries and commercial nodes to ensure continuous consumer attention and maximum dwell time.
          </p>
        </div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {billboards.map((b) => (
            <div
              key={b.id}
              className="group flex flex-col justify-between bg-neutral-900/60 rounded-2xl border border-white/10 hover:border-amber-400/40 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-400/5"
            >
              <div>
                {/* Visual Preview Thumbnail with current active creative */}
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black mb-5 border border-white/10">
                  <img
                    src={b.currentAdUrl}
                    alt={b.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = '/images/campaigns/billboard_faisal_photo_1790816985555.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Clean unboxed tag overlay */}
                  <div className="absolute top-3 left-3 text-[11px] font-mono tracking-wider text-amber-300 drop-shadow">
                    {b.type} · {b.size}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-200">
                    <span className="font-mono text-emerald-400">{b.availability}</span>
                    <span className="font-mono text-white">{b.rateWeekly}/wk</span>
                  </div>
                </div>

                {/* Card Title & Location */}
                <h3 className="text-xl font-display font-bold text-white mb-1.5 group-hover:text-amber-400 transition-colors">
                  {b.name}
                </h3>
                <p className="text-xs text-neutral-400 mb-4 line-clamp-2">
                  {b.address}
                </p>

                {/* Quantitative Metrics using clean tabular text */}
                <div className="flex items-center gap-4 text-xs font-mono text-neutral-300 py-3 border-y border-white/10 mb-5">
                  <div>
                    <span className="text-neutral-400 text-[10px] block">DAILY TRAFFIC</span>
                    <span className="font-bold text-white tabular-nums">
                      {(b.dailyTraffic / 1000).toFixed(0)}K+
                    </span>
                  </div>
                  <span aria-hidden="true" className="text-neutral-700">·</span>
                  <div>
                    <span className="text-neutral-400 text-[10px] block">VISIBILITY</span>
                    <span className="font-bold text-amber-400 tabular-nums">
                      {b.visibilityScore}
                    </span>
                  </div>
                  <span aria-hidden="true" className="text-neutral-700">·</span>
                  <div>
                    <span className="text-neutral-400 text-[10px] block">DWELL TIME</span>
                    <span className="font-bold text-white tabular-nums">
                      {b.dwellTime.split(' ')[0]}s
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 pt-2">
                <button
                  onClick={() => {
                    onExploreIn3D(b.id);
                    soundEngine.playTick(500);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Explore in 3D</span>
                </button>

                <button
                  onClick={() => {
                    onOpenAdStudio(b.id);
                    soundEngine.playTick(460);
                  }}
                  className="p-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-white/10 transition-colors"
                  title="Upload creative to this billboard"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </button>

                <button
                  onClick={() => {
                    onRequestQuote(b.id);
                    soundEngine.playTick(420);
                  }}
                  className="py-2.5 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold uppercase tracking-wider border border-white/10 transition-colors"
                >
                  Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
