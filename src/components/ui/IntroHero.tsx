import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ShieldCheck, Sparkles, Orbit } from 'lucide-react'
import { useWorldStore } from '../../store/useWorldStore'

export const IntroHero: React.FC = () => {
  const { isIntro, enterWorld } = useWorldStore()

  if (!isIntro) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-30 flex items-center justify-center p-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -25, scale: 0.96 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl w-full text-center space-y-7 pointer-events-auto"
        >
          {/* Spatial Micro Tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full spatial-pill border-white/10 text-xs font-semibold tracking-wide text-text-secondary"
          >
            <div className="w-2 h-2 rounded-full bg-emerald animate-pulse shadow-emerald-glow" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-text-primary">
              GLOBAL IMPACT WORLD
            </span>
            <span className="text-white/20">•</span>
            <span className="text-emerald font-medium">18 UNIVERSITIES</span>
          </motion.div>

          {/* Enormous Editorial Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-text-primary leading-[1.08]">
              Turn Dead Tech into{' '}
              <span className="block mt-1 font-extrabold bg-gradient-to-r from-emerald via-cyan to-lavender bg-clip-text text-transparent">
                Living Earth.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-text-secondary max-w-lg mx-auto font-normal leading-relaxed">
              Universities rise as holographic architectural towers sized by verified e-waste diversion,
              crowned by corporate sustainability partners.
            </p>
          </div>

          {/* Spatial Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={enterWorld}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-emerald text-background font-bold text-sm tracking-wide shadow-emerald-glow hover:shadow-[0_0_35px_rgba(48,209,88,0.45)] hover:brightness-105 active:scale-[0.97] transition-all duration-300"
            >
              <span>Enter the World</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Reassurance Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-text-muted pt-1">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald" />
              <span>Zero Honor-System Bias</span>
            </span>
            <span className="text-white/15">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Orbit className="w-3.5 h-3.5 text-cyan" />
              <span>60 FPS Spatial WebGL</span>
            </span>
            <span className="text-white/15">•</span>
            <span className="text-text-muted">AWS Serverless Ready</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

