import React, { useState, useRef } from 'react';
import { Billboard, CampaignCreative } from '../../types/billboard';
import { X, Upload, Check, AlertCircle, Sparkles, Image as ImageIcon } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface AdStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  billboards: Billboard[];
  selectedBillboardId: string | null;
  campaigns: CampaignCreative[];
  onApplyAdToBillboard: (billboardId: string, imageUrl: string) => void;
  onApplyToAllBillboards: (imageUrl: string) => void;
}

export const AdStudioModal: React.FC<AdStudioModalProps> = ({
  isOpen,
  onClose,
  billboards,
  selectedBillboardId,
  campaigns,
  onApplyAdToBillboard,
  onApplyToAllBillboards
}) => {
  const [targetId, setTargetId] = useState<string>(selectedBillboardId || billboards[0].id);
  const [previewUrl, setPreviewUrl] = useState<string>(campaigns[0].imageUrl);
  const [adName, setAdName] = useState<string>(campaigns[0].brand);
  const [isCustomUpload, setIsCustomUpload] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [appliedNotice, setAppliedNotice] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const currentBillboard = billboards.find((b) => b.id === targetId) || billboards[0];

  const handleFile = (file: File) => {
    setErrorMsg(null);
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg('Please upload a valid image file (PNG, JPG, WEBP, or SVG).');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setErrorMsg('Image size exceeds 20MB. Please upload an optimized creative.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setPreviewUrl(result);
        setAdName(file.name.replace(/\.[^/.]+$/, ''));
        setIsCustomUpload(true);
        soundEngine.playTick(600);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleApplySingle = () => {
    onApplyAdToBillboard(targetId, previewUrl);
    soundEngine.playTransitionChime();
    setAppliedNotice(true);
    setTimeout(() => {
      setAppliedNotice(false);
      onClose();
    }, 700);
  };

  const handleApplyAll = () => {
    onApplyToAllBillboards(previewUrl);
    soundEngine.playTransitionChime();
    setAppliedNotice(true);
    setTimeout(() => {
      setAppliedNotice(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-neutral-950 border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-amber-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERACTIVE AD CREATIVE STUDIO</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
              Put Your Brand On Our 3D Billboards
            </h2>
          </div>

          <button
            onClick={() => {
              onClose();
              soundEngine.playTick(420);
            }}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
            aria-label="Close Ad Studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Target Billboard Selector */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
              Select Target Billboard Location:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {billboards.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setTargetId(b.id);
                    soundEngine.playTick(500);
                  }}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    targetId === b.id
                      ? 'bg-amber-400/10 border-amber-400 text-white ring-1 ring-amber-400/30'
                      : 'bg-neutral-900/60 border-white/10 text-neutral-300 hover:border-white/25'
                  }`}
                >
                  <div className="text-[10px] font-mono text-amber-400 mb-0.5">{b.type}</div>
                  <div className="text-xs font-semibold truncate">{b.name}</div>
                  <div className="text-[11px] text-neutral-400">{b.size} · {b.city}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Upload Area / Dropzone */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-300">
                Upload Custom Campaign Artwork:
              </label>
              <span className="text-[11px] text-neutral-400">PNG, JPG, WEBP, SVG (Max 20MB)</span>
            </div>

            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              className="group cursor-pointer border-2 border-dashed border-neutral-700 hover:border-amber-400/80 rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center text-center bg-neutral-900/40 hover:bg-neutral-900/80 transition-all"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFile(e.target.files[0]);
                  }
                }}
              />
              <div className="w-12 h-12 rounded-full bg-neutral-800 group-hover:bg-amber-400/20 flex items-center justify-center text-amber-400 mb-3 transition-colors">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-white mb-1">
                Drag and drop your creative here, or <span className="text-amber-400 underline underline-offset-2">browse files</span>
              </p>
              <p className="text-xs text-neutral-400">
                Recommended aspect ratio: 16:9 or ~3:1 (e.g. 3840 × 1200 px)
              </p>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 mt-2 text-xs text-red-400 bg-red-950/40 border border-red-800/40 p-2.5 rounded-lg">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          {/* Presets / Sample Campaigns */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-300">
                Or Test With Specimen Agency Campaigns:
              </span>
              <span className="text-[11px] text-neutral-400">Instant One-Click Load</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {campaigns.map((camp) => (
                <button
                  key={camp.id}
                  onClick={() => {
                    setPreviewUrl(camp.imageUrl);
                    setAdName(camp.brand);
                    setIsCustomUpload(false);
                    setErrorMsg(null);
                    soundEngine.playTick(520);
                  }}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    previewUrl === camp.imageUrl
                      ? 'bg-neutral-800 border-amber-400 ring-1 ring-amber-400/40'
                      : 'bg-neutral-900 border-white/10 hover:border-white/20'
                  }`}
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
                    className="w-full h-16 object-cover rounded mb-2 border border-white/5"
                  />
                  <div className="text-[11px] font-semibold text-white truncate">{camp.category}</div>
                  <div className="text-[10px] text-neutral-400 truncate">{camp.brand}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Preview On Simulated Screen */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-300">
                Creative Preview & Physical Dimensions:
              </span>
              <span className="text-xs font-mono text-amber-400">
                Fitting onto {currentBillboard.size}
              </span>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-neutral-800 bg-black aspect-[16/7] flex items-center justify-center p-2 shadow-inner">
              <img
                src={previewUrl}
                alt="Ad Preview"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = '/images/campaigns/ad_fashion_campaign_1790763165729.jpg';
                }}
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300">
                {adName} · {isCustomUpload ? 'Custom Brand Creative' : 'Demo Campaign'}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 border-t border-white/10 bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-neutral-400">
            Clicking apply instantly projects this texture into the active 3D city scene.
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleApplyAll}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-white/15 text-neutral-200 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Apply to All Screens
            </button>

            <button
              onClick={handleApplySingle}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-amber-400/25 transition-all"
            >
              {appliedNotice ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Placed on 3D Screen!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Place on {currentBillboard.name.split(' ')[0]} Billboard</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
