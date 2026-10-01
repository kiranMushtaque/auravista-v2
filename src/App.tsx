import React, { useState, useCallback } from 'react';
import { BILLBOARDS } from './data/billboards';
import { SAMPLE_CAMPAIGNS } from './data/campaigns';
import { Billboard, CampaignCreative } from './types/billboard';
import { CityCanvas } from './components/3d/CityCanvas';
import { Navbar } from './components/ui/Navbar';
import { HeroOverlay } from './components/ui/HeroOverlay';
import { BillboardDrawer } from './components/ui/BillboardDrawer';
import { AdStudioModal } from './components/ui/AdStudioModal';
import { LocationsSection } from './components/ui/LocationsSection';
import { WhyAdvertiseSection } from './components/ui/WhyAdvertiseSection';
import { CampaignShowcaseSection } from './components/ui/CampaignShowcaseSection';
import { QuoteModal } from './components/ui/QuoteModal';
import { Footer } from './components/ui/Footer';
import { soundEngine } from './utils/audio';
import { ArrowRight, Sparkles, Navigation } from 'lucide-react';

export default function App() {
  const [billboards, setBillboards] = useState<Billboard[]>(BILLBOARDS);
  const [selectedBillboardId, setSelectedBillboardId] = useState<string | null>(null);
  const [hoveredBillboardId, setHoveredBillboardId] = useState<string | null>(null);
  const [isNight, setIsNight] = useState<boolean>(true); // Start in cinematic night mode
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Modals state
  const [isAdStudioOpen, setIsAdStudioOpen] = useState<boolean>(false);
  const [studioTargetBillboardId, setStudioTargetBillboardId] = useState<string | null>(null);

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [quoteTargetBillboardId, setQuoteTargetBillboardId] = useState<string | null>(null);

  // Toggle Day/Night
  const handleToggleNight = useCallback(() => {
    setIsNight((prev) => !prev);
  }, []);

  // Toggle Sound
  const handleToggleSound = useCallback(() => {
    const unmuted = soundEngine.toggle();
    setIsMuted(!unmuted);
  }, []);

  // Select Billboard
  const handleSelectBillboard = useCallback((id: string | null) => {
    setSelectedBillboardId(id);
  }, []);

  // Explore from Location Section to 3D scene
  const handleExploreIn3D = useCallback((id: string) => {
    setSelectedBillboardId(id);
    const heroEl = document.getElementById('experience');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Open Ad Studio
  const handleOpenAdStudio = useCallback((billboardId?: string) => {
    setStudioTargetBillboardId(billboardId || selectedBillboardId || billboards[0].id);
    setIsAdStudioOpen(true);
  }, [selectedBillboardId, billboards]);

  // Open Quote Modal
  const handleOpenQuoteModal = useCallback((billboardId?: string) => {
    setQuoteTargetBillboardId(billboardId || selectedBillboardId || billboards[0].id);
    setIsQuoteModalOpen(true);
  }, [selectedBillboardId, billboards]);

  // Apply Ad to single Billboard
  const handleApplyAdToBillboard = useCallback((billboardId: string, imageUrl: string) => {
    setBillboards((prev) =>
      prev.map((b) => (b.id === billboardId ? { ...b, currentAdUrl: imageUrl } : b))
    );
  }, []);

  // Apply Ad to all Billboards
  const handleApplyToAllBillboards = useCallback((imageUrl: string) => {
    setBillboards((prev) => prev.map((b) => ({ ...b, currentAdUrl: imageUrl })));
  }, []);

  // Apply Preset Campaign
  const handleApplyCampaign = useCallback((billboardId: string, campaign: CampaignCreative) => {
    setBillboards((prev) =>
      prev.map((b) => (b.id === billboardId ? { ...b, currentAdUrl: campaign.imageUrl } : b))
    );
  }, []);

  // Apply campaign across all boards from showcase
  const handleApplyCampaignTo3D = useCallback((campaign: CampaignCreative) => {
    setBillboards((prev) =>
      prev.map((b) => ({ ...b, currentAdUrl: campaign.imageUrl }))
    );
    setSelectedBillboardId(billboards[0].id);
  }, [billboards]);

  const selectedBillboard = billboards.find((b) => b.id === selectedBillboardId) || null;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-400 selection:text-neutral-950">
      {/* Top Bar Navigation */}
      <Navbar
        isNight={isNight}
        onToggleNight={handleToggleNight}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        onRequestQuote={() => handleOpenQuoteModal()}
        onOpenAdStudio={() => handleOpenAdStudio()}
      />

      {/* Hero Section: 3D WebGL City & Billboard Experience */}
      <main id="experience" className="relative w-full h-screen min-h-[640px] overflow-hidden pt-16">
        {/* Three.js Canvas */}
        <CityCanvas
          billboards={billboards}
          selectedBillboardId={selectedBillboardId}
          onSelectBillboard={handleSelectBillboard}
          isNight={isNight}
          onToggleNight={handleToggleNight}
          hoveredBillboardId={hoveredBillboardId}
          onHoverBillboard={setHoveredBillboardId}
        />

        {/* Hero Overlay (Headline & Quick Jump buttons) */}
        <HeroOverlay
          billboards={billboards}
          selectedBillboardId={selectedBillboardId}
          onSelectBillboard={handleSelectBillboard}
          onOpenAdStudio={() => handleOpenAdStudio()}
          onRequestQuote={() => handleOpenQuoteModal()}
          isNight={isNight}
        />

        {/* Selected Billboard Details Glass Drawer */}
        {selectedBillboard && (
          <BillboardDrawer
            billboard={selectedBillboard}
            onClose={() => handleSelectBillboard(null)}
            onOpenAdStudio={(id) => handleOpenAdStudio(id)}
            onRequestQuote={(id) => handleOpenQuoteModal(id)}
            onApplyCampaign={handleApplyCampaign}
            campaigns={SAMPLE_CAMPAIGNS}
          />
        )}
      </main>

      {/* Locations Explorer Section */}
      <LocationsSection
        billboards={billboards}
        onExploreIn3D={handleExploreIn3D}
        onRequestQuote={handleOpenQuoteModal}
        onOpenAdStudio={handleOpenAdStudio}
      />

      {/* Why Advertise Section */}
      <WhyAdvertiseSection onRequestQuote={() => handleOpenQuoteModal()} />

      {/* Campaign Showcase Section */}
      <CampaignShowcaseSection
        campaigns={SAMPLE_CAMPAIGNS}
        billboards={billboards}
        onApplyCampaignTo3D={handleApplyCampaignTo3D}
        onOpenAdStudio={() => handleOpenAdStudio()}
      />

      {/* Large Advertiser Conversion CTA */}
      <section className="py-24 px-6 lg:px-12 bg-neutral-950 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-neutral-950 to-neutral-950 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-white/10 text-xs font-mono text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXECUTIVE ADVERTISER FLIGHT BOOKINGS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight mb-6 leading-tight">
            READY TO PUT YOUR BRAND <br />
            <span className="text-amber-400">OUT THERE?</span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Tell us about your brand vision, target flight dates, and market objectives. Our media strategists will assemble a bespoke high-impact outdoor campaign package.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleOpenQuoteModal()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold uppercase tracking-wider shadow-xl hover:shadow-amber-400/20 transition-all duration-200"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleOpenAdStudio()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider border border-white/15 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Launch 3D Ad Studio</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer
        onOpenAdStudio={() => handleOpenAdStudio()}
        onRequestQuote={() => handleOpenQuoteModal()}
      />

      {/* "Put Your Ad Here" Ad Studio Modal */}
      <AdStudioModal
        isOpen={isAdStudioOpen}
        onClose={() => setIsAdStudioOpen(false)}
        billboards={billboards}
        selectedBillboardId={studioTargetBillboardId}
        campaigns={SAMPLE_CAMPAIGNS}
        onApplyAdToBillboard={handleApplyAdToBillboard}
        onApplyToAllBillboards={handleApplyToAllBillboards}
      />

      {/* Quote Request Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        billboards={billboards}
        defaultBillboardId={quoteTargetBillboardId}
      />
    </div>
  );
}
