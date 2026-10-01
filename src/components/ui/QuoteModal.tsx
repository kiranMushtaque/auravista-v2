import React, { useState } from 'react';
import { Billboard, QuoteRequest } from '../../types/billboard';
import { X, CheckCircle, Send, ShieldCheck, Calendar, DollarSign } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  billboards: Billboard[];
  defaultBillboardId: string | null;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  billboards,
  defaultBillboardId
}) => {
  const [formData, setFormData] = useState<QuoteRequest>({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    campaignType: 'Brand Awareness / Product Launch',
    selectedBillboardId: defaultBillboardId || billboards[0].id,
    durationWeeks: 4,
    startDate: '',
    budgetRange: '$15,000 - $30,000',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [refId, setRefId] = useState('');

  if (!isOpen) return null;

  const currentBillboard =
    billboards.find((b) => b.id === formData.selectedBillboardId) || billboards[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    soundEngine.playTick(500);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      const generatedRef = `AV-${Math.floor(100000 + Math.random() * 900000)}`;
      setRefId(generatedRef);
      soundEngine.playTransitionChime();
    }, 800);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-neutral-950 border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-0.5">
              Direct Media Placement
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
              Request Billboard Quote & Availability
            </h2>
          </div>

          <button
            onClick={() => {
              onClose();
              soundEngine.playTick(420);
            }}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
            aria-label="Close Quote Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body or Success State */}
        <div className="flex-1 overflow-y-auto p-6">
          {isSuccess ? (
            <div className="py-8 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-display font-bold text-white">
                Quote Proposal Dispatched
              </h3>

              <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 text-xs font-mono text-neutral-300 max-w-sm">
                <div>REFERENCE NUMBER: <span className="text-amber-400 font-bold">{refId}</span></div>
                <div className="text-neutral-400 mt-1">Target Screen: {currentBillboard.name}</div>
                <div className="text-neutral-400">Duration: {formData.durationWeeks} Weeks</div>
              </div>

              <p className="text-sm text-neutral-300 max-w-md">
                Thank you, {formData.fullName}. Our media sales director will review your schedule and contact you at <span className="text-white font-medium">{formData.email}</span> within 2 business hours with an official rate deck and hold reservation.
              </p>

              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Close & Return to 3D Experience
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Selected Billboard Summary Bar */}
              <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-neutral-400 block text-[11px] font-mono">SELECTED SCREEN:</span>
                  <span className="font-semibold text-white">{currentBillboard.name}</span>
                  <span className="text-neutral-400 text-[11px] ml-2 font-mono">({currentBillboard.size})</span>
                </div>
                <div className="text-right">
                  <span className="text-neutral-400 block text-[11px] font-mono">INDICATIVE RATE:</span>
                  <span className="font-mono text-amber-400 font-bold">{currentBillboard.rateWeekly} / week</span>
                </div>
              </div>

              {/* Contact Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Company / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Voltix Motors"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              {/* Campaign Specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Preferred Billboard Location
                  </label>
                  <select
                    value={formData.selectedBillboardId}
                    onChange={(e) => setFormData({ ...formData, selectedBillboardId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    {billboards.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.size})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Campaign Duration
                  </label>
                  <select
                    value={formData.durationWeeks}
                    onChange={(e) => setFormData({ ...formData, durationWeeks: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option value={2}>2 Weeks (Flash Launch)</option>
                    <option value={4}>4 Weeks (Standard Flight)</option>
                    <option value={8}>8 Weeks (Quarterly Domination)</option>
                    <option value={12}>12 Weeks (Sustained Brand Campaign)</option>
                    <option value={26}>26 Weeks (Half-Year Exclusive)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Target Launch Window
                  </label>
                  <input
                    type="month"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Campaign Category
                  </label>
                  <select
                    value={formData.campaignType}
                    onChange={(e) => setFormData({ ...formData, campaignType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option value="Automotive">Automotive</option>
                    <option value="Fashion & Luxury">Fashion & Luxury</option>
                    <option value="Technology & SaaS">Technology & SaaS</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Retail & FMCG">Retail & FMCG</option>
                    <option value="Entertainment & Media">Entertainment & Media</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                  Campaign Objectives & Special Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Share details regarding your target audience, dayparting preferences, multi-screen synchronisation, or custom creative formats..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-amber-400/25 transition-all disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Processing Flight Availability...' : 'Submit Quote Request'}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Guaranteed response within 2 hours · Direct agency rate deck</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
