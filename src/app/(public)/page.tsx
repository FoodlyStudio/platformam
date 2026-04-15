'use client'

import Link from 'next/link'
import { Zap, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a14] flex flex-col items-center justify-center px-4">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[700px] h-[700px] rounded-full bg-[#6366f1]/[0.06] blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] rounded-full bg-[#8b5cf6]/[0.04] blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center gap-8">
        {/* Logo */}
        <div className="w-16 h-16 rounded-[18px] bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-2xl shadow-indigo-500/30">
          <Zap size={28} className="text-white" strokeWidth={2.5} />
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-[56px] sm:text-[72px] font-black text-white tracking-tight leading-none">
            System H14
          </h1>
          <p className="text-[18px] sm:text-[22px] text-white/40 font-medium tracking-wide">
            nadchodzą wielkie rzeczy
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/login"
          className="flex items-center gap-2 px-6 py-3 rounded-[12px] bg-[#6366f1] hover:bg-[#5254cc] text-white text-[15px] font-semibold transition-all shadow-lg shadow-indigo-500/25 mt-2"
        >
          Zaloguj się <ArrowRight size={15} />
        </Link>
      </div>

      {/* Footer */}
      <div className="fixed bottom-5 left-0 right-0 text-center">
        <p className="text-[11px] text-white/15">AM Automations</p>
      </div>
    </div>
  )
}
