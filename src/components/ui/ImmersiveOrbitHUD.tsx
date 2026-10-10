import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, RotateCcw, Zap, Globe, Compass } from 'lucide-react'
import { useWorldStore } from '../../store/useWorldStore'

export const ImmersiveOrbitHUD: React.FC = () => {
  const {
    isEarthImmersive,
    exitImmersiveOrbit,
    resetImmersiveCamera,
    selectedCampusId,
    returnToWorld,
    campuses,
    boostSelectedCampus,
    isBoosting
  } = useWorldStore()

  if (!isEarthImmersive) return null

  const selectedCampus = campuses.find((c) => c.id === selectedCampusId)

  return (
    <div className="fixed inset-0 pointer-events-none z-40 select-none">
      {/* 1. Top Unobtrusive Control Pill */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-auto"
      >
        <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 rounded-full liquid-glass-pill specular-rim shadow-2xl">
          {/* Active Orbit Indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
            </span>
            <span className="text-[11px] font-mono tracking-wider text-text-primary uppercase font-bold">
              Direct 3D Orbit
            </span>
          </div>

          <div className="w-px h-3.5 bg-white/15" />

          {/* Reset Camera View */}
          <button
            onClick={resetImmersiveCamera}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-text-secondary hover:text-text-primary hover:bg-white/10 text-xs transition-all duration-200"
            title="Reset camera zoom and center (R)"
          >
            <RotateCcw className="w-3 h-3 text-cyan" />
            <span className="hidden sm:inline text-[11px] font-medium">Reset View</span>
          </button>

          <div className="w-px h-3.5 bg-white/15" />

          {/* Exit Orbit Button */}
          <button
            onClick={exitImmersiveOrbit}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-text-primary text-xs font-semibold transition-all duration-200 active:scale-95"
            title="Exit Immersive Orbit (Esc)"
          >
            <span>Exit Orbit</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.2 text-[9px] font-mono bg-black/40 rounded border border-white/20 text-text-secondary">
              Esc
            </kbd>
            <X className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>
      </motion.div>

      {/* 2. Bottom Minimal Instruction Pill */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto"
      >
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full liquid-glass-pill specular-rim text-[11px] text-text-secondary font-mono tracking-wide">
          <Compass className="w-3.5 h-3.5 text-cyan" />
          <span>Drag to rotate · Scroll to zoom · Click campus to inspect</span>
        </div>
      </motion.div>

      {/* 3. Compact Floating Campus Inspection Pill (Docked to corner, doesn't obstruct globe) */}
      <AnimatePresence>
        {selectedCampus && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-20 right-6 sm:bottom-6 sm:right-6 max-w-xs w-full pointer-events-auto"
          >
            <div className="spatial-glass specular-rim p-4 space-y-3 shadow-2xl">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald/15 border border-emerald/30 text-[10px] font-mono font-bold text-emerald uppercase mb-1">
                    Rank #{selectedCampus.allTimeRank} Global
                  </div>
                  <h3 className="text-sm font-bold text-text-primary leading-tight">
                    {selectedCampus.name}
                  </h3>
                  <p className="text-[11px] text-text-secondary">
                    {selectedCampus.city}, {selectedCampus.country}
                  </p>
                </div>
                <button
                  onClick={returnToWorld}
                  className="p-1 rounded-full hover:bg-white/10 text-text-secondary hover:text-text-primary transition-colors"
                  title="Deselect campus"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Verified Diversion Readout */}
              <div className="bg-black/30 rounded-xl p-2.5 flex items-center justify-between border border-white/5">
                <div>
                  <span className="text-[10px] font-mono uppercase text-text-secondary block">
                    Verified Diversion
                  </span>
                  <span className="text-base font-extrabold text-cyan font-mono">
                    {Math.round(selectedCampus.allTimeKg).toLocaleString()} kg
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-text-secondary block">
                    Sponsor Partner
                  </span>
                  <span className="text-[11px] font-semibold text-text-primary uppercase">
                    {selectedCampus.sponsorId}
                  </span>
                </div>
              </div>

              {/* Minimal Boost Action */}
              <button
                onClick={() => boostSelectedCampus(250)}
                disabled={isBoosting}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-emerald hover:brightness-110 active:scale-98 text-background font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>{isBoosting ? 'Boosting...' : 'Boost Campus (+250 kg)'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
