'use client'

import { useState } from 'react'
import {
  Flame, Thermometer, Snowflake, X, Phone, Mail, Calendar,
  FileText, MessageSquare, ChevronRight, DollarSign, TrendingUp,
  User, Building2, Tag, CheckCircle2,
} from 'lucide-react'
import { STAGE_CONFIG, type Deal, type DealStage } from '@/lib/mock-data/deals'

// ─── Stage order ─────────────────────────────────────────────────────────────

const STAGE_ORDER: DealStage[] = [
  'nowy-lead', 'dm-wyslany', 'odpowiedz', 'rozmowa-umowiona',
  'diagnoza', 'oferta', 'negocjacje', 'wygrana', 'przegrana', 'nie-teraz',
]

// ─── Badge helpers ────────────────────────────────────────────────────────────

function ScoreBadge({ score }: { score: 'hot' | 'warm' | 'cold' }) {
  if (score === 'hot')  return <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-red-500/15 text-red-400 text-[9px] font-bold uppercase tracking-wide"><Flame size={8}/>Hot</span>
  if (score === 'warm') return <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-orange-500/15 text-orange-400 text-[9px] font-bold uppercase tracking-wide"><Thermometer size={8}/>Warm</span>
  return <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 text-[9px] font-bold uppercase tracking-wide"><Snowflake size={8}/>Cold</span>
}

function formatPLN(v: number) {
  return v.toLocaleString('pl-PL') + ' PLN'
}

function relativeDate(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
  if (days === 0) return 'dziś'
  if (days === 1) return 'wczoraj'
  return `${days} dni temu`
}

// ─── Deal Card ────────────────────────────────────────────────────────────────

function DealCard({ deal, onClick }: { deal: Deal; onClick: () => void }) {
  const initials = deal.contactName.split(' ').map(n => n[0]).join('').slice(0, 2)
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-3 rounded-[10px] bg-[#1a2239] border border-white/[0.07] hover:border-white/15 hover:bg-[#1e2a45] transition-all group"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-[8px] bg-[#6366f1]/20 flex items-center justify-center text-[11px] font-bold text-[#6366f1] flex-shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-white truncate leading-tight">{deal.contactName}</p>
            <p className="text-[10px] text-white/40 truncate">{deal.company}</p>
          </div>
        </div>
        <ScoreBadge score={deal.aiScore} />
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-[11px] font-semibold text-[#6366f1]">{formatPLN(deal.value)}</span>
        <span className="text-[10px] text-white/30">{relativeDate(deal.lastContact)}</span>
      </div>
    </button>
  )
}

// ─── Deal Detail Modal ────────────────────────────────────────────────────────

function DealModal({ deal, onClose }: { deal: Deal; onClose: () => void }) {
  const stage = STAGE_CONFIG[deal.stage]
  const initials = deal.contactName.split(' ').map(n => n[0]).join('').slice(0, 2)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full sm:max-w-[480px] h-full bg-[#0F0F1A] sm:border-l border-white/[0.08] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-[#0F0F1A]/95 backdrop-blur border-b border-white/[0.07] p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-[#6366f1]/20 flex items-center justify-center text-[14px] font-bold text-[#6366f1]">
              {initials}
            </div>
            <div>
              <p className="text-[15px] font-bold text-white">{deal.contactName}</p>
              <p className="text-[12px] text-white/40">{deal.company} · {deal.position}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-[8px] text-white/40 hover:text-white hover:bg-white/[0.06] transition-all">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Stage + Score */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ background: stage.bg, color: stage.color }}>
              {stage.label}
            </span>
            <ScoreBadge score={deal.aiScore} />
            <span className="text-[11px] text-white/40">Score: {deal.aiScoreNum}/100</span>
          </div>

          {/* Value */}
          <div className="flex items-center gap-2 p-3 rounded-[10px] bg-white/[0.03] border border-white/[0.06]">
            <DollarSign size={15} className="text-[#6366f1]" />
            <div>
              <p className="text-[10px] text-white/40">Wartość projektu</p>
              <p className="text-[16px] font-bold text-white">{formatPLN(deal.value)}</p>
            </div>
          </div>

          {/* Contact info */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wide">Dane kontaktowe</p>
            <div className="grid grid-cols-1 gap-2">
              {[
                { icon: User, label: deal.position },
                { icon: Building2, label: deal.company },
                { icon: Mail, label: deal.email },
                { icon: Phone, label: deal.phone },
                { icon: Tag, label: deal.segment },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[12px]">
                  <item.icon size={13} className="text-white/30 flex-shrink-0" />
                  <span className="text-white/60">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scope */}
          <div className="p-3 rounded-[10px] bg-white/[0.03] border border-white/[0.06]">
            <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wide mb-1">Zakres projektu</p>
            <p className="text-[13px] text-white/75">{deal.projectScope}</p>
          </div>

          {/* Next step */}
          <div className="p-3 rounded-[10px] bg-[#6366f1]/[0.08] border border-[#6366f1]/20">
            <p className="text-[10px] font-semibold text-[#6366f1]/70 uppercase tracking-wide mb-1">Następny krok</p>
            <p className="text-[13px] text-white/80">{deal.nextStep || '—'}</p>
          </div>

          {/* Last contact */}
          <div className="flex items-center gap-2 text-[12px] text-white/40">
            <Calendar size={13} />
            Ostatni kontakt: {new Date(deal.lastContact).toLocaleDateString('pl-PL')}
          </div>

          {/* Notes */}
          {deal.notes.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wide mb-2">Historia rozmów</p>
              <div className="space-y-2">
                {deal.notes.map((note, i) => (
                  <div key={i} className="p-3 rounded-[10px] bg-white/[0.03] border border-white/[0.05]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-semibold text-[#6366f1]">{note.author}</span>
                      <span className="text-[10px] text-white/30">{new Date(note.date).toLocaleDateString('pl-PL')}</span>
                    </div>
                    <p className="text-[12px] text-white/65">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lost reason */}
          {deal.lostReason && (
            <div className="p-3 rounded-[10px] bg-red-500/[0.08] border border-red-500/20">
              <p className="text-[10px] font-semibold text-red-400/70 uppercase tracking-wide mb-1">Powód przegranej</p>
              <p className="text-[13px] text-white/70">{deal.lostReason}</p>
            </div>
          )}

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button className="flex items-center justify-center gap-1.5 py-2 rounded-[8px] bg-white/[0.04] border border-white/[0.07] text-white/60 text-[12px] font-medium hover:bg-white/[0.08] hover:text-white transition-all">
              <MessageSquare size={13} /> Wyślij DM
            </button>
            <button className="flex items-center justify-center gap-1.5 py-2 rounded-[8px] bg-[#6366f1]/15 border border-[#6366f1]/30 text-[#a5b4fc] text-[12px] font-medium hover:bg-[#6366f1]/25 transition-all">
              <FileText size={13} /> Generuj ofertę
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── New Deal Modal ───────────────────────────────────────────────────────────

const SEGMENTS = ['e-commerce', 'usługi', 'gastro', 'beauty', 'b2b', 'nieruchomości', 'zdrowie', 'edukacja']

function NewDealModal({ onClose, onAdd }: { onClose: () => void; onAdd: (deal: Deal) => void }) {
  const [form, setForm] = useState({
    contactName: '', company: '', position: '',
    email: '', phone: '', value: '', stage: 'nowy-lead' as DealStage, segment: 'usługi',
  })
  const [saved, setSaved] = useState(false)

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const deal: Deal = {
      id: `new-${Date.now()}`,
      contactName: form.contactName || 'Nowy Kontakt',
      company: form.company || 'Nowa Firma',
      position: form.position || 'Dyrektor',
      email: form.email || 'kontakt@firma.pl',
      phone: form.phone || '+48 000 000 000',
      value: parseInt(form.value) || 10000,
      stage: form.stage,
      aiScore: 'warm',
      aiScoreNum: 55,
      lastContact: new Date().toISOString().slice(0, 10),
      segment: form.segment,
      notes: [],
      nextStep: 'Umówić rozmowę discovery',
      projectScope: 'Do uzupełnienia po pierwszej rozmowie',
    }
    onAdd(deal)
    setSaved(true)
    setTimeout(() => onClose(), 1200)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-[480px] bg-[#0F0F1A] border border-white/[0.1] rounded-[18px] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.07]">
          <div>
            <p className="text-[15px] font-bold text-white">Nowy deal</p>
            <p className="text-[11px] text-white/40 mt-0.5">Dodaj deal do pipeline CRM</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-[8px] text-white/40 hover:text-white hover:bg-white/[0.06] transition-all">
            <X size={16} />
          </button>
        </div>

        {saved ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 size={22} className="text-green-400" />
            </div>
            <p className="text-[15px] font-semibold text-white">Deal dodany!</p>
            <p className="text-[12px] text-white/40">{form.company} pojawi się w kolumnie pipeline</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-white/40 uppercase tracking-wide mb-1.5">Imię i Nazwisko *</label>
                <input value={form.contactName} onChange={set('contactName')} required placeholder="Jan Kowalski"
                  className="w-full px-3 py-2 rounded-[8px] bg-white/[0.04] border border-white/[0.08] text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-[#6366f1]/50 transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-white/40 uppercase tracking-wide mb-1.5">Firma *</label>
                <input value={form.company} onChange={set('company')} required placeholder="Nazwa firmy"
                  className="w-full px-3 py-2 rounded-[8px] bg-white/[0.04] border border-white/[0.08] text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-[#6366f1]/50 transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-white/40 uppercase tracking-wide mb-1.5">Stanowisko</label>
                <input value={form.position} onChange={set('position')} placeholder="CEO / Marketing Manager"
                  className="w-full px-3 py-2 rounded-[8px] bg-white/[0.04] border border-white/[0.08] text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-[#6366f1]/50 transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-white/40 uppercase tracking-wide mb-1.5">Wartość (PLN)</label>
                <input value={form.value} onChange={set('value')} type="number" placeholder="15000"
                  className="w-full px-3 py-2 rounded-[8px] bg-white/[0.04] border border-white/[0.08] text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-[#6366f1]/50 transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-white/40 uppercase tracking-wide mb-1.5">Email</label>
                <input value={form.email} onChange={set('email')} type="email" placeholder="jan@firma.pl"
                  className="w-full px-3 py-2 rounded-[8px] bg-white/[0.04] border border-white/[0.08] text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-[#6366f1]/50 transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-white/40 uppercase tracking-wide mb-1.5">Telefon</label>
                <input value={form.phone} onChange={set('phone')} placeholder="+48 500 000 000"
                  className="w-full px-3 py-2 rounded-[8px] bg-white/[0.04] border border-white/[0.08] text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-[#6366f1]/50 transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-white/40 uppercase tracking-wide mb-1.5">Etap pipeline</label>
                <select value={form.stage} onChange={set('stage')}
                  className="w-full px-3 py-2 rounded-[8px] bg-[#1A1A2E] border border-white/[0.08] text-white text-[13px] focus:outline-none focus:border-[#6366f1]/50 transition-all">
                  {(Object.keys(STAGE_CONFIG) as DealStage[]).filter(s => !['przegrana','nie-teraz'].includes(s)).map(s => (
                    <option key={s} value={s}>{STAGE_CONFIG[s].label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-white/40 uppercase tracking-wide mb-1.5">Segment</label>
                <select value={form.segment} onChange={set('segment')}
                  className="w-full px-3 py-2 rounded-[8px] bg-[#1A1A2E] border border-white/[0.08] text-white text-[13px] focus:outline-none focus:border-[#6366f1]/50 transition-all">
                  {SEGMENTS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button type="button" onClick={onClose}
                className="flex-1 py-2.5 rounded-[10px] bg-white/[0.04] border border-white/[0.08] text-white/50 text-[13px] font-medium hover:bg-white/[0.08] hover:text-white transition-all">
                Anuluj
              </button>
              <button type="submit"
                className="flex-1 py-2.5 rounded-[10px] bg-[#6366f1] text-white text-[13px] font-bold hover:bg-[#5254cc] transition-all shadow-lg shadow-indigo-500/25">
                Dodaj deal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PipelinePage() {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [extraDeals, setExtraDeals] = useState<Deal[]>([])
  const [showNewDeal, setShowNewDeal] = useState(false)
  const allDeals = [...extraDeals]

  // Group deals by stage
  const dealsByStage = STAGE_ORDER.reduce<Record<DealStage, Deal[]>>((acc, stage) => {
    acc[stage] = allDeals.filter(d => d.stage === stage)
    return acc
  }, {} as Record<DealStage, Deal[]>)

  const totalPipelineValue = allDeals
    .filter(d => !['przegrana', 'nie-teraz'].includes(d.stage))
    .reduce((sum, d) => sum + d.value, 0)

  const wonValue = allDeals
    .filter(d => d.stage === 'wygrana')
    .reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 flex-shrink-0">
        <div>
          <h1 className="text-[20px] font-bold text-white">Pipeline CRM</h1>
          <p className="text-[12px] text-white/40 mt-0.5">
            {allDeals.length} dealów · aktywny:{' '}
            <span className="text-white/60 font-semibold">{totalPipelineValue.toLocaleString('pl-PL')} PLN</span>
            <span className="hidden sm:inline">{' · '}wygrane:{' '}
            <span className="text-green-400 font-semibold">{wonValue.toLocaleString('pl-PL')} PLN</span></span>
          </p>
        </div>
        <button onClick={() => setShowNewDeal(true)} className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#6366f1]/10 border border-[#6366f1]/30 text-[#a5b4fc] text-[12px] font-medium hover:bg-[#6366f1]/20 transition-all">
          + Nowy deal
        </button>
      </div>

      {/* Kanban board - horizontal scroll */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-3 h-full" style={{ minWidth: `${STAGE_ORDER.length * 230}px` }}>
          {STAGE_ORDER.map((stage) => {
            const config = STAGE_CONFIG[stage]
            const deals = dealsByStage[stage]
            const stageValue = deals.reduce((s, d) => s + d.value, 0)

            return (
              <div key={stage} className="flex flex-col w-[220px] flex-shrink-0">
                {/* Column header */}
                <div
                  className="flex items-center justify-between px-3 py-2 rounded-[10px] mb-2 flex-shrink-0"
                  style={{ background: config.bg }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-semibold" style={{ color: config.color }}>
                      {config.label}
                    </span>
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{ background: config.color + '25', color: config.color }}
                    >
                      {deals.length}
                    </span>
                  </div>
                  {stageValue > 0 && (
                    <span className="text-[9px] font-semibold" style={{ color: config.color + 'aa' }}>
                      {(stageValue / 1000).toFixed(0)}k
                    </span>
                  )}
                </div>

                {/* Cards */}
                <div className="flex-1 space-y-2 overflow-y-auto">
                  {deals.map((deal) => (
                    <DealCard key={deal.id} deal={deal} onClick={() => setSelectedDeal(deal)} />
                  ))}
                  {deals.length === 0 && (
                    <div className="text-center py-6 text-[11px] text-white/20">Brak dealów</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Deal detail modal */}
      {selectedDeal && (
        <DealModal deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
      )}

      {/* New deal modal */}
      {showNewDeal && (
        <NewDealModal
          onClose={() => setShowNewDeal(false)}
          onAdd={(deal) => setExtraDeals(prev => [...prev, deal])}
        />
      )}
    </div>
  )
}
