import React from 'react'
import { RotateCcw, Cloud } from 'lucide-react'
import { useWorldStore } from '../../store/useWorldStore'

export const FooterBar: React.FC = () => {
  const { resetDemo } = useWorldStore()

  return (
    <footer className="fixed bottom-2 left-6 right-6 z-10 pointer-events-none flex flex-col sm:flex-row items-center justify-between text-[10px] text-text-muted gap-2">
      
      {/* DISCLAIMER */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <span className="font-mono text-[9px] tracking-wider text-text-subtle uppercase">
          Simulated Hackathon Dataset • Sponsor marks are structural concept illustrations
        </span>
      </div>

      {/* RIGHT UTILITIES */}
      <div className="flex items-center gap-2.5 pointer-events-auto">
        {/* Powered by AWS Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full spatial-pill text-[10px] font-mono text-text-secondary border-white/[0.06]">
          <Cloud className="w-3 h-3 text-amber" />
          <span>AWS Architecture (Amplify • Lambda • DynamoDB)</span>
        </div>

        {/* Reset Demo Button */}
        <button
          onClick={resetDemo}
          title="Reset to default campus kg rankings"
          className="flex items-center gap-1.5 px-3 py-1 rounded-full spatial-pill text-[10px] font-mono text-text-secondary hover:text-emerald hover:border-emerald/30 transition-all"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Demo</span>
        </button>
      </div>

    </footer>
  )
}

