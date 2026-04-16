'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Users, TrendingUp, MessageSquare, DollarSign, Target,
  ArrowUpRight, PlusCircle, MessageCircle, ReceiptText,
  ChevronRight, Clock, Zap, BookOpen,
} from 'lucide-react'
import { useAppUser } from '@/contexts/UserContext'
import { createClient } from '@/lib/supabase/client'

interface KpiData {
  leadsThisMonth: number
  activeDeals: number
  revenueThisMonth: number
}

function formatPLN(value: number): string {
  if (value >= 1000) return (value / 1000).toFixed(0) + ' tys. PLN'
  return value + ' PLN'
}

export default function DashboardPage() {
  const { user } = useAppUser()
  const today = new Date().toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' })

  const [kpi, setKpi] = useState<KpiData>({ leadsThisMonth: 0, activeDeals: 0, revenueThisMonth: 0 })
  const [kpiLoading, setKpiLoading] = useState(true)

  useEffect(() => {
    async function loadKpi() {
      const supabase = createClient()
      const now = new Date()
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

      const [leadsRes, dealsRes, incomeRes] = await Promise.all([
        supabase
          .from('leads')
          .select('id', { count: 'exact', head: true })
          .gte('created_at', monthStart),
        supabase
          .from('deals')
          .select('id', { count: 'exact', head: true })
          .not('stage', 'in', '("wygrana","przegrana","nie_teraz")'),
        supabase
          .from('income')
          .select('paid_amount')
          .eq('status', 'oplacona')
          .gte('paid_date', monthStart.slice(0, 10)),
      ])

      const revenue = (incomeRes.data ?? []).reduce(
        (sum: number, row: { paid_amount: number | null }) => sum + (row.paid_amount ?? 0), 0
      )

      setKpi({
        leadsThisMonth: leadsRes.count ?? 0,
        activeDeals: dealsRes.count ?? 0,
        revenueThisMonth: revenue,
      })
      setKpiLoading(false)
    }
    loadKpi()
  }, [])

  const kpiCards = [
    { label: 'Leady w tym miesiącu', value: kpiLoading ? '…' : String(kpi.leadsThisMonth),      icon: Users,        color: '#6366f1', href: '/leads',    sub: 'dodane w tym miesiącu' },
    { label: 'Aktywne deale',        value: kpiLoading ? '…' : String(kpi.activeDeals),          icon: TrendingUp,   color: '#22c55e', href: '/pipeline', sub: 'w toku (bez zakończonych)' },
    { label: 'Reply rate',           value: '—',                                                  icon: MessageSquare,color: '#f59e0b', href: '/outreach', sub: 'wkrótce dostępne' },
    { label: 'Przychód miesiąc',     value: kpiLoading ? '…' : formatPLN(kpi.revenueThisMonth), icon: DollarSign,   color: '#06b6d4', href: '/finance',  sub: 'opłacone faktury' },
  ]

  return (
    <div className="max-w-[1400px] space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-white tracking-tight">
            Dzień dobry, {user?.fullName ?? 'tam'} 👋
          </h1>
          <p className="text-[13px] text-white/40 mt-0.5">
            {today}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap sm:justify-end">
          <Link href="/leads" className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white/[0.04] border border-white/[0.08] text-white/60 text-[12px] font-medium hover:bg-white/[0.07] hover:text-white transition-all">
            <PlusCircle size={13} /> Dodaj lead
          </Link>
          <Link href="/outreach" className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white/[0.04] border border-white/[0.08] text-white/60 text-[12px] font-medium hover:bg-white/[0.07] hover:text-white transition-all">
            <MessageCircle size={13} /> Nowa wiadomość
          </Link>
          <Link href="/finance" className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#6366f1]/10 border border-[#6366f1]/30 text-[#a5b4fc] text-[12px] font-medium hover:bg-[#6366f1]/20 transition-all">
            <ReceiptText size={13} /> Dodaj przychód
          </Link>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => (
          <Link
            key={kpi.label}
            href={kpi.href}
            className="group bg-[#16213E] border border-white/[0.07] rounded-[14px] p-4 hover:border-white/15 hover:bg-[#1a2748] transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ background: kpi.color + '20' }}>
                <kpi.icon size={17} style={{ color: kpi.color }} />
              </div>
              <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/50 transition-colors mt-0.5" />
            </div>
            <p className="text-[11px] text-white/40 mb-1">{kpi.label}</p>
            <p className="text-[22px] font-bold text-white tracking-tight leading-none">{kpi.value}</p>
            <p className="text-[11px] text-white/25 mt-2">{kpi.sub}</p>
          </Link>
        ))}
      </div>

      {/* Cel miesięczny */}
      <div className="bg-[#16213E] border border-white/[0.07] rounded-[14px] p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target size={15} className="text-[#6366f1]" />
            <span className="text-[13px] font-semibold text-white">Cel przychodowy — bieżący miesiąc</span>
          </div>
          <span className="text-[13px] text-white/30">0%</span>
        </div>
        <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]" style={{ width: '0%' }} />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[11px] text-white/30">Dodaj przychód w zakładce Finanse</span>
          <Link href="/finance" className="text-[11px] text-[#6366f1]/60 hover:text-[#6366f1] transition-colors">
            Przejdź →
          </Link>
        </div>
      </div>

      {/* Grid: start guide + activity */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-4">

        {/* Quick start */}
        <div className="bg-[#16213E] border border-white/[0.07] rounded-[14px] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={15} className="text-[#6366f1]" />
            <p className="text-[14px] font-semibold text-white">Zacznij tutaj</p>
          </div>
          <div className="space-y-2">
            {[
              { href: '/knowledge-base', icon: BookOpen,     color: '#6366f1', title: '1. Wypełnij Bazę Wiedzy',     desc: 'Dodaj info o firmie, usługach i ICP — AI będzie lepiej działać' },
              { href: '/leads',          icon: Users,         color: '#22c55e', title: '2. Dodaj pierwszych leadów',   desc: 'Ręcznie lub przez import CSV z LinkedIn Sales Navigator' },
              { href: '/ai-scoring',     icon: Target,        color: '#f59e0b', title: '3. Uruchom AI Scoring',        desc: 'AI oceni leadów i wygeneruje personalizowane wiadomości' },
              { href: '/pipeline',       icon: TrendingUp,    color: '#06b6d4', title: '4. Otwórz deal w pipeline',    desc: 'Po pierwszym kontakcie przesuń lead do CRM Pipeline' },
              { href: '/content-generator', icon: MessageSquare, color: '#a78bfa', title: '5. Wygeneruj treści',       desc: 'Posty LinkedIn, Instagram, newsletter — AI na podstawie Twojej firmy' },
            ].map((step) => (
              <Link
                key={step.href}
                href={step.href}
                className="flex items-start gap-3 p-3 rounded-[10px] bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/10 transition-all group"
              >
                <div className="w-8 h-8 rounded-[8px] flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: step.color + '20' }}>
                  <step.icon size={14} style={{ color: step.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-white group-hover:text-white leading-tight">{step.title}</p>
                  <p className="text-[11px] text-white/40 mt-0.5 leading-snug">{step.desc}</p>
                </div>
                <ChevronRight size={13} className="text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0 mt-1" />
              </Link>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="bg-[#16213E] border border-white/[0.07] rounded-[14px] p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[14px] font-semibold text-white">Ostatnia aktywność</p>
            <Clock size={13} className="text-white/30" />
          </div>
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center">
              <Clock size={18} className="text-white/20" />
            </div>
            <p className="text-[13px] text-white/30 text-center">Brak aktywności</p>
            <p className="text-[11px] text-white/20 text-center leading-relaxed">
              Tutaj pojawią się akcje:<br />dodane leady, wygenerowane wiadomości,<br />zmiany w pipeline.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
