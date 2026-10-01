import React, { useState } from 'react';
import { CampaignCreative, Billboard } from '../../types/billboard';
import { Sparkles, ArrowUpRight, Play } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface CampaignShowcaseProps {
  campaigns: CampaignCreative[];
  billboards: Billboard[];
  onApplyCampaignTo3D: (campaign: CampaignCreative) => void;
  onOpenAdStudio: () => void;
}

export const CampaignShowcaseSection: React.FC<CampaignShowcaseProps> = ({
  campaigns,
  billboards,
  onApplyCampaignTo3D,
  onOpenAdStudio
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(campaigns[0].category);

  const activeCampaign =
    campaigns.find((c) => c.category === activeCategory) || campaigns[0];

  return (
    <section id="campaigns" className="py-24 px-6 lg:px-12 bg-neutral-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              Cross-Industry Specimen Work
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              FROM SCREEN <br />
              <span className="text-amber-400">TO STREET.</span>
            </h2>
          </div>

          <p className="text-sm text-neutral-400 max-w-md">
            Whether launching an automotive flagship, a seasonal runway collection, or a high-growth tech platform, our large-format screens command instant authority.
          </p>
        </div>

        {/* Category Filter Tabs (Functional buttons per frontend design skill) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {campaigns.map((camp) => (
            <button
              key={camp.id}
              onClick={() => {
                setActiveCategory(camp.category);
                soundEngine.playTick(520);
              }}
              className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === camp.category
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white border border-white/10'
              }`}
            >
              {camp.category}
            </button>
          ))}
        </div>

        {/* Featured Campaign Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-900/60 rounded-3xl border border-white/10 p-6 sm:p-10 overflow-hidden">
          {/* Creative Display Frame */}
          <div className="lg:col-span-7 relative aspect-[16/9] rounded-2xl overflow-hidden bg-black border border-white/15 shadow-2xl">
            <img
              src={activeCampaign.imageUrl}
              alt={activeCampaign.brand}
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = '/images/campaigns/ad_fashion_campaign_1790763165729.jpg';
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-neutral-300">
              <span className="text-amber-400">{activeCampaign.brand}</span>
              <span className="text-neutral-400">Outdoor Creative Format 3840×1200</span>
            </div>
          </div>

          {/* Details & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
                Campaign Case Reference
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                {activeCampaign.brand}
              </h3>
              <p className="text-sm font-medium text-neutral-300 italic mb-4">
                &ldquo;{activeCampaign.tagline}&rdquo;
              </p>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {activeCampaign.description}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/70 border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-300">
                <span className="text-neutral-400">Recommended Board:</span>
                <span className="font-semibold text-white">Shahrah-e-Faisal Grand Digital</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span className="text-neutral-400">Peak Exposure Window:</span>
                <span className="font-semibold text-white">Morning & Evening Drive Times</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span className="text-neutral-400">Target Demographics:</span>
                <span className="font-semibold text-white">Affluent Professionals & Decision Makers</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  onApplyCampaignTo3D(activeCampaign);
                  soundEngine.playTransitionChime();
                  document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold uppercase tracking-wider shadow-lg transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Project Onto 3D City Billboard</span>
              </button>

              <button
                onClick={() => {
                  onOpenAdStudio();
                  soundEngine.playTick(460);
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold uppercase tracking-wider border border-white/10 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Upload Your Own</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
