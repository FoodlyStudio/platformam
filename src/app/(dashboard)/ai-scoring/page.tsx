'use client'

import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
} from 'recharts'
import {
  BrainCircuit, Flame, Thermometer, Snowflake,
  CheckCircle2, Upload, AlertCircle,
} from 'lucide-react'
const SCORING_DISTRIBUTION: { label: string; value: number; color: string }[] = []
const RECENTLY_SCORED: unknown[] = []

// ─── Criteria ─────────────────────────────────────────────────────────────────

const CRITERIA = [
  {
    label: 'Dopasowanie do ICP',
    weight: '25 pkt',
    color: '#6366f1',
    desc: 'Sprawdzamy czy firma pasuje do Twojego Idealnego Profilu Klienta: branża, wielkość, lokalizacja, stanowisko decydenta.',
  },
  {
    label: 'Sygnały zakupowe',
    weight: '25 pkt',
    color: '#f59e0b',
    desc: 'Aktywność sugerująca intencję zakupową: posty o problemach, zatrudnienia w sprzedaży/marketingu, zmiany technologii, wzrost firmy.',
  },
  {
    label: 'Aktywność online',
    weight: '25 pkt',
    color: '#22c55e',
    desc: 'Częstotliwość i jakość aktywności na LinkedIn/IG. Aktywne profile = wyższa szansa na odpowiedź na DM.',
  },
  {
    label: 'Potencjał projektu',
    weight: '25 pkt',
    color: '#a78bfa',
    desc: 'Szacowany budżet i zakres projektu na podstawie wielkości firmy, branży i sygnałów z profilu.',
  },
]

// ─── Score badge ─────────────────────────────────────────────────────────────

function ScoreBadge({ label }: { label: 'hot' | 'warm' | 'cold' }) {
  if (label === 'hot')  return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 text-[10px] font-bold"><Flame size={9}/>Hot</span>
  if (label === 'warm') return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 text-[10px] font-bold"><Thermometer size={9}/>Warm</span>
  return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 text-[10px] font-bold"><Snowflake size={9}/>Cold</span>
}

const PIE_COLORS = {
  'Hot (70-100)':  '#ef4444',
  'Warm (40-69)': '#f97316',
  'Cold (0-39)':  '#3b82f6',
}

function CustomPieTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#0F0F1A] border border-white/10 rounded-[8px] px-3 py-2 text-[12px]">
      <p style={{ color: payload[0].payload.color }}>{payload[0].name}: <strong>{payload[0].value}%</strong></p>
    </div>
  )
}

// ─── Score bar ────────────────────────────────────────────────────────────────

function ScoreBar({ value, max = 25, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${(value / max) * 100}%`, background: color }}
        />
      </div>
      <span className="text-[10px] text-white/40 w-6 text-right">{value}</span>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AiScoringPage() {
  return (
    <div className="max-w-[1200px] space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-white flex items-center gap-2">
            <BrainCircuit size={20} className="text-[#6366f1]" />
            AI Scoring Leadów
          </h1>
          <p className="text-[12px] text-white/40 mt-0.5">Automatyczna ocena każdego leadu w skali 0-100</p>
        </div>
      </div>

      {/* Import status bar */}
      <div className="flex items-center gap-3 p-4 rounded-[12px] bg-white/[0.03] border border-white/[0.07]">
        <Upload size={16} className="text-white/30 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-[13px] font-semibold text-white/60">Brak leadów do oceny</p>
          <p className="text-[11px] text-white/30">
            Najpierw dodaj leadów w zakładce <span className="text-white/50">Leady</span>, potem AI oceni każdego automatycznie.
          </p>
        </div>
      </div>

      {/* Methodology + Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">

        {/* Methodology */}
        <div className="bg-[#16213E] border border-white/[0.07] rounded-[14px] p-5">
          <p className="text-[14px] font-semibold text-white mb-1">Metodologia scoringu</p>
          <p className="text-[12px] text-white/40 mb-4">Każdy lead oceniany jest na 4 kryteriach (maks. 25 pkt każde = 100 pkt łącznie)</p>
          <div className="space-y-4">
            {CRITERIA.map((c) => (
              <div key={c.label} className="p-3 rounded-[10px] bg-white/[0.03] border border-white/[0.05]">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} />
                    <span className="text-[13px] font-semibold text-white">{c.label}</span>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: c.color + '20', color: c.color }}>
                    max {c.weight}
                  </span>
                </div>
                <p className="text-[12px] text-white/50 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Distribution chart */}
        <div className="bg-[#16213E] border border-white/[0.07] rounded-[14px] p-5">
          <p className="text-[14px] font-semibold text-white mb-1">Rozkład bazy leadów</p>
          <p className="text-[12px] text-white/40 mb-4">Brak ocenionych leadów</p>

          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <div className="w-16 h-16 rounded-full bg-white/[0.04] border-2 border-dashed border-white/10 flex items-center justify-center">
              <BrainCircuit size={24} className="text-white/20" />
            </div>
            <p className="text-[12px] text-white/30 text-center mt-1">Dodaj leadów i uruchom scoring</p>
          </div>

          {/* Hot/Warm/Cold summary */}
          <div className="grid grid-cols-3 gap-2 mt-2 pt-4 border-t border-white/[0.07]">
            <div className="text-center">
              <Flame size={16} className="text-red-400 mx-auto mb-1" />
              <p className="text-[16px] font-bold text-white">0</p>
              <p className="text-[9px] text-white/40 uppercase tracking-wide">Hot leads</p>
            </div>
            <div className="text-center">
              <Thermometer size={16} className="text-orange-400 mx-auto mb-1" />
              <p className="text-[16px] font-bold text-white">0</p>
              <p className="text-[9px] text-white/40 uppercase tracking-wide">Warm leads</p>
            </div>
            <div className="text-center">
              <Snowflake size={16} className="text-blue-400 mx-auto mb-1" />
              <p className="text-[16px] font-bold text-white">0</p>
              <p className="text-[9px] text-white/40 uppercase tracking-wide">Cold leads</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recently scored table */}
      <div className="bg-[#16213E] border border-white/[0.07] rounded-[14px] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.07]">
          <p className="text-[14px] font-semibold text-white">Ostatnio ocenione leady</p>
          <p className="text-[12px] text-white/40 mt-0.5">Pełny breakdown score per kryterium</p>
        </div>
        {/* Header */}
        <div className="grid grid-cols-[1fr_60px_60px_80px_80px_80px_80px_80px] gap-2 px-5 py-2 border-b border-white/[0.05] text-[10px] font-semibold text-white/30 uppercase tracking-wide">
          <span>Lead</span>
          <span className="text-center">Łącznie</span>
          <span className="text-center">Label</span>
          <span className="hidden md:block text-center">ICP</span>
          <span className="hidden md:block text-center">Sygnały</span>
          <span className="hidden lg:block text-center">Aktywność</span>
          <span className="hidden lg:block text-center">Potencjał</span>
          <span className="hidden xl:block text-center">Wykres</span>
        </div>
        <div className="flex flex-col items-center justify-center py-10 gap-2">
          <p className="text-[13px] text-white/30">Brak ocenionych leadów</p>
          <p className="text-[11px] text-white/20">Po dodaniu leadów AI automatycznie je oceni</p>
        </div>
      </div>

      {/* Alert box */}
      <div className="flex items-start gap-3 p-4 rounded-[12px] bg-amber-500/[0.07] border border-amber-500/20">
        <AlertCircle size={15} className="text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-[12px] font-semibold text-amber-400">Scoring odświeżany co 12h</p>
          <p className="text-[11px] text-white/40 mt-0.5 leading-relaxed">
            AI automatycznie przeocenia leady co 12 godzin na podstawie nowych sygnałów z LinkedIn i aktywności online.
            Leady oznaczone jako Hot powinny otrzymać wiadomość w ciągu 12h.
          </p>
        </div>
      </div>
    </div>
  )
}
