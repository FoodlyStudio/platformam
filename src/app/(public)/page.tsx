'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Zap, ArrowRight, CheckCircle2, BarChart3, Users, Sparkles,
  KanbanSquare, DollarSign, Globe, FileText, BrainCircuit,
  Send, CalendarDays, TrendingUp, Play, ChevronRight,
} from 'lucide-react'

// ─── Modules list ─────────────────────────────────────────────────────────────

const MODULES = [
  { icon: KanbanSquare, label: 'Pipeline CRM',      desc: 'Kanban z 10 etapami sprzedaży' },
  { icon: Users,        label: 'Baza Leadów',        desc: 'AI scoring + filtrowanie' },
  { icon: Send,         label: 'Outreach Queue',     desc: 'Kolejka DM z AI copywriting' },
  { icon: BrainCircuit, label: 'AI Scoring',         desc: 'Automatyczna ocena 0-100' },
  { icon: Sparkles,     label: 'Generator Treści',   desc: 'Karuzele, posty, repurpose' },
  { icon: CalendarDays, label: 'Kalendarz Contentu', desc: 'Planowanie i harmonogram' },
  { icon: DollarSign,   label: 'Finanse',            desc: 'P&L, przychody, wydatki' },
  { icon: TrendingUp,   label: 'Analityka',          desc: 'Forecast, win/loss, segmenty' },
  { icon: Globe,        label: 'Portal Klienta',     desc: 'Oferty online z trackingiem' },
  { icon: FileText,     label: 'Generator Ofert',    desc: 'Kreator ofert krok-po-kroku' },
]

const BENEFITS = [
  { stat: '3×', label: 'więcej reply na outreach dzięki AI copywriting' },
  { stat: '47%', label: 'mniej czasu na ręczne zarządzanie leadami' },
  { stat: '2×', label: 'szybsze zamykanie dealów dzięki pipeline CRM' },
]

// ─── Components ───────────────────────────────────────────────────────────────

function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#07071299]/95 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-[8px] bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Zap size={13} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[14px] font-bold text-white tracking-tight">AgencyOS</span>
          <span className="text-[10px] text-white/30 font-medium hidden sm:block">by AM Automations</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/demo"
            className="text-[13px] text-white/50 hover:text-white transition-colors hidden sm:block"
          >
            Demo
          </Link>
          <Link
            href="/configurator"
            className="flex items-center gap-1.5 px-4 py-2 rounded-[8px] bg-[#6366f1] text-white text-[13px] font-semibold hover:bg-[#5254cc] transition-all shadow-lg shadow-indigo-500/20"
          >
            Zbuduj system <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </nav>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-[#070712] text-white">
      <NavBar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#6366f1]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-[#8b5cf6]/8 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-[760px] mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#6366f1]/30 bg-[#6366f1]/8 text-[#a5b4fc] text-[12px] font-medium mb-6">
            <Sparkles size={11} />
            System operacyjny dla polskich agencji marketingowych
          </div>

          <h1 className="text-[48px] sm:text-[64px] font-black tracking-tight leading-[1.05] mb-6">
            Jeden system.{' '}
            <span className="bg-gradient-to-r from-[#6366f1] to-[#a78bfa] bg-clip-text text-transparent">
              Cała agencja.
            </span>
          </h1>

          <p className="text-[17px] text-white/55 leading-relaxed mb-10 max-w-[540px] mx-auto">
            CRM, outreach z AI, generator treści, finanse i portal klienta — wszystko w jednym miejscu.
            Zbudowane specjalnie dla agencji do 15 osób.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/configurator"
              className="group flex items-center gap-2 px-6 py-3.5 rounded-[12px] bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white text-[15px] font-bold hover:opacity-90 transition-all shadow-xl shadow-indigo-500/30 w-full sm:w-auto justify-center"
            >
              <Zap size={16} />
              Zbuduj swój system
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/demo"
              className="group flex items-center gap-2 px-6 py-3.5 rounded-[12px] bg-white/[0.06] border border-white/[0.1] text-white text-[15px] font-semibold hover:bg-white/[0.1] transition-all w-full sm:w-auto justify-center"
            >
              <Play size={15} className="text-white/60" />
              Zobacz demo
            </Link>
          </div>

          <p className="text-[12px] text-white/25 mt-5">
            Bez karty kredytowej · Demo dostępne od razu
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-10 px-6 border-y border-white/[0.05]">
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-3 gap-6 sm:gap-12">
            {BENEFITS.map((b) => (
              <div key={b.stat} className="text-center">
                <p className="text-[36px] sm:text-[44px] font-black bg-gradient-to-r from-[#6366f1] to-[#a78bfa] bg-clip-text text-transparent leading-none mb-2">
                  {b.stat}
                </p>
                <p className="text-[12px] sm:text-[13px] text-white/40 leading-snug">{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modules grid ── */}
      <section className="py-20 px-6">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[12px] font-semibold text-[#6366f1] uppercase tracking-widest mb-3">Moduły systemu</p>
            <h2 className="text-[32px] sm:text-[40px] font-black tracking-tight mb-4">
              10 narzędzi. Zero przełączania.
            </h2>
            <p className="text-[15px] text-white/45 max-w-[480px] mx-auto">
              Każdy moduł zaprojektowany pod potrzeby agencji marketingowej. Żadnych zbędnych ficzerów.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {MODULES.map((mod) => (
              <div
                key={mod.label}
                onMouseEnter={() => setHovered(mod.label)}
                onMouseLeave={() => setHovered(null)}
                className={`
                  group p-4 rounded-[14px] border transition-all duration-200 cursor-default
                  ${hovered === mod.label
                    ? 'bg-[#6366f1]/10 border-[#6366f1]/30'
                    : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.05]'
                  }
                `}
              >
                <div className={`
                  w-9 h-9 rounded-[10px] flex items-center justify-center mb-3 transition-all
                  ${hovered === mod.label ? 'bg-[#6366f1]/20' : 'bg-white/[0.06]'}
                `}>
                  <mod.icon size={17} className={hovered === mod.label ? 'text-[#6366f1]' : 'text-white/50'} />
                </div>
                <p className="text-[13px] font-semibold text-white leading-tight mb-1">{mod.label}</p>
                <p className="text-[11px] text-white/35 leading-snug">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 px-6 bg-white/[0.02] border-y border-white/[0.05]">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[12px] font-semibold text-[#6366f1] uppercase tracking-widest mb-3">Jak to działa</p>
            <h2 className="text-[32px] sm:text-[38px] font-black tracking-tight">Trzy kroki do systemu</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '01', title: 'Skonfiguruj', desc: 'Wybierz moduły, wygląd i zakres. Konfiguracja zajmuje 3 minuty.' },
              { n: '02', title: 'Zobacz demo', desc: 'Natychmiast zobaczysz działający prototyp systemu z Twoimi danymi.' },
              { n: '03', title: 'Wdrożenie', desc: 'Nasz team wdraża gotowy system dla Twojej agencji w 7 dni.' },
            ].map((step) => (
              <div key={step.n} className="relative p-5 rounded-[16px] bg-white/[0.03] border border-white/[0.07]">
                <p className="text-[40px] font-black text-[#6366f1]/20 leading-none mb-3">{step.n}</p>
                <p className="text-[15px] font-bold text-white mb-2">{step.title}</p>
                <p className="text-[13px] text-white/45 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA section ── */}
      <section className="py-24 px-6">
        <div className="max-w-[600px] mx-auto text-center">
          <div className="inline-flex flex-col items-center gap-6 p-10 rounded-[24px] bg-gradient-to-b from-[#6366f1]/10 to-[#8b5cf6]/5 border border-[#6366f1]/20">
            <div className="w-14 h-14 rounded-[16px] bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-xl shadow-indigo-500/30">
              <Zap size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-[28px] font-black mb-2">Gotowy na własny system?</h2>
              <p className="text-[14px] text-white/45">Skonfiguruj swój AgencyOS w 3 minuty</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Link
                href="/configurator"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-[10px] bg-[#6366f1] text-white text-[14px] font-bold hover:bg-[#5254cc] transition-all"
              >
                <Zap size={15} /> Zbuduj system
              </Link>
              <Link
                href="/demo"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-[10px] bg-white/[0.06] border border-white/[0.1] text-white text-[14px] font-semibold hover:bg-white/[0.1] transition-all"
              >
                <Play size={14} className="text-white/60" /> Zobacz demo
              </Link>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-white/30">
              {['Wdrożenie w 7 dni', 'Polska obsługa', 'Bez long-term lock-in'].map(t => (
                <span key={t} className="flex items-center gap-1">
                  <CheckCircle2 size={10} className="text-[#6366f1]" /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 border-t border-white/[0.05]">
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-[6px] bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
              <Zap size={9} className="text-white" />
            </div>
            <span className="text-[12px] text-white/30">AgencyOS · AM Automations</span>
          </div>
          <div className="flex items-center gap-5 text-[12px] text-white/30">
            <a href="https://amautomations.pl" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">amautomations.pl</a>
            <Link href="/demo" className="hover:text-white/60 transition-colors">Demo</Link>
            <Link href="/configurator" className="hover:text-white/60 transition-colors">Konfigurator</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
