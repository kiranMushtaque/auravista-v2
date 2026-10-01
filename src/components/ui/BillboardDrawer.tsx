import React from 'react';
import { Billboard, CampaignCreative } from '../../types/billboard';
import { X, Upload, Sparkles, Send, Eye, Clock, MapPin, Maximize2 } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface BillboardDrawerProps {
  billboard: Billboard;
  onClose: () => void;
  onOpenAdStudio: (billboardId: string) => void;
  onRequestQuote: (billboardId: string) => void;
  onApplyCampaign: (billboardId: string, campaign: CampaignCreative) => void;
  campaigns: CampaignCreative[];
}

export const BillboardDrawer: React.FC<BillboardDrawerProps> = ({
  billboard,
  onClose,
  onOpenAdStudio,
  onRequestQuote,
  onApplyCampaign,
  campaigns
}) => {
  return (
    <aside
      aria-label="Billboard Details"
      className="absolute top-20 right-4 sm:right-6 bottom-6 z-30 w-full max-w-sm sm:max-w-md flex flex-col bg-neutral-950/90 backdrop-blur-xl border border-white/15 rounded-xl shadow-2xl overflow-hidden transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between p-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-amber-400 mb-1">
            <span>{billboard.type.toUpperCase()}</span>
            <span aria-hidden="true">·</span>
            <span>{billboard.city}</span>
          </div>
          <h2 className="text-xl font-display font-bold text-white tracking-tight">
            {billboard.name}
          </h2>
          <p className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
            <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="truncate">{billboard.address}</span>
          </p>
        </div>

        <button
          onClick={() => {
            onClose();
            soundEngine.playTick(420);
          }}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Close Billboard Details"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Core Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-neutral-900/60 border border-white/5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-0.5">
              Daily Traffic
            </div>
            <div className="text-xl font-bold font-mono text-white tabular-nums">
              {(billboard.dailyTraffic / 1000).toFixed(0)}K+
            </div>
            <div className="text-[11px] text-neutral-400">vehicles & commuters</div>
          </div>

          <div className="p-3 rounded-lg bg-neutral-900/60 border border-white/5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-0.5">
              Visibility
            </div>
            <div className="text-xl font-bold font-mono text-amber-400 tabular-nums">
              {billboard.visibilityScore}
            </div>
            <div className="text-[11px] text-neutral-400">line-of-sight rating</div>
          </div>

          <div className="p-3 rounded-lg bg-neutral-900/60 border border-white/5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-0.5">
              Dimensions
            </div>
            <div className="text-base font-bold font-mono text-white">
              {billboard.size}
            </div>
            <div className="text-[11px] text-neutral-400">{billboard.resolution.split(' ')[0]}</div>
          </div>

          <div className="p-3 rounded-lg bg-neutral-900/60 border border-white/5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-0.5">
              Status
            </div>
            <div className="flex items-center gap-1.5 text-base font-bold font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{billboard.availability}</span>
            </div>
            <div className="text-[11px] text-neutral-400">Rates from {billboard.rateWeekly}/wk</div>
          </div>
        </div>

        {/* Specifications List */}
        <div className="space-y-2.5 text-xs">
          <div className="flex items-center justify-between py-1.5 border-b border-white/5">
            <span className="text-neutral-400">Illumination Engine</span>
            <span className="text-neutral-200 font-medium text-right max-w-[200px] truncate">
              {billboard.illumination}
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-white/5">
            <span className="text-neutral-400">Average Dwell Time</span>
            <span className="text-neutral-200 font-medium">{billboard.dwellTime}</span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-white/5">
            <span className="text-neutral-400">Corridor Classification</span>
            <span className="text-neutral-200 font-medium">{billboard.district}</span>
          </div>
        </div>

        {/* Quick Campaign Switcher */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Test Sample Campaigns Live:
            </span>
            <span className="text-[11px] text-amber-400 font-mono">Real-time 3D Texture</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {campaigns.map((camp) => (
              <button
                key={camp.id}
                onClick={() => {
                  onApplyCampaign(billboard.id, camp);
                  soundEngine.playTick(540);
                }}
                className="group flex items-center gap-2 p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-white/10 hover:border-amber-400/40 text-left transition-colors"
              >
                <img
                  src={camp.imageUrl}
                  alt={camp.brand}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = '/images/campaigns/ad_fashion_campaign_1790763165729.jpg';
                  }}
                  className="w-10 h-7 object-cover rounded shrink-0 border border-white/10"
                />
                <div className="min-w-0">
                  <div className="text-[11px] font-medium text-neutral-200 group-hover:text-white truncate">
                    {camp.category}
                  </div>
                  <div className="text-[10px] text-neutral-400 truncate">{camp.brand.split(' ')[0]}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 border-t border-white/10 bg-neutral-950/95 space-y-2.5">
        <button
          onClick={() => {
            onOpenAdStudio(billboard.id);
            soundEngine.playTick(480);
          }}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-amber-400/20 transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span>Upload & Preview Your Ad</span>
        </button>

        <button
          onClick={() => {
            onRequestQuote(billboard.id);
            soundEngine.playTick(440);
          }}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-semibold uppercase tracking-wider border border-white/10 transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Request Quote for This Billboard</span>
        </button>
      </div>
    </aside>
  );
};
