import React from 'react';
import { ArrowRight } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface WhyAdvertiseProps {
  onRequestQuote: () => void;
}

export const WhyAdvertiseSection: React.FC<WhyAdvertiseProps> = ({ onRequestQuote }) => {
  const pillars = [
    {
      index: '01',
      title: 'High Traffic Density',
      description: 'Position your brand along the most critical arterial corridors and transit intersections where senior executives, consumers, and daily commuters converge.',
      metric: '820,000+',
      metricLabel: 'Verified Daily Metropolitan Reach'
    },
    {
      index: '02',
      title: 'Unobstructed Sightlines',
      description: 'Engineered for maximum line-of-sight exposure. Every billboard is angled to achieve over 350 meters of uninterrupted visual contact.',
      metric: '98.8%',
      metricLabel: 'Average Network Visibility Score'
    },
    {
      index: '03',
      title: 'Dynamic Digital Impact',
      description: 'Ultra-high-definition 4K LED screens equipped with ambient light sensors that automatically balance luminance for vivid daylight impact and dazzling nighttime presence.',
      metric: '7,500 nits',
      metricLabel: 'Peak Daylight Display Brightness'
    },
    {
      index: '04',
      title: 'Enduring Real-World Presence',
      description: 'Unlike ephemeral digital social feeds that disappear in milliseconds, prominent physical outdoor landmarks build lasting institutional trust and brand stature.',
      metric: '+64%',
      metricLabel: 'Average Brand Recall Lift vs Online'
    }
  ];

  return (
    <section id="why-us" className="py-24 px-6 lg:px-12 bg-neutral-900/40 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
            Why Partner With Aura Vista
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            BE SEEN. <br />
            <span className="text-neutral-400">BE REMEMBERED.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-300">
            Out-of-home advertising remains the most trusted, un-skippable medium in modern media. Our curated screen portfolio converts urban motion into lasting brand prestige.
          </p>
        </div>

        {/* 4 Pillars Grid with Claim-to-Proof Adjacency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {pillars.map((p) => (
            <div
              key={p.index}
              className="p-8 rounded-2xl bg-neutral-950/80 border border-white/10 hover:border-amber-400/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono text-amber-400 mb-3">{p.index}. Core Advantage</div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3">
                  {p.title}
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                  {p.description}
                </p>
              </div>

              <div className="pt-5 border-t border-white/10 flex items-baseline justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
                    {p.metric}
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5">{p.metricLabel}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mid-page Conversion Banner */}
        <div className="mt-16 p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-display font-bold text-white mb-1">
              Ready to secure prime visibility for your next launch?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300">
              Speak with our media planning team to receive an instant availability schedule and custom rate deck.
            </p>
          </div>

          <button
            onClick={() => {
              onRequestQuote();
              soundEngine.playTick(500);
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-lg transition-colors"
          >
            <span>Request Media Deck</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
