export interface SegmentPerformance {
  segment: string
  leads: number
  replyRate: number
  closeRate: number
  avgTicket: number
  revenue: number
}

export interface PipelineVelocity {
  stage: string
  avgDays: number
}

export interface WinLossReason {
  reason: string
  percentage: number
  color: string
}

export interface RevenueForecast {
  period: string
  amount: number
  deals: number
  probability: string
}

export const SEGMENT_PERFORMANCE: SegmentPerformance[] = [
  { segment: 'Beauty',          leads: 18, replyRate: 41, closeRate: 28, avgTicket: 9200,  revenue: 46368 },
  { segment: 'E-commerce',      leads: 23, replyRate: 31, closeRate: 19, avgTicket: 14800, revenue: 64676 },
  { segment: 'Medyczne',        leads: 15, replyRate: 38, closeRate: 35, avgTicket: 11400, revenue: 59850 },
  { segment: 'Fitness',         leads: 12, replyRate: 29, closeRate: 22, avgTicket: 8600,  revenue: 22704 },
  { segment: 'Restauracje',     leads: 10, replyRate: 24, closeRate: 14, avgTicket: 7200,  revenue: 10080 },
  { segment: 'Kancelarie',      leads: 8,  replyRate: 35, closeRate: 18, avgTicket: 9800,  revenue: 14112 },
  { segment: 'Nieruchomości',   leads: 11, replyRate: 33, closeRate: 25, avgTicket: 13200, revenue: 36300 },
  { segment: 'Szkolenia',       leads: 14, replyRate: 44, closeRate: 32, avgTicket: 10600, revenue: 47488 },
]

export const PIPELINE_VELOCITY: PipelineVelocity[] = [
  { stage: 'Nowy lead',         avgDays: 2  },
  { stage: 'DM wysłany',        avgDays: 4  },
  { stage: 'Odpowiedź',         avgDays: 3  },
  { stage: 'Rozmowa umówiona',  avgDays: 5  },
  { stage: 'Diagnoza',          avgDays: 7  },
  { stage: 'Oferta',            avgDays: 8  },
  { stage: 'Negocjacje',        avgDays: 6  },
]

export const WIN_LOSS_REASONS: WinLossReason[] = [
  { reason: 'Za drogo',               percentage: 34, color: '#ef4444' },
  { reason: 'Wybrali konkurencję',     percentage: 28, color: '#f97316' },
  { reason: 'Nie teraz',              percentage: 22, color: '#eab308' },
  { reason: 'Brak decyzji',           percentage: 16, color: '#94a3b8' },
]

export const REVENUE_FORECAST: RevenueForecast[] = [
  { period: '30 dni',  amount: 32000, deals: 4,  probability: '70-90%' },
  { period: '60 dni',  amount: 67000, deals: 9,  probability: '40-80%' },
  { period: '90 dni',  amount: 98000, deals: 14, probability: '20-70%' },
]

export const OUTREACH_FUNNEL = [
  { stage: 'Wysiłane wiadomości',    count: 138, color: '#6366f1' },
  { stage: 'Odpowiedzi',             count: 47,  color: '#a78bfa' },
  { stage: 'Umówione rozmowy',       count: 18,  color: '#f59e0b' },
  { stage: 'Oferty wysłane',         count: 9,   color: '#22c55e' },
  { stage: 'Wygrane deale',          count: 4,   color: '#10b981' },
]

export const MONTHLY_PIPELINE_GROWTH = [
  { month: 'Lis', newDeals: 8,  closedWon: 2 },
  { month: 'Gru', newDeals: 11, closedWon: 3 },
  { month: 'Sty', newDeals: 9,  closedWon: 2 },
  { month: 'Lut', newDeals: 14, closedWon: 4 },
  { month: 'Mar', newDeals: 12, closedWon: 3 },
  { month: 'Kwi', newDeals: 16, closedWon: 4 },
]

// AI Scoring distribution
export const SCORING_DISTRIBUTION = [
  { label: 'Hot (70-100)',  value: 18, color: '#ef4444' },
  { label: 'Warm (40-69)', value: 52, color: '#f97316' },
  { label: 'Cold (0-39)',  value: 30, color: '#3b82f6' },
]

export const RECENTLY_SCORED = [
  { id: 's1', name: 'Marta Wiśniewska',   company: 'Glow Clinic',          total: 91, icp: 24, signals: 22, activity: 25, potential: 20, label: 'hot'  as const },
  { id: 's2', name: 'Agnieszka Bąk',      company: 'Beauty Academy Warsaw', total: 93, icp: 25, signals: 23, activity: 24, potential: 21, label: 'hot'  as const },
  { id: 's3', name: 'Paweł Krupa',        company: 'Akademia Biznesu',      total: 83, icp: 22, signals: 20, activity: 21, potential: 20, label: 'hot'  as const },
  { id: 's4', name: 'Piotr Lewandowski',  company: 'ModaHouse',             total: 88, icp: 23, signals: 22, activity: 22, potential: 21, label: 'hot'  as const },
  { id: 's5', name: 'Tomasz Kowalski',    company: 'DevLoft Nieruchomości', total: 81, icp: 21, signals: 19, activity: 21, potential: 20, label: 'hot'  as const },
  { id: 's6', name: 'Karolina Michalak',  company: 'FashionFirst',          total: 79, icp: 20, signals: 19, activity: 20, potential: 20, label: 'warm' as const },
  { id: 's7', name: 'Michał Ostrowski',   company: 'MedCenter Warszawa',    total: 72, icp: 18, signals: 17, activity: 19, potential: 18, label: 'warm' as const },
  { id: 's8', name: 'Kamil Nowak',        company: 'FitZone Kraków',        total: 84, icp: 22, signals: 21, activity: 21, potential: 20, label: 'hot'  as const },
  { id: 's9', name: 'Grzegorz Adamski',   company: 'Kancelaria Adamski',    total: 52, icp: 13, signals: 12, activity: 14, potential: 13, label: 'warm' as const },
  { id: 's10', name: 'Dorota Mazurek',    company: 'Yoga & Mindfulness',    total: 38, icp: 9,  signals: 8,  activity: 11, potential: 10, label: 'cold' as const },
]
